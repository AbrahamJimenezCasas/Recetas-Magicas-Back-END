import { getPool } from "../../db/getPool.js";

export const selectUserByRegistrationCodeModel = async (registrationCode) => {
    // Conectar con la base de datos
    const pool = await getPool();

    const [usuario] = await pool.query(
        `SELECT id, username, email FROM usuarios WHERE registrationCode = ?;`,
        [registrationCode]
    );

    return usuario[0];
};
