import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {darkGray} from '../helpers/colors'
import {RATIO_X, RATIO_Y } from '../helpers/dimension'
// import { adelleThin } from '../styles/fonts'
import Navbar from '../components/navbar/component'

import SimpleButton from '../components/simple-button/component'

const StepInitScreen = ({navigation}) => {
    return (
        <View style={styles.content}>
          <Navbar
            infoNavBar
            back={() => {
                navigation.goBack()
            }}
          />
          <View style={styles.wrapperInfo}>
            <ScrollView style={{ flex: 1 }}>
              <Text accessibilityLabel={`info_1`} style={styles.information}>
                Le tabac multiplie par 20 le risque de cancer du poumon et augmente
                les risques de maladie grave du cœur et des vaisseaux.
              </Text>
              <Text accessibilityLabel={`info_2`} style={styles.information}>
                SmokeCheck® est un outil analysant vos symptômes. Il ne remplace pas
                votre medecin mais peut vous aider à décider d'une consultation
                médicale plus rapidement.
              
              </Text>
              <Text accessibilityLabel={`info_3`} style={styles.information}>
                Le meilleur moyen de réduire les risques de maladie est l’arrêt complet du tabac.
              </Text>
              <Text accessibilityLabel={`info_4`} style={styles.information}>
                Ne pas laisser à la portée des enfants.
              </Text>
            </ScrollView>
            <Text accessibilityLabel={`info_4`} style={styles.information}>
                Ne pas laisser à la portée des enfants.
              </Text>
            <SimpleButton title="Suivant" onPress={() => navigation.navigate('StepConsent')} />
          </View>
        </View>
    )
}

StepInitScreen.navigationOptions = () => {
    return {
      header: () => false
    }
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
    },
    wrapperInfo: {
        flex: 1,
        paddingTop: 30 * RATIO_Y,
        paddingBottom: 33 * RATIO_Y,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    information: {
        paddingHorizontal: 31 * RATIO_X,
        // fontFamily: adelleThin,
        fontSize: 18 * RATIO_X,
        marginBottom: 20 * RATIO_Y,
        color: darkGray,
    },
})

export default StepInitScreen
