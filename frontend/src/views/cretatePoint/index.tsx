import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { AxiosResponse } from "axios";

import MyMap from "./Map";

import Header from "../../components/Header";
import FieldSet from "../../components/forms/FieldSet";
import Field from "../../components/forms/Field";
import {SelectionCityField, SelectionUFField} from "../../components/forms/SelectionFiled";
import ItemsModel from "../../models/Item";
import ItemsController from "../../functions/ItemsUtils";
import LocationUtils from "../../functions/locationUtils";
import Uf from "../../models/UF";
import City from "../../models/City";

import MyDropZone from "../../components/dropzone";


import api from '../../services/api';


import './CreatePoint.css';



const CreatePoint: React.FC = () => {
    const [availableUfs, setAvailableUFs] = useState<Uf[]>([]);
    const [availableCities, setAvailableCities] = useState<City[]>([]);

    const [selectedUF, setSelectedUf] = useState<string|null>(null);
    const [selectedCity, setSelectedCity] = useState<string|null>(null);
    const [items, setItems] = useState<ItemsModel[]>([]);
    const [selectedItems, setSelectedItems] = useState<ItemsModel[]>([]);

    const [selectedPosition, setSelectedPosition] = useState<[number,number]>([-7.109594, -34.8303375]);


    const [imageFile , setImageFile] = useState<File>();
    const [name  , setName] = useState<string>("");
    const [email , setEmail] = useState<string>("");
    const [phone , setPhone] = useState<string>("");

    const history = useHistory();


    // get default location
    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;

            setSelectedPosition([latitude,longitude]);
        });

    }, []);

    // get initial items
    useEffect(() => {
        const itemsController = new ItemsController();
        itemsController.getItems(setItems);
    }, []);

    // get brazilian UFs
    useEffect(() => {
        const locationUtils = new LocationUtils();
        locationUtils.getBrazilianUFs(setAvailableUFs);
    }, []);


    const handleSelectUf = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const uf = event.target.value;


        if (!uf){
            return;
        }

        setSelectedUf(uf);

        const locationUtils = new LocationUtils();
        locationUtils.HandleSelectUf(uf, setAvailableCities)

    }

    const handleSelectCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const city = event.target.value;
        if (!city){
            return;
        }
        setSelectedCity(city);
    }

    const handleClickItem = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index:number) => {
        event.currentTarget.classList.toggle("selected");

        // get item id
        const {id: itemId} = items[index];

        // remove / add item from selected items
        const itemSelected = selectedItems.find(item => item.id === itemId)

        if (itemSelected){
            setSelectedItems(selectedItems.filter(item => item.id !== itemId));
        } else {
            setSelectedItems([...selectedItems, items[index]]);
        }

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();
        if (imageFile){
            formData.append('image'    , imageFile);
        }
        formData.append('name'     , name);
        formData.append('email'    , email);
        formData.append('whatsapp' , phone);
        formData.append('latitude' , String(selectedPosition[0]));
        formData.append('longitude', String(selectedPosition[1]));
        formData.append('city'     , String(selectedCity));
        formData.append('UF'       , String(selectedUF));
        formData.append('items'    , JSON.stringify(selectedItems.map(item => {return item.id})));

        api.post('point', formData)
            .then((response:AxiosResponse<any>) => {
                if (response.status === 200){
                    alert("Success");
                    console.log({ response });
                    history.push('/');
                }
            })
            .catch((response) => {
                alert('Error');
                console.log({ response });

                if (response.response.status === 400){
                    alert(response.response.data.reason);
                }
            });


    }


    return <>
        <div id="page-create-point">
            <Header backLink={{text: "Back to main", link: "/", icon: FiArrowLeft}}/>

            <form onSubmit={handleSubmit}>
                <h1>Create a new <br/> collection spot</h1>

                {/* image */}
                <MyDropZone onFileUploaded={setImageFile}/>

                {/* data */}
                <FieldSet
                    legend="Data"
                    description="Please fill all the fields bellow"
                >
                    <Field
                        fieldName="Name"
                        fieldId="name"
                        fieldType="text"
                        onChange={setName}
                        value={name}>
                    </Field>

                    <div className="field-group">
                        <Field
                            fieldName="E-mail"
                            fieldId="email"
                            fieldType="text"onChange={setEmail}
                            value={email} >
                        </Field>
                        <Field
                            fieldName="Whatsapp"
                            fieldId="phone"
                            fieldType="text"onChange={setPhone}
                            value={phone} >
                        </Field>
                    </div>

                </FieldSet>

                {/* address */}
                <FieldSet
                    legend="Address"
                    description="Select the address on map" >

                        <MyMap
                            latitude={selectedPosition[0]}
                            longitude={selectedPosition[1]}
                            clickMouseCB={setSelectedPosition}
                        />

                        <div className="field-group">

                            <SelectionUFField
                                fieldName="State"
                                fieldId="ud"
                                optionCaption="Select your State"
                                options={availableUfs}
                                onChange={handleSelectUf}>
                            </SelectionUFField>

                            <SelectionCityField
                                fieldName="City"
                                fieldId="city"
                                optionCaption="Select your city"
                                options={availableCities}
                                onChange={handleSelectCity} >
                            </SelectionCityField>

                        </div>

                </FieldSet>

                {/* items */}
                <FieldSet
                    legend="Items to collect"
                    description="Select one or more items" >

                    <ul className="items-grid">
                        {items.map((item, index) => {
                            return <li key={index} onClick={(e) => handleClickItem(e, index)}>
                                <img src={item.image} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        })}
                    </ul>

                </FieldSet>


                <button type="submit">Submit</button>
            </form>
        </div>
    </>
}

export default CreatePoint;