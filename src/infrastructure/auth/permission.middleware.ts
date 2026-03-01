import { ROLES } from "../../constants/roles";
import { Next, Req, Res } from "../../types/http";
import { asyncHandler } from "../../utils/asyncHandler";
import { UnauthorizedError } from "../../utils/error";

const roleCheck= (role:string[])=>{
    return asyncHandler(async (req:Req, res:Res, next:Next)=>{
        const user = req.user as {role:string};
        
        if(!role.includes(user.role)){
            throw new UnauthorizedError("You are not authorized to access this resource");
        }
        if(user.role.includes(ROLES.ADMIN)){
            req.isAdmin = true;
          }
        next();
    })
}

export default roleCheck;