import React from 'react'
import {
  Animated,
  Dimensions,
} from 'react-native'

class FromSide extends React.Component {
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
    Animated.timing(
      this.state.anim,
      {
        toValue: {x: 0, y: 0},
        duration: this.props.duration !== undefined ? this.props.duration : 300,
        delay: this.props.delay !== undefined ? this.props.delay : 0,
      },
    ).start()
  }

  render () {
    return (
      <Animated.View
        style={[
          this.props.style,
          { transform: this.state.anim.getTranslateTransform() },
        ]}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}

export default FromSide
