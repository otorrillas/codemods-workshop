const { assignmentExpression } = require("jscodeshift")

module.exports = function(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
  .find(j.ExpressionStatement)
  .forEach(path => {
    if (path.value.expression.arguments.length < 2) {
      j(path).remove()
    }
  })
  .toSource();
}