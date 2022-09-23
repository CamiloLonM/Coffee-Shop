const { Category } = require('../models');


const allCategories = async (req, res) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };
    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')           // Para mostrar el creador de la categoria
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        categories
    })
}

const idCategory = async (req, res) => {
    const { id } = req.params
    const category = await Category.findById(id)
        .populate('user', 'name')
    return res.json(category)

}

const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase()
    const categoryDB = await Category.findOne({ name })
    if (categoryDB) {
        return res.status(400).json({
            msg: `The category ${categoryDB.name}, ya existe`
        });
    }
    // Generar la data a guardar
    const data = {
        name,
        user: req.user._id          // Como estoy grabando el id en mongo
    }
    const category = new Category(data);
    // Guardar DB
    await category.save();
    res.status(201).json(category);
}

const updateCategory = async (req, res) => {
    const { id } = req.params
    const { status, user, ...data } = req.body

    data.name = data.name.toUpperCase()
    data.user = req.user._id
    const category = await Category.findByIdAndUpdate(id, data, { new: true })
    res.status(201).json(category)
}

const deleteCategory = async (req, res) => {
    const { id } = req.params
    const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true })
    res.json(category)

}



module.exports = {
    allCategories,
    createCategory,
    idCategory,
    updateCategory,
    deleteCategory
}

