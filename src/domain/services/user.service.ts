import { USER_EVENTS } from "../../constants/events/user.events";
import { ConflictError, NotFoundError, UnauthorizedError, ValidationError } from "../../utils/error";
import { comparePassword, hashPassword } from "../../utils/hashing";
import { generateToken } from "../../infrastructure/auth/jwt";
import UserEntity from "../entities/user.entity";
import { ROLES , STATUS} from "../../constants/roles";
import { env } from "../../config/env";

class UserService{
    constructor(private userRepository:any, private eventBus:any){
        this.userRepository = userRepository;
        this.eventBus = eventBus;
    }

    async userRegistration(userData:any){
        console.log(userData);
        const user = new UserEntity(userData.name, userData.email, userData.password, userData.phone, ROLES.USER);
        
        const userExists = await this.userRepository.checkUserExists(user.email, user.phone);
        if(userExists){
            throw new ConflictError("User already exists");
        }
        user.password = await hashPassword(user.password);
        console.log(user)
        const result = await this.userRepository.createUser(user);
        this.eventBus.emit(USER_EVENTS.USER_REGISTERED, result);
        return result;
    }
    async userLogin(email:string, password:string){
        if(!email || !password){
            throw new ValidationError("Email and password are required");
        }
        if(email === env.adminEmail &&password === env.adminPassword){
            const token = generateToken({ id: "admin", email: email, role: ROLES.ADMIN });
            return { token, user: {id: "admin", name: "Admin", role: ROLES.ADMIN} };
        }
        const user = await this.userRepository.getUserByEmail(email);
        if(!user){
            throw new NotFoundError("User not found");
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedError("Invalid password");
        }
        const token = generateToken({ id: user.id ,email: user.email, role: user.role});
        return { token, user: {id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role} };
    }
    async getUserProfile(id:string){
        const user = await this.userRepository.getUserById(id);
        if(!user){
            throw new NotFoundError("User not found");
        }
        return {id: user.id, name: user.name, email: user.email, phone: user.phone};
    }
    async assignRole(id:string, role:string){
        const user = await this.userRepository.getUserById(id);
        if(!user){
            throw new NotFoundError("User not found");
        }
        user.role = role;
        await this.userRepository.updateUser(id, user);
        return user;
    }
}

export default UserService;