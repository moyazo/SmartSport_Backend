import { Router, Request, Response } from 'express';
import {
    createCategory,
    getAll,
    getById,
    modifyCategory,
    removeCategory,
} from '../controllers/category';

categoryRouter.get('/', async (request: Request, response: Response) => {
    try {
        const categories = await getAll();
        if (!categories) {
            return response
                .status(404)
                .json({ message: 'No categories found' });
        }
        return response.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

categoryRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const category = await getById(id);
        if (!category) {
            return response.status(404).json({ message: 'Category not found' });
        }
        return response.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

categoryRouter.post('/', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const created = await createCategory(body);
        if (!created) {
            return response
                .status(400)
                .json({ message: 'Failed to create category' });
        }
        return response
            .status(201)
            .json({ message: 'Category created successfully' });
    } catch (error) {
        console.error('Error creating category:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

categoryRouter.put('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const body = request.body;
    try {
        const modified = await modifyCategory(id, body);
        if (!modified) {
            return response
                .status(400)
                .json({ message: 'Failed to modify category' });
        }
        return response
            .status(200)
            .json({ message: 'Category modified successfully' });
    } catch (error) {
        console.error('Error modifying category:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

categoryRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const removed = await removeCategory(id);
        if (!removed) {
            return response
                .status(400)
                .json({ message: 'Failed to remove category' });
        }
        return response
            .status(200)
            .json({ message: 'Category removed successfully' });
    } catch (error) {
        console.error('Error removing category:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

export default categoryRouter;
