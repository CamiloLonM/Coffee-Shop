// Manejamos la respuesta  cuando no hay un archivo a cargar

const validateFileUpload = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            msg: 'There is no file to upload.'
        })
    }
    next()
}

module.exports = {
    validateFileUpload
}