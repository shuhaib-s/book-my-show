import { Pool } from "pg";
import UserEntity from "../../domain/entities/user.entity";
import { TABLES } from "../../constants/tableNames";
class UserRepo{
    constructor(private db:Pool){}
    async createUser(user:UserEntity){
        const query = `
        INSERT INTO ${TABLES.USERS} (name, email, password, phone, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      
      const values = [
        user.name,
        user.email,
        user.password,
        user.phone,
        user.role,
       ];
      
      const result = await this.db.query(query, values);
      return result.rows[0];
    }
    async checkUserExists(email:string, phone:string):Promise<boolean>{
        const query = `
        SELECT * FROM ${TABLES.USERS} WHERE email = $1 OR phone = $2 LIMIT 1;
        `;
        const values = [email, phone];
        const result = await this.db.query(query, values);
        console.log(result.rows);
        if(result.rows.length > 0){
            return true;
        }
        return false;
    }

    async getUserById(id:string):Promise<UserEntity>{
        const query = `
        SELECT * FROM ${TABLES.USERS} WHERE id = $1 LIMIT 1;
        `;
        const values = [id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async getUserByEmail(email:string):Promise<UserEntity>{
        const query = `
        SELECT * FROM ${TABLES.USERS} WHERE email = $1 LIMIT 1;
        `;
        const values = [email];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
    async updateUser(id:string, user:UserEntity){
        const query = `
        UPDATE ${TABLES.USERS} SET name = $1, email = $2, password = $3, phone = $4, role = $5 WHERE id = $6;
        `;
        const values = [user.name, user.email, user.password, user.phone, user.role, id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }
}

export default UserRepo;