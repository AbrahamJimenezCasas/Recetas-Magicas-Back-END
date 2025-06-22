import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { selectUserByEmailModel } from "../../models/users/selectUserByEmailModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";
import { SECRET } from "../../../env.js";

// verificamos si el usuario y la contraseña son correctos y, si todo está bien, generamos un token JWT para que el usuario pueda autenticarse.

export const loginUserService = async (email, password) => {
    // Buscar si el usuario ya existe por email
    const usuario = await selectUserByEmailModel(email);

    // false por si el usurio o la contraseña no existen o son incorrectas
    let checkPassword = false;

    // Comprobar si la contraseña es correcta
    // compara la contraseña ingresada (password) con la que está en la base de datos (user.password).
    if (usuario) {
        checkPassword = await bcrypt.compare(password, usuario.password);
    }

    if (!usuario || !checkPassword) {
        throw generateErrorUtils(
            400,
            "USER_NOT_FOUND",
            "El usuario o la contraseña no son correctos"
        );
    }

    // Comprobar si el usuario está activo
    if (!usuario.activado) {
        throw generateErrorUtils(
            400,
            "USER_NOT_ACTIVE",
            "El usuario no está activo. Revisa tu email"
        );
    }

    // Generar token
    // playload son los datos que queremos incluir dentro del token
    const payload = {
        id: usuario.id,
        rol: usuario.rol,
    };

    // jwt.sign se usa para genera el token
    const token = jwt.sign(payload, SECRET, {
        expiresIn: "2h",
    });

    return token;
};
