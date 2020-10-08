import React from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import styles from '../styles'

const simpeButton = ({style, styleText, title, onPress, disabled, image = false}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity accessibilityLabel={`button_${title}`} style={styles.button} onPress={() => onPress()} disabled={disabled}>
        {image ? (<Image style={styles.image} source={image}/>) : null}
        <Text accessibilityLabel={`text_${title}`} style={[styles.title, styleText]}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default simpeButton
