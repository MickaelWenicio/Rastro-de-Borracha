import { Request, Response, NextFunction} from "express";
import userService from "../services/userService";

class userController {
    constructor(){};

    async getAll (req: Request, res: Response){
        try{
            const list = await userService.listUsers();
            res.status(200).json(list);
        }catch (err) {
            console.error(err);
            res.status(500).json({ error: "An error occurred while retrieving users." });
        };
    };

    async create (req: Request, res: Response){
        try{
            const {name, email, password, isAdmin, isEditor} = req.body;
            await userService.createUser({name, email, password, isAdmin, isEditor});
            res.status(201).json({ message: "User created successfully." });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "An error occurred while creating the user." });
        };
    };

    async delete (req: Request, res: Response){
        try{
            const {id} = req.body;
            await userService.deleteUser(id);
            res.status(200).json({message: `User deleted successfully.`});
        }catch (err) {
            console.error(err);
            res.status(500).json({ error: "An error occurred while deleting the user." });
        };
    };

    async updateName (req: Request, res: Response){
        try{
            const {id, name} = req.body;
            const newUpdateDate = new Date();

            await userService.updateUserName({id: id, name: name, updatedAt: newUpdateDate});
            res.status(200).json({message: "Username changed successfully."});
        }catch (err) {
            console.error(err);
            res.status(500).json({ error: "An error occurred while updating the username." });
        };
    };

    async getSingle (req: Request, res: Response){
        try{
            let {id, email} = req.body;
            const user = await userService.getSingleUser({id, email});
            res.status(200).json(user);
        }catch(err){
            console.error(err);
            res.status(500).json({ error: "An error occurred while get the user." });
        }
    }

    async updatePassword (req: Request, res: Response){
        try{
            const {id, newPassword, oldPassword} = req.body;
            const newUpdateDate = new Date();

            await userService.updatePassword({
                id: id, 
                newPassword: newPassword, 
                oldPassword: oldPassword, 
                updatedAt: newUpdateDate
            });
            res.status(200).json({message: "Password changed successfully."});
        }catch (err) {
            console.error(err);
            res.status(500).json({ error: "An error occurred while updating the password." });
        };
    };

    async updateRole (req: Request, res: Response){
        const {id, isAdmin, isEditor} = req.body;

        const newUpdateDate = new Date();
        
        try{
            await userService.updateRole({
                userId: id, 
                isAdmin: isAdmin, 
                isEditor: isEditor, 
                updatedAt: newUpdateDate
            });
            res.status(200).json({message: "User roles updated successfully."});
        }catch(err){
            console.error(err);
            res.status(500).json({error: "An error occurred while updating the roles."})
        }
    }
};

export default new userController();
