module.exports = function(file, api) {
  const j = api.jscodeshift;

  let res = j(file.source)
  .find(j.ImportDeclaration, { specifiers: [ { local: { name: 'PropTypes' } }] })
  .forEach((path, index) => {
    j(path).remove()
  })
  .toSource();
  res = j(res)
  .find(j.ExpressionStatement).forEach(p => j(p).remove())
  .toSource();
  res = j(res)
  .find(j.ArrowFunctionExpression)
  .find(j.ObjectPattern, { properties: [{ value: { name: 'badBoi' } }] })
  .forEach(p => j(p).remove())
  .toSource();
  return res
}