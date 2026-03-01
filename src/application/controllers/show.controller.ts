import ShowService from "../../domain/services/show.services";
import { Req, Res } from "../../types/http";
import { asyncHandler } from "../../utils/asyncHandler";

class ShowController{
    constructor(private showService:ShowService){}
    createShow = asyncHandler(async (req:Req, res:Res)=>{
        const result = await this.showService.createShow(req.body);
        res.status(201).json({message:"Show created successfully", data:result});
    })

    getShows = asyncHandler(async (req:Req, res:Res)=>{
        const result = await this.showService.getShows(req.query, req.query.page as string, req.query.limit as string, req.user?.isAdmin, req.user?.id);
        res.status(200).json({message:"Shows fetched successfully", data:result});
    })
    getActiveShows = asyncHandler(async (req:Req, res:Res)=>{
        const result = await this.showService.getActiveShows(req.query.theaterId as string, req.query.movieId as string);
        res.status(200).json({message:"Active shows fetched successfully", data:result});
    })
    getShowById = asyncHandler(async (req:Req, res:Res)=>{
        const result = await this.showService.getShowById(req.params.id as string);
        res.status(200).json({message:"Show fetched successfully", data:result});
    })
    updateShow = asyncHandler(async (req:Req, res:Res)=>{
        const result = await this.showService.updateShow(req.params.id as string, req.body, req.user?.isAdmin, req.user?.id);
        res.status(200).json({message:"Show updated successfully", data:result});
    })
    deleteShow = asyncHandler(async (req:Req, res:Res)=>{
        const result = await this.showService.deleteShow(req.params.id as string);
        res.status(200).json({message:"Show deleted successfully", data:result});
    })
}

export default ShowController;