import { ValidationError } from "../../utils/error";

class MovieEntity{
    constructor(
        public title:string,
        public description:string,
        public duration:number,
        public language:string,
        public releaseDate:Date
    ){
        if(!title || !description || !duration || !language || !releaseDate){
            throw new ValidationError("All fields are required");
        }
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.language = language;
        this.releaseDate = releaseDate;
    }
}

export default MovieEntity;
 