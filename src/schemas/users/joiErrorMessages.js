export const joiErrorMessages = {
    "any.required": 'El campo "{#key}" es obligatorio',
    "string.base": 'El valor de "{#key}" debe ser un texto',
    "string.empty": 'El campo "{#key}" no puede estar vacío',
    "number.base": '"{#key}" debe ser un número válido',
    "number.max": "El archivo no puede superar los 5 MB",
    "number.min": "El archivo debe tener al menos 1 byte",
    "object.base": '"{#key}" debe ser un objeto válido',
    "any.only": 'En "{#key}" solo se permiten imágenes en formato JPEF o PNG',
    "string.email":
        'Por favor, ingresa un correo electrónico válido en "{#key}"',
    "string.pattern.base":
        "La contraseña debe incluir mayúsculas, minúsculas, un número y un caracter especial",
    "string.min": 'El campo "{#key}" debe tener al menos {#limit} caracteres',
    "string.max": 'El campo "{#key}" no debe exceder los {#limit} caracteres',
    "object.unknown": "No se permiten campos adicionales",
};
