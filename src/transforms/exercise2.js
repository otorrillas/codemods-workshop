module.exports = function (file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.CallExpression, {
      callee: {
        type: "MemberExpression",
        object: { type: "Identifier", name: "console" },
      },
    })
    .forEach((node) => {
      if (node.value.arguments.length === 1) {
        j(node).remove();
      }
    })
    .toSource();
};
