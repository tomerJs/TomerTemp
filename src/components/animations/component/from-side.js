import React, {useState, useEffect} from 'react'
import {
  Animated,
  Dimensions,
} from 'react-native'

const FromSide = (props) => {
  let width = Dimensions.get('window').width

  if (props.side === 'left') {
    width = width * -1
  }
  // const [anim, setAnim] = useState(new Animated.ValueXY({x: width, y: 0}))
 
  const anim = useRef(new Animated.ValueXY({x: width, y: 0})).current

  useEffect(() => {
    Animated.timing(
      anim,
      {
        toValue: {x: 0, y: 0},
        duration: props.duration !== undefined ? props.duration : 300,
        delay: props.delay !== undefined ? props.delay : 0,
        useNativeDriver: true
      },
    ).start()
  }, [])



  return (
    <Animated.View
      style={[
        props.style,
        { transform: anim.getTranslateTransform() },
      ]}
    >
      {props.children}
    </Animated.View>
  )
}

export default FromSide
