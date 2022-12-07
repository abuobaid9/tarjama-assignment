import { categoryTable as Category } from "../model";
import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";
dotenv.config();

async function create(userJwt: string, categoryName: string) {
    try {
        interface JwtPayload {
            id: string
        }

        const { id: userId } = jwt.verify(userJwt, process.env.JWT_SECRET as string) as JwtPayload;
        return {
            response: await Category.create({ name: categoryName, user_id: userId }),
            status: 201
        }
    } catch (error) {
        return {
            response: 'error in services',
            status: 400
        }
    }
}
async function edit(userJwt: string, id: number, categoryName: string) {
    try {
        interface JwtPayload {
            id: string
        }
        const { id: userId } = jwt.verify(userJwt, process.env.JWT_SECRET as string) as JwtPayload;
        return {
            response: await Category.update({ name: categoryName, where: { id, user_id: userId } }),
            status: 201
        }
    } catch (error) {
        return {
            response: 'error in services',
            status: 400
        }
    }
}
async function get(userJwt: string, categoryId: number) {
    try {
        interface JwtPayload {
            id: string
        }
        const { id: userId } = jwt.verify(userJwt, process.env.JWT_SECRET as string) as JwtPayload;
        return {
            response: await Category.findOne({ where: { user_id: userId, id: categoryId } }),
            status: 200
        }
    } catch (error) {
        return {
            response: 'error in services',
            status: 400
        }
    }
}
async function list(userJwt: any) {
    try {
        interface JwtPayload {
            userData: any
            id: Number
        }

        const userId = jwt.verify(userJwt, process.env.JWT_SECRET as any) as JwtPayload;
        console.log("************" + parseInt(userId.userData.id) + "*************");
        const response = await Category.findAll({ where: { user_id: parseInt(userId.userData.id) } })
        return response

    }
    catch (error) {
        return {
            response: 'error in services',
            status: 400
        }
    }
}

export {
    create,
    edit,
    get,
    list
}