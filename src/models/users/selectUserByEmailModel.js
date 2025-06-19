import { getPool } from "../../db/getPool.js";

export const selectUserByEmailModel = async (email) => {
    // Conectar con la base de datos
    const pool = await getPool();

    const [user] = await pool.query(`SELECT * FROM usuarios WHERE email = ?;`, [
        email,
    ]);

    // Como username es único, solo habrá un registro por lo que nos quedamos con la primera posición
    return user[0];
};
