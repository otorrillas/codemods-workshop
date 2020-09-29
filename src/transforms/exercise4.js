function removeProperty(node, name, j) {
  const newProperties = node.value.properties.filter(
    (p) => p.key.name !== name
  );

  if (newProperties.length === 0) {
    const nodeToRemove =
      node.value.type !== "ObjectPattern" ? node.parentPath : node;
    j(nodeToRemove).remove();
  } else {
    node.value.properties = newProperties;
  }
}

module.exports = function (file, api) {
  const j = api.jscodeshift;

  const root = j(file.source);

  let removeUnusedImport = false;

  // remove prop from defaultProps and propTypes
  // and remove assignments entirely if they end up empty
  root
    .find(j.ExpressionStatement)
    .find(j.AssignmentExpression)
    .find(j.ObjectExpression)
    .forEach((node) => {
      removeProperty(node, "badBoi", j);
    });

  // remove prop from the constructor params
  root
    .find(j.VariableDeclaration)
    .find(j.VariableDeclarator)
    .find(j.ArrowFunctionExpression)
    .find(j.ObjectPattern)
    .forEach((node) => {
      removeProperty(node, "badBoi", j);

      if (!node.parentPath.value.length) {
        removeUnusedImport = true;
      }
    });

  if (removeUnusedImport) {
    // if there are no properties, remove unused 'prop-types' import
    root
      .find(j.ImportDeclaration, {
        source: { value: "prop-types" },
      })
      .forEach((node) => j(node).remove());
  }

  return root.toSource({
    trailingComma: true,
    quote: 'single'
  })
};
