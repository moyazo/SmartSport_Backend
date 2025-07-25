import { Router, Request, Response } from 'express';
const goalRouter = Router();

goalRouter.get('/', async (request: Request, response: Response) => {
    // TODO: GET ALL goalS
});

goalRouter.get('/{id}', async (request: Request, response: Response) => {
    // TODO: GET ONE goal BY ID
});

goalRouter.post('/', async (request: Request, response: Response) => {
    // TODO: CREATE A goal BY ADMIN
});

goalRouter.put('/{id}', async (request: Request, response: Response) => {
    // TODO: MODIFY A goal
});

goalRouter.delete('/{id}', async (request: Request, response: Response) => {
    // TODO: DELETE A goal
});
