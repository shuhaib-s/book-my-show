import ScreenService from "../../domain/services/screen.services";
import { Req, Res } from "../../types/http";
import { asyncHandler } from "../../utils/asyncHandler";

class ScreenController{
    constructor(private screenService:ScreenService){}
    createScreen = asyncHandler(async (req:Req, res:Res)=>{
        const isAdmin = req.user?.isAdmin;
        const userId = req.user?.id;
        const result = await this.screenService.createScreen(req.body, isAdmin, userId);
        res.status(201).json({message:"Screen created successfully", data:result});
    })
    getScreensByTheaterId = asyncHandler(async (req:Req, res:Res)=>{
        const result = await this.screenService.getScreensByTheaterId(req.params.theaterId as string);
        res.status(200).json({message:"Screens fetched successfully", data:result});
    })
    getScreenById = asyncHandler(async (req:Req, res:Res)=>{
        const result = await this.screenService.getScreenById(req.params.id as string);
        res.status(200).json({message:"Screen fetched successfully", data:result});
    })
    updateScreen = asyncHandler(async (req:Req, res:Res)=>{
        const isAdmin = req.user?.isAdmin;
        const userId = req.user?.id;
        const result = await this.screenService.updateScreen(req.params.id as string, req.body, isAdmin, userId);
        res.status(200).json({message:"Screen updated successfully", data:result});
    })
    deleteScreen = asyncHandler(async (req:Req, res:Res)=>{
        const isAdmin = req.user?.isAdmin;
        const userId = req.user?.id;
        const result = await this.screenService.deleteScreen(req.params.id as string, isAdmin, userId);
        res.status(200).json({message:"Screen deleted successfully", data:result});
    })
}

export default ScreenController;