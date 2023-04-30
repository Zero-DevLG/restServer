
const { response } = require('express');

const userGet = (req,res = response)=>{

    const query = req.query;

    res.json({
        msg: 'GET API - controlador',
        query
    })
}

const userPost = (req, res = response)=>{

    const body = req.body;

    res.status(201).json({
        msg: 'POST API - controlador',
        body
    });
}

const userPut = (req, res = response)=>{

    const id = req.params.id;

    res.json({
        msg: 'PUT API - controlador',
        id
    });
}

const userDelete = (req, res = response)=>{
    res.json({
        msg: 'DELETE API - controlador'
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