import { Router, Request, Response } from 'express';
import {
    configData,
    createUser,
    toggleFollowDiet,
    toggleFollowRutine,
    getAll,
    getById,
    modifyUser,
    removeUser,
    toggleStartTraining,
} from '../controllers/users';
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
            return response
                .status(400)
                .json({ message: 'Failed to create user' });
        }
        return response
            .status(201)
            .json({ message: 'User created successfully' });
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
            return response
                .status(400)
                .json({ message: 'Failed to modify user' });
        }
        return response
            .status(200)
            .json({ message: 'User modified successfully' });
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
            return response
                .status(400)
                .json({ message: 'Failed to delete user' });
        }
        return response
            .status(200)
            .json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

userRouter.post(
    '/configData/:id',
    async (request: Request, response: Response) => {
        const body = request.body;
        const { id } = request.params;
        if (!id || !body) {
            return response.status(400).json({
                message: 'User ID and configuration data are required',
            });
        }
        try {
            const config = await configData(id, body);
            if (!config) {
                return response.status(400).json({
                    message: 'Failed to create user configuration data',
                });
            }
            return response.status(201).json({
                message: 'User configuration data created successfully',
            });
        } catch (error) {
            console.error('Error creating user configuration data:', error);
            return response
                .status(500)
                .json({ message: 'Internal server error' });
        }
    }
);

userRouter.put(
    '/configDataReset/:id',
    async (request: Request, response: Response) => {
        const { id } = request.params;
        if (!id) {
            return response.status(400).json({
                message: 'User ID is required',
            });
        }
        try {
            const reset = await configData(id, null);
            if (!reset) {
                return response.status(400).json({
                    message: 'Failed to reset user configuration data',
                });
            }
            return response.status(200).json({
                message: 'User configuration data reset successfully',
            });
        } catch (error) {
            console.error('Error resetting user configuration data:', error);
            return response
                .status(500)
                .json({ message: 'Internal server error' });
        }
    }
);

userRouter.post(
    '/toggleFollowRutine/:id',
    async (request: Request, response: Response) => {
        const { id } = request.params;
        const { rutine_id } = request.body;
        if (!id || !rutine_id) {
            return response.status(400).json({
                message: 'User ID and routine data are required',
            });
        }
        try {
            const follow = await toggleFollowRutine(id, rutine_id);
            if (!follow.updated) {
                return response.status(400).json({
                    message: 'Failed to toggle rutine follow status',
                });
            }
            if (follow.toggle === 'unfollowed') {
                return response.status(200).json({
                    message: 'Rutine unfollowed successfully',
                });
            } else if (follow.toggle === 'followed') {
                return response.status(200).json({
                    message: 'Rutine followed successfully',
                });
            } else {
                return response.status(400).json({
                    message: 'Unexpected toggle state',
                });
            }
        } catch (error) {
            console.error('Error following routine:', error);
            return response
                .status(500)
                .json({ message: 'Internal server error' });
        }
    }
);

userRouter.post(
    '/toggleFollowDiet/:id',
    async (request: Request, response: Response) => {
        const { id } = request.params;
        const { diet_id } = request.body;
        if (!id || !diet_id) {
            return response.status(400).json({
                message: 'User ID and diet data are required',
            });
        }
        try {
            const follow = await toggleFollowDiet(id, diet_id);
            if (!follow.updated) {
                return response.status(400).json({
                    message: 'Failed to toggle diet follow status',
                });
            }

            if (follow.toggle === 'unfollowed') {
                return response.status(200).json({
                    message: 'Diet unfollowed successfully',
                });
            } else if (follow.toggle === 'followed') {
                return response.status(200).json({
                    message: 'Diet followed successfully',
                });
            } else {
                return response.status(400).json({
                    message: 'Unexpected toggle state',
                });
            }
        } catch (error) {
            console.error('Error following diet:', error);
            return response
                .status(500)
                .json({ message: 'Internal server error' });
        }
    }
);

userRouter.post(
    '/toggleTraining/:id',
    async (request: Request, response: Response) => {
        const { id } = request.params;
        const { training_id } = request.body;
        if (!id || !training_id) {
            return response.status(400).json({
                message: 'User ID and training data are required',
            });
        }
        try {
            const started = await toggleStartTraining(id, training_id);
            if (!started.updated) {
                return response.status(400).json({
                    message: 'Failed to start training',
                });
            }

            if (started.toggle === 'stopped') {
                return response.status(200).json({
                    message: 'Training stopped successfully',
                });
            } else if (started.toggle === 'started') {
                return response.status(200).json({
                    message: 'Training started successfully',
                });
            } else {
                return response.status(400).json({
                    message: 'Unexpected toggle state',
                });
            }
        } catch (error) {
            console.error('Error starting training:', error);
            return response
                .status(500)
                .json({ message: 'Internal server error' });
        }
    }
);

export default userRouter;
