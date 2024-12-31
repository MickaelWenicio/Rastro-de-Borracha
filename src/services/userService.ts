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
            console.error("Error: It's not possible to return users: " + err);
        };
    };

    
};

export default new userService();