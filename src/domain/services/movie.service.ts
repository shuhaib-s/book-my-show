import { MOVIE_EVENTS } from "../../constants/events/movie.events";
import MovieEntity from "../entities/movie.entity";

class MovieService{
    constructor(private movieRepository:any, private eventBus:any){}

    async createMovie(data:any){
        const movie = new MovieEntity(data.title, data.description, data.duration, data.language, data.releaseDate);
        const result = await this.movieRepository.createMovie(movie);
        this.eventBus.emit(MOVIE_EVENTS.MOVIE_CREATED, result);
        return result;
    }
    async getMovies(){
        const result = await this.movieRepository.getMovies();
        return result.rows;
    }
    async getMovieById(id:string){
        const result = await this.movieRepository.getMovieById(id);
        return result;
    }
    async updateMovie(id:string, data:any){
        return await this.movieRepository.updateMovie(id, data);
    }
    async deleteMovie(id:string){
        return await this.movieRepository.deleteMovie(id);
    }

}

export default MovieService;