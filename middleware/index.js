
// referencia a todos los Middlewares personalizados

const validateJwt = require('../middleware/validate-Jwt')
const validateFields = require('../middleware/validate-fields')
const hasRole = require('../middleware/validateRoles')

module.exports = {
    ...validateJwt,
    ...validateFields,
    ...hasRole,

}