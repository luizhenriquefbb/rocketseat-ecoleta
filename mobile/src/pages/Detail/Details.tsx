import React, { useState, useEffect } from 'react';
import { Text, View, Image, SafeAreaView, Linking, Alert } from 'react-native';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import * as mailComposer from "expo-mail-composer";

import PointModel from '../../models/PointsModel';
import PointUtils from "../../functions/PointsController";

import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay';

interface DetailsRouteParams {
    point_id:number
}

const Detail = () => {
    const navigate = useNavigation();

    const route = useRoute();

    // get point_id from route
    const point_id = (route.params as DetailsRouteParams).point_id;

    const [point, setPoint] = useState<PointModel>();


    /**
     * Get point details
     */
    useEffect(()=>{
        PointUtils.getPointDetailsById(point_id, setPoint)
    }, [])

    const handleComposeMail = () => {
        mailComposer.composeAsync({
            subject:'Ecoleta',
            body:'Hello. I saw your place on the Ecoleta app',
            recipients: (point && point.email?.length) ? [point.email] : [],
        })
    };

    const handleWhatsapp = () => {
        if (point?.whatsapp){
            const defaultText = 'Hi!! I saw your entablement on the Ecoleta app';
            Linking.openURL(`whatsapp://send?phone=${point.whatsapp}&text=${defaultText}`)
        }
        else {
            Alert.alert('This entablement did not give a phone');
        }
    };

    // point not created yet
    if (!point){
        return <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigate.goBack()}>
                    <Icon name="arrow-left" size={22} color="#34cb79"/>
                </TouchableOpacity>

                <Spinner
                    visible={true}
                    textContent={'Loading...'}
                    textStyle={{}}
                />

            </View>

        </SafeAreaView>
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigate.goBack()}>
                    <Icon name="arrow-left" size={22} color="#34cb79"/>
                </TouchableOpacity>


                <Image style={styles.pointImage} source={{uri: point.image}}/>

                <Text style={styles.pointName}>{point.name}</Text>
                <Text style={styles.pointItems}>{point.items.join(', ').trim()}</Text>

                <View>
                    <Text style={styles.addressTitle}>Address</Text>
                    <Text style={styles.addressContent}>{point.city}, {point.uf}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={()=>{handleWhatsapp()}}>
                    <FontAwesome name="whatsapp" size={20} color='#FFF' />
                    {/* <Text style={styles.buttonText}>Get in touch</Text> */}
                </RectButton>
                <RectButton style={styles.button} onPress={()=>{handleComposeMail()}}>
                    <Icon name="mail" size={20} color='#FFF' />
                    {/* <Text style={styles.buttonText}>Get in touch</Text> */}
                </RectButton>
            </View>
        </SafeAreaView>
    )
}


export default Detail;