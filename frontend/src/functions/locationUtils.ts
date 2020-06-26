import axios from 'axios'

import Uf from '../models/UF';
import City from '../models/City';

type TgetBrazilianUFsCB = /* (array: Uf[]) => void; */  React.Dispatch<React.SetStateAction<Uf[]>>;

type THandleSelectUf = /* (array: City[]) => void; */  React.Dispatch<React.SetStateAction<City[]>>;


class LocationUtils {
    getBrazilianUFs(callback: TgetBrazilianUFsCB) {
        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")

            .then((response) => {

                let parsedUFs = response.data.map((uf: any) => {
                    return (new Uf(uf.nome, uf.sigla));
                });

                callback(parsedUFs);

            }).catch((response) => {

                console.error(response);
                callback([]);

            });
    }

    HandleSelectUf(selectedUf:string, callback: THandleSelectUf){
        // get cities of this UF
        axios.get(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
                )
                .then((response) => {
                    const cities = response.data.map((city:any) => {
                        return new City(city.nome);
                    })
                    callback(cities);
                }).catch((response) => {
                    console.error(response);
                    callback([]);
                });

    }
}

export default LocationUtils;