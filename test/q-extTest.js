'use strict';

var q = require('q');
var qExt = require('../lib');
var assert = require('chai').assert;

describe('q-ext', function () {

    it('allSettled for named objects splits successful and unsuccessful promises into named result objects', function () {
        var aggregate = qExt.allSettled({
            aSuccessfulPromise: q.resolve('result'),
            anotherSuccessfulPromise: q.resolve('anotherResult'),
            anUnsuccessfulPromise: q.reject('error'),
            anotherUnsuccessfulPromise: q.reject('anotherError')
        });

        aggregate.spread(function (errorsByName, successesByName) {
            assert.deepEqual(errorsByName, {
                anUnsuccessfulPromise: 'error',
                anotherUnsuccessfulPromise: 'anotherError'
            });
            assert.deepEqual(successesByName, {
                aSuccessfulPromise: 'result',
                anotherSuccessfulPromise: 'anotherResult'
            });
        }).done();
    });

    it('allSettled for arrays defers to q', function () {
        var aggregate = qExt.allSettled([q.resolve('result'), q.reject('error')]);

        aggregate.spread(function (result, error) {
            assert.equal(result.value, 'result');
            assert.equal(error.reason, 'error');
        }).done();
    });
});
