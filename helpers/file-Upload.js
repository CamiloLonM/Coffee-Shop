const path = require("path"); // metodo u objeto poder crear urls
const { v4: uuidv4 } = require("uuid"); // Identificadores unicos

const fileFormat = ["png", "jpg", "jpeg", "gif"];

const uploadFile = async (files, validExtensions = fileFormat, folder = "") => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const cutName = file.name.split(".");
    const extent = cutName[cutName.length - 1]; //Extension del archivo
    //valido extension
    if (!validExtensions.includes(extent)) {
      return reject(`Extension ${extent} is not allowed -- ${validExtensions}`);
    }
    // Renombrar archivo y moverlo a ubicacion deseada
    const tempFileName = uuidv4() + "." + extent;
    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      folder,
      tempFileName
    );

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(tempFileName);
    });
  });
};

module.exports = { uploadFile };
