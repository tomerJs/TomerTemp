import React from 'react'
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

class Footer extends React.Component {
  constructor (props) {
    super(props)
    const width = computeProgressBarSize(props.index, props.nbOfQuestions, RATIO_X)
    this.state = {
      width: width,
      progress: new Animated.Value(width),
      paddingLeft: 10,
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.index !== prevProps.index) {
      const width = computeProgressBarSize(this.props.index, this.props.nbOfQuestions, RATIO_X)

      let paddingLeft = this.state.paddingLeft
      if (this.props.index === 2) {
        paddingLeft = 15
      } else if (this.props.index === this.props.nbOfQuestions - 1) {
        paddingLeft = 30
      } else if (this.props.index === this.props.nbOfQuestions) {
        paddingLeft = 40
      }

      this.setState({width: width, paddingLeft: paddingLeft})

      Animated.timing(this.state.progress, {
        easing: Easing.inOut(Easing.ease),
        duration: 400,
        toValue: width,
        useNativeDriver: true,
      }).start()
    }
  }

  render () {
    let fillWidth = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    })
    return (
      <View>
        <View>
          <Text
            accessibilityLabel={`text_back_to_question_${this.props.index}`}
            style={[styles.text, {paddingLeft: this.state.width - this.state.paddingLeft}]}>
            {this.props.index} sur {this.props.nbOfQuestions}
          </Text>
          <View style={styles.progressBar} >
            <Animated.View style={[styles.progressBarActive]}></Animated.View>
          </View>
        </View>
      </View>
    )
  }
}

export default Footer
