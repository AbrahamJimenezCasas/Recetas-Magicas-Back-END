import brevo from "@getbrevo/brevo";

import { generateErrorUtils } from "./helpersUtils.js";
import { SMTP_API_KEY, SMTP_USER } from "../../env.js";

// función para enviar correos electrónicos

// crea un "objeto" que nos permitirá enviar correos usando la API de Brevo
const apiInstance = new brevo.TransactionalEmailsApi();

// configura la API con la clave secreta
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, SMTP_API_KEY);

// crea la función que permite enviar un email
// to: correo de destinatario
// subject: asunto del email
// text: contenido del email
export const sendEmailBrevoUtil = async (to, subject, text) => {
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail(); // ??
        sendSmtpEmail.subject = subject; // asigna el asunto
        sendSmtpEmail.to = [{ email: to }]; // define el destinatario

        sendSmtpEmail.htmlContent = text; // define el contenido
        sendSmtpEmail.sender = {
            // define quién envía el email
            name: "Equipo de Recetas Magicas",
            email: SMTP_USER,
        };
        await apiInstance.sendTransacEmail(sendSmtpEmail); // envía el email
        console.log(sendSmtpEmail);
    } catch (error) {
        throw generateErrorUtils(
            500,
            "SEND_EMAIL_ERROR",
            "Error al enviar el email"
        );
    }
};
