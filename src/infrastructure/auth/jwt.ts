import jwt, { SignOptions } from "jsonwebtoken";
import {env} from "../../config/env";
 
export const generateToken = (payload:any) => jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"] });
export const verifyToken = (token:string) => jwt.verify(token, env.jwtSecret);
export const decodeToken = (token:string) => jwt.decode(token);