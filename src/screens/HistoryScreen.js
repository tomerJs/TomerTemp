import React, {useState, useEffect} from 'react'
import {  Alert,
StyleSheet,
Image,
Text,
TouchableOpacity,
ScrollView,
View, } from 'react-native'
import Navbar from '../components/navbar/component'
import Loader from '../components/loader/component'
import {getHistory} from '../services/index'
import { formattedDate } from '../utils/utils'
import {darkGray, blue, gray} from '../helpers/colors'
import {RATIO_X, RATIO_Y } from '../helpers/dimension'
import questionnaire from '../config/questionnaire'
import SimpleButton from '../components/simple-button/component'

const HistoryScreen = (props) => {
    const [isLoadingState, setIsLoadingState] = useState(true)
    const [noHistoryState, setNoHistoryState] = useState('')
    const [dateState, setDateState] = useState([])
    const [dateIndexState, setDateIndexState] = useState(0)
    const [dataState, setDataState] = useState(undefined)
    const [keysState, setKeysState] = useState([])
    const [indexState, setIndexState] = useState(0)
    const [sideState, setSideState] = useState(null)

    useEffect(() => {
        _getHistory()
    }, [])


    const _loadData = async (index, dataHistory) => {
        if (dataHistory[index]) {
          let result = dataHistory[index]['result']
          let date = dataHistory[index]['date_created']
          let alerts = dataHistory[index]['alerts']
          setDataState({date: date, responses: result, alerts: alerts})
        }
    }

    const _getQuestionnaire = async (index) => {
        try {
          _loadData(index, keysState)
          setIndexState(index)
        } catch (err) {
          failed()
          console.log('err', err)
        }
    }

    const _next = async () => {
        try {
          const index = indexState + 1
          let dateIndex = dateIndexState
          if (index >= dateIndex + 3 && dateIndex < dateState.length - 3) {
            ++dateIndex
          }
          _loadData(index, keysState)
          setIndexState(index)
          setDateIndexState(dateIndex)
        } catch (err) {
          failed()
          console.log('err', err)
        }
    }

    const _previous = async () => {
        try {
          const index = indexState - 1
          let dateIndex = dateIndexState
          if (index <= dateIndex && dateIndex > 0) {
            --dateIndex
          }
          _loadData(index, keysState)
          setIndexState(index)
          setDateIndexState(dateIndex)
        } catch (err) {
          failed()
          console.log('err', err)
        }
    }

    const failed = (message = null) => {
        if (!message) {
            message = 'Une erreur est survenue, Veuillez essayer ultérieurement'
        }
        
        Alert.alert('', message)
        setIsLoadingState(false)
    }

    const _getHistory = async  () => {
        try {
            const response = await getHistory()
            console.log('response', response);
            if (response.status !== 200) {
                failed(response.error)
              } else {
                const dataHistory = response.history
      
                if (!dataHistory.length) {
                    setNoHistoryState("Vous n'avez pas encore complété votre premier questionnaire.")
                    setIsLoadingState(false)
                    return
                }
      
                let dates = []
                for (let i = 0; i < dataHistory.length; i++) {
                  dates.push(dataHistory[i]['date_created'])
                }
      
                setKeysState(response.history)
                setDateState(dates)
                _loadData(indexState, dataHistory)
                setIsLoadingState(false)
              }
        } catch (error) {
            failed(error)
        }
    }

    const _renderDates = (dates) => {
        let datesToDisplay = []
        for (let index = dateIndexState; index < dateIndexState + 3 && index < dates.length; index++) {
          const item = dates[index]
          datesToDisplay.push(
            <View style={styles.dateWrapper}>
                <TouchableOpacity
                    style={[styles.dateTouchable, indexState == index ? styles.activeDate : {}]}
                    onPress={() => _getQuestionnaire(index)}>
                    <Text accessibilityLabel={`text_date_questionnaire_${index}`} style={styles.date}>
                        {formattedDate(item)}
                    </Text>
                </TouchableOpacity>
            </View>
            )
        }
        return (
            datesToDisplay.map((date, index) => {
              return (
                <View
                    key={`date-${index}`}
                    style={{flex: 1, flexDirection: 'row'}}>
                    {date}
                </View>
              )
            })
        )
    }


    const _renderListOfQuestions = (questionnaire) => {
        const listOfQuestions = []
        questionnaire.map((question) => {
          listOfQuestions.push(_renderQuestion(question, dataState))
    
          if (question.subQuestions && question.subQuestions.length > 0) {
            let subQuestionNumber = new Map()
            question.subQuestions.map((subQuestion) => {
              if (subQuestion && !subQuestionNumber.get(subQuestion.number)) {
                // added the number of the susquestion to not to display twice the same subquestion
                subQuestionNumber.set(subQuestion.number, true)
                listOfQuestions.push(_renderQuestion(subQuestion, dataState))
              }
            })
          }
        })
        return listOfQuestions
    }

    const  _renderButtonDisplayAlert = () => {
        const propsOfResult = {
          algoResults: dataState.alerts,
          actionOfOk: 'pop',
        }
        return (
          <View style={styles.buttonOkWrapper} >
              <SimpleButton style={styles.buttonOK} title="Résultat" onPress={() => props.navigation.navigate('Result', propsOfResult)} />
          </View>)
    }

    const _renderQuestion = (question, data) => {
        return (
          <View style={styles.questionAnswerWrapper} key={`${question.number}`}>
            <Text accessibilityLabel={`text_question_message_${question.name}`} style={styles.question}>{question.message}</Text>
            <Text accessibilityLabel={`text_answer_${question.name}`} style={styles.answer}>{question.answers[data.responses[question.name]].answer}</Text>
          </View>
        )
    }
    

    return (
        <View style={{flex: 1}}>
            <Navbar showBackButton back={() => props.navigation.pop()}/>
            <View style={{flex: 1}}>
                <Loader isLoading={isLoadingState}/>
                {dataState ? (
                <View style={{flex: 1}}>
                    <View style={styles.selector}>
                        <TouchableOpacity accessibilityLabel={`button_back_question_${dateIndexState}`} style={styles.button} onPress={() => _previous()} disabled={indexState <= 0}>
                        <Image style={[styles.arrow, dateIndexState === 0 ? {opacity: 0} : {}]} source={require('../../assets/fillWhite2.png')} />
                        </TouchableOpacity>
                        {_renderDates(dateState)}
                        <TouchableOpacity accessibilityLabel={`button_next_question_${dateIndexState}`} style={styles.button} onPress={() => _next()} disabled={indexState >= keysState.length - 1}>
                        <Image style={[styles.arrow, indexState >= keysState.length - 1 ? {opacity: 0} : {}]} source={require('../../assets/fillWhite.png')} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{flex: 1}}>
                        <View style={styles.content}>
                        {_renderListOfQuestions(questionnaire, dataState)}
                        </View>
                    </ScrollView>
                    {_renderButtonDisplayAlert()}
                </View>
                ) : (
                <View style={styles.noHistoryView}>
                    <Text style={styles.noHistoryText}>{noHistoryState}</Text>
                </View>
                )}
            </View>
         </View>
    )
}

HistoryScreen.navigationOptions = () => {
    return {
      header: () => false
    }
}

const styles = StyleSheet.create({
    header: {
        height: 40 * RATIO_Y,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loaderContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderBackground: {
        backgroundColor: 'black',
        opacity: 0.2,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    selector: {
        marginHorizontal: 31 * RATIO_X,
        borderColor: gray,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    dateWrapper: {
        flex: 1,
        alignItems: 'flex-start',
    },
    date: {
        // fontFamily: adelleRegular,
        fontSize: 18 * RATIO_X,
        color: darkGray,
        textAlign: 'left',
    },
    activeDate: {
        borderBottomWidth: 2,
        borderBottomColor: blue,
    },
    dateTouchable: {
        height: 67 * RATIO_Y,
        paddingTop: 20,
    },
    button: {
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    separator: {
        width: 1,
        backgroundColor: '#E9E9E9',
    },
    segmentControl: {
        padding: 10,
        borderBottomColor: '#DFDFDF',
        borderBottomWidth: 1,
    },
    arrow: {
        tintColor: darkGray,
        width: 7 * RATIO_X,
        height: 13 * RATIO_Y,
        resizeMode: 'contain',
    },
    content: {
        paddingHorizontal: 30 * RATIO_X,
        paddingTop: 20 * RATIO_Y,
        paddingBottom: 30 * RATIO_Y,
    },
    questionAnswerWrapper: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: darkGray,
        marginTop: 15,
        width: 313 * RATIO_X,
        paddingHorizontal: 18 * RATIO_X,
        paddingVertical: 10 * RATIO_Y,
        alignSelf: 'center',
    },
    question: {
        flex: 2,
        // fontFamily: adelleRegular,
        fontSize: 18 * RATIO_X,
        color: darkGray,
    },
    answerWrapper: {
        flex: 1,
        flexWrap: 'nowrap',
        flexDirection: 'row',
        paddingVertical: 20 * RATIO_Y,
    },
    answer: {
        textAlign: 'left',
        // fontFamily: adelleThin,
        fontSize: 16 * RATIO_X,
        color: darkGray,
        paddingTop: 5 * RATIO_Y,
    },
    buttonOkWrapper: {
        alignItems: 'center',
        marginTop: 16 * RATIO_Y,
        marginBottom: 33 * RATIO_Y,
    },
    buttonOk: {
        width: 313 * RATIO_X,
    },
    TextDisplayAlert: {
        // fontFamily: adelleThin,
        fontSize: 20 * RATIO_X,
        letterSpacing: 3,
        color: '#ffffff',
        textAlign: 'center',
    },
    noHistoryView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 31 * RATIO_X,
    },
    noHistoryText: {
        // fontFamily: adelleRegular,
        fontSize: 20 * RATIO_X,
        color: darkGray,
        textAlign: 'center',
    },
})

export default HistoryScreen
