import React from 'react'
import {
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native'
import styles from '../styles'
import { blue } from '../../../helpers/colors'

const navbar = ({infoNavBar, showBackButton, back}) => {
  let backButton = null
  if (back && showBackButton) {
    backButton = (
      <TouchableOpacity
        accessibilityLabel={`button_back`}
        style={styles.backButton}
        hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
        onPress={back}>
        <Image style={[styles.backImage, infoNavBar ? {tintColor: blue} : {tintColor: 'white'}]} source={require('../../../../assets/fill2.png')} />
        <Text style={[styles.backText, infoNavBar ? {color: blue} : {color: 'white'}]}>Retour</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[infoNavBar ? styles.backgroundWhite : styles.backgroundBlue]}>
      <View style={styles.wrapper}>
        {backButton}
        <Image style={styles.image} source={infoNavBar ? require('../../../../assets/blue_logo.png') : require('../../../../assets/white_logo.png')}/>
      </View>
    </View>
  )
}

export default navbar
