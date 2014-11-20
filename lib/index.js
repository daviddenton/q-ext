'use strict';

var q = require('Q');
var _ = require('lodash');

function filterResultsFor(results, successFilter) {
    return _.chain(results[successFilter]).map(function (result) {
            return successFilter ? [result.value[0], result.value[1]] : [result.reason[0], result.reason[1]];
        }).object().value();
}

exports.allSettled = function (promises) {
    if(_.isArray(promises)) return q.allSettled(promises);

    var namePromiseResultPairs = _.map(promises, function (promise, name) {
        return promise.then(function (value) {
            return q.resolve([name, value]);
        }, function (err) {
            return q.reject([name, err]);
        });
    });
    return q.allSettled(namePromiseResultPairs).then(function (results) {
        var groupedByState = _.groupBy(results, function (result) {
            return result.state === 'fulfilled';
        });
        return [
            filterResultsFor(groupedByState, false), filterResultsFor(groupedByState, true)
        ];
    });
};
