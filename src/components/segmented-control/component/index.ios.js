
import React from 'react'
import {
  SegmentedControlIOS,
  View,
} from 'react-native'

const SegmentedControl = ({values, color, index, onChange, style}) => {
  return (
    <View style={[style]}>
      <SegmentedControlIOS
        accessibilityLabel={`segmentedcontrol_${index}`}
        values={values}
        tintColor={color}
        selectedIndex={index}
        onChange={(event) => onChange(event.nativeEvent.selectedSegmentIndex)}
      />
    </View>
  )
}

export default SegmentedControl
