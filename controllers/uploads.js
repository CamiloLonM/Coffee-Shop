const path = require('path')
const fs = require('fs')            // file system  node
const { uploadFile } = require('../helpers')
const { User, Product } = require('../models')

const fileUpload = async (req, res) => {
    try {
        //Imagen
        /* const fullFile = await uploadFile(req.files)
        res.json({
            path: fullFile
        }) */
        //text,md
        //  const name = await uploadFile(req.files, ['txt', 'md'], 'text')   'Text' directoria que se crea en el upload - hay se cargan los archivos 

        //Subir el archivo
        const name = await uploadFile(req.files, undefined, 'imgs')
        res.json({ name })
    } catch (msg) {
        res.status(400).json({ msg })
    }
}

const imageUpdate = async (req, res) => {

    const { id, collection } = req.params
    let model

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `The user with that id ${id} does not exist`
                })
            }
            break;
        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `The product with that id ${id} does not exist`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Need to validate this' })
    }
    // Limpieza de carga imagenes
    if (model.image) {
        // Borrar la imagen del server
        const pathImage = path.join(__dirname, '../uploads', collection, model.image)
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage)
        }
    }

    const name = await uploadFile(req.files, undefined, collection)
    model.image = name

    await model.save()

    res.json(model)
}

module.exports = {
    fileUpload,
    imageUpdate
}