import express, { Application } from 'express';
import morgan from 'morgan';

import apiRoutes from './routes/apiRoutes';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.set('port', 3000)

        // Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api', apiRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server listening en on port ${this.app.get('port')}`)
        })
    }
}

const app = new App();
app.start();