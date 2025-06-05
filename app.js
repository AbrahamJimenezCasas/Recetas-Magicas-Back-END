// app.js (arranca el servidor)
import server from "./src/server.js";
import { PORT } from "./env.js";

const puerto = PORT;
server.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto: ${puerto}`);
});
