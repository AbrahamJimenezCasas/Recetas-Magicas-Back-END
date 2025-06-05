import "dotenv/config";

export const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    MYSQL_PORT,
    PORT,
    SECRET,
    SMTP_USER,
    SMTP_API_KEY,
    UPLOADS_DIR,
    FRONTEND_HOST,
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
    ADMIN_EMAIL,
} = process.env;
