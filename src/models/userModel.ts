export default class user {
    private id: number;
    name: string;
    isAdmin: boolean;
    isEditor: boolean;
    private email: string;
    private password: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        data: {
            id: number,
            name: string,
            isAdmin: boolean,
            isEditor: boolean,
            email: string,
            password: string,
            createdAt: Date,
            updatedAt: Date
        }
    ) {
        const { id, name, isAdmin, isEditor, email, password, createdAt, updatedAt } = data;
        this.id = id;
        this.name = name;
        this.isAdmin = isAdmin;
        this.isEditor = isEditor;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    };

    // getters

    getEmail(){ 
        return this.email;
    };

    getPassword(){
        return this.password;
    };

    getId(){
        return this.id;
    };

    toObject(){
        return {
            id: this.id,
            name: this.name,
            isAdmin: this.isAdmin,
            isEditor: this.isEditor,
            email: this.email,
            password: this.password,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    };

    // setters

    setPassword(newPassword:string){
        this.password = newPassword;
    };

    setNewUpdate(newDate: Date){
        this.updatedAt = newDate;
    };
}