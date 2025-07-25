import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import db from '../../models';

const userModel = db.sequelize.models.User;
const TOKEN_SECRET: string = process.env.TOKEN_SECRET || '';

interface AuthenticatedRequest extends Request {
    user?: { id: string; email: string };
}

const ensureAuthentication = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.path.includes('/auth')) return next();

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json('You are not authenticated');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.decode(token) as JwtPayload;

        if (!payload.email) {
            console.error('Invalid token payload:', payload);
            return res.status(403).json('Invalid token payload');
        }

        const userFound = await userModel.findOne({
            where: { email: payload.email },
        });

        if (!userFound) {
            return res.status(403).json('Wrong token');
        }

        req.user = { id: userFound.id, email: userFound.email };
        next();
    } catch (err) {
        return res.status(403).json('Token verification failed');
    }
};

export default ensureAuthentication;
