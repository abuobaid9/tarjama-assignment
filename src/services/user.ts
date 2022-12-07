import { userTable as User } from "../model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function signup(username: string, email: string, password: string) {
    try {
        return {
            response : await User.create({
                username: username,
                email: email,
                password: bcrypt.hashSync(password, 12)
        }), status:201
    }
    } catch (error) {
        return {
            response: 'somethin wrong in signup',
            status:400
        }
    }
}
async function signin(username: string, password: string) {
    try {
        const userData = await User.findOne({where:{
            username: username
        }});
        if(!bcrypt.compareSync(password, JSON.parse(userData))){
            return {
                response: 'wrong username or password',
                status:401            
            }
        }
    const token = jwt.sign({ userData }, process.env.JWT_SECRET as string)
    return {
        response: token,
        cookie: token,
        status: 200
    }
    } catch (error) {
        return {
            response: 'wrong username or password',
            status:401
        }
    }
}

export {
    signup, 
    signin
}