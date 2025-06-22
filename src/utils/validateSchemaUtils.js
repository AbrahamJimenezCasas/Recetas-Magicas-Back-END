import { generateErrorUtils } from "./helpersUtils.js";

export const validateSchemaUtil = async (schema, data) => {
    try {
        await schema.validateAsync(data, {
            abortEarly: false,
            allowUnknown: false,
            stripUnknown: true,
        });
    } catch (error) {
        throw generateErrorUtils(400, "INVALID_DATA", error.message);
    }
};
