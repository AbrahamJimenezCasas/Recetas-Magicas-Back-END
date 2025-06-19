import express from "express";
import { registerUserController } from "../controllers/users/registerUserController .js";

export const usuariosRouter = express.Router();

usuariosRouter.post("/usuarios/register", registerUserController);
