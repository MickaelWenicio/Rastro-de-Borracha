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
                row.is_admin,
                row.is_editor,
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
        isAdmin: boolean,
        isEditor: boolean
    }){
        try{
            const sql = `
                INSERT INTO users (
                    name,
                    email,
                    password,
                    is_admin,
                    is_editor
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5
                );
            `;

            const {name, email, password, isAdmin, isEditor} = data;

            await client.query(sql, [
                name,
                email,
                password,
                isAdmin,
                isEditor
            ]);
            
            console.log("New user created successfully.");
        } catch (err){
            console.error("Cannot create user. " + err)
        }
    };


};

export default new userService();