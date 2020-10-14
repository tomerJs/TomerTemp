import React from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, Text } from 'react-native'
import {blue, darkGray} from '../helpers/colors'
import {RATIO_X, RATIO_Y } from '../helpers/dimension'
import Navbar from '../components/navbar/component'
import SimpleButton from '../components/simple-button/component'
import Communications from 'react-native-communications'

const PreventionScreen = (props) => {
    return (
        <View style={{flex: 1}}>
            <Navbar bigNavbar/>
            <View style={styles.container}>
                <ScrollView style={styles.wrapper}>
                    <Text accessibilityLabel={`text_prevention_1`} style={[styles.text, styles.paddingBottom]}>Nous vous recommandons de refaire ce test dans {props.navigation.state.params.number_of_month_for_next_questionnaire} mois.</Text>
                    <Text accessibilityLabel={`text_prevention_2`} style={[styles.text, styles.paddingBottom]}>Vous pouvez utiliser cette application à n’importe quel moment si des symptômes vous paraissent suspects ou consulter directement votre médecin.</Text>
                    <Text accessibilityLabel={`text_prevention_3`} style={[styles.text, styles.paddingBottom]}>Seul le sevrage tabagique complet réduira le risque de maladie grave.</Text>
                    <Text accessibilityLabel={`text_prevention_4`} style={[styles.text, styles.paddingBottom]}>N’hésitez pas à recommander cette application à vos proches.</Text>
                    <Text accessibilityLabel={`text_prevention_5`} style={[styles.text, styles.paddingBottom]}>Parlez en à votre médecin, votre pharmacien ou tabac info service au:</Text>
                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() => Communications.web('http://www.tabac-info-service.fr')}>
                        <Text
                            style={styles.linkText}>
                            www.tabac-info-service.fr
                        </Text>
                    </TouchableOpacity>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <SimpleButton
                            style={styles.phoneTouchable}
                            image={require('../../assets/phone.png')}
                            title='3989'
                            styleText={{color: blue}}
                            onPress={() => Communications.phonecall('3989', true)}
                        />
                        <SimpleButton
                            style={styles.buttonOK}
                            title='Ok'
                            onPress={() => props.navigation.navigate('Home')}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

PreventionScreen.navigationOptions = () => {
    return {
      header: () => false
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35 * RATIO_Y,
    },
    wrapper: {
        paddingHorizontal: 31 * RATIO_X,
    },
    text: {
        // fontFamily: adelleThin,
        fontSize: 18 * RATIO_X,
        lineHeight: parseInt(25 * RATIO_Y),
        color: darkGray,
    },
    paddingBottom: {
        paddingBottom: 15 * RATIO_Y,
    },
    marginBottom: {
        marginBottom: 30 * RATIO_Y,
    },
    linkButton: {
        alignSelf: 'flex-start',
        borderBottomWidth: 1,
        borderColor: darkGray,
        marginBottom: 42 * RATIO_Y,
    },
    linkText: {
        // fontFamily: adelleThin,
        fontSize: 18 * RATIO_X,
        color: darkGray,
    },
    phoneTouchable: {
        marginBottom: 13 * RATIO_Y,
        backgroundColor: 'white',
        borderColor: blue,
        borderWidth: 1,
        borderRadius: 3,
    },
    buttonOK: {
        justifyContent: 'center',
        marginBottom: 33 * RATIO_Y,
    },
})

export default PreventionScreen
