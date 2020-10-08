import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Navbar from '../components/navbar/component'
import SimpleButton from '../components/simple-button/component'
import {darkGray} from '../helpers/colors'
import {RATIO_X, RATIO_Y } from '../helpers/dimension'
import AsyncStorage from '@react-native-community/async-storage';


const CONSENT_TITLE = 'Validation de votre consentement'
const CONSENT_PART_1 = 'Vos données à caractère personnel – en ce compris vos données de santé – sont collectées et traitées, dans le cadre de la mise en œuvre de l’Application SMOKECHECK®  en vue de vous aider à l’identification de symptômes liés aux maladies du tabac et, sauf opposition de votre part dans le cadre d’ études en santé. SIVAN INNOVATION est le responsable de traitement de vos données au sens du RGPD et de la Loi Informatique et Libertés en vigueur.'
const CONSENT_PART_2 = 'Vous pouvez vous opposer à l\'hébergement de vos données auprès d’un hébergeur agréé/certifié de données de santé ou à la réutilisation de vos données à des fins d\'études en contactant notre délégué à la protection des données dpo@sivan-innovation.com.'
const CONSENT_PART_3 = 'Vous disposez d’un droit d’accès, d’opposition, de rectification, de limitation du traitement, d’un droit à l’effacement et à la portabilité de vos données, ainsi que, le cas échéant, le droit de retirer votre consentement à tout moment à cette même adresse.'
const CONSENT_PART_4 = 'Vous disposez également du droit de communiquer vos directives concernant le sort de vos données à caractère personnel après votre mort et du droit d’introduire une réclamation auprès de la CNIL. Pour plus d’information sur vos droits, vous pouvez consulter les mentions légales de l\'application.'
const CONSENT_PART_5 = 'En cliquant sur le bouton ci-dessous, vous reconnaissez et acceptez les faits suivants :'
const CONSENT_PART_6 = 'Je consens expressément à la collecte et au traitement de mes données personnelles de santé, pour le bon fonctionnement de l\'application par le fabricant SIVAN INNOVATION et ses sous-traitants.'


const StepConsentScreen = ({navigation}) => {
    return (
        <View style={styles.content}>
          <Navbar
            infoNavBar
            back={() => {
                navigation.goBack()
            }}
          />
          <View style={styles.wrapperInfo}>
            <Text accessibilityLabel={`consent`} style={styles.consentTitle}>
              {CONSENT_TITLE}
            </Text>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ marginHorizontal: 31 }}>
              <Text accessibilityLabel={`consent_part_1`} style={styles.consentText}>
               {CONSENT_PART_1}
              </Text>
              <Text accessibilityLabel={`consent_part_2`} style={styles.consentText}>
                {CONSENT_PART_2}
              </Text>
              <Text accessibilityLabel={`consent_part_3`} style={styles.consentText}>
                {CONSENT_PART_3}
              </Text>
              <Text accessibilityLabel={`consent_part_4`} style={styles.consentText}>
                {CONSENT_PART_4}
              </Text>
              <Text accessibilityLabel={`consent_part_5`} style={styles.consentText}>
                {CONSENT_PART_5}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                <Text style={[styles.consentText, {fontSize: 30}]}>•</Text>
                <Text accessibilityLabel={`consent_part_6`} style={[styles.consentText, {paddingLeft: 10}]}>
                  {CONSENT_PART_6}
                </Text>
              </View>
              <View style={styles.wrapperButton}>
                <SimpleButton
                  title={`Je donne mon consentement`}
                  styleText={{textAlign: 'center'}}
                  onPress={() => {
                    AsyncStorage.setItem('consent_text', `${CONSENT_PART_1} ${CONSENT_PART_2} ${CONSENT_PART_3}`)
                    // Actions.stepInfo()
                    navigation.navigate('StepInfo')
                  }} />
              </View>
            </ScrollView>
          </View>
        </View>
    )
}

StepConsentScreen.navigationOptions = () => {
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
    consentTitle: {
        textAlign: 'center',
        paddingBottom: 25 * RATIO_Y,
        // fontFamily: adelleRegular,
        fontSize: 25 * RATIO_X,
        lineHeight: parseInt(37 * RATIO_Y),
        color: darkGray,
        paddingHorizontal: 31 * RATIO_X,
    },
    consentText: {
        // fontFamily: adelleThin,
        fontSize: 18 * RATIO_X,
        marginBottom: 20 * RATIO_Y,
        lineHeight: parseInt(30 * RATIO_Y),
        color: darkGray,
    },
})

export default StepConsentScreen
