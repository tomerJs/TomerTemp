
import React from 'react'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import styles from '../styles'

class SegmentedControl extends React.Component {
  renderItem (title, index) {
    return (
      <TouchableOpacity key={`${index}-item`} style={styles.item} onPress={() => this.props.onChange(index)}>
        <Text accessibilityLabel={`text_${title}`} style={[styles.itemTitle, index === this.props.index ? styles.itemSelected : {}]}>{title}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    const items = this.props.values.map((title, index) => this.renderItem(title, index))

    return (
      <View style={[this.props.style, {flexDirection: 'row', padding: 0}]}>
        {items}
      </View>
    )
  }
}

export default SegmentedControl
