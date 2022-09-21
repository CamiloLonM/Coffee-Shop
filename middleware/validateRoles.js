const { removeAllListeners } = require("../models/role")
const role = require("../models/role")

const isRoleAdm = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({ msg: 'the role is verified without validating token' })
    }
    const { role, name } = req.user
    if (role !== 'ADMIN') {
        return res.status(401).json({ msg: `${name} is not admin - Request denied` })
    }

    next()
}
// Tiene Rol
const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({ msg: 'The role is verified without validating token' })
        }
        if (roles.includes(req.user.role)) {
            return res.status(401).json({ msg: `The service requires one of these roles: ${roles}` })
        }
        next()
    }
}

module.exports = {
    isRoleAdm,
    hasRole
}