class ItemsModel {
    id:number
    image: string;
    title: string;

    constructor(
        {id, image, title,}:
        {id:number, image:string, title:string,}
    ) {
        this.id = id;
        this.image = image;
        this.title = title;
    }
}