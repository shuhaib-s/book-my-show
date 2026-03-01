import {eventBus} from "../../infrastructure/events/event";
import { USER_EVENTS } from "../../constants/events/user.events";

eventBus.on(USER_EVENTS.USER_REGISTERED, (user:any)=>{
    console.log("User registered", user.name, user.email);
});