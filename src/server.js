import express from "express";
import fileupload from "express-fileupload";
import cors from "cors";
import path from "path";

import { router } from "./routes/indexRouter.js";

import { UPLOADS_DIR } from "../env.js";

export const server = express();

/* MIDDLEWARES */

//JSON
server.use(express.json());

//UPLOAD FILES
server.use(fileupload());

//RECURSOS ESTÁTICOS
const uploadsDir = path.join(process.cwd(), `src/${UPLOADS_DIR}`);
server.use("/uploads", express.static(uploadsDir));

//CORS
server.use(cors());

/* ROUTER */
server.use(router); // meto el indexRouter

/* ERRORS */

//ERROR 404
server.use((req, res, next) => {
    const resourcePath = req.path;
    const error = new Error(`No se encontró el recurso: ${resourcePath}`);
    error.httpStatus = 404;
    error.code = "RESOURCE_NOT_FOUND";
    next(error);
});

//GESTIÓN DE ERRORES
server.use((error, req, res, next) => {
    console.error(error);
    res.status(error.httpStatus || 500).send({
        httpStatus: error.httpStatus || 500,
        status: "ERROR!!!",
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message,
    });
});
