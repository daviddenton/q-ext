'use strict';

var q = require('q');
var qExt = require('../lib');

//Simply pass an object with named promises. The results are grouped by result (fulfilled/rejected) which can then be spread() into a node-like callback which gives you the errorsByName and resultsByName: '
qExt.allSettled({
    aSuccessfulPromise: q.resolve('result'),
    anotherSuccessfulPromise: q.resolve('anotherResult'),
    anUnsuccessfulPromise: q.reject('error'),
    anotherUnsuccessfulPromise: q.reject('anotherError')
}).spread(function (errorsByName, successesByName) {
    console.log('errors:', errorsByName);
    console.log('successes:', successesByName);
}).done();

//Passing an array of promises defers to the traditional form
qExt.allSettled([q.resolve('result'), q.reject('error')]).spread(function (success, error) {
    console.log('success:', success);
    console.log('error:', error);
}).done();