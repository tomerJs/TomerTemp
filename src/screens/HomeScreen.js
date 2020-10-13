import React, {useState, useContext, useEffect} from 'react'
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment-with-locales-es6';
import FadeInView from '../components/animations/component/fade-in-view'
import { getAppPoint } from '../services/index'
import {darkGray} from '../helpers/colors'
import {RATIO_X, RATIO_Y } from '../helpers/dimension'
import Navbar from '../components/navbar/component'
import Button from '../components/button/component'
import SimpleButton from '../components/simple-button/component'

const HomeScreen = ({navigation}) => {
    moment.locale('fr')

    const [showWarning, setShowWarning] = useState(false)
    const [nextCheckUp, setNextCheckUp] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [lastCheckUp, setLastCheckUp] = useState('')
    const oneMonth = 2592000000

    useEffect(() => {
        async function tryLastCheckUp() {
            try {
                let _lastCheckUp= await AsyncStorage.getItem('lastCheckUp')
                if (_lastCheckUp !== null) {
                    const nbrerOfDays = new Date().getTime() - parseInt(_lastCheckUp)
                    const __lastCheckUp = moment(parseInt(_lastCheckUp)).fromNow()
                    setLastCheckUp(__lastCheckUp)
                    if (nbrerOfDays < oneMonth) {
                      const nextCheckUp = moment(parseInt(_lastCheckUp)).add(1, 'M')
                      const nextCheckUpString = moment(nextCheckUp).fromNow()
                      setNextCheckUp(nextCheckUpString)
                      setIsDisabled(false)
                    }
                }
            } catch(err) {
                failed(err)
            }
        }
        

        tryLastCheckUp()
        
    }, [])


    const failed = (error) => {
        Alert.alert('', 'Une erreur est survenue, Veuillez essayer ultérieurement')
        console.log(error)
    }

    const goBack = () => {
        // TODO implement fadeOut for warning content
        setShowWarning(false)
    }

    const _showWarning = () => {
        setShowWarning(true)
    }

    const nextStep = async () => {
        try {
            const response = await getAppPoint()
            if (response.status !== 200) {
                failed(response.error)
              } else {
                if ( response.app_point && (response.app_point == AFTER_YEARS || response.app_point == AFTER_TWO_MONTHS ) ){
                  let data = {app_point: response.app_point}
                //   Actions.question_stop_smoking(data)
                  navigation.navigate('QuestionStopSmoking', {data})
                }else{
                //   Actions.questionnaire()
                  navigation.navigate('Questionnaire')
                }
              }
        } catch (error) {
            failed(error)
        }
        
    }

    const renderContent = () => {
        if (showWarning) {
          return (
            <FadeInView style={{ flex: 1 }}>
              <Navbar
              showBackButton={showWarning}
              back={() => {
                goBack()
              }}
              />
    
              <View style={styles.warningContainer}>
                <View style={styles.mBottom20}>
                  <Text accessibilityLabel={`text_info_1`} style={styles.warningText}>
                    SmokeCheck® est un outil de dépistage et de sensibilisation,
                    ne fournit en aucun cas un diagnostic et ne remplace pas votre médecin.
                  </Text>
                  <Text accessibilityLabel={`text_info_2`} style={styles.warningText}>
                    Des faux négatifs ou des faux positifs sont possibles;
                    ils seront alors corrigés par votre médecin.
                  </Text>
                </View>
              </View>
              <SimpleButton style={styles.buttonsOK} title="Ok" onPress={() => nextStep()} />
            </FadeInView>
          )
        } else {
         
          const _lastCheckUp = lastCheckUp
            ? `Dernier check-up ${lastCheckUp}`
            : 'Faites votre premier check-up'
          const info = isDisabled
            ? `Vous pourrez à nouveau vous\ntester ${nextCheckUp}`
            : _lastCheckUp
          return (
            <View style={{flex: 1}}>
              <Navbar
                infoNavBar
                showBackButton={showWarning}
                back={() => {
                  goBack()
                }}
              />
              <View style={styles.content}>
                <View style={styles.buttonsWrapper}>
                  <Button
                    title="Questionnaire"
                    info={info}
                    image={require('../../assets/questionnaire.png')}
                    onPress={() => {
                      _showWarning()
                    }}
                    isDisabled={isDisabled}
                  />
                  <Button
                    style={{marginTop: 18 * RATIO_Y}}
                    title="Historique"
                    info="Retrouver vos résultats"
                    image={require('../../assets/History.png')}
                    // onPress={() => Actions.history()}
                    onPress={() => console.log('Go to history')}
                  />
                  
                </View>
                <View style={styles.footer}>
                  <TouchableOpacity
                    style={styles.legalButton}
                    accessibilityLabel={`button_legal`}
                    hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                    // onPress={() => Actions.legal()}
                    onPress={() => navigation.navigate('Legal')}
                  >
                    <Text accessibilityLabel={`text_legal`} style={styles.legalText}>Mentions légales</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }
      }

    return (
        <View style={{ flex: 1 }}>
            {renderContent()}
        </View>
    )
}

HomeScreen.navigationOptions = () => {
    return {
      header: () => false
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonsWrapper: {
        marginBottom: 150 * RATIO_Y,
      },
      footer: {
        position: 'absolute',
        bottom: 23 * RATIO_Y,
      },
      legalButton: {
        borderBottomColor: darkGray,
        borderBottomWidth: 1,
      },
      legalText: {
        color: darkGray,
        // fontFamily: adelleThin,
        fontSize: 14 * RATIO_X,
      },
      warningContainer: {
        flex: 1,
        paddingTop: 35 * RATIO_Y,
        paddingHorizontal: 52 * RATIO_X,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      warningText: {
        paddingBottom: 20 * RATIO_Y,
        // fontFamily: adelleThin,
        fontSize: 18 * RATIO_X,
        lineHeight: parseInt(25 * RATIO_Y),
        letterSpacing: 1,
        color: '#464646',
      },
      mBottom20: {
        marginBottom: 20 * RATIO_Y,
      },
      buttonsOK: {
        marginBottom: 33 * RATIO_Y,
        alignSelf: 'center',
      },
})

export default HomeScreen
