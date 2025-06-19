import { getPool } from "../../db/getPool.js";

// Nos conectamos a la base de datos y guardamos el usuario

export const insertUserModel = async (user) => {
    const pool = await getPool();

    const {
        id,
        username,
        nombre,
        apellidos,
        email,
        password,
        registrationCode,
    } = user;

    // El primer elemento (result) contiene información sobre la consulta (como cuántas filas fueron afectadas).
    const [result] = await pool.query(
        `INSERT INTO usuarios (id, username, nombre, apellidos, email, password, registrationCode) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [id, username, nombre, apellidos, email, password, registrationCode]
    );

    return result;
};
