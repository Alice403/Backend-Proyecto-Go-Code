import {  getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const queryAllVentas = (callback) =>{
    const baseDeDatos = getDB();
    baseDeDatos.collection('ventas').find().limit(50).toArray(callback);
};

const crearVenta = (datosVentas,callback) => {
    if (
        Object.keys(datosVentas).includes('cantidad') &&
        Object.keys(datosVentas).includes('valor_unitario') &&
        Object.keys(datosVentas).includes('valor_total') &&
        Object.keys(datosVentas).includes('fecha_venta') && 
        Object.keys(datosVentas).includes('id_cliente') && 
        Object.keys(datosVentas).includes('nombre_cliente') && 
        Object.keys(datosVentas).includes('vendedor') && 
        Object.keys(datosVentas).includes('estado_venta')  
    ) {
        const baseDeDatos = getDB();
        baseDeDatos.collection('ventas').insertOne(datosVentas, callback);
    } else {
        return "error";
    }
};

const editarVenta = (edicion,callback)=>{
    const filtroVentas = {_id: new ObjectId(edicion._id)};
    delete edicion._id;
    const operacion = {
        $set: edicion,
    }
    const baseDeDatos = getDB();
    baseDeDatos.collection("ventas").findOneAndUpdate(filtroVentas,operacion,{upsert:true, returnOriginal: true}, callback)
}

const eliminarVenta = (id,callback) => {
    const filtroVentas = {_id: new ObjectId(id)};
    const baseDeDatos = getDB();
    baseDeDatos.collection("ventas").deleteOne(filtroVentas,callback);
};

export {queryAllVentas, crearVenta,editarVenta,eliminarVenta};