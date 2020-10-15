import React, {useState, useEffect} from 'react'
import Navbar from '../components/navbar/component'
import MultipleTouchable from '../components/multiple-touchable/component'
import { StyleSheet, View, Text } from 'react-native'
import {darkGray} from '../helpers/colors'
import {RATIO_X, RATIO_Y } from '../helpers/dimension'
import { AFTER_FIRST_QUESTIONNAIRE, AFTER_YEARS, AFTER_TWO_MONTHS } from '../helpers/constants'
import { STOP_SMOKING_QUESTION_AFTER_FIRST_QUESTIONNAIRE,
         STOP_SMOKING_QUESTION_AFTER_TWO_MONTHS,
         STOP_SMOKING_QUESTION_AFTER_YEARS,
         STOP_SMOKING_QUESTION_SMOKECHECK
       } from '../config/stop_smoking_question'

import {transformSmokerDesireToStopSmokingData} from '../helpers/api'
import {sendQuestionStopSmoking} from '../services/index'


const QuestionStopSmokingScreen = (props) => {
    const appPoint = props.navigation.state.params.app_point
    const [questionState, setQuestionState] = useState(STOP_SMOKING_QUESTION_AFTER_FIRST_QUESTIONNAIRE)
    const [ans_1State, setAns_1State] = useState(null)
    const [ans_2State, setAns_2State] = useState(null)
    const [appPointState, setAppPointState] = useState(appPoint)

    useEffect(() => {
        doOnce()
    }, [appPoint])


    const doOnce = () => {
        if (appPoint === AFTER_FIRST_QUESTIONNAIRE) {
            setQuestionState(STOP_SMOKING_QUESTION_AFTER_FIRST_QUESTIONNAIRE)
            // this.state.question = STOP_SMOKING_QUESTION_AFTER_FIRST_QUESTIONNAIRE;
          } else if (appPoint === AFTER_TWO_MONTHS) {
            // this.state.question = STOP_SMOKING_QUESTION_AFTER_TWO_MONTHS;
            setQuestionState(STOP_SMOKING_QUESTION_AFTER_YEARS)

            // this.state.question = STOP_SMOKING_QUESTION_AFTER_YEARS;
          } else if (appPoint === AFTER_YEARS) {
            setQuestionState(STOP_SMOKING_QUESTION_AFTER_YEARS)

            // this.state.question = STOP_SMOKING_QUESTION_AFTER_YEARS;
        }
    }



    const _goNext = async (answer) => {

        if (appPointState === AFTER_YEARS || appPointState === AFTER_TWO_MONTHS) {
          if (!ans_1State) {
            ans_1State = answer;
            if (answer > 0 ) {
              setQuestionState(STOP_SMOKING_QUESTION_SMOKECHECK)
              return;
            } else {
              const data = {
                'app_point': appPointState,
                'response': '{ "desire_stop": ' + ans_1State + ', "SC_help": ' + ans_2State + '}'
              }
              await sendQuestionStopSmoking(data) 
              props.navigation.navigate('Questionnaire')
            }
          } else {
            ans_2State = answer;
            // ansering second question and sending the answeres
            const data = {
              'app_point': appPointState,
              'response': '{ "desire_stop": ' + ans_1State + ', "SC_help": ' + ans_2State + '}'
            }

            await sendQuestionStopSmoking(data) 
            props.navigation.navigate('Questionnaire')
        
          }
        }
        else {
          // answering one question, from old version
          const data = transformSmokerDesireToStopSmokingData(questionState.app_point, answer)
          await sendQuestionStopSmoking(data) 
          props.navigation.navigate('Result', props.navigation.state.params.dataForResult)

        }
      }

    return (
        <View style={{flex: 1}}>
            <Navbar/>
            <View style={styles.questionnaireWrapper}>
                <View style={styles.questionWrapper}>
                    <Text style={styles.question}>{questionState.question_text}</Text>
                </View>
            </View>
            <View style={styles.answerWrapper}>
                <MultipleTouchable
                    question={questionState}
                    response={{}}
                    onPress={(value) => _goNext(value)}
                />
            </View>
        </View>
    )
}

QuestionStopSmokingScreen.navigationOptions = () => {
    return {
      header: () => false
    }
}

const styles = StyleSheet.create({
    questionnaireWrapper: {
        alignSelf: 'center',
        marginTop: 50 * RATIO_Y,
        marginHorizontal: 23 * RATIO_X,
    },
      questionWrapper: {
        flexDirection: 'row',
        minHeight: 84 * RATIO_Y,
    },
    question: {
        // fontFamily: adelleRegular,
        fontSize: 25 * RATIO_X,
        textAlign: 'center',
        color: darkGray,
    },
    answerWrapper: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10 * RATIO_Y,
    },
    buttonWrapper: {
        height: 60 * RATIO_Y,
    },
    answerbutton: {
        paddingHorizontal: 5 * RATIO_X,
        alignSelf: 'center',
        paddingBottom: 9 * RATIO_Y,
        paddingTop: 2 * RATIO_Y,
    },
}) 

export default QuestionStopSmokingScreen
