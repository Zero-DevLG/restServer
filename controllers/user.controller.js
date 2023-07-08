
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


const userGet = async(req,res = response)=>{

    //Params

    const { limit = 5, init = 0 } = req.query;

    const query = {  state: true };

    // const query = req.query;

    // Dentro del find, podemos establecer condiciones para el retorno de documentos
    // Coleccion de promesas
    const [ totalDocument, documents ] = await Promise.all([
        User.countDocuments( query    ),
        User.find( query )
        .skip( Number(init) )
        .limit( Number(limit) )
    ]);


    res.json({
        msg: 'GET API - controlador',
        totalDocument,
        documents
    })
}

const userPost = async(req, res = response)=>{

    const { name, email, password, role } = req.body;
    const user = new User( { name, email, password, role } );

    //password encrypt
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password , salt );

    //Save on Database
    await user.save();


    res.status(201).json({
        user
    });
}

const userPut = async(req, res = response)=>{

    const id = req.params.id;
    const { password, google, email, ...data } = req.body;

    //Validar contra base de datos
    if( password ){
         //password encrypt
            const salt = bcryptjs.genSaltSync();
            data.password = bcryptjs.hashSync( password , salt );
    }

    const user = await User.findByIdAndUpdate(id, data);

    res.json({
        msg: 'PUT API - controlador',
        id,
        user
    });
}

const userDelete = async(req, res = response)=>{

    const { id } = req.params;
    const user = await User.findByIdAndUpdate( id, { state:false } );

    res.json({
        msg: 'DELETE API - controlador',
        user
    });
}


const userPatch = (req, res = response)=>{
    res.json({
        msg: 'PATCH API - controlador'
    });
}





module.exports = 
{
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete

}