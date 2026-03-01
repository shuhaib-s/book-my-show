import { ValidationError } from "../../utils/error";

class UserEntity{
    constructor(public name:string, public email:string, public password:string, public phone:string, public role:string){
        if(!name || !email || !password || !phone){
            throw new ValidationError("All fields are required");
        }
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.role = role;
    }
}

export default UserEntity;