const { Router } = require('express')
const { check } = require('express-validator')
const { uploadFile } = require('../controllers/uploads')

const { validateFields } = require('../middleware/validate-fields')

const router = Router()


router.post('/', uploadFile)


module.exports = router