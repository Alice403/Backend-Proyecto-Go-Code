import Express from 'express';
import { conectarBD } from './db/db.js';
import Cors from "cors";
import dotenv from "dotenv";
import rutasUsuarios from './views/usuarios/rutas.js';
import rutasVentas from './views/ventas/rutas.js';
import rutasProductos from './views/productos/rutas.js'
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

dotenv.config({path: "./.env"});

const port = process.env.PORT || 5000;

const app = Express();
app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://go-code.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'api-autenticacion-cuadernia',
  issuer: 'https://go-code.us.auth0.com/',
  algorithms: ['RS256']
});

// 4 y 5: enviarle el token a auth0 para que devuelva si es valido o no
app.use(jwtCheck);

app.use(rutasUsuarios);
app.use(rutasVentas);
app.use(rutasProductos);

const main = () => {
    return app.listen(port, () => {
        console.log(`Escuchando puerto ${port}`);
    });
}
conectarBD(main);