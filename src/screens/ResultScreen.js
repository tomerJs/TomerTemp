import React, {useContext} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {darkGray, blue} from '../helpers/colors'
import {RATIO_X, RATIO_Y } from '../helpers/dimension'
import {Context as AuthCotext} from '../context/AuthContext'
import {Context as QuestionContext} from '../context/QuestionContext'
import Navbar from '../components/navbar/component'
import SimpleButton from '../components/simple-button/component'


const ResultScreen = (props) => {
    const {state: {user}} = useContext(AuthCotext)
    const {resetAnswers} = useContext(QuestionContext)

    const algoResults = props.navigation.getParam('algoResults')
    let title = algoResults && algoResults.length > 0 ? 'Nous conseillons une consultation.' : 'Tout semble normal.'


    const _renderContent = (algoResults, user) => {
        if (algoResults.length > 0) {
          let listOfAlerts = []
          algoResults.forEach((algoResult, key) => {
            let alert = algoResult.hasOwnProperty('message') ? algoResult.message: algoResult
            let component = (<View key={`view_alert_${key}`} style={styles.algoResult}>
            <Text style={styles.pointText}>•</Text>
            <Text accessibilityLabel={`text_alert_${key}`} key={`alert-${key}`} style={styles.text}>{alert}</Text>
          </View>)
    
            listOfAlerts.push(component)
          })
          return (
            <View>
              <Text style={[styles.subTitle]}>Les symptômes suivants nécessitent un avis médical:</Text>
              {listOfAlerts}
              <Text style={[styles.subTitle]}>Nous vous conseillons d’établir un diagnostic auprès de votre médecin traitant.</Text>
            </View>
          )
        } else {
          return (
            <Text style={[styles.subTitle]}>Aucune anomalie n’a été détéctée dans votre questionnaire.</Text>
          )
        }
    }
    
    const _onPressOK = (data) => {
        if(data.hasOwnProperty('actionOfOk') && data.actionOfOk == "pop" ) {
            props.navigation.pop()
        }
        else {
            const nextScreen = (data.hasOwnProperty('nextScreen')) ? data.nextScreen : 'Home'
            const dataForNextAction = (data.hasOwnProperty('dataForNextAction')) ? data.dataForNextAction : {}
    
            props.navigation.navigate(nextScreen, dataForNextAction)
            // Actions[nextScreen](dataForNextAction)
        }
    }
    

    return (
        <View style={{flex: 1}}>
            <Navbar bigNavbar />
            <ScrollView style={{flex: 1}} contentContainerStyle={[styles.wrapper]}>
                <Text accessibilityLabel={`text_${title}`} style={styles.title}>{title}</Text>
                {_renderContent(algoResults, user ? user : {})}
                <SimpleButton
                    style={styles.buttonOK}
                    title='Ok'
                    onPress={() => _onPressOK(props.navigation.state.params)}
                />
            </ScrollView>
        </View>
    )
}

ResultScreen.navigationOptions = () => {
    return {
      header: () => false
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flexGrow: 1,
        paddingHorizontal: 31 * RATIO_X,
        paddingTop: 45 * RATIO_Y,
        paddingBottom: 110 * RATIO_Y,
    },
    title: {
        paddingBottom: 31 * RATIO_Y,
        textAlign: 'center',
        // fontFamily: adelleRegular,
        fontSize: 25 * RATIO_X,
        color: darkGray,
    },
    subTitle: {
        marginTop: 15 * RATIO_Y,
        // fontFamily: adelleThin,
        fontSize: 18 * RATIO_X,
        lineHeight: parseInt(25 * RATIO_Y),
        color: darkGray,
    },
    algoResult: {
        flexDirection: 'row',
        marginTop: 10 * RATIO_Y,
    },
    pointText: {
        fontSize: 30 * RATIO_X,
        alignSelf: 'center',
        color: blue,
    },
    text: {
        marginLeft: 16 * RATIO_X,
        alignSelf: 'center',
        // fontFamily: adelleThin,
        fontSize: 18 * RATIO_X,
        color: darkGray,
    },
    buttonOK: {
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 26 * RATIO_Y,
        bottom: 35 * RATIO_Y,
    },
})

export default ResultScreen
