import { Router, Request, Response } from 'express';
const subcategoryRouter = Router();

subcategoryRouter.get('/', async (request: Request, response: Response) => {
    // TODO: GET ALL subcategoryS
});

subcategoryRouter.get('/{id}', async (request: Request, response: Response) => {
    // TODO: GET ONE subcategory BY ID
});

subcategoryRouter.post('/', async (request: Request, response: Response) => {
    // TODO: CREATE A subcategory BY ADMIN
});

subcategoryRouter.put('/{id}', async (request: Request, response: Response) => {
    // TODO: MODIFY A subcategory
});

subcategoryRouter.delete(
    '/{id}',
    async (request: Request, response: Response) => {
        // TODO: DELETE A subcategory
    }
);
