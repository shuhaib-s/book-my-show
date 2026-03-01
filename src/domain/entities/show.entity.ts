import { ValidationError } from "../../utils/error";

class ShowEntity{
    constructor(public theaterId:string, public screenId:string, public movieId:string, public startTime:Date, public endTime:Date, public isActive:boolean, public price:number){
        if(!theaterId || !screenId || !movieId || !startTime || !endTime || !isActive || !price){
            throw new ValidationError("All fields are required");
        }
        this.theaterId = theaterId;
        this.screenId = screenId;
        this.movieId = movieId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isActive = isActive;
        this.price = price;
    }
}

export default ShowEntity;