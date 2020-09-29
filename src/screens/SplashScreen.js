import React, {useEffect} from 'react'
import { View, AsyncStorage, Text, Image, StyleSheet } from 'react-native'


const SplashScreen = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 5000)
    }, [])

    // const getEnv = () => {
    //     return API_URL.match(/(qa|demo|test)/g)
    // }

    return (
        <View style={styles.wrapper}>
            <View>
                <Image style={styles.iconLungSketch} source={require('../../assets/lung_sketch.png')} />
            </View>
            <Image style={styles.logoSmokeCheck} source={require('../../assets/white_logo.png')} />
            <Text style={styles.appInfoText}>
                Votre outil de dépistage des maladies liées à la consommation du tabac.</Text>
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
      top: 20 * 0.82,
      left: 10 * 0.82,
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