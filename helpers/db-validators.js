const Role = require('../models/role');
const User = require('../models/user');

const validateRole = async(role = '') => {
    const roleExist = await Role.findOne( { role } );
    if( !roleExist ){
        throw new Error(` El rol ${ role } no esta registrado en la base de datos `);
    } 
}


const emailValidator = async(email = '') =>{
      //check if email exist
   const emailExist = await User.findOne({ email });
   if( emailExist ){
       throw new Error( ` EL correo: ${ email }, ya esta registrado` );
   }
}


const mongoIdValidator = async(id)=>{
    const idExist = await User.findById(id);
    if( !idExist ){
        throw new Error(`El ID no existe: ${ id }`);
    }
}


module.exports = {
    validateRole,
    emailValidator,
    mongoIdValidator
}