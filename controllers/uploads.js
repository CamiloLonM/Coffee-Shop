const path = require('path')  // metodo u objeto poder crear urls
const { v4: uuidv4 } = require('uuid')    // Identificadores unicos

const uploadFile = (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }
    const { file } = req.files
    const cutName = file.name.split('.')
    const extent = cutName[cutName.length - 1]              //Extension del archivo
    //valido extension
    const validExtensions = ['.png', '.jpg', '.jpeg', '.gif']
    if (validExtensions.includes(extent))
        return res.status(400).json({
            msg: `Extension ${extent} is not allowed, ${validExtensions}`
        })

    // Renombrar archivo y moverlo a ubicacion deseada
    const tempFileName = uuidv4() + '.' + extent
    const uploadPath = path.join(__dirname, '../uploads/', tempFileName)
    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.json({ msg: 'File uploaded to ' + uploadPath });
    });
}

module.exports = { uploadFile }