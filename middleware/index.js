// referencia a todos los Middlewares personalizados

const validateJwt = require("../middleware/validate-Jwt");
const validateFields = require("../middleware/validate-fields");
const hasRole = require("../middleware/validateRoles");
const validateFiles = require("./validate-files");

module.exports = {
  ...validateJwt,
  ...validateFields,
  ...hasRole,
  ...validateFiles,
};
