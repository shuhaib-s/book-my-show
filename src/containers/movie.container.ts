import MovieService from "../domain/services/movie.service";
import { eventBus } from "../infrastructure/events/event";
import MovieController from "../application/controllers/movie.controller";
// import MovieRepo from "../infrastructure/repo/movie.repo";
import dbPool from "../infrastructure/db/pool";

// const movieRepo = new MovieRepo(dbPool);
const movieService = new MovieService("movieRepo", eventBus);
const movieController = new MovieController(movieService);

export { movieController };