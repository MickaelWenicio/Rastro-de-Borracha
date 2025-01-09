import user from "../models/userModel";
import client from '../config/database';
import { query } from "express";

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

    async updateUserName(data: {
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
            };
            
            await client.query(sql, [
                name,
                updatedAt,
                id
            ]);

            console.log(`Username of user ${id} updated successfully.`);
        }catch(err){
            throw new Error("An unexpected error in updateUserName. " + err);
        };
    };

    async getSingleUser(data: {
        id?: number | null,
        email?: string | null
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
    
    async updatePassword(data: {
        id: number,
        oldPassword: string,
        newPassword: string,
        updatedAt: Date
    }){
        try{
            const {id, oldPassword, newPassword, updatedAt} = data;
            
            const selectedUser = this.getSingleUser({id});

            if((await selectedUser).getPassword() !== oldPassword){
                throw new Error("Incorrect password. Please enter the correct password to proceed.");
            };

            const sql = `
                UPDATE users
                SET password = $1, updated_at = $2
                WHERE users.id = $3;
            `;

            await client.query(sql, [
                newPassword,
                updatedAt,
                id
            ]);

            console.log(`Password of user ${id} updated successfully.`);
        }catch(err){
            throw new Error("An unexpected error in updatePassword. " + err);
        };
    };

    async updateRole(data: {
        userId: number,
        isAdmin: boolean,
        isEditor: boolean,
        updatedAt: Date
    }) {
        const {userId, isAdmin, updatedAt} = data;
        let {isEditor} = data
        try{
            const sql = `
                UPDATE users
                SET is_admin = $1, is_editor = $2, updated_at = $3
                WHERE users.id = $4
            `

            if(isAdmin){
                isEditor = true;
            };
            
            await client.query(sql, [
                isAdmin, 
                isEditor, 
                updatedAt, 
                userId
            ]);
            console.log("User roles updated successfully.");
        }catch (err){
            throw new Error("An unexpected error in updateUserRole. " + err);
        };
    };
};

export default new userService();