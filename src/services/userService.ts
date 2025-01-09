import user from "../models/userModel";
import client from '../config/database';
import { query } from "express";

class userService{
    constructor(){}

    async listUsers(){
        const sql = "SELECT * FROM users";
        try{
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

        const {name, email, password, isAdmin} = data;
        let {isEditor} = data

        if(isAdmin){
            isEditor = true;
        }
        
        try{
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
        const sql = `
            DELETE FROM users
            WHERE users.id = $1
        `;

        const id = Number(userId);
        
        try{
            await client.query(sql, [id]);
            console.log(`User ${id} deleted successfully.`);
        }catch(err){
            throw new Error("An unexpected error occurred in deleteUser. " + err);
        };
    };

    async updateUser(data: {
        id: number,
        name: string,
        isAdmin: boolean,
        isEditor: boolean,
        email: string,
        password: string,
        createdAt: Date,
        updatedAt: Date
    }){
        const sql = `
            UPDATE users
            SET
                name = $2,
                is_admin = $3,
                is_editor = $4,
                email = $5,
                password = $6,
                created_at = $7,
                updated_at = $8
            WHERE users.id = $1
        `;

        data.updatedAt = new Date();

        try{
            await client.query(sql, [
                data.id,
                data.name,
                data.isAdmin,
                data.isEditor,
                data.email,
                data.password,
                data.createdAt,
                data.updatedAt
            ]);
        }catch(err){
            throw new Error("An unexpected error in updateUser. " + err)
        };
    };

    async updateUserName(data: {
        id: number,
        name: string,
    }){
        const {id, name} = data;
        const user = await this.getSingleUser({id});
        user.name = name;

        try{
            await this.updateUser(user.toObject());
            console.log(`Username of user ${id} updated successfully.`);
        }catch(err){
            throw new Error("An unexpected error in updateUserName. " + err);
        };
    };

    async getSingleUser(data: Partial<{
        id: number,
        email: string
    }>){
        const {id, email} = data;
        let whereClause;

        if (!id && !email) {
            throw new Error("No email or ID was provided. Please enter a valid email or ID.");
        };
        
        if(id && email){
            throw new Error("Both email and ID were provided. Please enter only one of them.");
        };

        whereClause = email ? "WHERE users.email = $1" : "WHERE users.id = $1";
        const param = email || id;
        const sql = `SELECT * FROM users ` + whereClause;

        try{
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
    }){
        const {id, oldPassword, newPassword} = data;
            
        const user = await this.getSingleUser({id});

        if(user.getPassword() !== oldPassword){
            throw new Error("Incorrect password. Please enter the correct password to proceed.");
        };

        user.setPassword(newPassword);;

        try{
            this.updateUser(user.toObject());
            console.log(`Password of user ${id} updated successfully.`);
        }catch(err){
            throw new Error("An unexpected error in updatePassword. " + err);
        };
    };

    async updateRole(data: {
        userId: number,
        isAdmin: boolean,
        isEditor: boolean
    }) {
        const {userId, isAdmin} = data;
        let {isEditor} = data;

        if(isAdmin){
            isEditor = true;
        };

        const user = await this.getSingleUser({id:userId});
        user.isAdmin = isAdmin;
        user.isEditor = isEditor;

        try{
            this.updateUser(user.toObject());
            console.log("User roles updated successfully.");
        }catch (err){
            throw new Error("An unexpected error in updateUserRole. " + err);
        };
    };
};

export default new userService();