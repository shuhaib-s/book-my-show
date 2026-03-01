import { eventBus } from "../../infrastructure/events/event";
import { MOVIE_EVENTS } from "../../constants/events/movie.events";

eventBus.on(MOVIE_EVENTS.MOVIE_CREATED, (movie:any)=>{
    console.log("Movie created", movie);
});