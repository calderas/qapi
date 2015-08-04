# qapi [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url] [![Build Status][circleci-image]][circleci-url]
>


## Install

```sh
$ npm install --save qapi
```


## Usage

```js
var qApi = require('qapi');
var cb = function(error, response, body) {
  console.log(body);
};

qApi.init(config)
qApi.stats(cb);
qApi.top(cb);
qApi.relegation(cb);
qApi.strikers(cb);
qAPI.fairPlay(cb);
qAPI.defense(cb);
qAPI.offense(cb);
qAPI.results(cb);

```

## Dev
* git clone
* npm install
* gulp

## License

ISC © [ec]()


[npm-image]: https://badge.fury.io/js/qapi.svg
[npm-url]: https://npmjs.org/package/qapi
[travis-image]: https://travis-ci.org/calderas/qapi.svg?branch=master
[travis-url]: https://travis-ci.org/calderas/qapi
[daviddm-image]: https://david-dm.org/calderas/qapi.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/calderas/qapi
[coveralls-image]: https://coveralls.io/repos/calderas/qapi/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/r/calderas/qapi
[circleci-image]: https://circleci.com/gh/calderas/qapi.svg?&style=shield&circle-token=5f1f746b5735e6bf01b00ff8f55b2dc0c1eb4352
[circleci-url]: https://circleci.com/gh/calderas/qapi
