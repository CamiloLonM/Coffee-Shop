
const { Category } = require('../models')

const createCategory = async (req, res) => {
    const name = req.body.name.toUpperCase()
    // Si la categoria existe
    const categoryDB = await Category.findOne({ name })
    if (categoryDB) {
        return res.status(400).json({ msg: `The category ${categoryDB.name} already exists` })
    }
    //Data a guardar
    const data = {
        name,
        user: req.user._id                  // como mongo esta grabando el ID
    }
    // crear categoria
    const category = await new Category(data)
    //Guardar en DB
    await category.save()

    res.status(201).json(category)

}

module.exports = {
    createCategory
}