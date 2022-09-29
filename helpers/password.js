//  Encriptación de la contraseña
const bcryptjs = require("bcryptjs");

const encryptPassword = (password) => {
  const salt = bcryptjs.genSaltSync(); // Encripta
  return bcryptjs.hashSync(password, salt); // Devuelve encriptada
};

module.exports = { encryptPassword };
