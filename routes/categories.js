const { Router } = require("express");
const { check } = require("express-validator");
const {
  allCategories,
  createCategory,
  idCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

const { validateJwt, validateFields, isRoleAdm } = require("../middleware");
const { existCategoryByID } = require("../helpers/db-validators");

const router = Router();

// Rutas publicas

router.get("/", allCategories);

router.get(
  "/:id",
  [
    check("id", "Not a valid mongo id").isMongoId(),
    check("id").custom(existCategoryByID),
    validateFields,
  ],
  idCategory
);

// Privados- con token valido
router.post("/", [
  validateJwt,
  check("name", "Name is required").not().isEmpty(),
  validateFields,
  createCategory,
]);

router.put(
  "/:id",
  [
    validateJwt,
    check("name", "Name is required").not().isEmpty(),
    check("id", "Is not a mongo id").isMongoId(),
    check("id").custom(existCategoryByID),
    validateFields,
  ],
  updateCategory
);

// solo administrador y marcar por estado
router.delete(
  "/:id",
  [
    validateJwt,
    isRoleAdm,
    check("id", "Is not a mongo id").isMongoId(),
    check("id").custom(existCategoryByID),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
