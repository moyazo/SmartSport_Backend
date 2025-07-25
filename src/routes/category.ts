import { Router, Request, Response } from 'express';
const categoryRouter = Router();

categoryRouter.get('/', async (request: Request, response: Response) => {
    // TODO: GET ALL categoryS
});

categoryRouter.get('/{id}', async (request: Request, response: Response) => {
    // TODO: GET ONE category BY ID
});

categoryRouter.post('/', async (request: Request, response: Response) => {
    // TODO: CREATE A category BY ADMIN
});

categoryRouter.put('/{id}', async (request: Request, response: Response) => {
    // TODO: MODIFY A category
});

categoryRouter.delete('/{id}', async (request: Request, response: Response) => {
    // TODO: DELETE A category
});
