module.exports = function(previous, current) {
  var keys = Object.keys(current)
  var summary = previous.summary || []

  this.summary = summary.concat(keys.filter(function(key) {
    return summary.indexOf(key) === -1
  }))
}
