const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileUpload");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.pathsRoutes = {
      auth: "/api/auth",
      search: "/api/search",
      categories: "/api/categories",
      products: "/api/products",
      users: "/api/users",
      uploads: "/api/uploads",
    };

    //Connect DB
    this.connectDB();
    //Middlewares
    this.middlewares();
    //Routes App
    this.routes();
  }

  //Call Connect DB
  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    //Cors
    this.app.use(cors());
    // Parseo y lectura del body
    this.app.use(express.json());
    //Directorio public
    this.app.use(express.static("public"));

    //FileUpload -Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true, // Forza creación de la carpeta
      })
    );
  }

  routes() {
    this.app.use(this.pathsRoutes.auth, require("../routes/auth"));
    this.app.use(this.pathsRoutes.search, require("../routes/searches"));
    this.app.use(this.pathsRoutes.categories, require("../routes/categories"));
    this.app.use(this.pathsRoutes.products, require("../routes/products"));
    this.app.use(this.pathsRoutes.users, require("../routes/users"));
    this.app.use(this.pathsRoutes.uploads, require("../routes/uploads"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port`, this.port);
    });
  }
}

module.exports = Server;
