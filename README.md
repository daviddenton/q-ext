#q-ext
[![NPM version](https://badge.fury.io/js/q-ext.svg)](http://badge.fury.io/js/q-ext)
[![Build Status](https://travis-ci.org/daviddenton/q-ext.png?branch=master)](https://travis-ci.org/daviddenton/q-ext)
[![Coverage Status](https://coveralls.io/repos/daviddenton/q-ext/badge.png)](https://coveralls.io/r/daviddenton/q-ext)
[![Dependency Status](https://david-dm.org/daviddenton/q-ext.png)](https://david-dm.org/daviddenton/q-ext)
[![devDependency Status](https://david-dm.org/daviddenton/q-ext/dev-status.png)](https://david-dm.org/daviddenton/q-ext#info=devDependencies)

###What
Methods to extend the Q promise library.

###Installation
Via npm, simply run: ```npm install q-ext```

###Usage

####allSettled(namedPromiseObject) -> Promise
Simply pass an object with named promises. The results are grouped by result (fulfilled/rejected) which can then
be spread() into a node-like callback which gives you the errorsByName and resultsByName. NOTE: Unlike traditional 
node callbacks, the errorsByName object is NEVER undefined (instead being an empty object):
```javascript
qExt.allSettled({
    aSuccessfulPromise: q.resolve('result'),
    anotherSuccessfulPromise: q.resolve('anotherResult'),
    anUnsuccessfulPromise: q.reject('error'),
    anotherUnsuccessfulPromise: q.reject('anotherError')
}).spread(function (errorsByName, successesByName) {
    console.log('errors:', errorsByName);
    console.log('successes:', successesByName);
}).done();
```

Passing an array of promises defers to the traditional form:
```javascript
qExt.allSettled([q.resolve('result'), q.reject('error')]).spread(function (success, error) {
    console.log('success:', success);
    console.log('error:', error);
}).done();
```