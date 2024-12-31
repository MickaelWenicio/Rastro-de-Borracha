export default class post {
    private id: number;
    title: string;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    featuredImg: string;
    content: string;

    constructor(
        id: number,
        title: string,
        authorId: number,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
        featuredImg: string,
        content: string
    ){
        this.id= id,
        this.title= title,
        this.authorId= authorId,
        this.createdAt= createdAt,
        this.updatedAt= updatedAt,
        this.featuredImg= featuredImg,
        this.content= content
    }

    //getters

    getId(){
        return this.id;
    };

    //setters

    setNewUpdate(newDate: Date){
        this.updatedAt = newDate;
    };
}