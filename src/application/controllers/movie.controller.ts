import MovieService from "../../domain/services/movie.service";
import { Req, Res } from "../../types/http";
import { asyncHandler } from "../../utils/asyncHandler";

class MovieController{
    constructor(private movieService:MovieService){}

    createMovie = asyncHandler(async (req:Req, res:Res)=>{
        const result = await this.movieService.createMovie(req.body);
        res.status(201).json({message:"Movie created successfully", data:result});
    })

    getMovies = asyncHandler(async (req:Req, res:Res)=>{
        const result = await this.movieService.getMovies();
        res.status(200).json({message:"Movies fetched successfully", data:result});
    })

    getMovieById = asyncHandler(async (req:Req, res:Res)=>{
        const result = await this.movieService.getMovieById(req.params.id as string);
        res.status(200).json({message:"Movie fetched successfully", data:result});
    })

    updateMovie = asyncHandler(async (req:Req, res:Res)=>{
        const result = await this.movieService.updateMovie(req.params.id as string, req.body);
        res.status(200).json({message:"Movie updated successfully", data:result});
    })

    deleteMovie = asyncHandler(async (req:Req, res:Res)=>{
        const result = await this.movieService.deleteMovie(req.params.id as string);
        res.status(200).json({message:"Movie deleted successfully", data:result});
    })
}

export default MovieController;