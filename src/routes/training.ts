import { Router, Request, Response } from 'express';
const trainingRouter = Router();

trainingRouter.get('/', async (request: Request, response: Response) => {
    // TODO: GET ALL trainingS
});

trainingRouter.get('/{id}', async (request: Request, response: Response) => {
    // TODO: GET ONE training BY ID
});

trainingRouter.post('/', async (request: Request, response: Response) => {
    // TODO: CREATE A training BY ADMIN
});

trainingRouter.put('/{id}', async (request: Request, response: Response) => {
    // TODO: MODIFY A training
});

trainingRouter.delete('/{id}', async (request: Request, response: Response) => {
    // TODO: DELETE A training
});
