import React, {useContext, useState, useEffect} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import questionnaire from '../config/questionnaire'
import {Context as QuestionContext} from '../context/QuestionContext';
import Footer from '../components/footer/component'
import Navbar from '../components/navbar/component'
import SpringSide from '../components/animations/component/spring-side'
import {darkGray} from '../helpers/colors'
import {RATIO_X, RATIO_Y } from '../helpers/dimension'
import MultipleTouchable from '../components/multiple-touchable/component'


const QuestionnaireScreen = ({navigation}) => {
    const [indexState, setIndexState] = useState(0)
    const [question, setQuestion] = useState(questionnaire[0])
    const [answerSelected, setAnswerSelected] = useState(null)
    const [responsesState, setResponsesState] = useState([])
    const [side, setSide] = useState('right')
    const {addAnswer, removeAnswer, resetAnswers} = useContext(QuestionContext)

    let indexParam = navigation.getParam('index')
    let modifyResponseParam = navigation.getParam('modifyResponse')
    let oldAnswerSelectedParam = navigation.getParam('oldAnswerSelected')
    let comeBackParam = navigation.getParam('comeBack')

    useEffect(() => {
        if(comeBackParam){
            const lastIndex = questionnaire.length - 1
            setIndexState(lastIndex)
            setQuestion(questionnaire[lastIndex])
            removeAnswer(questionnaire[lastIndex].number)
        }

        if(modifyResponseParam){
            setIndexState(indexParam)
            setQuestion(questionnaire[indexParam])
        }
    }, [comeBackParam, modifyResponseParam])


    const _goBack = () => {
        if (indexState === 0) {
            return navigation.goBack({refresh: {showWarning: false}})
        //   return Actions.pop({refresh: {showWarning: false}})
        } else {
          const prevIndex = indexState - 1
          setIndexState(prevIndex)
          setQuestion(questionnaire[prevIndex])
          setSide('left')
          removeAnswer(questionnaire[prevIndex].number)
        }
    }


    const _goNext = (answerIndex, value) => {
        addAnswer(question, value)
    
        let responses = responsesState
        responses[answerIndex] = value

        setResponsesState(responses)
        setAnswerSelected(answerIndex)
        setSide('right')
    
        if (question.subQuestions && question.subQuestions[answerIndex]) {
            setQuestion(question.subQuestions[answerIndex])
        } else {
          const nextIndex = indexState + 1
          if (questionnaire[nextIndex] && !modifyResponseParam) {
              setIndexState(nextIndex)
              setQuestion(questionnaire[nextIndex])
          } else {
            // Actions.summary()
            navigation.navigate('Summary')
          }
        }
        setAnswerSelected(null)
    }
    
    const _renderFooter = () => {
        if (modifyResponseParam) {
            return <View></View>
          } else {
            return <Footer index={indexState + 1} nbOfQuestions={questionnaire.length}></Footer>
        }
    }



    return (
        <View style={{flex: 1}}>
            <Navbar
            showBackButton={!modifyResponseParam}
            back={_goBack}
            />
            <View style={styles.viewWrapper}>
            <View style={styles.questionnaireWrapper}>
                <View style={styles.questionWrapper}>
                <Text accessibilityLabel={`text_question_message_${question.number}`} style={styles.question}>{`${question.number}. ${question.message}`}</Text>
                </View>
            </View>
            <SpringSide key={`answer-$${question.id}`} delay={100 + question.id * 50} side={side}>
                <MultipleTouchable
                question={question}
                response={responsesState[question.id]}
                onPress={(value) => _goNext(question.id, value)}
                twoAnswer
                />
            </SpringSide>
            </View>
        {_renderFooter()}
      </View>
    )
}

QuestionnaireScreen.navigationOptions = () => {
    return {
      header: () => false
    }
}

const styles = StyleSheet.create({
    viewWrapper: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50 * RATIO_Y,
      },
      questionnaireWrapper: {
        alignSelf: 'stretch',
        marginTop: 50 * RATIO_Y,
        marginHorizontal: 31 * RATIO_X,
      },
      questionWrapper: {
        flexDirection: 'row',
        minHeight: 84 * RATIO_Y,
      },
      question: {
        // fontFamily: adelleRegular,
        fontSize: 20 * RATIO_X,
        letterSpacing: 1.8,
        color: darkGray,
      },
      questionNumber: {
        position: 'absolute',
        top: 0,
        left: -23 * RATIO_X,
      },
      answerWrapper: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10 * RATIO_Y,
      },
})

export default QuestionnaireScreen
