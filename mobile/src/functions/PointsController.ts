import api from '../services/api';
import PointModel from '../models/PointsModel';

interface paramsToGetPoints { city?: string | null, uf?: string | null, items_ids: number[] };
type setPointsCB = React.Dispatch<React.SetStateAction<PointModel[]>>

class PointUtils {
    constructor() { }


    static getPoints(
        params: paramsToGetPoints,
        cb: setPointsCB
    ) {

        api.get('/points', {
            params: {
                city: params.city,
                uf: params.uf,
                items_ids: params.items_ids.join(',')
            }
        })
            .then(response => {
                const pointsParsed = response.data.points.map((point: any) => {
                    return new PointModel({
                        id: point.id,
                        image: point.image,
                        latitude: point.latitude,
                        longitude: point.longitude,
                        name: point.name,
                    })
                })

                cb(pointsParsed);
            }).catch(response => {
                console.error('endpoint');
            })
    }

    static getPointDetailsById(
        pointId: number,
        setPoint: React.Dispatch<React.SetStateAction<PointModel|undefined>>
    ) {
        console.log('url', `/point/${pointId}`);

        api.get(`/point/${pointId}`)
            .then(response => {
                const responseData = response.data;

                console.clear();
                console.log({responseData});

                const pointParsed = new PointModel({
                    id: responseData.point.id,
                    image: responseData.point.image,
                    latitude: responseData.point.latitude,
                    longitude: responseData.point.longitude,
                    name: responseData.point.name,
                    city: responseData.point.city,
                    uf: responseData.point.uf,
                    email: responseData.point.email,
                    whatsapp: responseData.point.whatsapp,

                })

                pointParsed.items = responseData.items.map((item:any) => item.title);
                setPoint(pointParsed);
            })
            .catch(response => {
                console.error('endpoint');
            })
    }
}


export default PointUtils