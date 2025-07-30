import { Router, Request, Response } from 'express';
import { getAll } from '../controllers/users';
import {
    createDiet,
    getById,
    modifyDiet,
    removeDiet,
} from '../controllers/diet';
const dietRouter = Router();

dietRouter.get('/', async (request: Request, response: Response) => {
    try {
        const diets = await getAll();
        if (!diets) {
            return response.status(404).json({ error: 'No diets found' });
        }
        response.status(200).json(diets);
    } catch (error: unknown) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        } else {
            response.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

dietRouter.get('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const diet = await getById(id);
        if (!diet) {
            return response.status(404).json({ error: 'Diet not found' });
        }
        response.status(200).json(diet);
    } catch (error: unknown) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        } else {
            response.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

dietRouter.post('/', async (request: Request, response: Response) => {
    const body = request.body;
    try {
        const created = await createDiet(body);
        if (!created) {
            return response
                .status(400)
                .json({ error: 'Failed to create diet' });
        }
        response.status(201).json({ message: 'Diet created successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        } else {
            response.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

dietRouter.put('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const body = request.body;
    try {
        const modified = await modifyDiet(id, body);
        if (!modified) {
            return response
                .status(400)
                .json({ error: 'Failed to modify diet' });
        }
        response.status(200).json({ message: 'Diet modified successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        } else {
            response.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

dietRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const removed = await removeDiet(id);
        if (!removed) {
            return response
                .status(400)
                .json({ error: 'Failed to remove diet' });
        }
        response.status(200).json({ message: 'Diet removed successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        } else {
            response.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

export default dietRouter;
