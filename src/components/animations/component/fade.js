import React, {useState, useEffect, useRef} from 'react'
import {
  Animated,
} from 'react-native'

const FadeIn = (props) =>  {
  // const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0))
  const fadeAnim = useRef(new Animated.Value(0)).current


  useEffect(() => {
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(
        fadeAnim,
        {toValue: 1, duration: 800, useNativeDriver: true}
      ),
    ]).start()
  }, [])

  
  return (
    <Animated.View
      style={[
        props.style,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      {props.children}
    </Animated.View>
  )
}

export default FadeIn
