import { Router, Request, Response } from 'express';
import { login, signup } from '../controllers/auth';
const authRouter = Router();

authRouter.post('/signup', async (request: Request, response: Response) => {
    const body = request.body;
    if (!body || !body.email || !body.password) {
        return response.status(400).json({ message: 'Invalid request body' });
    }
    const result = await signup(body);
    if (result === false) {
        return response.status(400).json({ message: 'User creation failed' });
    }
    return response
        .status(201)
        .json({ message: 'User created successfully', token: result });
});

authRouter.post('/signin', async (request: Request, response: Response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        return response
            .status(400)
            .json({ message: 'Email and password are required' });
    }
    const user = await login(email, password);
    if (!user) {
        return response
            .status(401)
            .json({ message: 'Invalid email or password' });
    }
    return response
        .status(200)
        .json({ message: 'Login successful', token: user });
});

export default authRouter;
