const { Router } = require('express')
const { check } = require('express-validator')
const { createCategory } = require('../controllers/categories')
const { validateJwt, validateFields } = require('../middleware')

const router = Router()

// Rutas publicas

router.get('/', (req, res) => {
    res.send({ msg: 'todo ok en categoria' })
    console.log('Ok!!!!!!')
})

router.get('/:id', (req, res) => {
    res.send({ msg: 'todo ok en categoria' })
    console.log('Ok!!!!!!')
})

// Privados- con token valido
router.post('/', [
    validateJwt,
    check('name', 'Name is required').not().isEmpty(),
    validateFields,
    createCategory])


router.put('/:id', (req, res) => {
    res.send({ msg: 'todo ok en categoria' })
    console.log('put!!!!!!')
})
// solo adminustrador y marcar por estado
router.delete('/', (req, res) => {
    res.send({ msg: 'todo ok en categoria' })
    console.log('Ok!!!!!!')
})

module.exports = router