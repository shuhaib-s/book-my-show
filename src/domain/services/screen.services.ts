import { SCREEN_EVENTS } from "../../constants/events/screen.events";
import { ForbiddenError, NotFoundError } from "../../utils/error";
import ScreenEntity from "../entities/screen.entity";

class ScreenService{
    constructor(private screenRepository:any, private eventBus:any, private theaterRepository:any){}
    async createScreen(data:any, isAdmin:boolean, userId:string){
        //fetch theater from theater id 
        if(!isAdmin){
            const theater = await this.theaterRepository.getTheaterById(data.theaterId);
            console.log(theater);
            if(!theater){
                throw new NotFoundError("Theater not found");
            }
            if(theater.user_id !== userId){
                throw new ForbiddenError("You are not authorized to create a screen for this theater");
            }
        }
        const screen = new ScreenEntity(data.name, data.theaterId, data.totalSeats, userId);
        const result = await this.screenRepository.createScreen(screen);
        this.eventBus.emit(SCREEN_EVENTS.SCREEN_CREATED, result);
        return result;
    }
    async getScreensByTheaterId(theaterId:string){
        const screens = await this.screenRepository.getScreens(theaterId);
        return screens;
    }
    async getScreenById(id:string){
        const screen = await this.screenRepository.getScreenById(id);
        return screen;
    }
    async updateScreen(id:string, data:any, isAdmin:boolean, userId:string){
        const screen = await this.screenRepository.getScreenById(id);
        if(!isAdmin){
            if(screen.userId !== userId){
                throw new ForbiddenError("You are not authorized to update this screen");
            }
        }
        const newData = {
            name: data.name || screen.name,
            theaterId: data.theaterId || screen.theaterId,
            totalSeats: data.totalSeats ? Number(data.totalSeats) : screen.totalSeats,
        }
        const result = await this.screenRepository.updateScreen(id, newData);
        return result;
    }
    async deleteScreen(id:string, isAdmin:boolean, userId:string){
        const screen = await this.screenRepository.getScreenById(id);
        if(!isAdmin){
            if(screen.userId !== userId){
                throw new ForbiddenError("You are not authorized to delete this screen");
            }
        }
    }
}

export default ScreenService;