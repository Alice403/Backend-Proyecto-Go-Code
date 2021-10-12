import Express from 'express';
import { conectarBD } from './db/db.js';
import Cors from "cors";
import dotenv from "dotenv";
import rutasUsuarios from './views/usuarios/rutas.js';
import rutasVentas from './views/ventas/rutas.js';
import rutasProductos from './views/productos/rutas.js'

dotenv.config({path: "./.env"});

const app = Express();
app.use(Express.json());
app.use(Cors());
app.use(rutasUsuarios);
app.use(rutasVentas);
app.use(rutasProductos);

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
}
conectarBD(main);