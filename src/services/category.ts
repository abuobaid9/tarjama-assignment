import { categoryTable as Category } from "../model";
import jwt from 'jsonwebtoken'

async function create(userJwt: string,categoryName: string) {
try {
    interface JwtPayload {
        id: string
    }
    const { id: userId } = jwt.verify(userJwt, process.env.JWT_SECRET as string) as JwtPayload;
    return {
        response: await Category.create({name:categoryName, user_id:userId}),
        status:201
    }
} catch (error) {
    return {
        response: 'bad request',
        status:400
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
            response: await Category.update({ name:categoryName, where:{id, user_id: userId} }),
            status:201
        }
    } catch (error) {
        return {
            response: 'bad request',
            status:400
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
            response: await Category.findOne({where:{user_id:userId, id: categoryId}}),
            status:200
        }
    } catch (error) {
        return {
            response: 'bad request',
            status:400
        }
    }
}
async function list(userJwt: string) {
    try {
        interface JwtPayload {
            id: string
        }
        const { id: userId } = jwt.verify(userJwt, process.env.JWT_SECRET as string) as JwtPayload;
        return {
            response: await Category.findAll({
                where:{
                    user_id: userId,
                }}),
            status:200
        }
    } catch (error) {
        return {
            response: 'bad request',
            status:400
        }
    }
}

export {
    create,
    edit,
    get,
    list
}