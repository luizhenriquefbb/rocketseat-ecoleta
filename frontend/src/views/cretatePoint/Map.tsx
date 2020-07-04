import React /*, { useState } */ from 'react';
import { Map, TileLayer, Marker, } from "react-leaflet";
import { LatLngTuple, LeafletMouseEvent, Icon, } from 'leaflet';

import './leaflet.css';

interface IMap {
    latitude:number;
    longitude:number;

    clickMouseCB : React.Dispatch<React.SetStateAction<[number, number]>>
    markers?: {
        latitude:number;
        longitude:number;
        image:string;
        title:string;
        markerClickAction : () => void;
    }[]
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

                {props.markers?.map((point, index) => {
                    const iconWith = 80;
                    return (
                        <Marker
                            key={index}
                            position={[point.latitude, point.longitude]}
                            icon={
                                new Icon({
                                    iconUrl: point.image,
                                    iconSize:     [iconWith, 60], // size of the icon
                                    iconAnchor:   [iconWith/2, 90], // point of the icon which will correspond to marker's location
                                    shadowAnchor: [4, 62],  // the same for the shadow
                                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                                })
                            }
                            title={point.title}
                            onclick={() => point.markerClickAction()}
                        />
                    )
                })}

                <Marker position={position} />


        </Map>
    )
};

export default MyMap;