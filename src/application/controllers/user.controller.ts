 
import UserService from "../../domain/services/user.service";
import { Next, Req, Res, } from "../../types/http";
import { asyncHandler } from "../../utils/asyncHandler";

class UserController{
    constructor(private userService:UserService ){
        this.userService = userService;
    }
     registerUser = asyncHandler(async(req:Req,res:Res,next:Next)=>{
         const result = await this.userService.userRegistration(req.body);
        res.status(201).json({message:"User registered successfully", data:result});
    })
    loginUser = asyncHandler(async(req:Req,res:Res,next:Next)=>{
        const {email, password} = req.body;
        const {token, user} = await this.userService.userLogin(email, password);
        res.status(200).json({message:"User logged in successfully", token, user});
    })
    getUserProfile = asyncHandler(async(req:Req,res:Res,next:Next)=>{
        const {id} = req.user as {id:string};
        const user = await this.userService.getUserProfile(id as string);
        res.status(200).json({message:"User profile fetched successfully", data:user});
    })

    assignRole = asyncHandler(async(req:Req,res:Res)=>{
        const {id, role} = req.body;
        const user = await this.userService.assignRole(id, role);
        res.status(200).json({message:"Role assigned successfully", data:user.id});
    })

}

export default UserController;