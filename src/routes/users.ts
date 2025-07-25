import { Router, Request, Response } from 'express';
import { createUser, getAll, getById, modifyUser, removeUser } from '../controllers/users';
const userRouter = Router();

userRouter.get('/', async (request: Request, response: Response) => {
    try {
        const users = await getAll();
        if (!users) {
            return response.status(404).json({ message: 'No users found' });
        }
        return response.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

userRouter.get('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const user = await getById(id);
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }
        return response.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

userRouter.post('/', async (request: Request, response: Response) => {
    const body = request.body;
    try {
        const created = await createUser(body);
        if (!created) {
            return response.status(400).json({ message: 'Failed to create user' });
        }
        return response.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

userRouter.put('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const body = request.body;
    try {
        const modified = await modifyUser(id, body);
        if (!modified) {
            return response.status(400).json({ message: 'Failed to modify user' });
        }
        return response.status(200).json({ message: 'User modified successfully' });
    } catch (error) {
        console.error('Error modifying user:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

userRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const deleted = await removeUser(id);
        if (!deleted) {
            return response.status(400).json({ message: 'Failed to delete user' });
        }
        return response.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});


export default userRouter;