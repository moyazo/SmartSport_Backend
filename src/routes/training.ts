import { Router, Request, Response } from 'express';
import {
    createTraining,
    getAll,
    getById,
    modifyTraining,
    removeTraining,
} from '../controllers/training';
const trainingRouter = Router();

trainingRouter.get('/', async (request: Request, response: Response) => {
    try {
        const trainingList = await getAll();
        if (!trainingList) {
            return response.status(404).json({ error: 'No training found' });
        }
        response.status(200).json(trainingList);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching training:', error.message);
            response.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.error('Unknown error fetching training:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

trainingRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const training = await getById(id);
        if (!training) {
            return response.status(404).json({ error: 'Training not found' });
        }
        response.status(200).json(training);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching training by ID:', error.message);
            response.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.error('Unknown error fetching training by ID:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

trainingRouter.post('/', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const created = await createTraining(body);
        if (!created) {
            return response
                .status(400)
                .json({ error: 'Failed to create training' });
        }
        response.status(201).json({ message: 'Training created successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error creating training:', error.message);
            response.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.error('Unknown error creating training:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

trainingRouter.put('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const body = request.body;
    try {
        const modified = await modifyTraining(id, body);
        if (!modified) {
            return response
                .status(400)
                .json({ error: 'Failed to modify training' });
        }
        response
            .status(200)
            .json({ message: 'Training modified successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error modifying training:', error.message);
            response.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.error('Unknown error modifying training:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

trainingRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const deleted = await removeTraining(id);
        if (!deleted) {
            return response.status(404).json({ error: 'Training not found' });
        }
        response.status(200).json({ message: 'Training deleted successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error deleting training:', error.message);
            response.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.error('Unknown error deleting training:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

export default trainingRouter;
