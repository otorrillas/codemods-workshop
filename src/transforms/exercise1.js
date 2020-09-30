module.exports = function(fileInfo, api) {
    const j = api.jscodeshift;

    return j(fileInfo.source)
        .findVariableDeclarators('r')
        .renameTo('result')
        .toSource();
}
