const { model, Schema } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['ADMIN', 'USER', 'SELLER']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject()
    user.uid = _id                                  // cambio el id por uid
    return user
}

module.exports = model('User', UserSchema)