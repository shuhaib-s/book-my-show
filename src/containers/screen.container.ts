import ScreenService from "../domain/services/screen.services";
import ScreenRepo from "../infrastructure/repo/screen.repo";
import ScreenController from "../application/controllers/screen.controller";
import dbPool from "../infrastructure/db/pool";
import { eventBus } from "../infrastructure/events/event";
import TheaterRepo from "../infrastructure/repo/theater.repo";

const screenRepo = new ScreenRepo(dbPool);
const theaterRepo = new TheaterRepo(dbPool);
const screenService = new ScreenService(screenRepo, eventBus, theaterRepo);
const screenController = new ScreenController(screenService);

export { screenController };