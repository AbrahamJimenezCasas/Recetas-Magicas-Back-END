import joi from "joi";
import { joiErrorMessages } from "./joiErrorMessages.js";

export const loginUserSchema = joi.object({
    email: joi.string().email().required().messages(joiErrorMessages),
    password: joi.string().min(8).required().messages(joiErrorMessages),
});
