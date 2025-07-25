import { Router, Request, Response } from 'express';
const userRouter = Router();

userRouter.get('/', async (request: Request, response: Response) => {
    // TODO: GET ALL USERS
});

userRouter.get('/{id}', async (request: Request, response: Response) => {
    // TODO: GET ONE USER BY ID
});

userRouter.post('/', async (request: Request, response: Response) => {
    // TODO: CREATE A USER BY ADMIN
});

userRouter.put('/{id}', async (request: Request, response: Response) => {
    // TODO: MODIFY A USER
});

userRouter.delete('/{id}', async (request: Request, response: Response) => {
    // TODO: DELETE A USER
});

userRouter.post('/signup', async (request: Request, response: Response) => {
    // TODO: SIGN UP A USER
});

userRouter.post('/signin', async (request: Request, response: Response) => {
    // TODO: LOGIN A USER
});
