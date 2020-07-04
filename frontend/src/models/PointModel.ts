interface PointsModelValidInput {
    id: number,
    image: string,
    name: string,
    latitude: number,
    longitude: number,
    city?: string,
    uf?: string,
    email?: string,
    whatsapp?: string,
}

class PointModel {
    id: number;
    image: string;
    name: string;
    latitude: number;
    longitude: number;
    items: string[];
    city: string | undefined;
    uf: string | undefined;
    email: string | undefined;
    whatsapp: string | undefined;

    constructor(params:PointsModelValidInput) {
        this.id = params.id;
        this.image = params.image;
        this.name = params.name;
        this.latitude = params.latitude;
        this.longitude = params.longitude;
        this.city = params?.city;
        this.uf = params?.uf;
        this.email = params?.email;
        this.whatsapp = params?.whatsapp;


        this.items = [];

    }
}

export default PointModel