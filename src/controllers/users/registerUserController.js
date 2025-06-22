import { registerUserSchema } from "../../schemas/users/registerUserSchema.js";
import { registerUserService } from "../../services/users/registerUserService.js";

import { validateSchemaUtil } from "../../utils/validateSchemaUtils.js";

export const registerUserController = async (req, res, next) => {
    try {
        // Recoger datos del body
        const { username, nombre, apellidos, email, password } = req.body;

        // Validar si hay datos
        await validateSchemaUtil(registerUserSchema, req.body);

        const user = await registerUserService(
            username,
            nombre,
            apellidos,
            email,
            password
        );

        res.status(201).send({
            status: "ok",
            message: "Usuario registrado correctamente",
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};
