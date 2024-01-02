const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.paths = {
            auth: '/api/auth',
            search: '/api/search',
            users: '/api/users',
            products: '/api/products',
            categories: '/api/categories',
        }


        // Conectar a base de datos
        this.connectDB();        

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Publico
        this.app.use( express.static('public') );
    }

    routes() {

        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.search, require('../routes/search') );
        this.app.use( this.paths.categories, require('../routes/categories') );
        this.app.use( this.paths.users, require('../routes/users') );
        this.app.use( this.paths.products, require('../routes/products') );

    }

    listen() {

        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        } );
    }
}


module.exports = Server;