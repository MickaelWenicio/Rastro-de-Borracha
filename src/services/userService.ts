import user from "../models/userModel";
import client from '../config/database';

class userService{
    constructor(){}

    async listUsers(){
        try{
            const sql = "SELECT * FROM users";
            const response = await client.query(sql, []);
            const { rows } = response;

            if(rows.length === 0){
                console.warn("No users found.");
                return;
            };

            const users = rows.map( row => new user(
                row.id,
                row.name,
                row.role_id,
                row.email,
                row.password,
                row.created_at,
                row.updated_at
            ));

            return users
        } catch (err){
            console.error("It's not possible to return users. " + err);
        };
    };

    async createUser(data: {
        name: string,
        email: string,
        password: string,
        role_id: number
    }){
        try{
            const sql = `
                INSERT INTO users (
                    name,
                    email,
                    password,
                    role_id
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4
                );
            `;

            const {name, email, password, role_id} = data;

            await client.query(sql, [
                name,
                email,
                password,
                role_id
            ]);
            
            console.log("New user created successfully.");
        } catch (err){
            console.error("Cannot create user. " + err)
        }
    };
};

export default new userService();