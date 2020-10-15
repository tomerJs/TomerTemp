import React, {useState, useContext} from 'react'
import { StyleSheet, View, Alert, ScrollView, Text } from 'react-native'
import {Context as QuestionContext} from '../context/QuestionContext'
import {Context as AuthCotext} from '../context/AuthContext'
import { sendQuestionnaire, checkAlert } from '../services/index'
import AsyncStorage from '@react-native-community/async-storage';
import {darkGray} from '../helpers/colors'
import {RATIO_X, RATIO_Y } from '../helpers/dimension'
import {AFTER_FIRST_QUESTIONNAIRE, HOUR_FOR_NOTIFICATION, MINUTE_FOR_NOTIFICATION } from '../helpers/constants'
import Navbar from '../components/navbar/component'
import ResponsesList from '../components/responses-list/component'
import SimpleButton from '../components/simple-button/component'
import Loader from '../components/loader/component'
import moment from 'moment/min/moment-with-locales'
import * as pushNotifications from '../services/pushNotifications'


const SummaryScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {state, resetAnswers} = useContext(QuestionContext)
    const authContext = useContext(AuthCotext)
    const user = authContext.state.user
    
    const failed = (message = null) =>  {
        if (!message) {
            message = 'Une erreur est survenue, Veuillez essayer ultérieurement'
        }
        Alert.alert('', message)
        setIsLoading(false)
    }

    const _confirm = async () => {
        const resultData = state.userAnswers
        
        try {
            setIsLoading(true)
            const response = await sendQuestionnaire(resultData);
            if (response.status !== 200) {
                return failed(response.error)
            } else {
               _savelastCheckUp()


               // Cancel all old notifications and add 2 new notifications (for 2 consecutive days).
                pushNotifications.cancelAllLocalNotifications()

                const returnDate = response.date_for_next_questionnaire

                let dateForFirstNotification = moment(returnDate, 'DDMMYYYY')
                dateForFirstNotification.set({hour: HOUR_FOR_NOTIFICATION, minute: MINUTE_FOR_NOTIFICATION})
                pushNotifications.localNotificationSchedule(dateForFirstNotification.toDate())
                

                /////////////// test /////////////////
                // let date = moment('15/10/2020', 'DDMMYYYY');
                // date.set({hour: 12, minute: 14});
                // pushNotifications.localNotificationSchedule(date.toDate())
                /////////////// end test /////////////////





                const numberOfMonthForNextQuestionnaire = dateForFirstNotification.diff(moment(), 'months')
                const dateForSecondNotification = dateForFirstNotification.add(2, 'months')
                pushNotifications.localNotificationSchedule(dateForSecondNotification.toDate())
            


                const alretResponse = await checkAlert()

                if(alretResponse.status !== 200){
                    return failed(alretResponse.error)
                } else {
                    resetAnswers()
                    let dataToAction = {algoResults: alretResponse.alerts}
                    let nextScreen = 'Result'
                    if ( response.hasOwnProperty('app_point') && response.app_point == AFTER_FIRST_QUESTIONNAIRE ) {
                      nextScreen = 'QuestionStopSmoking'
                      dataToAction.app_point = response.app_point
                      dataToAction.dataForResult = {
                        algoResults: alretResponse.alerts,
                        nextScreen: 'Prevention',
                        dataForNextAction: {number_of_month_for_next_questionnaire: numberOfMonthForNextQuestionnaire},
                      }
                    } else if (user.smoker) {
                      dataToAction.nextScreen = 'Prevention'
                      dataToAction.dataForNextAction = {
                        number_of_month_for_next_questionnaire: numberOfMonthForNextQuestionnaire,
                      }
                    }
                    
                    navigation.navigate(nextScreen, dataToAction)
                }
            }

        } catch (error) {
            failed(error.message)
        }

    }

    const _savelastCheckUp = async () => {
        try {
            const dateLastCheckUp =  new Date().getTime()
            await AsyncStorage.setItem('lastCheckUp', dateLastCheckUp.toString())
        } catch (err) {
            failed(err.message)
            console.log('error', err)
        }
    }


    return (
        <View style={{flex: 1}}>
            <Navbar
                // back={() => Actions.pop({refresh: {comeBack: true, modifyResponse: false, oldAnswerSelected: null}})}
                back={() => navigation.goBack({refresh: {comeBack: true, modifyResponse: false, oldAnswerSelected: null}})}
            />
            <Loader isLoading={isLoading}/>
            <View style={styles.content}>
                <ScrollView style={styles.scroll}>
                    <Text accessibilityLabel={`text_summary`} style={styles.textHeader}>Récapitulatif - cliquer pour modifier.</Text>
                    <ResponsesList/>
                    <SimpleButton
                    style={styles.summaryButton}
                    title={'Confirmation'}
                    onPress={_confirm}
                    />
                </ScrollView>
            </View>
      </View>
    )
}

SummaryScreen.navigationOptions = () => {
    return {
      header: () => false
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 20 * RATIO_X,
        paddingTop: 50 * RATIO_X,
    },
    textHeader: {
        textAlign: 'center',
        // fontFamily: adelleRegular,
        fontSize: 25 * RATIO_X,
        paddingBottom: 32 * RATIO_X,
        color: darkGray,
    },
    scroll: {
        flex: 1,
    },
    summaryButton: {
        alignSelf: 'center',
        marginTop: 17 * RATIO_Y,
        marginBottom: 38 * RATIO_Y,
    },
})

export default SummaryScreen
