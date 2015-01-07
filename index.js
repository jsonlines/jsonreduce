var ldj = require('ldjson-stream')
var pumpify = require('pumpify')
var reduce = require('through2-reduce')

module.exports = function(func, memo) {
  var stream = createFunctionStream(func, memo)
  return pumpify.obj(ldj.parse(), stream)
}

function createFunctionStream(func, memo) {
  var compiled;

  try {
    memo = memo ? JSON.parse(memo) : {}
  } catch(err) {
    throw err
  }

  if (typeof func !== 'function') {
    var funcStr = func + ';\n return this;'
    if (func[0] === '{') funcStr = 'var that = ' + func + ';\n return that;'
    compiled = new Function('previous', 'current', funcStr)
  } else {
    compiled = function() {
      return func.apply(this, arguments)
        || this; // in case the function just mutates `this` w/o returning.
    };
  }

  return reduce({objectMode: true}, function(previous, current) {
    return compiled.call(previous, previous, current)
  }, memo)
}
