import { userTable as User } from "../model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";
dotenv.config();

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
      

        const valid = await bcrypt.compare(password, userData.password);

        if(!valid){
            return {
                response: 'wrong username or password',
                status:401            
            }
        }
        else{
            const token = jwt.sign({ userData }, process.env.JWT_SECRET as string)
            return {
                response: token,
                cookies: token,
                status: 200
            }
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