import React, {useState, useEffect} from 'react'
import {
  View,
} from 'react-native'

import moment from 'moment/min/moment-with-locales'
// import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import SimpleButton from '../../simple-button/component'
import styles from '../styles'

const DateComponent = (props) =>  {
  // moment.locale('fr')
  let date = props.date ? new Date(props.date) : new Date()
  const [value, setDateState] = useState(date)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    setDateState(currentDate);
  };


    return (
      <View style={styles.container}>
    
        <DateTimePicker
          style={{width:'100%'}}
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={value}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
       <SimpleButton
          title="Ok"
          style={{marginTop: 15}}
          onPress={() => { props.onPress(value) }}
        />
      </View>
    )
}

export default DateComponent
