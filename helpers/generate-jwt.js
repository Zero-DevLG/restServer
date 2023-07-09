const jwt = require('jsonwebtoken');


const generateJWT = ( uid = '' ) =>{
    return new Promise((resolve, reject)=>{
        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn:  '4h'
        }, (err, token) =>{

            if(err){
                console.log(err);
                reject('Error al generar JWT');
            }else{
                resolve( token );
                // console.log(uid);
                // console.log(token);
            }
        } )
    });
}


module.exports = {
    generateJWT
}