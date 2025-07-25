import { Router, Request, Response } from 'express';
const rutineRouter = Router();

rutineRouter.get('/', async (request: Request, response: Response) => {
    // TODO: GET ALL rutineS
});

rutineRouter.get('/{id}', async (request: Request, response: Response) => {
    // TODO: GET ONE rutine BY ID
});

rutineRouter.post('/', async (request: Request, response: Response) => {
    // TODO: CREATE A rutine BY ADMIN
});

rutineRouter.put('/{id}', async (request: Request, response: Response) => {
    // TODO: MODIFY A rutine
});

rutineRouter.delete('/{id}', async (request: Request, response: Response) => {
    // TODO: DELETE A rutine
});
