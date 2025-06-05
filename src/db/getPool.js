import mysql from "mysql2/promise";
import {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    MYSQL_PORT,
} from "../../env.js";
import { generateErrorUtils } from "../utils/helpersUtils.js";

let pool = null;

export const getPool = async () => {
    try {
        if (!pool) {
            // Crear un pool temporal sin depender de la DDBB
            const poolTemp = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                port: MYSQL_PORT || 3306,
            });

            // Crear la DDBB si no existe
            await poolTemp.query(
                `CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`
            );

            // Crear la conexión con la DDBB
            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                database: MYSQL_DATABASE,
                port: MYSQL_PORT || 3306,
                connectionLimit: 10,
                timezone: "Z",
            });
        }

        return pool;
    } catch (error) {
        console.error("Error al obtener el pool de conexiones");
        throw generateErrorUtils(
            400,
            "POOL_ERROR",
            "Error al obtener el pool de conexiones"
        );
    }
};
