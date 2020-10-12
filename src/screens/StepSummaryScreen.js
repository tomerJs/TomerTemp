import React, {useState, useContext} from 'react'
import { Text, TouchableOpacity, ScrollView, View, Alert, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import {Context as AuthContext} from '../context/AuthContext'
import {darkGray} from '../helpers/colors'
import {RATIO_X, RATIO_Y } from '../helpers/dimension'
import Navbar from '../components/navbar/component'
import SimpleButton from '../components/simple-button/component'
import questionnaire from '../config/user-info'
import { addSmoker } from '../services/index'



const StepSummaryScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {saveUser} = useContext(AuthContext)

    const user  = navigation.getParam('user')


    const confirm = async () => {
        try {
           setIsLoading(true)
           const response = await addSmoker(user);
           if (response.status == 400) {
                return failed(response.error)
            }
            if (response.status !== 200) {
                return failed()
            }
            else {
                setIsLoading(false)
                AsyncStorage.setItem('user', JSON.stringify(user))
                saveUser(user)
                navigation.navigate('Home')
                // Actions.home()
            }
        }
        catch (err) {
          failed()
        }
    }

    const handleBackButton = () => {
        return true
    }
    
    const failed = (message=null) => {
          if (!message) {
              message = 'Une erreur est survenue, Veuillez essayer ultérieurement'
          }
        Alert.alert('', message)
        setIsLoading(false)
    }

    const renderSmokerInformation = (user) => {
        const dateOfStopSmoking = (
                <TouchableOpacity accessibilityLabel={`button_date_stop_smoking`}
                    style={styles.contentSummary}
                    // onPress={() => Actions.pop({ refresh: { questionIndex: 3, modifyResponse: true} })}
                    onPress={() => navigation.navigate("StepFormUser", {questionIndex: 3, modifyResponse: true, user} )}
                   >
                   <Text accessibilityLabel={`text_date_stop_smoking`} style={styles.mediumText}>Depuis le</Text>
                   <Text accessibilityLabel={`text_value_date_stop_smoking`} style={styles.smallText}>{user.date_of_stop_smoking}</Text>
                </TouchableOpacity> 
          )
        return user.smoker ? null : dateOfStopSmoking
    }

    const renderUser = (user) => {
        return (
          <View style={styles.summaryUserWrapper}>
    
            <TouchableOpacity accessibilityLabel={`button_gender`}
              style={styles.contentSummary}
              // onPress={() => Actions.pop({ refresh: {questionIndex: 0, modifyResponse: true} })}
              onPress={() => navigation.navigate("StepFormUser", {questionIndex: 0, modifyResponse: true, user} )}
             >
              <Text accessibilityLabel={`text_gender`} style={styles.mediumText}>Genre</Text>
              <Text accessibilityLabel={`text_value_gender`} style={styles.smallText}>
                {user.gender === 0 ? 'Un homme' : 'Une femme'}
              </Text>
            </TouchableOpacity>
    
            <TouchableOpacity accessibilityLabel={`button_birth_date`}
              style={styles.contentSummary}
              // onPress={() => Actions.pop({ refresh: {questionIndex: 1, modifyResponse: true} })}
              onPress={() => navigation.navigate("StepFormUser", {questionIndex: 1, modifyResponse: true, user} )}
             >
              <Text accessibilityLabel={`text_birth_date`} style={styles.mediumText}>{user.gender === 0 ? 'Né le' : 'Née le'}</Text>
              <Text accessibilityLabel={`text_value_birth_date`} style={styles.smallText}>{user.birth_date}</Text>
            </TouchableOpacity>
    
            <TouchableOpacity accessibilityLabel={`button_smoker`}
                style={styles.contentSummary}
                // onPress={() => Actions.pop({ refresh: {questionIndex: 2, modifyResponse: true} })}
                onPress={() => navigation.navigate("StepFormUser", {questionIndex: 2, modifyResponse: true, user} )}
               >
                <Text accessibilityLabel={`text_smoker`} style={styles.mediumText}>Êtes-vous ?</Text>
                <Text accessibilityLabel={`text_value_smoker`} style={styles.smallText}>
                  {user.gender === 0
                    ? user.smoker ? 'Fumeur' : 'Ancien fumeur'
                    : user.smoker ? 'Fumeuse' : 'Ancienne fumeuse'}
                </Text>
            </TouchableOpacity>
    
            {renderSmokerInformation(user)}
    
            <TouchableOpacity accessibilityLabel={`button_number_of_year_tabacco`}
              style={styles.contentSummary}
              // onPress={() => Actions.pop({ refresh: {questionIndex: 4, modifyResponse: true} })}
              onPress={() => navigation.navigate("StepFormUser", {questionIndex: 4, modifyResponse: true, user} )}
             >
              <Text accessibilityLabel={`text_number_of_year_tabacco`} style={styles.mediumText}>Pendant</Text>
              <Text accessibilityLabel={`text_value_number_of_year_tabacco`} style={styles.smallText}>{questionnaire[4]['answers'][user.number_of_year_tabacco - 1].answer}</Text>
            </TouchableOpacity>
    
            <TouchableOpacity accessibilityLabel={`button_number_of_cigarettes_per_day`}
              style={styles.contentSummary}
              // onPress={() => Actions.pop({ refresh: {questionIndex: 5, modifyResponse: true} })}
              onPress={() => navigation.navigate("StepFormUser", {questionIndex: 5, modifyResponse: true, user} )}
             >
              <Text accessibilityLabel={`text_number_of_cigarettes_per_day`} style={styles.mediumText}>Nombre de cigarettes par jour</Text>
                <Text accessibilityLabel={`text_value_number_of_cigarettes_per_day`} style={styles.smallText}>{questionnaire[5]['answers'][user.number_of_cigarette_per_day - 1].answer}</Text>
            </TouchableOpacity>
    
          {(user.smoker)
            ? (<TouchableOpacity accessibilityLabel={`button_smoker_desire_to_stop_smoking`}
                  style={styles.contentSummary}
                  // onPress={() => Actions.pop({ refresh: {questionIndex: 6, modifyResponse: true} })}
                  onPress={() => navigation.navigate("StepFormUser", {questionIndex: 6, modifyResponse: true, user} )}
                >
                  <Text accessibilityLabel={`text_button_smoker_desire_to_stop_smoking`} style={styles.mediumText}>Arrêt du tabac</Text>
                    <Text accessibilityLabel={`text_value_button_smoker_desire_to_stop_smoking`} style={styles.smallText}>{user.smoker_desire_to_stop_smoking}</Text>
                </TouchableOpacity>)
            : null}
    
            <TouchableOpacity accessibilityLabel={`button_city`}
              style={styles.contentSummary}
              // onPress={() => Actions.pop({ refresh: {questionIndex: 7, modifyResponse: true} })}
              onPress={() => navigation.navigate("StepFormUser", {questionIndex: 7, modifyResponse: true, user} )}
             >
              <Text accessibilityLabel={`text_city`} style={styles.mediumText}>Votre ville</Text>
                <Text accessibilityLabel={`text_value_city`} style={styles.smallText}>{user.city}</Text>
            </TouchableOpacity>
    
          </View>
        )
    }

    return (
        <View style={styles.content}>
            <Navbar
                infoNavBar
            />
            <View style={styles.wrapperSummary}>
                <ScrollView>
                    <Text accessibilityLabel={`text_Confirm your information`} style={styles.title}>Confirmez vos informations</Text>
                    <Text accessibilityLabel={`text_you_are`} style={styles.title}>Vous êtes :</Text>
                    {renderUser(user)}
                    <SimpleButton
                    style={{alignSelf: 'center', marginTop: 15}}
                    title="Confirmer"
                    onPress={() => confirm(user)}
                    />
                </ScrollView>
            </View>
      </View>
    )
}

StepSummaryScreen.navigationOptions = () => {
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

export default StepSummaryScreen
