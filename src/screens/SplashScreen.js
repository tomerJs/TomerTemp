import React, {useEffect, useContext} from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Constants from 'expo-constants';
import {API_URL} from '../services/routes'
import {Context as AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-community/async-storage';


const SplashScreen = ({navigation}) => {
    const {saveUser} = useContext(AuthContext)


    const checkStorageState = async () => {
      // await AsyncStorage.removeItem('token')
      // await AsyncStorage.removeItem('user')
      let delay = 1500;
      let animationDuration = 400;

      const token = await AsyncStorage.getItem('token');
      console.log('token', token);
      if (!token) {
        setTimeout(
          () =>
          navigation.navigate('Login', {
            animation: 'fade',
            duration: animationDuration
          }),
          delay
        )
      } 
      else {
        const user = await AsyncStorage.getItem('user');
        console.log('user', user);
        if (!user) {
          setTimeout(
            () =>
            navigation.navigate('StepInit', {
              animation: 'fade',
              duration: animationDuration
            }),
            delay
          )
        } else {
          setTimeout(() => {
            saveUser(JSON.parse(user))
            navigation.navigate('Home', {
              animation: 'fade',
              duration: animationDuration
            })
          }, delay)
          
        }
      }
    }

    useEffect(() => {

      checkStorageState()

    }, [])

    const getEnv = () => {
        return API_URL.match(/(qa|demo|test)/g)
    }


    const version = Object.keys(Constants.platform).includes('ios') ? Constants.platform['ios'].systemVersion : Constants.platform['android'].versionCode;

    return (
        <View style={styles.wrapper}>
            <View>
                
                <Image style={styles.iconLungSketch} source={require('../../assets/lung_sketch.png')} />
            </View>
            <Image style={styles.logoSmokeCheck} source={require('../../assets/white_logo.png')} />
            <Text style={styles.appInfoText}>
                Votre outil de dépistage des maladies liées à la consommation du tabac.</Text>
            <Text style={styles.versionText}>Version: {version} {getEnv()}</Text> 
            <Image style={styles.iconCE} source={require('../../assets/CE.png')}/>
        </View>
    )
   
}

const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: '#52b9ff',
      flex: 1,
      justifyContent: 'space-between',
    },
    versionText: {
     textAlign: 'center',
      color: 'white',
    },
    iconLungSketch: {
      alignSelf: 'center',
      top: -12 * 0.82,
      width: 313 * 0.82,
      height: 379 * 0.82,
      resizeMode: 'contain',
    },
    logoSmokeCheck: {
      alignSelf: 'center',
      width: 303 * 0.82,
      height: 81 * 0.82,
      resizeMode: 'contain',
    },
    appInfoText: {
    //   fontFamily: adelleThin,
      textAlign: 'center',
      marginBottom: 50 * 0.82,
      color: 'white',
    },
    iconCE: {
      alignSelf: 'center',
      bottom: 30 * 0.82,
      justifyContent: 'center',
      alignItems: 'center',
      width: 20 * 0.82,
      height: 20 * 0.82,
      resizeMode: 'contain',
    },
  })
  

export default SplashScreen