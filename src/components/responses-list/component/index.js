import React, {useContext, useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
// import { Actions } from 'react-native-router-flux'
import {Context as QuestionContext} from '../../../context/QuestionContext'
import {navigate} from '../../../navigationRef'
import {darkGray} from '../../../helpers/colors'
import {RATIO_X, RATIO_Y} from '../../../helpers/dimension'

const ResponsesList = ({navigation}) =>  {
  const {state : {userAnswers}} = useContext(QuestionContext)
  const [responsesListState, setResponsesListState] = useState([])


  useEffect(() => {
    doOnce();
  }, [userAnswers])

  const doOnce = () => {
    const responsesList = []
    userAnswers.forEach((userResponse, key) => {
  
      responsesList.push(
        <TouchableOpacity
          accessibilityLabel={`button_reponse_${userResponse.number}`}
          key={`${key}-response`}
          style={styles.wrapper}
          onPress={() =>
            navigate('Questionnaire', {
              index: userResponse.questionId,
              modifyResponse: true,
              oldAnswerSelected: userResponse.value,
              comeBack: false,
            })
          }>
          <Text accessibilityLabel={`text_reponse_question_${userResponse.number}`} style={styles.question}>{userResponse.question}</Text>
          <Text accessibilityLabel={`text_reponse_value_${userResponse.number}`} style={styles.response}>
            {userResponse.type === 'TEXT' ? userResponse.value + ' ' : ''}{userResponse.answer}</Text>
        </TouchableOpacity>
      )
    })

    setResponsesListState(responsesList)
  }

 
    return (
      <View style={styles.container}>
        {responsesListState}
      </View>
    )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    width: 313 * RATIO_X,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: darkGray,
    borderWidth: 1,
    borderRadius: 3,
    paddingRight: 31 * RATIO_X,
    paddingLeft: 31 * RATIO_X,
    paddingTop: 12 * RATIO_Y,
    paddingBottom: 12 * RATIO_Y,
    marginBottom: 13 * RATIO_Y,
  },
  questionWrapper: {
    flex: 2,
    flexDirection: 'row',
    marginLeft: 40 * RATIO_X,
  },
  question: {
    // fontFamily: adelleRegular,
    fontSize: 18 * RATIO_X,
    color: darkGray,
  },
  response: {
    marginTop: 12 * RATIO_Y,
    // fontFamily: adelleThin,
    fontSize: 16 * RATIO_X,
  },
})

export default ResponsesList
