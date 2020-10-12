import React, {useState, useEffect} from 'react'
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import styles from '../styles'

import { Isinvalid } from '../../../utils/utils'
import SimpleButton from '../../simple-button/component'

const SimpleInput = (props) =>  {
  const [value, setValue] = useState(props.defaultValue)
  const [invalid, setInvalid] = useState(!props.defaultValue)
  
  useEffect(() => {
    setValue(props.defaultValue)
    setInvalid(!props.defaultValue)
  }, [])



  return (
    <View  key={`question_${props.name}`} style={styles.container}>
      <View style={styles.input}>
        <TextInput accessibilityLabel={`text_input_${props.name}`} key={`text_input_${props.name}`}
          onChangeText={(value) => (
            setValue(value),
            setInvalid(!value || Isinvalid(props.name, value))
          )}
          value={value}
          underlineColorAndroid={'transparent'}
          autoFocus={true}
          keyboardType={props.keyboardType || 'numeric'}
          showDoneButton={true}
          style={{flex: 1, textAlign: 'left'}}
        />
        <Text accessibilityLabel={`unit_${props.name}`} style={styles.unit}>{props.unit}</Text>
        <TouchableOpacity accessibilityLabel={`keyboard_${props.name}`} style={styles.buttonKeyboard} onPress={() => {
          Keyboard.dismiss()
        }}>
          <Image style={styles.image} source={require('../../../../assets/afk.png')} />
        </TouchableOpacity>
      </View>
      <SimpleButton
        title="Ok"
        style={[{marginTop: 15}]}
        onPress={() => {
          if (!invalid) {
            Keyboard.dismiss()
            props.onPress(value)
          }
        }}
      />
    </View>
  )

}

export default SimpleInput
