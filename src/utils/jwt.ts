import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Algorithm } from "jsonwebtoken";

dotenv.config();

const SECRET = process.env.SECRET || 'testeErrado';

const jwtConfig = {
    expiresIn: '60d',
    algorithm: 'HS256' as Algorithm,
}

const generateJWTToken = (payload: any) => 
    jwt.sign(payload, SECRET, jwtConfig);


const authenticateToken = async (token: string) => {
    if (!token) {
        throw { status: 401, message: "Sem Token" };
    }

    try{
        const introspection = jwt.verify(token, SECRET);
        return introspection;
    } catch {
        throw { status: 401, message: "token inválido" };
    }

}

export {
    generateJWTToken,
    authenticateToken
}