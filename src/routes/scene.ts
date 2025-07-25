import { Router, Request, Response } from 'express';
const sceneRouter = Router();

sceneRouter.get('/', async (request: Request, response: Response) => {
    // TODO: GET ALL sceneS
});

sceneRouter.get('/{id}', async (request: Request, response: Response) => {
    // TODO: GET ONE scene BY ID
});

sceneRouter.post('/', async (request: Request, response: Response) => {
    // TODO: CREATE A scene BY ADMIN
});

sceneRouter.put('/{id}', async (request: Request, response: Response) => {
    // TODO: MODIFY A scene
});

sceneRouter.delete('/{id}', async (request: Request, response: Response) => {
    // TODO: DELETE A scene
});
