import express from "express";

import { recetasRouter } from "./recetasRouter.js";
import { usuariosRouter } from "./usuariosRouter.js";

export const router = express.Router();

router.use(recetasRouter);
router.use(usuariosRouter);
