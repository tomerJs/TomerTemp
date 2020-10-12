import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import { NavigationEvents } from 'react-navigation';
import { darkGray } from '../../../helpers/colors';
import styles from '../styles'

const MultipleTouchable = (props) => {
    const [answerPressed, setAnswerPressed] = useState(props.response)

    useEffect(() => {
        checkProps()
    }, [props.response])

    const checkProps = ()=> {
        if (props.response) {
            setAnswerPressed(props.response)
        }
    }
    return (
        <View style={[styles.wrapper, props.twoAnswer ? {flexDirection: 'row'} : {flexDirection: 'column'}]}>
            <NavigationEvents onWillFocus={checkProps}/>
            {props.question.answers.map((answer, index) => {
                let wasPressed = answerPressed == answer.value
                return (
                    <TouchableOpacity
                        key={`button_choice_${answer.answer}`}
                        accessibilityLabel={`button_choice_${answer.answer}`}
                        activeOpacity={1}
                        style={[styles.touchableStyle,
                                props.twoAnswer ? styles.touchableTwo : styles.touchableMultiple,
                                wasPressed ? {backgroundColor: darkGray} : {},
                                index > 0 ? (props.twoAnswer ? {marginLeft: 18} : {marginTop: 14}) : {},
                                ]}
                        onPress={() => {
                            setAnswerPressed(answer.value)
                            callOnPress = () => {props.onPress(answer.value)}
            
                            setTimeout(function () {
                                callOnPress()
                            }, 200);
                        }}>
            
                        {props.embeddedImage ?
                        (<Image
                            accessibilityLabel={`image_choice_${answer.answer}`}
                            style={styles.embeddedImage}
                            source={answer.image}/>)
                        : null}
            
                        <Text accessibilityLabel={`text_choice_${answer.answer}`}
                            style={[props.twoAnswer ? styles.textTwo : styles.textMultiple,
                                    wasPressed ? {color: 'white'} : {}]}>
                            {answer.answer}
                        </Text>

                        {!props.embeddedImage && wasPressed ?
                        (<Image
                            accessibilityLabel={`image_choice_${answer.answer}`}
                            style={[styles.successImage, props.twoAnswer ? styles.successImageTwo : {}]}
                            source={require('../../../../assets/check.png')}/>)
                        : null}
                    </TouchableOpacity>
                )})}
        </View>
    )
}

export default MultipleTouchable
       