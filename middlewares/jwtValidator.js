const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const validateJwt = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'empty token'
        });
    }


    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById( uid );

        //Verificar que el usuario existe
        if(!user){
            res.status(401).jsoon({
                msg:  'Token invalido'
            });
        }


        //Verificar que un usuario esta activo
        if(!user.state){
            res.status(401).jsoon({
                msg:  'Token invalido'
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token invalido'
        })
        
    }



}


module.exports = {
    validateJwt
}