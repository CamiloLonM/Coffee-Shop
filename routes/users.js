const { Router } = require('express')
const { check } = require('express-validator')

const { validateJwt,
    validateFields,
    hasRole,
    isRoleAdm } = require('../middleware')

const { validRole, existsEmail, existUserById } = require('../helpers/db-validators')

const { userGet,
    userPost,
    userPut,
    userDelete } = require('../controllers/users')


const router = Router()

router.get('/', userGet)

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must be greater than 6 characters').isLength({ min: 6 }),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(existsEmail),
    check('role').custom(validRole),
    validateFields
], userPost)

router.put('/:id', [
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(validRole),
    validateFields
], userPut)

router.delete('/:id', [
    validateJwt,
    //isRoleAdm,
    hasRole('ADMIN', 'USER'),               // Puede ser Admi o user
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], userDelete)


module.exports = router