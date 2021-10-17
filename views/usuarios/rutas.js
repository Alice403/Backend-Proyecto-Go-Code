import Express from "express";
import { queryAllUsers, crearUsuario, editarUsuario, eliminarUsuario, consultarOCrearUsuario } from "../../controllers/usuarios/controller.js";
import {  getDB } from '../../db/db.js';

const rutasUsuarios = Express.Router();

const genericCallback = (res)=> (err,result)=>{
        if (err) {
            console.log(err);
            res.status(500).send('Error consultando los usuarios');
        } else {
            res.json(result);
        }
};

/*Cambio realizado 16 OCT 21*/ 

rutasUsuarios.route('/usuarios/self').get((req, res) => {
    console.log('alguien hizo get en la ruta /self');
    consultarOCrearUsuario(req, genericCallback(res));
    //queryAllUsers(genericCallback(res));
});

rutasUsuarios.route('/usuarios').get((req, res) => {
    console.log('alguien hizo get en la ruta /usuarios');
    queryAllUsers(genericCallback(res));
});

rutasUsuarios.route('/usuarios/registro').post((req, res) => {
    crearUsuario(req.body,genericCallback(res));
});

rutasUsuarios.route('/usuarios/editar').patch((req,res)=>{
    editarUsuario(req.body,genericCallback(res));
});


rutasUsuarios.route("/usuarios/eliminar").delete((req,res)=>{
   eliminarUsuario(req.body.id,genericCallback(res));
});

export default rutasUsuarios;