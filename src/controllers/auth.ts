import db from '../../models';
import { getByEmail } from './users';
import jsonwebtoken from 'jsonwebtoken';
const user = db.sequelize.models.User;

export const signup = async (body: {
    email: string;
    password: string;
}): Promise<string | boolean> => {
    if (!body || !body.email || !body.password) {
        return false;
    }
    const existedEmail = await getByEmail(body.email);
    if (existedEmail) {
        return false;
    }
    const created = await user.create(body);
    if (!created) {
        return false;
    }

    return jsonwebtoken.sign(
        { email: created.email },
        process.env.TOKEN_SECRET || 'default_secret'
    );
};

export const login = async (
    email: string,
    password: string
): Promise<typeof user | null> => {
    if (!email || !password) {
        return null;
    }

    const userFound = await getByEmail(email);
    if (!userFound || userFound.password !== password) {
        return null;
    }

    return jsonwebtoken.sign(
        { email: user.email },
        process.env.TOKEN_SECRET || 'default_secret'
    );
};
