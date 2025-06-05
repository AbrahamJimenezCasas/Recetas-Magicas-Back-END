import express from "express";
import fileupload from "express-fileupload";
import path from "path";
import cors from "cors";
import sequelize from "./config/database.js";
import { PORT } from "../env.js";

export const server = express();

// Middlewares
server.use(cors());
server.use(express.json());

server.use(fileupload());

const uploadsDir = path.join(process.cwd(), `src/${UPLOADS_DIR}`);
server.use("/uploads", express.static(uploadsDir));

// Routes
server.use(router);

// Ruta de prueba
server.get("/", (req, res) => {
    res.json({ mensaje: "¡Servidor Recetario Compartido listo!" });
});

// 404 handler
server.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

server.use((req, res, next) => {
    const resourcePath = req.path;
    const error = new Error(`No se encontró el recurso: ${resourcePath}`);
    error.httpStatus = 404;
    error.code = "RESOURCE_NOT_FOUND";
    next(error);
});

server.use((error, req, res, next) => {
    console.error(error);
    res.status(error.httpStatus || 500).send({
        httpStatus: error.httpStatus || 500,
        status: "ERROR!!!",
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message,
    });
});

// Global error handler
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || "Error interno",
    });
});

// Conexión y sincronización a DB
(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión MySQL establecida");
        await sequelize.sync();
        console.log("🔄 Modelos sincronizados");

        // Arranca el servidor UNA VEZ sincronizada la BD
        server.listen(PORT, () => {
            console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error(
            "❌ Error al conectar o sincronizar la base de datos:",
            error
        );
    }
})();
