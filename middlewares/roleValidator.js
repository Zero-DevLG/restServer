const { request, response } = require("express");



const roleAdminValidator = ( req = request, res = response, next)=>{

    if( !req.user){
        return res.status(500).json({
            msg:   'Error al validar rol'
        });
    }

    const { role, name } = req.user;
    if(role != 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:   'El usuario no tiene permisos de administrador'
        });
    }

    next();
}

module.exports = {
    roleAdminValidator
}