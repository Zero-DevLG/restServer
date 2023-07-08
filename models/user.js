//Modelo del usuario
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name:{
        type:       String,
        required:   [ true, 'El nombre es obligatorio']
    },
    email:{
        type:       String,
        required:   [ true, 'El correo electronico es requerido' ],
        unique:     true   
    },
    password:{
        type:       String,
        required:   [true,'La contraseña es obligatoria']
    },
    img:{
        type:       String
    },
    role:{
        type:       String,
        require:    true,
    },
    state:{
        type:       Boolean,
        default:    true
    },
    google:{
        type:       Boolean,
        default:    false
    }    
});


//Dentro del modelo podemos crear metodos para editar los datos del objeto

UserSchema.methods.toJSON = function(){
   const  { __v, password, ...user } = this.toObject();
   return user;
}

module.exports = model( 'User', UserSchema );