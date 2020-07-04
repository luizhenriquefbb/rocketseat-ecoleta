import api from '../services/api'
import ItemModel from '../models/ItemModel';


type TGetItemCB = React.Dispatch<React.SetStateAction<ItemModel[]>>;


class ItemsController {

    getItems(callBack: TGetItemCB) {
        let items: ItemModel[] = [];

        api.get("/items").then(
            response => {
                items = response.data.map((item:any) => new ItemModel({
                    id: item.id,
                    title: item.title,
                    image: item.image_url,
                }));

                callBack(items);
            }).catch(response => {
                console.error(response)
            }
        );
    }
}

export default ItemsController;