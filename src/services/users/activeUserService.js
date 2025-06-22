import { updateActiveUserModel } from "../../models/users/updateActiveUserModel.js";
import { selectUserByRegistrationCodeModel } from "../../models/users/selectUserByRegistrationCodeModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const activeUserService = async (registrationCode) => {
    // Buscar si el usuario ya existe por registrationCode en la BD

    const usuario = await selectUserByRegistrationCodeModel(registrationCode);
    if (!usuario) {
        throw generateErrorUtils(400, "USER_NOT_FOUND", "El usuario no existe");
    }

    // si el usuario ya está activado lanzamos error para evitar activar dos veces al mismo usuario
    if (usuario.activado === 1) {
        throw generateErrorUtils(
            400,
            "USER_ALREADY_ACTIVE",
            "El usuario ya está activo"
        );
    }

    // Activar el usuario
    const result = await updateActiveUserModel(registrationCode);
    if (result.affectedRows !== 1) {
        throw generateErrorUtils(
            500,
            "ERROR_DB",
            "No se pudo activar el usuario"
        );
    }

    return { ...usuario, activado: 1 };
};
