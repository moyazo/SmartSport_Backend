import { Router, Request, Response } from 'express';
const dietRouter = Router();

dietRouter.get('/', async (request: Request, response: Response) => {
    // TODO: GET ALL dietS
});

dietRouter.get('/{id}', async (request: Request, response: Response) => {
    // TODO: GET ONE diet BY ID
});

dietRouter.post('/', async (request: Request, response: Response) => {
    // TODO: CREATE A diet BY ADMIN
});

dietRouter.put('/{id}', async (request: Request, response: Response) => {
    // TODO: MODIFY A diet
});

dietRouter.delete('/{id}', async (request: Request, response: Response) => {
    // TODO: DELETE A diet
});
