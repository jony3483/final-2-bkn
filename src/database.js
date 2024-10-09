import mongoose from "mongoose";
import config from './config/config.js';

mongoose.connect(config.mongodbUri)
    .then(() => console.log("Conexión  a la Base de Datos!!"))
    .catch((error) => console.log(" ha ocurrido un error", error));


