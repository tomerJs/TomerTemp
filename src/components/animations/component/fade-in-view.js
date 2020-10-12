import React, {useEffect, useState} from 'react'
import {
  Animated,
} from 'react-native'

const FadeInView = (props) => {
  // const [fadeAnim, setFadeAnime] = useState(new Animated.Value(0))
  // const [translateYAnim, setTranslateYAnim] = useState(new Animated.ValueXY({x: 0, y: -30}))

  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.ValueXY({x: 0, y: -30})).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(
        translateYAnim,
        {toValue: {x: 0, y: 0}, duration: 200, useNativeDriver: true}
      ),
      Animated.timing(
        fadeAnim,
        {toValue: 1, duration: 300, useNativeDriver: true}
      ),
    ]).start()
  }, [])

  
    return (
      <Animated.View
        style={[
          props.style,
          {
            transform: translateYAnim.getTranslateTransform(),
            opacity: fadeAnim,
          },
        ]}
      >
        {props.children}
      </Animated.View>
    )
  
}

export default FadeInView
