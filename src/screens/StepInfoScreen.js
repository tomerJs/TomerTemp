import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import SimpleButton from '../components/simple-button/component'
import Navbar from '../components/navbar/component'
import {darkGray} from '../helpers/colors'
import {RATIO_X, RATIO_Y } from '../helpers/dimension'

const StepInfoScreen = ({navigation}) => {
    return (
        <View style={styles.content}>
          <Navbar
            infoNavBar
            back={() => {
                navigation.goBack()
            }}
          />
          <View style={styles.wrapperStart}>
            <Text accessibilityLabel={`need_info_before_starting`} style={styles.title}>
              Avant de commencer nous avons besoin de quelques informations
            </Text>
            <SimpleButton
              title="Commencer"
              onPress={() => navigation.navigate('StepFormUser')}
            />
          </View>
        </View>
    )
}

StepInfoScreen.navigationOptions = () => {
    return {
      header: () => false
    }
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    wrapperStart: {
        flex: 1,
        paddingHorizontal: 31 * RATIO_X,
        paddingTop: 160 * RATIO_Y,
        paddingBottom: 33 * RATIO_Y,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        textAlign: 'center',
        // fontFamily: adelleRegular,
        fontSize: 25 * RATIO_X,
        color: darkGray,
    },
})

StepInfoScreen.navigationOptions = () => {
    return {
      header: () => false
    }
}

export default StepInfoScreen
