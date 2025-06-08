import express, { Router } from 'express';
import cors from 'cors';

interface Options {
    port: number;
    routes: Router;
}

export class Server {
    private app = express();

    private port: number;
    private routes:Router;

    constructor(options:Options) {
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    public start(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }

}

