import { STATUS } from "../../constants/roles";
import { ValidationError } from "../../utils/error";

class TheaterEntity{
    constructor(public name:string, public location:string, public userId:string, public status:string = STATUS.PENDING){
        if(!name || !location || !userId){
            throw new ValidationError("All fields are required");
        }
        this.name = name;
        this.location = location;
        this.userId = userId;
        this.status = status;
    }
}

export default TheaterEntity;