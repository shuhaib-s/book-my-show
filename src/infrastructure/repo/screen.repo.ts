import { Pool } from "pg";
import ScreenEntity from "../../domain/entities/screen.entity";
import { TABLES } from "../../constants/tableNames";

class ScreenRepo{
    constructor(private db:Pool){}

    async createScreen(screen:ScreenEntity){
        const query = `
        INSERT INTO ${TABLES.SCREENS} (name, theater_id, total_seats, created_by)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `;
        const values = [screen.name, screen.theaterId, screen.totalSeats, screen.createdBy];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
    async getScreens(theaterId:string){
        const query = `
        SELECT * FROM ${TABLES.SCREENS} WHERE theater_id = $1;
        `;
        const values = [theaterId];
        const result = await this.db.query(query, values);
        return result.rows;
    }
    async getScreenById(id:string){
        const query = `
        SELECT * FROM ${TABLES.SCREENS} WHERE id = $1;
        `;
        const values = [id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
    async updateScreen(id:string, data:any){
        const query = `
        UPDATE ${TABLES.SCREENS} SET name = $1, theater_id = $2, total_seats = $3 WHERE id = $4
        RETURNING *;
        `;
        const values = [data.name, data.theaterId, data.totalSeats, id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
    async deleteScreen(id:string){
        const query = `
        DELETE FROM ${TABLES.SCREENS} WHERE id = $1
        RETURNING *;
        `;
        const values = [id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
     
}

export default ScreenRepo;