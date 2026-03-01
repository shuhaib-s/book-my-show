import ShowService from "../domain/services/show.services";
import ShowRepo from "../infrastructure/repo/show.repo";
import ShowController from "../application/controllers/show.controller";
import dbPool from "../infrastructure/db/pool";
import { eventBus } from "../infrastructure/events/event";

const showRepo = new ShowRepo(dbPool);
const showService = new ShowService(showRepo, eventBus);
const showController = new ShowController(showService);

export { showController };  