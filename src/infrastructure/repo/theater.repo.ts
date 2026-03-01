import { Pool } from "pg";
import { TABLES } from "../../constants/tableNames";
import TheaterEntity from "../../domain/entities/theater.entity";

class TheaterRepo{
    constructor(private db:Pool){}

    async createTheater(theater:TheaterEntity){
        const query = `
        INSERT INTO ${TABLES.THEATERS} (name, location, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;
        `;
        const values = [theater.name, theater.location, theater.userId];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
    async getTheaters(){
        const query = `
        SELECT * FROM ${TABLES.THEATERS};
        `;
        const result = await this.db.query(query);
        return result.rows;
    }
    async getTheaterById(id:string){
        const query = `SELECT * FROM ${TABLES.THEATERS} WHERE id = $1;
        `;
        const values = [id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
    async updateTheater(id:string, data:any){
        const query = `UPDATE ${TABLES.THEATERS} SET name = $1, location = $2, user_id = $3 WHERE id = $4;
        `;
        const values = [data.name, data.location, data.userId, id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
    async deleteTheater(id:string){
        const query = `DELETE FROM ${TABLES.THEATERS} WHERE id = $1;
        `;
        const values = [id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
    async approveOrRejectTheaterApplication(id:string, status:string){
        const query = `UPDATE ${TABLES.THEATERS} SET status = $1 WHERE id = $2;
        `;
        const values = [status, id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
}

export default TheaterRepo;