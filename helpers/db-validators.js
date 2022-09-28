const { MAX_ACCESS_BOUNDARY_RULES_COUNT } = require('google-auth-library/build/src/auth/downscopedclient')
const { Role, User, Category, Product } = require('../models')


const validRole = async (role = '') => {
    const roleExists = await Role.findOne({ role })
    if (!roleExists) {
        throw new Error(`Role ${role} is invalid in DB`)
    }
    return true
}

const existsEmail = async (email = '') => {
    //Verificar correo existente
    const emailExists = await User.findOne({ email })
    if (emailExists) {
        throw new Error(`This email ${email}, already registered`)
    }
    return true
}

const existUserById = async (id) => {
    const userById = await User.findById(id)
    if (!userById) {
        throw new Error(`User id ${id} not exist`)
    }
    return true
}

// Validadores Category 

const existCategoryByID = async (id) => {
    const categoryById = await Category.findById(id)
    if (!categoryById) {
        throw new Error(`Category id ${id} not exist`)
    }
    return true
}

// Validadores producto 
const existProductById = async (id) => {
    const productById = await Product.findById(id)
    if (!productById) {
        throw new Error(`Product id ${id} not exist`)
    }
    return true
}

// Colecciones Permitidas
const allowedCollection = async (collection = '', collections = []) => {
    const included = await collections.includes(collection)
    if (!included) {
        throw new Error(`Collection ${collection} is not allowed`)
    }
    return true
}


module.exports = {
    validRole,
    existsEmail,
    existUserById,
    existCategoryByID,
    existProductById,
    allowedCollection
}