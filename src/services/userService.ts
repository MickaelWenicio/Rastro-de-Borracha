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

            const users = rows.map( row => new user({
                id: row.id,
                name: row.name,
                isAdmin: row.is_admin,
                isEditor: row.is_editor,
                email: row.email,
                password: row.password,
                createdAt: row.created_at,
                updatedAt: row.updated_at
            }));

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

    async listSingleUser ( data: {
        id: number | null,
        email: number | null
    }){
        const {id, email} = data;
        let whereClause;

        try{
            if (!id && !email) {
                throw new Error("No email or ID was provided. Please enter a valid email or ID.");
            };
            
            if(id && email){
                throw new Error("Both email and ID were provided. Please enter only one of them.");
            };

            whereClause = email ? "WHERE users.email = $1" : "WHERE users.id = $1";

            const param = email || id;

            const sql = `SELECT * FROM users ` + whereClause;

            const response = await client.query(sql, [param]);

            const data = response.rows[0];

            const selectedUser = new user({
                name: data.name,
                id: data.id,
                email: data.email,
                password: data.password,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
                isAdmin: data.is_admin,
                isEditor: data.is_editor
            });
            
            return selectedUser;
        }catch (err){
            throw new Error("An unexpected error in listSingleUser. " + err);
        };
    };
    
};

export default new userService();