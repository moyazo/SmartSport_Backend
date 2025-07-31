import { Router, Request, Response } from 'express';
import {
    createSubcategory,
    getAll,
    getById,
    modifySubcategory,
    removeSubcategory,
} from '../controllers/subcategory';
const subcategoryRouter = Router();

subcategoryRouter.get('/', async (request: Request, response: Response) => {
    try {
        const categories = await getAll();
        if (!categories) {
            return response
                .status(404)
                .json({ message: 'No Subcategories found' });
        }
        return response.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

subcategoryRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const category = await getById(id);
        if (!category) {
            return response
                .status(404)
                .json({ message: 'Subcategory not found' });
        }
        return response.status(200).json(category);
    } catch (error) {
        console.error('Error fetching Subcategory by ID:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

subcategoryRouter.post('/', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const created = await createSubcategory(body);
        if (!created) {
            return response
                .status(400)
                .json({ message: 'Failed to create Subcategory' });
        }
        return response
            .status(201)
            .json({ message: 'Subcategory created successfully' });
    } catch (error) {
        console.error('Error creating category:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

subcategoryRouter.put('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const body = request.body;
    try {
        const modified = await modifySubcategory(id, body);
        if (!modified) {
            return response
                .status(400)
                .json({ message: 'Failed to modify Subcategory' });
        }
        return response
            .status(200)
            .json({ message: 'Subcategory modified successfully' });
    } catch (error) {
        console.error('Error modifying Subcategory:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

subcategoryRouter.delete(
    '/:id',
    async (request: Request, response: Response) => {
        const { id } = request.params;
        try {
            const removed = await removeSubcategory(id);
            if (!removed) {
                return response
                    .status(400)
                    .json({ message: 'Failed to remove Subcategory' });
            }
            return response
                .status(200)
                .json({ message: 'Subcategory removed successfully' });
        } catch (error) {
            console.error('Error removing Subcategory:', error);
            return response
                .status(500)
                .json({ message: 'Internal server error' });
        }
    }
);

export default subcategoryRouter;
