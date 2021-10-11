import {  getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const queryAllUsers = (callback) =>{
    const baseDeDatos = getDB();
    baseDeDatos.collection('usuarios').find().limit(50).toArray(callback);
};

const crearUsuario = (datosUsuario,callback) => {
    if (
        Object.keys(datosUsuario).includes('nombre') &&
        Object.keys(datosUsuario).includes('apellido') &&
        Object.keys(datosUsuario).includes('estado') &&
        Object.keys(datosUsuario).includes('tipo')
    ) {
        const baseDeDatos = getDB();
        baseDeDatos.collection('usuarios').insertOne(datosUsuario, callback);
    } else {
        return "error";
    }
};

const editarUsuario = (edicion,callback)=>{
    const filtroUsuario = {_id: new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion = {
        $set: edicion,
    }
    const baseDeDatos = getDB();
    baseDeDatos.collection("usuarios").findOneAndUpdate(filtroUsuario,operacion,{upsert:true, returnOriginal: true}, callback)
}

const eliminarUsuario = (id,callback) => {
    const filtroUsuario = {_id: new ObjectId(id)};
    const baseDeDatos = getDB();
    baseDeDatos.collection("usuarios").deleteOne(filtroUsuario,callback);
};

export {queryAllUsers, crearUsuario,editarUsuario,eliminarUsuario};