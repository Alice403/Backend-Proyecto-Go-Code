import {  getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const queryAllProductos = (callback) =>{
    const baseDeDatos = getDB();
    baseDeDatos.collection('productos').find().limit(50).toArray(callback);
};

const crearProducto = (datosProductos,callback) => {
    if (
        Object.keys(datosProductos).includes('descripcion_producto') &&
        Object.keys(datosProductos).includes('valor_unitario') &&
        Object.keys(datosProductos).includes('disponibilidad') 
    ) {
        const baseDeDatos = getDB();
        baseDeDatos.collection('productos').insertOne(datosProductos, callback);
    } else {
        return "error";
    }
};

const editarProducto = (edicion,callback)=>{
    const filtroProducto = {_id: new ObjectId(edicion._id)};
    delete edicion._id;
    const operacion = {
        $set: edicion,
    }
    const baseDeDatos = getDB();
    console.log("error");
    baseDeDatos.collection("productos").findOneAndUpdate(filtroProducto,operacion,{upsert:true, returnOriginal: true}, callback);
}

const eliminarProducto = (id,callback) => {
    const filtroProducto = {_id: new ObjectId(id)};
    const baseDeDatos = getDB();
    baseDeDatos.collection("productos").deleteOne(filtroProducto,callback);
};

export {queryAllProductos, crearProducto,editarProducto,eliminarProducto};