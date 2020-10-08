import React from 'react'
import {
  Animated,
  Dimensions,
} from 'react-native'

class SpringSide extends React.Component {
  constructor (props) {
    super(props)
    let width = Dimensions.get('window').width

    if (this.props.side === 'left') {
      width = width * -1
    }

    this.state = {
      anim: new Animated.ValueXY({x: width, y: 0}),
    }
  }

  componentDidMount () {
    Animated.sequence([
      Animated.delay(this.props.delay ? this.props.delay : 0),
      Animated.spring(
        this.state.anim,
        {toValue: {x: 0, y: 0}}
      ),
    ]).start()
  }

  render () {
    return (
      <Animated.View
        style={[
          { transform: this.state.anim.getTranslateTransform() },
          this.props.style,
        ]}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}

export default SpringSide
