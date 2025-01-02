import { Request, Response, NextFunction} from "express";
import userService from "../services/userService";

class userController {
    constructor(){}

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

}

export default new userController();
