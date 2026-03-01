import UserService from "../domain/services/user.service";
import { eventBus } from "../infrastructure/events/event";
import UserController from "../application/controllers/user.controller";
import UserRepo from "../infrastructure/repo/user.repo";
import dbPool from "../infrastructure/db/pool";
const userRepo = new UserRepo(dbPool);
const userService = new UserService(userRepo, eventBus); //need to inject the repository
const userController = new UserController(userService)

export { userController };