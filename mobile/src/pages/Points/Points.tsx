import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import MapView from "react-native-maps";


import styles from './styles';

const Points = () => {

    const navigate = useNavigation();

    return (<>
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigate.goBack()}>
                <Icon name="arrow-left" size={22} color="#34cb79"/>
            </TouchableOpacity>

            <Text style={styles.title}> Welcome </Text>
            <Text style={styles.description}> Find on map a collection spot </Text>

            <View style={styles.mapContainer}>
                <MapView style={styles.map} />
            </View>

            <View style={styles.itemsContainer}>
                <TouchableOpacity style={styles.item} onPress={() => {}}>

                </TouchableOpacity>
            </View>

        </View>

    </>)
}


export default Points;