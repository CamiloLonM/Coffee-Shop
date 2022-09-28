const { Router } = require('express');
const { check } = require('express-validator');
const { fileUpload, imageUpdate } = require('../controllers/uploads');
const { allowedCollection } = require('../helpers');
const { validateFields, validateFileUpload } = require('../middleware');

const router = Router();

// Cargar imagenes
router.post('/', validateFileUpload, fileUpload);
// Actualizar imagenes de user y producto
router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'Not a valid mongo id').isMongoId(),
    check('collection').custom(coll => allowedCollection(coll, ['users', 'products'])),
    validateFields
], imageUpdate)




module.exports = router