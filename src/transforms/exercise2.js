module.exports = function transformer(file, api) {
    const j = api.jscodeshift
    const ast = j(file.source)

    ast.find(j.CallExpression, {
        callee: {
            object: {
                name: 'console'
            },
            property: {
                name: 'log'
            }
        }
    }).forEach(path => {
        if (path.value.arguments.length === 1) {
            j(path).remove()
        }
    })

    return ast.toSource()
}
