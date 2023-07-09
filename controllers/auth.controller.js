const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async(req,res = response) =>{

    const { email, password } = req.body;

    try {        
        //Verificar que el email si existe en la BD
        const user = await User.findOne( { email } );
        if(!user){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            });
        }

        //Verificar si el usuario esta activo

        if(!user.state){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - state: false'
            });
        }
        //Verificar si el password es valido
        const validatePassword = bcryptjs.compareSync( password, user.password );
        if(!validatePassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }


        //Generar el JWT
        const token = await generateJWT( user.id );


        res.json({
            msg:   'Login OK',
            user,
            token
        })

        
    } catch (error) {
        return res.status(500).json({
            msg:    'Ocurrio un error en el servidor'
        })
    }


}

module.exports = {
    login
}