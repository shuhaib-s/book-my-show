import TheaterService from "../../domain/services/theater.services";
import { Req, Res } from "../../types/http";
import { asyncHandler } from "../../utils/asyncHandler";

class TheaterController{
    constructor(private theaterService:TheaterService){}
    createTheater = asyncHandler(async (req:Req, res:Res)=>{
        const userId = req.user.id;
        const result = await this.theaterService.createTheater(req.body, userId);
        res.status(201).json({message:"Theater created successfully", data:result});
    })

    getTheaters = asyncHandler(async (req:Req, res:Res)=>{ 
        const userId = req.query?.userId  as string;
        const searchQuery = req.query?.search as string;
        const page = req.query?.page ? Number(req.query.page) : undefined;
        const limit = req.query?.limit ? Number(req.query.limit) : undefined;
        const result = await this.theaterService.getTheaters({userId, searchQuery, page, limit});
        res.status(200).json({message:"Theaters fetched successfully", data:result});
    })
    getTheaterById = asyncHandler(async (req:Req, res:Res)=>{ 
        const result = await this.theaterService.getTheaterById(req.params.id as string);
        res.status(200).json({message:"Theater fetched successfully", data:result});
    })
    updateTheater = asyncHandler(async (req:Req, res:Res)=>{    
        const isAdmin = req.user?.isAdmin;
        const userId = req.user?.id;
        const result = await this.theaterService.updateTheater(req.params.id as string, req.body, isAdmin, userId);
        res.status(200).json({message:"Theater updated successfully", data:result});
    })
    deleteTheater = asyncHandler(async (req:Req, res:Res)=>{
        const isAdmin = req.user?.isAdmin;
        const userId = req.user?.id;
        const result = await this.theaterService.deleteTheater(req.params.id as string, userId, isAdmin);
        res.status(200).json({message:"Theater deleted successfully", data:result});
    })
    approveOrRejectTheaterApplication = asyncHandler(async (req:Req, res:Res)=>{
        const result = await this.theaterService.approveOrRejectTheaterApplication(req.params.id as string, req.body.status as string);
        res.status(200).json({message:"Theater status changed successfully", data:result});
    })
}

export default TheaterController;