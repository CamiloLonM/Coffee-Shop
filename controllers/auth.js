const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { generateJWT } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async (req, res) => {

    const { email, password } = req.body
    try {
        // email existente
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'Incorrect email' })
        }
        // Si el user esta activo
        if (!user.status) {      //user.status === false
            return res.status(400).json({ msg: 'Inactive user' })
        }
        //Verificar password
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({ msg: 'Incorrect password' })
        }
        //Generar JWT
        const token = await generateJWT(user.id)
        res.json({
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Contact administrator' })
    }
}

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;
    try {
        const { email, name, image } = await googleVerify(id_token)
        let user = await User.findOne({ email })
        if (!user) {
            //tengo que crearlo si no existe
            const data = {
                name,
                email,
                password: '@',
                image,
                google: true
            }
            user = new User(data)
            await user.save()
        }
        // Si el user esta inactivo en DB
        if (!user.status) {
            return res.status(401).json({ msg: 'Contact administrator' })
        }
        //Generar JWT
        const token = await generateJWT(user.id)
        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Invalid google token'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}