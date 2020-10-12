import React, {useState, useEffect} from 'react'
import {
  Animated,
  Dimensions,
} from 'react-native'

const SpringSide = (props) => {
  let width = Dimensions.get('window').width

  if (this.props.side === 'left') {
    width = width * -1
  }
  // const [anim, setAnim] = useState(new Animated.ValueXY({x: width, y: 0}))
  const anim = useRef(new Animated.ValueXY({x: width, y: 0})).current


  useEffect(() => {
    Animated.sequence([
      Animated.delay(props.delay ? props.delay : 0),
      Animated.spring(
        anim,
        {toValue: {x: 0, y: 0}, useNativeDriver: true}
      ),
    ]).start()
  }, [])


  return (
    <Animated.View
      style={[
        { transform: anim.getTranslateTransform() },
        props.style,
      ]}
    >
      {props.children}
    </Animated.View>
  )
  
}

export default SpringSide
