import { Router, Request, Response } from 'express';
import {
    createRutine,
    getAll,
    getById,
    modifyRutine,
    removeRutine,
} from '../controllers/rutine';
const rutineRouter = Router();

rutineRouter.get('/', async (request: Request, response: Response) => {
    try {
        const routines = await getAll();
        if (!routines) {
            return response.status(404).json({ error: 'No routines found' });
        }
        response.status(200).json(routines);
    } catch (error) {
        console.error('Error fetching routines:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

rutineRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const routine = await getById(id);
        if (!routine) {
            return response.status(404).json({ error: 'Routine not found' });
        }
        response.status(200).json(routine);
    } catch (error) {
        console.error('Error fetching routine:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

rutineRouter.post('/', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const created = await createRutine(body);
        if (!created) {
            return response
                .status(400)
                .json({ error: 'Failed to create routine' });
        }
        response.status(201).json({ message: 'Routine created successfully' });
    } catch (error) {
        console.error('Error creating routine:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

rutineRouter.put('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const body = request.body;
        const modified = await modifyRutine(id, body);
        if (!modified) {
            return response
                .status(400)
                .json({ error: 'Failed to modify routine' });
        }
        response.status(200).json({ message: 'Routine modified successfully' });
    } catch (error) {
        console.error('Error modifying routine:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

rutineRouter.delete('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const removed = await removeRutine(id);
        if (!removed) {
            return response
                .status(400)
                .json({ error: 'Failed to remove routine' });
        }
        response.status(200).json({ message: 'Routine removed successfully' });
    } catch (error) {
        console.error('Error removing routine:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

export default rutineRouter;
