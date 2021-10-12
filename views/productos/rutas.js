import Express from "express";
import { queryAllProductos, crearProducto, editarProducto, eliminarProducto } from "../../controllers/productos/controller.js";
import {  getDB } from '../../db/db.js';

const rutasProductos = Express.Router();

const genericCallback = (res)=> (err,result)=>{
        if (err) {
            console.log(err);
            res.status(500).send('Error consultando los productos');
        } else {
            res.json(result);
        }
};

rutasProductos.route('/productos').get((req, res) => {
    console.log('alguien hizo get en la ruta /productos');
    queryAllProductos(genericCallback(res));
});

rutasProductos.route('/productos/nuevo').post((req, res) => {
    crearProducto(req.body,genericCallback(res));
});

rutasProductos.route('/productos/editar').patch((req,res)=>{
    editarProducto(req.body,genericCallback(res));
});


rutasProductos.route("/productos/eliminar").delete((req,res)=>{
   eliminarProducto(req.body.id,genericCallback(res));
});

export default rutasProductos;