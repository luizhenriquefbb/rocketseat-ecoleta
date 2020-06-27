import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import Header from '../../components/Header';
import { SelectionCityField, SelectionUFField } from "../../components/forms/SelectionFiled";
import Uf from '../../models/UF';
import City from '../../models/City';
import LocationUtils from '../../functions/locationUtils';

import './seePoints.css';


const SeePoint:React.FC = () => {

    const [availableUfs, setAvailableUFs] = useState<Uf[]>([]);
    const [availableCities, setAvailableCities] = useState<City[]>([]);
    const [selectedUF, setSelectedUf] = useState<string|null>(null);
    const [selectedCity, setSelectedCity] = useState<string|null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        alert('In development');
        console.log({selectedUF, selectedCity});

    };

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

    return (
        <div id="page-see-point">
            <div className="content">
                <Header
                    backLink={{
                        text:"back to main",
                        link: "/",
                        icon: FiArrowLeft
                    }} />
                <main>
                    <h1> Your marketplace of waste collection </h1>
                    <p> Find a place to take your waste </p>
                    <form onSubmit={handleSubmit}>

                        <div className="field-group">
                            <SelectionUFField
                                fieldName="State"
                                fieldId="uf"
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


                        <button type="submit">Submit</button>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default SeePoint;