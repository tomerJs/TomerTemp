import React from 'react'
import {
  View,
} from 'react-native'


const loader = ({isLoading}) => {
  return true;
  // return (
  //     isLoading
  //       ? (<View style={styles.loaderContent}>
  //           <Progress.CircleSnail color='#4A90E2' />
  //           <View style={styles.loaderBackground}></View>
  //         </View>)
  //       : <View></View>
  // )
}

export default loader
