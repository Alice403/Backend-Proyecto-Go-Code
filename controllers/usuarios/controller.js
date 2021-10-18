import {  getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';
import jwt_decode from 'jwt-decode';

const queryAllUsers = (callback) =>{
    const baseDeDatos = getDB();
    baseDeDatos.collection('usuarios').find().limit(50).toArray(callback);
};

const crearUsuario = (datosUsuario,callback) => {
        const baseDeDatos = getDB();
        baseDeDatos.collection('usuarios').insertOne(datosUsuario, callback);
};

/*Cambio realizado 16 OCT 21*/ 
const consultarOCrearUsuario = async( req, callback) =>{
// 6.1. Obtener los datos del usuario desde el token
    const token = req.headers.authorization.split("Bearer ")[1];

     const user = jwt_decode(token)['http://localhost/userData'];
     console.log(user);

// 6.2. con el correo del usuario o con el id  de auth0, verificar si el usuario ya estan en la bd o no
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuarios').findOne({email: user.email}, async (err, response)=>{
       
        
        console.log('Response consulta BD',response);

        if(response){
            // 7.1. Si el usuario ya esta en la BD, devuelve la info del usuario
            callback(err,response);

        }

        else {
            // 7.2.  si el usuario no esta en la bd, lo crea y devuelve la info
            user.auth0ID = user._id;
            delete user._id;
            user.tipo_usuario = "Inactivo";
            user.estado_usuario = "Pendiente";  
            user.nombre = user.given_name;  
            delete user.given_name;
            user.apellidos = user.family_name;
            delete user.family_name;
        await crearUsuario(user,(err, respuesta)=> callback(err, user));
        }
    });
};

const editarUsuario = (edicion,callback)=>{
    const filtroUsuario = {_id: new ObjectId(edicion._id)};
    delete edicion._id;
    const operacion = {
        $set: edicion,
    }
    const baseDeDatos = getDB();
    console.log("error");
    baseDeDatos.collection("usuarios").findOneAndUpdate(filtroUsuario,operacion,{upsert:true, returnOriginal: true}, callback);
}

const eliminarUsuario = (id,callback) => {
    const filtroUsuario = {_id: new ObjectId(id)};
    const baseDeDatos = getDB();
    baseDeDatos.collection("usuarios").deleteOne(filtroUsuario,callback);
};

export {queryAllUsers, crearUsuario,editarUsuario,eliminarUsuario,consultarOCrearUsuario};