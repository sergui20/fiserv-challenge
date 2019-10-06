import { Router, Request, Response } from 'express';

interface IDataResponse {
    firstName:  string;
    lastName: string;
    clientId: string;
    [key: string]: string;
}

class ApiRoutes {
    public router: Router;
    private newData: IDataResponse;
    private keys: string[];
    private value: string;

    constructor() {
        this.router = Router();
        this.routes();
        this.newData = {
            firstName: '',
            lastName: '',
            clientId: ''
        }
        this.keys = Object.keys(this.newData);
        this.value = '' 
    }

    routes() {
        this.router.post('/v1/parse', this.v1Parse);
        this.router.post('/v2/parse', this.v2Parse);
    }

    v1Parse = (req: Request, res: Response) => {
        const data = req.body.data;
        
        for(let i = 0, k = 0; i < data.length; i++) {
            if((data[i] === '0' && data[i+1] !== '0') || (i + 1 === data.length)) {
                this.value += data[i];
                this.newData[this.keys[k]] = this.value;
                this.value = '';
                k++
            } else {
                this.value += data[i];
            }
        }

        res.status(200).json({
            statusCode: 200,
            data: this.newData
        });
    }

    v2Parse = (req: Request, res: Response) => {
        const data = req.body.data;

        for(let i = 0, k = 0; i < data.length; i++) {
            if((data[i] !== '0' && data[i+1] === '0') || (i + 1 === data.length)) {
                this.value += data[i];
                this.newData[this.keys[k]] = this.value;
                this.value = '';
                k++
            } else if(data[i] !== '0') {
                this.value += data[i];

                // Parsing the clientId
                if (!isNaN(Number(this.value)) && this.value.length === 3) {
                    this.value += '-'
                }
            }
        }

        res.status(200).json({
            statusCode: 200,
            data: this.newData
        })
    }
}

const apiRoutes = new ApiRoutes();

export default apiRoutes.router;