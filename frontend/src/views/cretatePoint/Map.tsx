import React /*, { useState } */ from 'react';
import { Map, TileLayer, Marker, } from "react-leaflet";
import { LatLngTuple, LeafletMouseEvent } from 'leaflet';

import './leaflet.css';

interface IMap {
    latitude:number;
    longitude:number;

    clickMouseCB : React.Dispatch<React.SetStateAction<[number, number]>>
    // clickMouseCB : (position:[number, number]) => void;
}

const MyMap:React.FC<IMap> = (props) => {
    /* @-7.109594,-34.8303375  */
    /* const [position, setPosition] =(
        useState<[number, number]>([props.latitude, props.longitude]));

    const [zoom, setZoom] = useState<number>(15); */

    const position:LatLngTuple = [props.latitude, props.longitude];
    const zoom = 15;

    const handleMapClick = (event:LeafletMouseEvent) => {
        const {lat, lng} = event.latlng;

        props.clickMouseCB([lat, lng]);
    };

    return (
        <Map
            center={position}
            zoom={zoom}
            onClick={handleMapClick}
            >

                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={position} />

        </Map>
    )
};

export default MyMap;