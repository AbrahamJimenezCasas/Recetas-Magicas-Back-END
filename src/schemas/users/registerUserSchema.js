import joi from "joi";
import { joiErrorMessages } from "./joiErrorMessages.js";

export const registerUserSchema = joi.object({
    username: joi.string().min(5).required().messages(joiErrorMessages), // cadena con al menos 3 caracteres
    email: joi.string().email().required().messages(joiErrorMessages), // El debe ser un string válido (por ejemplo, algo@dominio.com)
    password: joi
        .string()
        .min(8)
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .required()
        .messages(joiErrorMessages),
    // La contraseña debe tener al menos 8 caracteres
});
