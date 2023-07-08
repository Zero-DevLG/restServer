const mongoose = require('mongoose');


const dbConnection = async()=>{

    try {
        
        //Metodo para conectar a la base de datos
        await mongoose.connect( process.env.MONGODB_CNN, {
            // userNewUrlParser:   true, not support
            useUnifiedTopology: true,
            // useCreateIndex:     true, not support
            // useFindAndModify:   false not support
        });

        console.log('Base de datos conectada'.bgGreen);

    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexión a la base de datos');
    }

};




module.exports = {
    dbConnection
}