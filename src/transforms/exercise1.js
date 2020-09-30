module.exports = function (file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .findVariableDeclarators("r")
    .renameTo("result")
    .toSource();
};
