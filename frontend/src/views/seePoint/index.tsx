import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from "react-router-dom";

import MyMap from '../cretatePoint/Map';

import Header from '../../components/Header';

import ItemsModel from '../../models/ItemModel';
import PointModel from '../../models/PointModel';

import ItemsController from '../../functions/ItemsController';
import PointsController from "../../functions/PointsController";

import './seePoints.css';

const SeePoint:React.FC = () => {

    const navigate = useHistory();

    const [selectedPosition, setSelectedPosition] = useState<[number,number]>(
        [-7.109594, -34.8303375]
    );

    const [items, setItems] = useState<ItemsModel[]>([]);
    const [selectedItems, setSelectedItems] = useState<ItemsModel[]>([]);
    const [points, setPoints] = useState<PointModel[]>([]);


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

    // get points of selected items
    useEffect(() => {
        PointsController.getPoints({ items_ids: selectedItems.map(item => item.id) }, setPoints);
    }, [selectedItems])

    const handleGoToPointDetail = (pointId:number) => {
        navigate.push(`/point_detail/${pointId}`)
    }

    const handleClickItem = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
        event.currentTarget.classList.toggle("selected");

        // get item id
        const { id: itemId } = items[index];

        // remove / add item from selected items
        const itemSelected = selectedItems.find(item => item.id === itemId)

        if (itemSelected) {
            setSelectedItems(selectedItems.filter(item => item.id !== itemId));
        } else {
            setSelectedItems([...selectedItems, items[index]]);
        }

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
                    <div>
                        <MyMap
                            latitude={selectedPosition[0]}
                            longitude={selectedPosition[1]}
                            clickMouseCB={setSelectedPosition}
                            markers={points.map(point => {
                                return {
                                    latitude:point.latitude,
                                    longitude:point.longitude,
                                    markerClickAction: () => handleGoToPointDetail(point.id),
                                    image: point.image,
                                    title: point.name
                                }
                            })}
                        />

                    </div>


                    <div className="filters-wrappers">
                        <h2>Filter</h2>

                        <ul className="items-grid">
                            {items.map((item, index) => {
                                return (
                                    <li
                                        className="item"
                                        onClick={(evt) => handleClickItem(evt, index)}
                                        >
                                        <img src={item.image} alt="" />
                                        <span>{item.title}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default SeePoint;