import path from "path";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { getPool } from "./getPool.js";
import {
    MYSQL_DATABASE,
    UPLOADS_DIR,
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
    ADMIN_EMAIL,
} from "../../env.js";
import { createPathUtil, deletePathUtil } from "../utils/foldersUtils.js";

export const initDb = async () => {
    try {
        const pool = await getPool();

        // Poner la DDBB en uso
        console.log("Poniendo en uso la base de datos 📑");
        await pool.query(`USE ${MYSQL_DATABASE}`);
        console.log("Base de datos en uso ✅ 📑");

        // Borrar las tablas si existen
        console.log("Borrando tablas existentes 🗑 📑");
        await pool.query(
            "DROP TABLE IF EXISTS valoraciones, fotos, recetas, usuarios"
        );
        console.log("Tablas borradas ✅ 📑");

        // Crear las tablas
        console.log("Creando tablas de nuevo 📑");
        // Crear la tabla usuarios
        await pool.query(`
            CREATE TABLE usuarios (
                id CHAR(36) PRIMARY KEY NOT NULL,
                username VARCHAR(50) UNIQUE NOT NULL,
                nombre VARCHAR(50) DEFAULT NULL,
                apellidos VARCHAR(50) DEFAULT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password CHAR(60) NOT NULL,
                telefono VARCHAR(15) UNIQUE DEFAULT NULL,
                avatar CHAR(40) DEFAULT NULL,
                biografia VARCHAR(256) DEFAULT NULL,
                activado BOOLEAN DEFAULT FALSE,
                rol ENUM('admin', 'user') DEFAULT 'user',
                registrationCode CHAR(15) DEFAULT NULL,
                recoveryPassCode CHAR(15) DEFAULT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        // Crear la tabla articulos
        await pool.query(`
            CREATE TABLE recetas (
                id CHAR(36) PRIMARY KEY NOT NULL,
                nombre VARCHAR(50) NOT NULL,
                categoria ENUM('postres', 'bebidas', 'entrantes', 'principales',) DEFAULT 'principales',
                localidad VARCHAR(50) NOT NULL,                descripcion TEXT NOT NULL,
                cocineroId CHAR(36) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (cocineroId) REFERENCES usuarios(id) ON DELETE CASCADE
            );
        `);

        // Crear la tabla fotos
        await pool.query(`
            CREATE TABLE fotos (
                id CHAR(36) PRIMARY KEY NOT NULL,
                foto CHAR(40) NOT NULL,
                recetaId CHAR(36) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (recetaId) REFERENCES recetas(id) ON DELETE CASCADE
            );
        `);

        // Crear la tabal valoraciones
        await pool.query(`
            CREATE TABLE valoraciones (
                id CHAR(36) PRIMARY KEY NOT NULL,
                valoracion TINYINT UNSIGNED NOT NULL,
                comentario VARCHAR(256) DEFAULT NULL,
                viewerId CHAR(36) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (viewerId) REFERENCES usuarios(id) ON DELETE CASCADE,
                UNIQUE(viewerId,),
                CHECK (valoracion>= 1 AND valoracion<=5)
            );
        `);

        console.log("Tablas creadas");

        // Añadir usuario administrador usando datos .env
        const id = crypto.randomUUID();
        const password = await bcrypt.hash(ADMIN_PASSWORD, 10);

        await pool.query(
            `INSERT INTO usuarios (id, username, email, password, activado, rol) VALUES (?, ?, ?, ?, ?, ?);`,
            [id, ADMIN_USERNAME, ADMIN_EMAIL, password, true, "admin"]
        );

        console.log("Usuario administrador creado");

        // Directorio de subidas
        const uploadsDir = path.join(process.cwd(), `src/${UPLOADS_DIR}`);
        // Borramos el directorio uploads y todo su contenido
        console.log("Borrando directorio de subida");
        await deletePathUtil(uploadsDir);
        console.log("Directorio de subida borrado");

        // Crear el directorio uploads y sus subdirectorios users y tweets
        console.log("Creando directorios de subida");
        await createPathUtil(uploadsDir);
        const avatarsDir = path.join(uploadsDir, "avatars");
        await createPathUtil(avatarsDir);
        const articulosDir = path.join(uploadsDir, "articulos");
        await createPathUtil(recetasDir);
        console.log("Directorios de subida creados");

        console.log("Todo ha ido bien");

        process.exit(0);
    } catch (error) {
        console.error("Error al inicializar la base de datos", error);
        process.exit(1);
    }
};

initDb();
