const bcryptjs = require('bcryptjs')
const User = require('../models/user')


const userGet = async (req, res) => {
    const { limit = 5, since = 0 } = req.query
    const query = { status: true }
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(since))
            .limit(Number(limit))
    ])
    res.json({
        total,
        users
    })
}

const userPost = async (req, res) => {
    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })
    // Encriptar password
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)
    // Guardar en DB
    await user.save()
    res.json({
        user
    })
}

const userPut = async (req, res) => {
    const { id } = req.params
    const { _id, password, google, email, ...rest } = req.body
    if (password) {
        const salt = bcryptjs.genSaltSync()
        rest.password = bcryptjs.hashSync(password, salt)
    }
    const userDB = await User.findByIdAndUpdate(id, rest)
    res.json({
        userDB
    })
}

const userDelete = async (req, res) => {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, { status: false })
    res.json(user)
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}



