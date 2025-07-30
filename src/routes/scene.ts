import { Router, Request, Response } from 'express';
import {
    createScene,
    getAll,
    getById,
    modifyScene,
    removeScene,
} from '../controllers/scene';
const sceneRouter = Router();

sceneRouter.get('/', async (request: Request, response: Response) => {
    try {
        const scenes = await getAll();
        if (!scenes) {
            return response.status(404).json({ message: 'No scenes found' });
        }
        return response.status(200).json(scenes);
    } catch (error) {
        console.error('Error fetching scenes:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

sceneRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const scene = await getById(id);
        if (!scene) {
            return response.status(404).json({ message: 'Scene not found' });
        }
        return response.status(200).json(scene);
    } catch (error) {
        console.error('Error fetching scene by ID:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

sceneRouter.post('/', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const created = await createScene(body);
        if (!created) {
            return response
                .status(400)
                .json({ message: 'Failed to create scene' });
        }
        return response
            .status(201)
            .json({ message: 'Scene created successfully' });
    } catch (error) {
        console.error('Error creating scene:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

sceneRouter.put('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const body = request.body;
    try {
        const modified = await modifyScene(id, body);
        if (!modified) {
            return response
                .status(400)
                .json({ message: 'Failed to modify scene' });
        }
        return response
            .status(200)
            .json({ message: 'Scene modified successfully' });
    } catch (error) {
        console.error('Error modifying scene:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

sceneRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const removed = await removeScene(id);
        if (!removed) {
            return response
                .status(400)
                .json({ message: 'Failed to remove scene' });
        }
        return response
            .status(200)
            .json({ message: 'Scene removed successfully' });
    } catch (error) {
        console.error('Error removing scene:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

export default sceneRouter;
