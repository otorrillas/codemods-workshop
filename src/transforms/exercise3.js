const DEPRECATED_PROPS = ['badBoi']
const DEFAULT_PROPS = 'defaultProps'
const PROP_TYPES = 'propTypes'
const ASSIGNMENTS = [DEFAULT_PROPS, PROP_TYPES]

function filterDeprecatedProperties(properties) {
    return properties.filter(property => {
        return DEPRECATED_PROPS.indexOf(property.key.name) === -1
    })
}

module.exports = function(file, api) {
    const j = api.jscodeshift
    const ast = j(file.source)
    const expressionsStatements = ast.find(j.ExpressionStatement)
    const arrowFunctionsDeclarations = ast.find(j.ArrowFunctionExpression)

    ASSIGNMENTS.forEach(name => {
        expressionsStatements.find(j.AssignmentExpression, {
            left: { property: { name } }
        })
            .find(j.ObjectExpression)
            .forEach(node => {
                node.value.properties = filterDeprecatedProperties(node.value.properties)

                if (node.value.properties.length === 0) {
                    j(node.parent).remove()

                    if (name === PROP_TYPES) {
                        ast.find(j.ImportDeclaration, { source: { value: 'prop-types' } }).remove()
                    }
                }
            })
    })

    /**
     * Removing deprecated props from destructured props.
     * This can potentially break the code if the prop is getting used into the component plus removing the argument
     * if there are no destructured props could mess up the order of the arguments.
     */
    arrowFunctionsDeclarations.forEach(node => {
        node.value.params.forEach(param => {
            if (param.type === 'ObjectPattern') {
                param.properties = filterDeprecatedProperties(param.properties)
            }
        })

        node.value.params = node.value.params.filter((param) => {
            return !(param.type === 'ObjectPattern' && param.properties.length === 0)
        })
    })

    return ast.toSource()
}

