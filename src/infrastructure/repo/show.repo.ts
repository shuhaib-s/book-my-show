import { Pool } from "pg";
import { TABLES } from "../../constants/tableNames";

class ShowRepo{
    constructor(private db:Pool){}
    async createShow(show:any){
        const query = `
        INSERT INTO ${TABLES.SHOWS} ( theater_id, screen_id, movie_id, start_time, end_time, is_active, price)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `;
        const values = [show.theaterId, show.screenId, show.movieId, show.startTime, show.endTime, show.isActive, show.price];
        const result = await this.db.query(query, values);
        return result.rows[0];
    } 
    // this is for admin or theater owner to get all shows
    async getShows(searchQuery:any, page:number | string =1, limit:number | string =10, user:string){ 
        let query = `
        SELECT * FROM ${TABLES.SHOWS};
        `;
         if(searchQuery.theaterId){
            query += ` WHERE theater_id = $1`;
         }
         if(searchQuery.screenId){
            query += ` WHERE screen_id = $2`;
         }
         if(searchQuery.movieId){
            query += ` WHERE movie_id = $3`;
         }
         if(page && limit){
            query += ` LIMIT $4 OFFSET $5`;
         }
     
        const result = await this.db.query(query, [searchQuery.theaterId, searchQuery.screenId, searchQuery.movieId, page, limit]);
        return result.rows;
    }
    async getActiveShows(theaterId:string, movieId:string){
        let query = `SELECT * FROM ${TABLES.SHOWS} WHERE theater_id = $1 AND movie_id = $2`;
        const result = await this.db.query(query, [theaterId, movieId]);
        return result.rows;
    }
    async updateShow(id:string, data:any){
        const query = `
        UPDATE ${TABLES.SHOWS} SET theater_id = $1, screen_id = $2, movie_id = $3, start_time = $4, end_time = $5, is_active = $6, price = $7 WHERE id = $8;
        `;
        const values = [data.name, data.theaterId, data.screenId, data.movieId, data.startTime, data.endTime, data.isActive, id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
    async deleteShow(id:string){
        const query = `
        DELETE FROM ${TABLES.SHOWS} WHERE id = $1;
        `;
        const values = [id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

   
}

export default ShowRepo;