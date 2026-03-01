import { Next, Req, Res } from "../../types/http";
import { asyncHandler } from "../../utils/asyncHandler";
import { UnauthorizedError } from "../../utils/error";
import { verifyToken } from "./jwt";

export const authMiddleware = asyncHandler(async(req:Req,res:Res,next:Next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        throw new UnauthorizedError("Unauthorized");
    }
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
})