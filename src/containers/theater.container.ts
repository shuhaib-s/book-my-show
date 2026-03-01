import TheaterService from "../domain/services/theater.services";
import TheaterRepo from "../infrastructure/repo/theater.repo";
import TheaterController from "../application/controllers/theater.controller";
import dbPool from "../infrastructure/db/pool";
import { eventBus } from "../infrastructure/events/event";

const theaterRepo = new TheaterRepo(dbPool);
const theaterService = new TheaterService(theaterRepo, eventBus);
const theaterController = new TheaterController(theaterService);

export { theaterController };