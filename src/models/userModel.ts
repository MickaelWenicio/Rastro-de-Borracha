class User {
    private id: number;
    private name: string;
    private roleId: number;
    private email: string;
    private password: string;
    private createdAt: Date;
    private updatedAt: Date;

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

    getName(){
        return this.name;
    };

    getEmail(){
        return this.email;
    };

    getPassword(){
        return this.password;
    };

    getLastUpdate(){
        return this.updatedAt;
    };

    getCreatedAt(){
        return this.createdAt;
    };

    getId(){
        return this.id;
    };

    getRoleId(){
        return this.roleId;
    };

    // setters

    setName(newName:string){
        this.name = newName;
    };

    setPassword(newPassword:string){
        this.password = newPassword;
    };

    setRole(newRole:number){
        this.roleId = newRole;
    }

    setNewUpdate(newDate: Date){
        this.updatedAt = newDate;
    };
}