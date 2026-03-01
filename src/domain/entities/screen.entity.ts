import { ValidationError } from "../../utils/error";

class ScreenEntity {
    constructor(public name:string, public theaterId:string, public totalSeats:number, public createdBy:string){
        if(!name || !theaterId){
            throw new ValidationError("All fields are required");
        }
        this.name = name;
        this.theaterId = theaterId;
        this.totalSeats = totalSeats;
        this.createdBy = createdBy;
    }
}

export default ScreenEntity;