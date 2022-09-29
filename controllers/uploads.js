const path = require("path");
const fs = require("fs"); // file system  node

const { uploadFile, cloudinary } = require("../helpers");
const { User, Product } = require("../models");

const fileUpload = async (req, res) => {
  try {
    //text,md, image ...etc
    //  const name = await uploadFile(req.files, ['txt', 'md'], 'text')   'Text' directoria que se crea en el upload - hay se cargan los archivos

    //Subir el archivo
    const name = await uploadFile(req.files, undefined, "imgs");
    res.json({ name });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const imageUpdate = async (req, res) => {
  const { id, collection } = req.params;
  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The user with that id ${id} does not exist`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The product with that id ${id} does not exist`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Need to validate this" });
  }
  // Limpieza de carga imagenes
  if (model.image) {
    // Borrar la imagen del server
    const pathImage = path.join(
      __dirname,
      "../uploads",
      collection,
      model.image
    );
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }
  const name = await uploadFile(req.files, undefined, collection);
  model.image = name;
  await model.save();
  res.json(model);
};

const showImage = async (req, res) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The user with that id ${id} does not exist`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The product with that id ${id} does not exist`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Need to validate this" });
  }
  if (model.image) {
    const pathImage = path.join(
      __dirname,
      "../uploads",
      collection,
      model.image
    );
    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }
  const pathImagen = path.join(__dirname, "../assets/no-image.png");
  res.sendFile(pathImagen);
};

const imageUpdateCloudinary = async (req, res) => {
  const { id, collection } = req.params;
  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The user with that id ${id} does not exist`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The product with that id ${id} does not exist`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Need to validate this" });
  }
  // Limpieza de carga imagenes
  if (model.image) {
    const nameArr = model.image.split("/");
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split(".");
    cloudinary.uploader.destroy(public_id); // Borrado de cloudinary
  }

  // Carga Cloudinary
  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  model.image = secure_url;

  await model.save();

  res.json(model);
};

module.exports = {
  fileUpload,
  imageUpdate,
  showImage,
  imageUpdateCloudinary,
};
