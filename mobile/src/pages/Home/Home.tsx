import React from 'react';
import { View, Text, Image, ImageBackground, } from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons'

import { useNavigation } from "@react-navigation/native";

import styles from './styles';

const Home = () => {
    const navigation = useNavigation();

    return (<>
        <ImageBackground
            source={require('../../assets/home-background.png')}
            imageStyle={{width:274, height:368}}
            style={styles.container}
            >

            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.title}>Your marketplace of waste collection</Text>
                <Text style={styles.description}>We help people to find collection places in an efficiency way</Text>

                <View style={styles.footer}>
                    <RectButton
                        style={styles.button}
                        onPress={() => { navigation.navigate('Points'); }}
                        >
                        <View style={styles.buttonIcon}>
                            <Text>
                                <Icon name='arrow-right' color="#FFF" size={24} />
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>Submit</Text>
                    </RectButton>
                </View>
            </View>

        </ImageBackground>

    </>)
}


export default Home;