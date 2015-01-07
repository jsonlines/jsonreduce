var test = require('tape')
var exec = require('child_process').exec

process.chdir(__dirname)

test(function(t) {
  t.plan(1)
  exec('cat test.json | node ../cli.js \"this.count = (this.count || 0) + 1\"', function(err, output) {
    t.equal(output, '{"count":5}\n', '`this` is memo value')
  })
})

test(function(t) {
  t.plan(1)
  exec('cat test.json | node ../cli.js \"previous[current.breed] = (previous[current.breed] || 0) + 1\"', function(err, output) {
    t.equal(output, '{"pug":3,"brussels":2}\n', 'provides `previous` and `current` argument')
  })
})

test(function(t) {
  t.plan(1)
  exec('cat test.json | node ../cli.js --file=test-transform.js', function(err, output) {
    t.equal(output, '{"summary":["breed","name"]}\n', '--file cli parameter')
  })
})

test(function(t) {
  t.plan(1)
  exec('echo \'{"foo": "bar"}\n{"baz": "taco"}\' | node ../cli.js \'this.keys = this.keys.concat(Object.keys(current))\' --memo \'{"keys": []}\'', function(err, output) {
    t.equal(output, '{"keys":["foo","baz"]}\n', '--memo cli parameter')
  })
})
