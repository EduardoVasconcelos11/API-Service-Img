import { Router } from 'express';
import { uploadController } from './controllers/uploadController';
import { confirmController } from './controllers/confirmController';
import { listController } from './controllers/listController';
import { send } from 'process';

export const routes = Router();

routes.post('/upload', uploadController);
routes.patch('/confirm', confirmController);
routes.get('/:customer_code/list', listController);
routes.get('/test', (req, res) => {
    return res.send('Hello, this is your messagess1233!');
});
