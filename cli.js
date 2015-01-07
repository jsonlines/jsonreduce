#!/usr/bin/env node

var reduce = require('./')
var ldj = require('ldjson-stream')
var args = require('minimist')(process.argv.slice(2))
var path = require('path')

var memo = args.memo || args._[1]
var func = args._[0]
if (args.file) func = require(path.resolve(process.cwd(), args.file))

process.stdin
  .pipe(reduce(func, memo))
  .pipe(ldj.serialize())
  .pipe(process.stdout)
