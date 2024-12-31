class User {
    private id: number;
    name: string;
    roleId: number;
    private email: string;
    private password: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        name: string,
        roleId: number,
        email: string,
        password: string,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this.name = name;
        this.roleId = roleId;
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

    // setters

    setPassword(newPassword:string){
        this.password = newPassword;
    };

    setNewUpdate(newDate: Date){
        this.updatedAt = newDate;
    };
}