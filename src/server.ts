import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';
dotenv.config();

class Server {
    public app: any;
    private port: any;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.middlewares();
        this.routes();
    }

    private middlewares(): any {
        // Necesario antes de las rutas para parsear JSON
        this.app.use(express.json());
    }

    private routes(): any {
        this.app.use('/api/v1', routes);
    }

    public listen(): any {
        this.app.listen(this.port, () => {
            console.log(`Servidor TS corriendo en el puerto ${this.port}`);
        });
    }
}

export default Server;