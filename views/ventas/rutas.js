import Express from "express";
import { queryAllVentas, crearVenta, editarVenta, eliminarVenta } from "../../controllers/ventas/controller.js";
import {  getDB } from '../../db/db.js';

const rutasVentas = Express.Router();

const genericCallback = (res)=> (err,result)=>{
        if (err) {
            res.status(500).send('Error consultando las ventas');
        } else {
            res.json(result);
        }
};

rutasVentas.route('/ventas').get((req, res) => {
    console.log('alguien hizo get en la ruta /ventas');
    queryAllVentas(genericCallback(res));
});

rutasVentas.route('/ventas/nueva').post((req, res) => {
    crearVenta(req.body,genericCallback(res));
});

rutasVentas.route("/ventas/editar").patch((req,res)=>{
    editarVenta(req.body,genericCallback(res));
});



rutasVentas.route("/ventas/eliminar").delete((req,res)=>{
   eliminarVenta(req.body.id,genericCallback(res));
});

export default rutasVentas;