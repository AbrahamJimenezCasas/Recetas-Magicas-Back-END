import { getPool } from "../../db/getPool.js";

export const selectUserByUsernameModel = async (username) => {
    // Conectar con la base de datos
    const pool = await getPool();

    const [user] = await pool.query(
        `SELECT * FROM usuarios WHERE username = ?;`,
        [username]
    );

    // Como username es único, solo habrá un registro por lo que nos quedamos con la primera posición
    return user[0];
};
