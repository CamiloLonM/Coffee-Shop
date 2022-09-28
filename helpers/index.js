const dbValidators = require('./db-validators')
const fileUpload = require('./file-Upload')
const googleVerify = require('./google-verify')
const jwt = require('./jwt')
const cloudinary = require('./cloudinary-config')


module.exports = {
    ...dbValidators,
    ...fileUpload,
    ...googleVerify,
    ...jwt,
    ...cloudinary
}