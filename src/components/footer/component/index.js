import React, {useState, useEffect} from 'react'
import {
  Animated,
  Easing,
  Text,
  View,
} from 'react-native'
import styles from '../styles'
import { RATIO_X } from '../../../styles'

const computeProgressBarSize = (index, nbOfQuestions, ratioX) => {
  return (index * 357 / nbOfQuestions) * ratioX
}

const Footer = (props) =>  {
  const width = computeProgressBarSize(props.index, props.nbOfQuestions, RATIO_X)
  const [widthState, setWidthState] = useState(width)
  const [progressState, setProgressState] = useState(new Animated.Value(width))
  const [paddingLeftState, setPaddingLeftState] = useState(10)

  useEffect(() => {
    if (props.index) {
      const width = computeProgressBarSize(props.index, props.nbOfQuestions, RATIO_X)

      let paddingLeft = paddingLeftState
      if (props.index === 2) {
        paddingLeft = 15
      } else if (props.index === props.nbOfQuestions - 1) {
        paddingLeft = 30
      } else if (props.index === props.nbOfQuestions) {
        paddingLeft = 40
      }

      setWidthState(width)
      setPaddingLeftState(paddingLeft)

      Animated.timing(progressState, {
        easing: Easing.inOut(Easing.ease),
        duration: 400,
        toValue: width,
        useNativeDriver: false,
      }).start()
    }
  }, [props.index])

  let fillWidth = progressState.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })
  return (
    <View>
      <View>
        <Text
          accessibilityLabel={`text_back_to_question_${props.index}`}
          style={[styles.text, {paddingLeft: widthState - paddingLeftState}]}>
          {props.index} sur {props.nbOfQuestions}
        </Text>
        <View style={styles.progressBar} >
          <Animated.View style={[styles.progressBarActive, {width: fillWidth}]}></Animated.View>
        </View>
      </View>
    </View>
  )
}

export default Footer
