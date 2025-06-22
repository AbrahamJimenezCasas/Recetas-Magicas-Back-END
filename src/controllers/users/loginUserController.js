import { loginUserSchema } from "../../schemas/users/loginUserSchemas.js";
import { loginUserService } from "../../services/users/loginUserService.js";
import { validateSchemaUtil } from "../../utils/validateSchemaUtils.js";

export const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validar si hay datos
        await validateSchemaUtil(loginUserSchema, req.body);

        // Llamar al service que loguea al usuario.
        // Devuelve el token (que se genera en loginUserService)
        const token = await loginUserService(email, password);

        // Enviar respuesta
        res.status(200).send({
            status: "ok",
            message: "Inicio de sesión exitoso",
            data: { token },
        });
    } catch (error) {
        next(error);
    }
};
