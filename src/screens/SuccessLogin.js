import React, {useEffect} from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import {RATIO_X, RATIO_Y} from '../helpers/dimension'
import {darkGray} from '../helpers/colors'

const SuccessLogin = ({navigation}) => {
    console.log('2342342');

    useEffect(() => {
        setTimeout(
            () =>
            navigation.navigate('StepInit'),
            1500
        )
        return () => {
            clearTimeout()
        }
    }, [])
    return (
        <View style={{flex: 1}}>
            <View style={styles.wrapperImage}>
                <Image style={styles.successImage} source={require('../../assets/phone_illustration.png')} />
            </View>
            <Text style={styles.successInfo}>
                Inscription terminée
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapperImage: {
        marginTop: 120 * RATIO_Y,
        alignItems: 'flex-start',
    },
    successImage: {
        width: 250 * RATIO_X,
        height: 200 * RATIO_Y,
        resizeMode: 'contain',
    },
    successInfo: {
        textAlign: 'center',
        marginTop: 15,
        // fontFamily: adelleRegular,
        fontSize: 25 * RATIO_X,
        color: darkGray,
    },
})

export default SuccessLogin
