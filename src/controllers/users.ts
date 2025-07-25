import db from '../../models';
const user = db.sequelize.models.User;

export const getAll = async (): Promise<Array<typeof user> | null> => {
    const usersFromDB = await user.findAll();
    if (!usersFromDB) {
        return null;
    }
    return usersFromDB;
};

export const getById = async (id: string): Promise<typeof user | null> => {
    if (!id) {
        return null;
    }
    const userFromDB = await user.findOne({ where: { id } });
    if (!userFromDB) {
        return null;
    }

    return userFromDB;
};

export const getByEmail = async (
    email: string
): Promise<typeof user | null> => {
    if (!email) {
        return null;
    }
    console.log(email);
    const userFound = await user.findOne({ where: { email } });
    if (!userFound) {
        return null;
    }

    return userFound;
};

export const createUser = async (body: typeof user): Promise<boolean> => {
    if (!body) {
        return false;
    }
    body.forEach((userData: any) => {
        if (!userData) {
            return false;
        }
    });
    const created = await user.create({ body });
    if (!created) {
        return false;
    }

    return true;
};

export const modifyUser = async (
    id: string,
    body: typeof user
): Promise<boolean> => {
    if (!body || !id) {
        return false;
    }

    const usertoModify = await user.findOne({ where: { id } });
    if (!usertoModify) {
        return false;
    }

    const dataToModify: { [key: string]: any } = {};
    body.forEach((userData: any) => {
        if (userData && userData.id) {
            dataToModify[userData] = userData;
        }
    });

    const updated = await user.update(dataToModify, { where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};

export const removeUser = async (id: string): Promise<boolean> => {
    if (!id) {
        return false;
    }

    const usertoModify = await user.findOne({ where: { id } });
    if (!usertoModify) {
        return false;
    }

    const updated = await user.destroy({ where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};
