const { Router } = require("express");
const { search } = require("../controllers/searches");

const router = Router();

//colección(el producto) / termino de busqueda
router.get("/:collection/:term", search);

module.exports = router;
