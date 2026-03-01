import ShowEntity from "../entities/show.entity";
import SHOW_EVENTS from "../../constants/events/show.events";
import { ForbiddenError, NotFoundError } from "../../utils/error";
class ShowService{
    constructor(private showRepository:any, private eventBus:any){}
    async createShow(data:any){
        const show = new ShowEntity(data.theaterId, data.screenId, data.movieId, data.startTime, data.endTime, data.isActive, data.price);
        const result = await this.showRepository.createShow(show);
        this.eventBus.emit(SHOW_EVENTS.SHOW_CREATED, result);
        return result;
    }
    async getShows(searchQuery:any, page:number | string =1, limit:number | string =10, isAdmin:boolean, userId:string){
        let user = isAdmin ? undefined : userId;
        return await this.showRepository.getShows(searchQuery, page, limit, user);
    }
    async getActiveShows(theaterId:string, movieId:string){
        return await this.showRepository.getActiveShows(theaterId, movieId);
    }
    async updateShow(id:string, data:any, isAdmin:boolean, userId:string){
        const show = await this.showRepository.getShowById(id);
        if(!show){
            throw new NotFoundError("Show not found");
        }
        if(!isAdmin){
            if(show.userId !== userId){
                throw new ForbiddenError("You are not authorized to update this show");
            }
        }
        const newData = {
            ...show,
            ...data,
        }
        return await this.showRepository.updateShow(id, newData);
    }
    async getShowById(id:string){
        return await this.showRepository.getShowById(id);
    }
    async deleteShow(id:string){
        return await this.showRepository.deleteShow(id);
    }
}

export default ShowService;