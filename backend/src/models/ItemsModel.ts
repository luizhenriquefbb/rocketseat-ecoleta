
interface IItemsModel {
    id:number;
    image:string;
    title:string
}

class ItemsModel  {
    id:number
    image: string;
    title: string;

    constructor(
        {id, image, title,}:IItemsModel
    ) {
        this.id = id;
        this.image = image;
        this.title = title;
    }
}