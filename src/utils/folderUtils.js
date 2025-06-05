import fs from "fs/promises";

import { generateErrorUtils } from "./helpersUtils.js";

// Función para borrar directorios
export const deletePathUtil = async (path) => {
    try {
        // Comprobar si el directorio de uploads existe
        await fs.access(path);

        // Borrar el directorio de uploads y todo su contenido
        await fs.rm(path, { recursive: true });
        console.log(
            `Borrado correctamente el contenido y el directorio: ${path}`
        );
    } catch (error) {
        // Si el directorio no existe, fs.access() lanzará un error y lo capturamos aquí
        if (error.code === "ENOENT") {
            // El directorio no existe, no hacemos nada
            console.log("No existe el directorio: ", path);
        } else {
            throw generateErrorUtils(
                500,
                "DELETE_UPLOADS_PATH_ERROR",
                `No se ha podido eliminar el directorio: ${path}`
            );
        }
    }
};

// Función para crear directorios
export const createPathUtil = async (path) => {
    try {
        // Comprobar si el directorio de uploads existe
        await fs.access(path);

        console.log(`Ya existe el directorio: ${path}`);
    } catch (error) {
        // Si el directorio no existe, fs.access() lanzará un error y lo capturamos aquí
        if (error.code === "ENOENT") {
            // El directorio no existe, lo creamos
            await fs.mkdir(path, { recursive: true });
            console.log(`Se ha creado correctamente el directorio: ${path}`);
        } else {
            throw generateErrorUtils(
                500,
                "CREATE_UPLOADS_PATH_ERROR",
                `No se ha podido crear el directorio: ${path}`
            );
        }
    }
};
