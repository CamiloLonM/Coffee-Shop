const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJwt = async (req, res, next) => {
    const token = req.header('Auth-token')          //leer el token para consumo de servicio
    if (!token) {
        return res.status(401).json({ msg: 'Token in request' })
    }
    //validación
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)  // Verifica el json wed token 
        // leer usuario correspondiente al uid
        const user = await User.findById(uid)
        //User no existe en DB
        if (!user) {
            return res.status(401).json({ msg: 'User does not exist in the db' })
        }
        // uid estado true
        if (!user.status) {
            return res.status(401).json({ msg: 'Disabled user - Invalid token' })
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: 'Invalid token' })
    }
}

module.exports = {
    validateJwt
}