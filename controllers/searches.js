const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");

// Colecciones permitidas
const allowedCollections = ["categories", "products", "role", "users"];

// Busquedas insencible (Callous search)

const searchCategory = async (term = "", res) => {
  const isMongoID = ObjectId.isValid(term);
  if (isMongoID) {
    const category = await Category.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }
  const regex = new RegExp(term, "i");
  const categories = await Category.find({ name: regex, status: true });
  res.json({
    results: categories,
  });
};

const searchProducts = async (term = "", res) => {
  const isMongoID = ObjectId.isValid(term);
  if (isMongoID) {
    const product = await Product.findById(term)
      .populate("category", "name")
      .populate("user", "name");
    return res.json({
      results: product ? [product] : [],
    });
  }
  const regex = new RegExp(term, "i");
  const products = await Product.find({
    $or: [{ name: regex }, { status: true }],
    $and: [{ availability: true }],
  });
  res.json({ results: products });
};

const searchUsers = async (term = "", res) => {
  const isMongoID = ObjectId.isValid(term); // True
  if (isMongoID) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [], // respuesta en resultado si el user existe si no arreglo vacio
    });
  }
  //Busqueda insensible
  const regex = new RegExp(term, "i");
  //Busqueda insensible por correo o nombre  y status
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }], // Or de mongose [{Condiciones}]
    $and: [{ status: true }],
  });
  res.json({
    results: users,
  });
};

const search = (req, res) => {
  const { collection, term } = req.params;
  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `The allowed collections are: ${allowedCollections}`,
    });
  }
  switch (collection) {
    case "categories":
      searchCategory(term, res);
      break;
    case "products":
      searchProducts(term, res);
      break;
    case "users":
      searchUsers(term, res);
      break;

    default:
      res.status(500).json({ msg: "You forgot to perform this search" });
  }
};

module.exports = { search };
