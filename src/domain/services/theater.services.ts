import { THEATER_EVENTS } from "../../constants/events/theater.events";
import { STATUS } from "../../constants/roles";
import { ForbiddenError } from "../../utils/error";
import TheaterEntity from "../entities/theater.entity";
 
type searchTypes = {userId:string | undefined, searchQuery:string | undefined, page:number | undefined, limit:number | undefined}
class TheaterService{
    constructor(private theaterRepository:any, private eventBus:any){}
    async createTheater(data:any, userId:string){
        const theater = new TheaterEntity(data.name, data.location, userId);
        const result = await this.theaterRepository.createTheater(theater);
        this.eventBus.emit(THEATER_EVENTS.THEATER_CREATED, result);
        return result;
    }
    async getTheaters({userId, searchQuery, page, limit}:searchTypes){
        return await this.theaterRepository.getTheaters({userId, searchQuery, page, limit});
    }
    async getTheaterById(id:string){
        const result = await this.theaterRepository.getTheaterById(id);

        return result;
    }
    async updateTheater(id:string, data:any, isAdmin:boolean, userId:string){
        const theater = await this.theaterRepository.getTheaterById(id);
        if(!isAdmin){
            if(theater.userId !== userId){
                throw new ForbiddenError("You are not authorized to update this theater");
            }
        }
        //TODO: make it proper schema
        const newData = {
            name: data.name || theater.name,
            address: data.address || theater.address,
            city: data.city || theater.city,
            state: data.state || theater.state,
            pincode: data.pincode || theater.pincode,
            phone: data.phone || theater.phone,
            email: data.email || theater.email,
            website: data.website || theater.website,
            description: data.description || theater.description,
            status: isAdmin ? data.status : theater.status,

        }
        const result = await this.theaterRepository.updateTheater(id, newData);
        if(isAdmin && newData.status !== theater.status){
            this.eventBus.emit(THEATER_EVENTS.THEATER_STATUS_CHANGED, result);
        }
        return result;
    }
    
    async deleteTheater(id:string, userId:string, isAdmin:boolean){
        if(!isAdmin){
            const theater = await this.theaterRepository.getTheaterById(id);
            if(theater.userId !== userId){
                throw new ForbiddenError("You are not authorized to delete this theater");
            }
        }
        return await this.theaterRepository.deleteTheater(id);
    }
    async approveOrRejectTheaterApplication(id:string, status:string){
        const theater = await this.theaterRepository.getTheaterById(id);
        if(theater.status !== "pending"){
            throw new ForbiddenError("The theater application is not pending");
        }
        
        const result = await this.theaterRepository.approveOrRejectTheaterApplication(id, status);
        this.eventBus.emit(THEATER_EVENTS.THEATER_STATUS_CHANGED, result);
        return result;
    }

}

export default TheaterService;