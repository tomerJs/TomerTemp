import React from 'react'
import {
  Animated,
} from 'react-native'

class FadeIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0),
    }
  }

  componentDidMount () {
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(
        this.state.fadeAnim,
        {toValue: 1, duration: 800}
      ),
    ]).start()
  }

  render () {
    return (
      <Animated.View
        style={[
          this.props.style,
          {
            opacity: this.state.fadeAnim,
          },
        ]}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}

export default FadeIn
