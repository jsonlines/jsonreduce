# jsonreduce

streaming command line newline-delimited json reducing utility modeled after [jsonmap](https://www.npmjs.com/package/jsonmap)

[![build status](http://img.shields.io/travis/timhudson/jsonreduce.svg?style=flat)](http://travis-ci.org/timhudson/jsonreduce)

## installation

``` bash
$ npm install jsonreduce -g
```

## usage

`this` will be each line of JSON that gets parsed out of the incoming newline-delimited json stream. Two arguments will be provided, `previous` and `current`. `current` is the current line being parsed while `previous` is the memoized value (same as `this`).

```BASH
$ echo '{"foo": "bar"}\n{"baz": "taco"}' | jsonreduce 'this.keys = this.keys.concat(Object.keys(current))'' --memo '{"keys": []}'
{"keys":["foo","baz"]}
```

## License

MIT
