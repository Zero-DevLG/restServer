require('colors');
const express = require('express');
const cors = require('cors');

class Server
{
    constructor()
    {
        this.app = express();
        this.port = process.env.PORT;
        this.userRoutePath = '/api/users';

        //CORS
        this.app.use( cors() );

        //Middlewares
        this.middlewares();+

        //READ / PARSE POST INFO
        this.app.use( express.json() );

        //Rutas de la aplicacion
        this.routes();
    }

    middlewares()
    {
        //Directorio Publico
        this.app.use( express.static('public') );
    }

    routes()
    {
        //(path, file routes)
        this.app.use(this.userRoutePath, require('../routes/user.routes'));
    }

    listenInfo()
    {
        
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto: ${ this.port } `.bgBlue);
        });
    }


}



module.exports = Server;