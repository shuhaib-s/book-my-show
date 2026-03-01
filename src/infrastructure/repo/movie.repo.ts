import MovieEntity from "../../domain/entities/movie.entity";
import { Pool } from "pg";
import { TABLES } from "../../constants/tableNames";
class MovieRepo{
    constructor(private db:Pool){}
    async createMovie(movie:MovieEntity){
        const query = `
        INSERT INTO ${TABLES.MOVIES} (title, description, duration, language, release_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `;
        const values = [movie.title, movie.description, movie.duration, movie.language, movie.releaseDate];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
    async getMovies(){
        const query = `
        SELECT * FROM ${TABLES.MOVIES};
        `;
        const result = await this.db.query(query);
        return result.rows;
    }
    async getMovieById(id:string){
        const query = `
        SELECT * FROM ${TABLES.MOVIES} WHERE id = $1;
        `;
        const values = [id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
    async updateMovie(id:string, data:any){
        const query = `
        UPDATE ${TABLES.MOVIES} SET title = $1, description = $2, duration = $3, language = $4, release_date = $5 WHERE id = $6;
        `;
        const values = [data.title, data.description, data.duration, data.language, data.releaseDate, id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
    async deleteMovie(id:string){
        const query = `
        DELETE FROM ${TABLES.MOVIES} WHERE id = $1;
        `;
        const values = [id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
}

export default MovieRepo;