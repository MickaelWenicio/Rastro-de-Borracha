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
            throw new Error("An unexpected error occurred in listUsers. " + err);
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
            throw new Error("An unexpected error occurred in createUser. " + err);
        }
    };

    async deleteUser(userId: number){
        try{
            const sql = `
                DELETE FROM users
                WHERE users.id = $1
            `;

            const id = Number(userId);

            await client.query(sql, [id]);
            console.log(`User ${id} deleted successfully.`);
        }catch(err){
            throw new Error("An unexpected error occurred in deleteUser. " + err);
        };
    };

    async updateUserName(data:{
        id: number,
        name: string,
        updatedAt: Date
    }){
        try{
            

            const sql = `
                UPDATE users
                SET name = $1, updated_at = $2
                WHERE users.id = $3;
            `;

            const {id, name, updatedAt} = data;

            if(!name || !updatedAt){
                throw new Error("Name or updated at is empty.")
            }
            
            await client.query(sql, [
                name,
                updatedAt,
                id
            ]);

            console.log(`Username of user ${id} updated successfully.`)
        }catch(err){
            throw new Error("An unexpected error in updateUserName. " + err);
        }
    }
};

export default new userService();