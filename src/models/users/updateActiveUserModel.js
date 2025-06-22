import { getPool } from "../../db/getPool.js";

export const updateActiveUserModel = async (registrationCode) => {
    // Conectar con la base de datos
    const pool = await getPool();

    // Actualizar el usuario
    const [result] = await pool.query(
        `UPDATE usuarios SET activado = 1 WHERE registrationCode = ?;`,
        [registrationCode]
    );

    return result;
};
