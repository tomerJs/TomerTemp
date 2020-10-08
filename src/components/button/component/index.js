import React from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native'
import styles from '../styles'



const button = ({style, title, info, image, onPress, isDisabled = false}) => {
  return (
    <TouchableOpacity accessibilityLabel={`button_${title}`} style={[styles.container, style]} onPress={() => onPress()} disabled={isDisabled}>
      <View style={styles.wrapper}>
        <Image style={styles.image} source={image} />
        <View style={styles.textWrapper}>
          <View style={styles.wrapperTitle}>
            <Text accessibilityLabel={`text_${title}`} style={styles.title}>{title}</Text>
            {isDisabled ? null : <Image style={styles.imageNext} source={require('../../../../assets/right_arrow.png')} />}
          </View>
          <Text accessibilityLabel={`text_info_${title}`} style={styles.info}>{info}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}


export default button
