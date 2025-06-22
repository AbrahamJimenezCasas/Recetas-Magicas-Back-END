import express from "express";

import { activeUserController } from "../controllers/users/activeUserController.js";
import { loginUserController } from "../controllers/users/loginUserController.js";
import { registerUserController } from "../controllers/users/registerUserController.js";
export const usuariosRouter = express.Router();

usuariosRouter.post("/usuarios/register", registerUserController);

usuariosRouter.put(
    "/usuarios/activate/:registrationCode",
    activeUserController
);
usuariosRouter.post("/usuarios/login", loginUserController);
