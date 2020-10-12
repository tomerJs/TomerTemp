import React, {useState, useContext, useEffect} from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import questionnaire from '../config/user-info';
import {Context as AuthContext} from '../context/AuthContext'
import {Context as QuestionContext} from '../context/QuestionContext'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from '../components/date-picker/component'
import Navbar from '../components/navbar/component'
import InputButton from '../components/input-button/component'
import Footer from '../components/footer/component'
import MultipleTouchable from '../components/multiple-touchable/component'
import SimpleButton from '../components/simple-button/component'
import {darkGray} from '../helpers/colors'
import {RATIO_X, RATIO_Y } from '../helpers/dimension'
import { NavigationEvents } from 'react-navigation';

const StepFormUserScreen = ({navigation}) => {
    const [questionIndexState, setQuestionIndexState] = useState(0)
    const [userState, setUserState] = useState({})
    const [responsesState, setResponses] = useState({})
    const {saveUser} = useContext(AuthContext)
    const questionContext = useContext(QuestionContext)

    let userProp = navigation.getParam('user')
    let questionIndex = navigation.getParam('questionIndex')
    let modifyResponse = navigation.getParam('modifyResponse')




    useEffect(() => {
        if(modifyResponse){
          setQuestionIndexState(questionIndex)
        }
    }, [questionIndex, modifyResponse, questionIndexState])


    const handleBackButton = () => {
        return true
    }

    const nextQuestion = (id, value) => {
        let _questionIndex = questionIndexState + 1
        let user = userProp ? userProp : userState
    
        console.log('VALLLLL', value
        );
        
        let responses = responsesState
        responses[id] = value
    
        if(modifyResponse){
          if (id === 0) {
            user.gender = value
          } else if (id === 1) {
            let __val = value.toISOString().split('T')[0].split('-')
            let parsed = __val[2] + '/' + __val[1] + '/' + __val[0]
            user.birth_date = parsed
          } else if (id === 2) {
            user.smoker = value
          } else if (id === 3) {
            let __val = value.toISOString().split('T')[0].split('-')
            let parsed = __val[2] + '/' + __val[1] + '/' + __val[0]
            user.date_of_stop_smoking = parsed
          } else if (id === 4) {
            user.number_of_year_tabacco = value
          } else if (id === 5) {
            user.number_of_cigarette_per_day = value
          } else if (id === 6) {
            user.smoker_desire_to_stop_smoking = value
          } else if (id === 7) {
            user.city = value
          }
          saveUser(user)
        } else {
          if (id === 0) {
            user.gender = value
          } else if (id === 1) {
            let __val = value.toISOString().split('T')[0].split('-')
            let parsed = __val[2] + '/' + __val[1] + '/' + __val[0]
            user.birth_date = parsed
          } else if (id === 2) {
            user.smoker = value
            if (value === 1) {
              _questionIndex = _questionIndex + 1
              delete user.date_of_stop_smoking;
              if (modifyResponse) {
                _questionIndex = 6
              }
            }
          } else if (id === 3) {
            let __val = value.toISOString().split('T')[0].split('-')
            let parsed = __val[2] + '/' + __val[1] + '/' + __val[0]
            user.date_of_stop_smoking = parsed
          } else if (id === 4) {
            user.number_of_year_tabacco = value
          } else if (id === 5) {
            user.number_of_cigarette_per_day = value
            if (user.smoker === 0) {
              _questionIndex = _questionIndex + 1
              delete user.smoker_desire_to_stop_smoking;
            }
          } else if (id === 6) {
            user.smoker_desire_to_stop_smoking = value
          } else if (id === 7) {
            user.city = value
          }
        }
        console.log('USER', user);
   
        if (_questionIndex > 7 || modifyResponse) {
            navigation.navigate('StepSummary', {user})
          } else {
            setResponses(responses)
            setQuestionIndexState(_questionIndex)
            setUserState(user)
          }

    }

    const previousQuestion = () => {
        let _questionIndex = questionIndexState - 1
        if ((userState.smoker === 1 && _questionIndex === 3) || (userState.smoker === 0 && _questionIndex === 6)) {
          _questionIndex = _questionIndex - 1
        }
        if (_questionIndex < 0) {
        //   Actions.pop()
            navigation.goBack()
        } else {
          setQuestionIndexState(_questionIndex)
        }
    }
    
    const renderQuestion = (question) => {
   
        if (question.type === 'TEXT-TOGETHER') {
          return renderTwoQuestion(question)
        }
        let message = question.message
        return (
          <View style={styles.wrapperQuestion}>
            <Text accessibilityLabel={`question_${question.name}`} style={styles.title}>{message}</Text>
            {renderAnswers(question)}
          </View>
        )
    }

    const renderTwoQuestion = (question) => {
        let question1 = question.questions[0]
        let question2 = question.questions[1]
        return (
          <KeyboardAwareScrollView contentContainerStyle={styles.wrapperQuestion}>
            <Text accessibilityLabel={`question_${question1.name}`} style={styles.title}>{question1.message}</Text>
            {renderAnswers(question1)}
            <Text accessibilityLabel={`question_${question2.name}`} style={styles.title}>{question2.message}</Text>
            {renderAnswers(question2)}
            <SimpleButton
              title="Ok"
              style={{marginTop: 15}}
              onPress={() => {
                let values = [
                  {
                    id: question1.id,
                    value: question1.value,
                  },
                  {
                    id: question2.id,
                    value: question2.value,
                  },
                ]
                nextQuestion(question.id, values)
              }}
            />
          </KeyboardAwareScrollView>
        )
      }
    
    const renderAnswers = (question) => {
        switch (question.type) {
            case 'TEXT':
                return (
                    <View style={styles.contentAnswer}>
                      <InputButton
                        defaultValue={responsesState[question.id]}
                        name={question.name}
                        keyboardType='default'
                        onPress={value => nextQuestion(question.id, value)}
                      />
                    </View>
            )
            case 'TEXT-TOGETHER':
                return (
                  <View style={styles.wrapperTwiceAnswer}>
                      <View style={styles.input}>
                        <TextInput accessibilityLabel={`text_input_${question.name}`} key={`text_input_${question.name}`}
                          underlineColorAndroid={'transparent'}
                          autoFocus={false}
                          keyboardType={'default'}
                          showDoneButton={true}
                          maxLength={question.maxLength}
                          style={{flex: 1}}
                          defaultValue={question.value}
                          onChangeText={(value) => (
                            question.value = value
                          )}
                          />
                      </View>
                  </View>
              )
            case 'SELECT':
              ;
                return (<MultipleTouchable
                    question={question}
                    response={responsesState[question.id]}
                    onPress={(value) => nextQuestion(question.id, value)}
                  />)
            case 'DATE':
                return (
                    <View style={styles.contentAnswer}>
                        <DatePicker
                          onPress={value => nextQuestion(question.id, value)}
                          date={
                            question.id === 1
                            ? userState.birth_date
                            : question.id === 5
                              ? userState.date_of_stop_smoking
                              : ''
                          }
                        />
                    </View>
                )
            default: {
              let questionAnswers = JSON.parse(JSON.stringify(question))
              let user = userProp ? userProp : userState
              
              if (questionAnswers.type === 'CHOICE-GENDER') {
                if (user.gender === 0) {
                  questionAnswers.answers.splice(2, 2)
                } else {
                  questionAnswers.answers.splice(0, 2)
                }
              }
    
              return (
                  <MultipleTouchable
                    question={questionAnswers}
                    response={responsesState[questionAnswers.id]}
                    onPress={(value) => nextQuestion(question.id, value)}
                    twoAnswer
                    embeddedImage
                  />
              )
            }
        }
      }
    
    const _renderFooter = () => {
          if (modifyResponse) {
            return <View></View>
          } else {
            return <Footer
                index={questionIndexState + 1}
                nbOfQuestions={questionnaire.length}/>
        }
    }
    

    return (
        <View style={styles.content}>
        <Navbar
          infoNavBar
          showBackButton={!modifyResponse}
          back={() => previousQuestion()}
        />
        
        {renderQuestion(questionnaire[questionIndexState])}
        {_renderFooter()}
      </View>
    )
}

StepFormUserScreen.navigationOptions = () => {
    return {
      header: () => false
    }
}

// StepFormUserScreen.defaultProps = {
//     userProp: {},
//     modifyResponse: false,
//     questionIndex: 0
// };

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
    wrapperStart: {
      flex: 1,
      paddingHorizontal: 31 * RATIO_X,
      paddingTop: 160 * RATIO_Y,
      paddingBottom: 33 * RATIO_Y,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    wrapperQuestion: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20 * RATIO_X,
      paddingBottom: 80 * RATIO_Y,
    },
    wrapperSummary: {
      flex: 1,
      paddingHorizontal: 20 * RATIO_X,
      paddingTop: 15 * RATIO_X,
      marginBottom: 38 * RATIO_Y,
    },
    title: {
      textAlign: 'center',
    //   fontFamily: adelleRegular,
      fontSize: 25 * RATIO_X,
      color: darkGray,
    },
    consentTitle: {
      textAlign: 'center',
      paddingBottom: 25 * RATIO_Y,
    //   fontFamily: adelleRegular,
      fontSize: 25 * RATIO_X,
      lineHeight: parseInt(37 * RATIO_Y),
      color: darkGray,
      paddingHorizontal: 31 * RATIO_X,
    },
    consentText: {
    //   fontFamily: adelleThin,
      fontSize: 18 * RATIO_X,
      marginBottom: 20 * RATIO_Y,
      lineHeight: parseInt(30 * RATIO_Y),
      color: darkGray,
    },
    wrapperButton: {
      marginTop: 44 * RATIO_Y,
      alignItems: 'center',
    },
    information: {
      paddingHorizontal: 31 * RATIO_X,
    //   fontFamily: adelleThin,
      fontSize: 18 * RATIO_X,
      marginBottom: 20 * RATIO_Y,
      color: darkGray,
    },
    smallText: {
    //   fontFamily: adelleThin,
      fontSize: 15 * RATIO_X,
    },
    mediumText: {
    //   fontFamily: adelleRegular,
      fontSize: 20 * RATIO_X,
      color: darkGray,
    },
    contentAnswer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 20 * RATIO_Y,
    },
    wrapperTwiceAnswer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 30 * RATIO_Y,
      marginBottom: 40 * RATIO_Y,
    },
    input: {
      width: 300 * RATIO_X,
      height: 52 * RATIO_Y,
      backgroundColor: '#ffffff',
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#DDDDDD',
      paddingLeft: 10 * RATIO_X,
    },
    summaryUserWrapper: {
      flex: 1,
      alignItems: 'center',
      marginTop: 15 * RATIO_Y,
    },
    contentSummary: {
      flex: 1,
      width: 313 * RATIO_X,
      height: 92 * RATIO_Y,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      borderColor: darkGray,
      borderWidth: 1,
      borderRadius: 3,
      paddingRight: 31 * RATIO_X,
      paddingLeft: 31 * RATIO_X,
      marginTop: 12 * RATIO_Y,
    },
  })

export default StepFormUserScreen
