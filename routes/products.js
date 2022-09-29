const { Router } = require("express");
const { check } = require("express-validator");
const {
  createProduct,
  allProducts,
  idProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const { existProductById } = require("../helpers/db-validators");
const { validateJwt, validateFields, isRoleAdm } = require("../middleware");

const router = Router();

router.get("/", allProducts);

router.get(
  "/:id",
  [
    check("id", "Not a valid mongo id").isMongoId(),
    check("id").custom(existProductById),
    validateFields,
  ],
  idProduct
);

router.post(
  "/",
  [
    validateJwt,
    check("name", "Name is required").not().isEmpty(),
    validateFields,
  ],
  createProduct
);

router.put(
  "/:id",
  [
    validateJwt,
    check("name", "Name is required").not().isEmpty(),
    check("id").custom(existProductById),
    validateFields,
  ],
  updateProduct
);

// Como admin
router.delete(
  "/:id",
  [
    validateJwt,
    isRoleAdm,
    check("id", "Is not a mongo id").isMongoId(),
    check("id").custom(existProductById),
  ],
  deleteProduct
);

module.exports = router;
