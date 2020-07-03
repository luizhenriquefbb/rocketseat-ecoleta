import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";
import MapView, { Marker } from "react-native-maps";
import * as expoLocation from "expo-location";
import Spinner from 'react-native-loading-spinner-overlay';

import ItemsController from '../../functions/ItemsController';
import ItemsModel from '../../models/ItemModel';
import PointsUtils from "../../functions/PointsController";

import styles from './styles';
import PointModel from '../../models/PointsModel';

const Points = () => {

    const navigate = useNavigation();

    const [items, setItems] = useState<ItemsModel[]>([]);
    const [userPosition, setUserPosition] = useState<[number,number]>([-7.1098112860227, -34.8287933808313]);

    const [selectedItems, setSelectedItems] = useState<ItemsModel[]>([]);
    const [points, setPoints] = useState<PointModel[]>([]);

    // get initial items
    useEffect(() => {
        const itemsController = new ItemsController();
        itemsController.getItems(setItems);
    }, []);

    // request and get current user locations
    useEffect(() => {
        async function loadPosition() {

            // request
            const { status } = await expoLocation.requestPermissionsAsync();

            // if user denies location
            if (status !== 'granted'){
                Alert.alert('Ops', 'We need your permission to show waist spots');
                return;
            }

            const location = await expoLocation.getCurrentPositionAsync();
            setUserPosition([location.coords.latitude, location.coords.longitude]);
        }
        loadPosition();


    })

    // get points of selected items
    useEffect(() => {
        PointsUtils.getPoints({ items_ids: selectedItems.map(item => item.id) }, setPoints);
    }, [selectedItems])

    /**
     * Check if an item is selected
     * @param itemId
     */
    const itemIsSelected = (itemId:number) => {
        return selectedItems.find((item) => item.id === itemId);
    }

    /**
     * Set an item as selected
     * @param clickedItem
     */
    const handleClickItem = (clickedItem:ItemsModel) => {

        // remove / add item from selected items
        const itemSelected = selectedItems.find(item => item.id === clickedItem.id)

        if (itemSelected){
            setSelectedItems(selectedItems.filter(item => item.id !== clickedItem.id));
        } else {
            setSelectedItems([...selectedItems, clickedItem]);
        }

    }

    /**
     * Navigate to detail of a point.
     * Send the point_id so the next page can get other details
     * @param point
     */
    const handleNavigateToDetail = (point:PointModel) => {
        navigate.navigate('Details', { point_id: point.id })
    }


    return (<>
        <View style={styles.container}>
            {/* header */}
            <TouchableOpacity onPress={() => navigate.goBack()}>
                <Icon name="arrow-left" size={22} color="#34cb79"/>
            </TouchableOpacity>

            <Text style={styles.title}> Welcome </Text>
            <Text style={styles.description}> Find on the map a collection spot </Text>

            <View style={styles.mapContainer}>
                <Spinner
                    visible={!userPosition}
                    textContent={'Loading...'}
                    textStyle={{}}
                />

                {userPosition &&
                <MapView
                    loadingEnabled={true}
                    style={styles.map}
                    initialRegion={{
                        latitude: userPosition[0],
                        longitude: userPosition[1],
                        latitudeDelta: 0.014,
                        longitudeDelta: 0.014
                    }}>
                        {points.map((point) => {
                            return <Marker coordinate={{
                                latitude: point.latitude,
                                longitude: point.longitude,
                                }}
                                onPress={() => {handleNavigateToDetail(point)}}
                                key={point.id}
                                >
                                <View style={styles.mapMarkerContainer}>
                                    <Image
                                        source={{
                                            uri: point.image
                                        }}
                                        style={styles.mapMarkerImage}
                                    />
                                    <Text style={styles.mapMarkerTitle}>
                                        {point.name}
                                    </Text>

                                </View>
                            </Marker>
                        })}
                </MapView>}
            </View>

            <View style={styles.itemsContainer}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 20}}
                    >
                    {items.map((item) => {
                        return (
                            <TouchableOpacity
                                style={[
                                    styles.item,
                                    itemIsSelected(item.id) ? styles.selectedItem : {},
                                ]}
                                key={item.id}
                                onPress={() => {handleClickItem(item)}} activeOpacity={0.6}
                                >
                                <SvgUri width={42} height={42} uri={item.image} />
                                <Text style={styles.itemTitle}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>

        </View>

    </>)
}


export default Points;