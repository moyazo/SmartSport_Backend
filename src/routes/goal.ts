import { Router, Request, Response } from 'express';
import {
    createGoal,
    getAll,
    getById,
    modifyGoal,
    removeGoal,
} from '../controllers/goals';
const goalRouter = Router();

goalRouter.get('/', async (request: Request, response: Response) => {
    try {
        const goals = await getAll(); // Assuming getAllGoals is a function that fetches all goals
        if (!goals) {
            return response.status(404).json({ error: 'No goals found' });
        }
        response.status(200).json(goals);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching goals:', error.message);
            response.status(500).json({ error: 'Internal server error' });
        } else {
            console.error('Unknown error fetching goals:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    }
});

goalRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const goalId = request.params.id;
        const goal = await getById(goalId); // Assuming getById is a function that fetches a goal by ID
        if (!goal) {
            return response.status(404).json({ error: 'Goal not found' });
        }
        response.status(200).json(goal);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching goal:', error.message);
            response.status(500).json({ error: 'Internal server error' });
        } else {
            console.error('Unknown error fetching goal:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    }
});

goalRouter.post('/', async (request: Request, response: Response) => {
    try {
        const body = request.body; // Assuming body contains the goal data
        const created = await createGoal(body); // Assuming createGoal is a function that creates a new goal
        if (!created) {
            return response
                .status(400)
                .json({ error: 'Failed to create goal' });
        }
        response.status(201).json({ message: 'Goal created successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error creating goal:', error.message);
            response.status(500).json({ error: 'Internal server error' });
        } else {
            console.error('Unknown error creating goal:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    }
});

goalRouter.put('/:id', async (request: Request, response: Response) => {
    try {
        const goalId = request.params.id;
        const body = request.body; // Assuming body contains the updated goal data
        const modified = await modifyGoal(goalId, body); // Assuming modifyGoal is a function that modifies a goal
        if (!modified) {
            return response
                .status(400)
                .json({ error: 'Failed to modify goal' });
        }
        response.status(200).json({ message: 'Goal modified successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error modifying goal:', error.message);
            response.status(500).json({ error: 'Internal server error' });
        } else {
            console.error('Unknown error modifying goal:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    }
});

goalRouter.delete('/:id', async (request: Request, response: Response) => {
    try {
        const goalId = request.params.id;
        const removed = await removeGoal(goalId); // Assuming removeGoal is a function that removes a goal
        if (!removed) {
            return response
                .status(400)
                .json({ error: 'Failed to remove goal' });
        }
        response.status(200).json({ message: 'Goal removed successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error removing goal:', error.message);
            response.status(500).json({ error: 'Internal server error' });
        } else {
            console.error('Unknown error removing goal:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    }
});

export default goalRouter;
