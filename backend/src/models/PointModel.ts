export default class PointModel {
    name: string;
    email: string;
    whatsapp: string;
    latitude: number;
    longitude: number;
    city: string;
    UF: string;
    image: string;
    id?: Number;

    constructor(
        { id, name, email, whatsapp, latitude, longitude, city, UF, image = "", } :
        {
            id?: Number, name: string, email: string, whatsapp: string, latitude: number,
            longitude: number, city: string, UF: string, image: string,
        }
    ){
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.email = email;
        this.whatsapp = whatsapp;
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
        this.UF = UF;
        this.image = image;
    }
}