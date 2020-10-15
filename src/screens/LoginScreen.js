import React, {useContext, useState, useRef} from 'react'
import {Context as AuthContext } from '../context/AuthContext'
import CountryPicker from 'react-native-country-picker-modal';
import Navbar from '../components/navbar/component'
import Loader from '../components/loader/component'
import AsyncStorage from '@react-native-community/async-storage';

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Platform,
  Alert,
  TouchableWithoutFeedback, 
  StyleSheet, 
} from 'react-native';
import Constants from 'expo-constants';
import { sendOtp, checkOtp } from '../services/index'
import {blue, darkGray, lightGray} from '../helpers/colors'
import {RATIO_X, RATIO_Y } from '../helpers/dimension'

const MAX_LENGTH_CODE = 6;
const MAX_LENGTH_NUMBER = 20;
const MAX_LENGTH_EMAIL = 50;
const TOO_MUCH_TRY = "Vous avez essayé trop de fois. Veuillez réessayer dans:"

const countryPickerCustomStyles = {
    imgStyle: {
      height: 26,
      width: 33,
    },
    itemCountryName: {
      borderBottomWidth: 0,
    },
    letterText: {
      fontFamily: '',
    },
    countryName: {
      fontFamily: '',
    },
};

const LoginScreen = ({navigation}) => {
  const textInput = useRef('');
  const {saveUser} = useContext(AuthContext)
  
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  const [token, setToken] = useState('')
  const [enterCode, setEnterCode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockingDuration, setBlockingDuration] = useState(0)
  const [country, setCountry] = useState({
      cca2: 'FR',
      callingCode: '33'
  })
  const [loginWith, setLoginWith] = useState(null)

  const confirmPhoneNumber = () => {
    let title = '';
    let message_confirm = '';
    if (loginWith == 'email') {
      title = 'CONFIRMATION DU MAIL';
      message_confirm = '\n' + getUserLoginInput() + '\n\n' + 'Votre email ci-dessus est-il correct ?'
    }
    if (loginWith == 'phone'){
      title = 'CONFIRMATION DU NUMÉRO';
      message_confirm = '\n' + getUserLoginInput() + '\n\n' + 'Votre numéro ci-dessus est-il correct ?'
    }
    Alert.alert(title,
        message_confirm ,
        [
            {text: 'Modifier', onPress: modifyPhone},
            {text: 'Oui', onPress: getCode},
        ]
    );
  }

  const getUserLoginInput = () => {
    if (loginWith == 'email') {
      let phone_number = phoneNumber
      return phone_number
    }
    if (loginWith == 'phone') {
      let callingCode = country.callingCode
      let phone_number = '+' + callingCode + phoneNumber
      return phone_number
    }
    return null;
  }


  const getCode = async() => {
  
    try {
        setIsLoading(true)

        let loginInput = getUserLoginInput()
        let data = {};
        if (loginWith == 'email') {
          data = {
              "email": loginInput,
          }
        }
        if (loginWith == 'phone') {
          data = {
              "phone_number": loginInput,
          }
        }
        let bundleId =  Constants.deviceId;
        
        try {  
          const response = await sendOtp(data, bundleId)

          setIsLoading(false)
          setEnterCode(true)
          setToken(response.token)
          textInput.current.setNativeProps({ text: '' });
        } catch (err){
          return failed()
        }
        
    } catch (err) {
      failed()
    }
    
  }

  const verifyCode = async() => {
    
    try {
        setIsLoading(true)
        data = {
            "otp_token": code,
            "token": token
        }

        const response = await checkOtp(data)
        if (response.status !== 200) {
          failed(response.error)

          if (response.hasOwnProperty('otp_is_invalid') && response.otp_is_invalid) {
      
            setPhoneNumber('')
            setCode('')
            setEnterCode(false)

            if (response.hasOwnProperty('seconds_to_enable_generation')) {
              // User is blocked.
              setIsBlocked(true)
              setBlockingDuration(response.seconds_to_enable_generation)
            }

            textInput.current.setNativeProps({ text: '' });
          }
          return
        } else {
          setIsLoading(false)
          setEnterCode(true)
          AsyncStorage.setItem('token', token)
          const smoker = response.smoker
          if (smoker) {
            saveUser(smoker)
            AsyncStorage.setItem('user', JSON.stringify(smoker))
            navigation.navigate('Home')
          } else {
            navigation.navigate('SuccessLogin')
          }
        }

    
    }
    catch (err) {
      failed()
      }
}


    const failed = (message=null) => {
      if (!message) {
          message = 'Une erreur est survenue, Veuillez essayer ultérieurement'
      }
      Alert.alert('ERROR', message)
     setIsLoading(false)
    }

    const onChangeText = (val) => {
      if (enterCode)
          setCode(val)
      else
      setPhoneNumber(val)
    }

    const modifyPhone = () => {
      textInput.current.setNativeProps({ text: '' })
      textInput.current.focus();
      setEnterCode(false)
      setPhoneNumber('')
    
    }

    const getSubmitAction = () => {

      Keyboard.dismiss()
      enterCode ? verifyCode() : confirmPhoneNumber();

    }
  
    const changeCountry = (country) => {
      setCountry(country)
      textInput.current.focus();
    }
  
    const maxLength = () => {
      if ( enterCode ){
        return MAX_LENGTH_CODE;
      }
      if ( loginWith == 'email' ){
        return MAX_LENGTH_EMAIL;
      }
      if ( loginWith == 'phone' ){
        return MAX_LENGTH_NUMBER;
      }
      return 80;
    }

    const renderFooter = () => {

      if (enterCode) {
        if (loginWith == 'email') {
          return (
            <View style={styles.enterCodeFooter}>
              <View style={styles.enterCodeFooterView}>
                <Text accessibilityLabel={`text_wrong_number`} style={styles.enterCodeFooterText} onPress={modifyPhone}>
                    Modifier mon adresse email
                </Text>
              </View>
              <View style={[styles.enterCodeFooterView, {marginLeft: 18}]}>
                <Text accessibilityLabel={`resend_code`} style={styles.enterCodeFooterText} onPress={getCode}>
                    Renvoyer le code
                </Text>
              </View>
            </View>
          );
        }
  
        return (
          <View style={styles.enterCodeFooter}>
            <View style={styles.enterCodeFooterView}>
              <Text accessibilityLabel={`text_wrong_number`} style={styles.enterCodeFooterText} onPress={modifyPhone}>
                  Modifier le numéro
              </Text>
            </View>
            <View style={[styles.enterCodeFooterView, {marginLeft: 18}]}>
              <Text accessibilityLabel={`resend_code`} style={styles.enterCodeFooterText} onPress={getCode}>
                  Renvoyer le code
              </Text>
            </View>
          </View>
        );
      }
  
      if (loginWith == 'email') {
        return (
          <View style={styles.phoneFooter}>
            <Text accessibilityLabel={`text_disclaimer`} style={styles.disclaimerText}>
              {'En tapant "Envoyer le code d\'activation" ci-dessus, nous vous enverrons un code d\'activation par email.'}
            </Text>
          </View>
        );
      }
  
      return (
        <View style={styles.phoneFooter}>
          <Text accessibilityLabel={`text_disclaimer`} style={styles.disclaimerText}>
          {'En tapant "Envoyer le code d\'activation" ci-dessus, nous vous enverrons un code d\'activation par SMS.'}
          </Text>
        </View>
      );
  
    }

    const renderCountryPicker = () => {

      if (enterCode || loginWith == 'email')
        return;
  
      return (
        <CountryPicker
          placeholder={'+' + country.callingCode}
          filterProps={{
            placeholder: 'Entrez le nom du pays'
          }}
          withFilter
          withFlag
          withAlphaFilter
          accessibilityLabel={`country_picker`}
          // ref={'countryPicker'}
          inputRef={el => this.countryPicker = el}
          closeable
          style={styles.countryPicker}
          onSelect={changeCountry}
          cca2={country.cca2}
          styles={countryPickerCustomStyles}
          translation='fra'
          />
      );
  
    }

    const renderCallingCode = () => {

      if (enterCode || loginWith == 'email')
        return;
  
      return (
        <View style={styles.callingCodeView}>
          <Text accessibilityLabel={`calling_call_value`} style={styles.callingCodeText}> </Text>
        </View>
      );
  
    }
  
    const renderCountDown = () => {
      return (
        <View style={styles.viewCountDown}>
          <Text style={styles.textCountDown}>{TOO_MUCH_TRY}</Text>
          <CountDown
            until={blockingDuration}
            timeToShow={['M', 'S']}
            digitBgColor={'#d5eeff'}
            digitTxtColor={'blue'}
            timeTxtColor={'blue'}
            labelM={'Minutes'}
            labelS={'Secondes'}
            onFinish={() => setIsBlocked(false)}
            size={17}
          />
        </View>
      )
    }
  
    const renderChooseLogin = () => {
      if (loginWith) return;
  
      let chooseLoginHeaderText = `Choisissez votre option de connexion, se connecter avec :`;
      let buttonTextUseEmail = "Une adresse mail";
      let buttonTextUsePhone = "Un numéro de téléphone";
  
      return (
        <View style={styles.content}>
          <Text accessibilityLabel={`header_text_choose_login_type'}`} style={[styles.header, !isBlocked ? styles.headerIfNotBlocked : null]}>
            {chooseLoginHeaderText}
          </Text>
          <Text>
            {loginWith}
          </Text>
          <View style={styles.wrapperButton}>
            <TouchableOpacity
              accessibilityLabel={`button_${buttonTextUseEmail}`}
              style={styles.button}
              onPress={setEmailLogin}
              >
              <Text accessibilityLabel={`button_text_${buttonTextUseEmail}`} style={styles.buttonText}>{ buttonTextUseEmail }</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              accessibilityLabel={`button_${buttonTextUsePhone}`}
              style={styles.secondButton}
              onPress={setPhoneLogin}
              >
              <Text accessibilityLabel={`button_text_${buttonTextUsePhone}`} style={styles.buttonText}>{ buttonTextUsePhone }</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  
    const renderOTPlogin = () => {

  
      if (!loginWith) return;
  
      let headerText = "Something is wrong";
      let placeholderText = "Something is wrong";
      let keyboardType = 'email-address';
  
      if (loginWith == 'phone') {

        headerText = `Veuillez saisir ${enterCode ? `le code\nd\'activation envoyé par\nSMS au ${getUserLoginInput()}.` : 'votre numéro de téléphone (sans le 0).'}`
        placeholderText = 'Numéro de téléphone';
        keyboardType = Platform.OS === 'ios' ? 'number-pad' : 'numeric';
      }
      if (loginWith == 'email') {
        headerText = enterCode ? 'Veuillez saisir le code\nd\'activation envoyé par mail' :  'Quel est votre Email ?'
        placeholderText = 'Entrer votre Email ici :';
      }
      let buttonText = enterCode ? 'Vérifier le code d\'activation' : 'Envoyer le code d\'activation';
      let buttonBackText = 'Retour';
  
      let textStyle = {
        height: 37,
        // fontFamily: adelleRegular,
        textAlign: 'center',
        fontSize: 25,
        backgroundColor: '#ededed'
      }
  
      return (
        <View style={styles.content}>
          <Text accessibilityLabel={`header_text_${enterCode ? 'code' : 'phoneNumber'}`} style={[styles.header, !isBlocked ? styles.headerIfNotBlocked : null]}>{headerText}</Text>
  
          <View style={styles.inputContainer}>
            {renderCountryPicker()}
            {renderCallingCode()}
            <TextInput
              accessibilityLabel={`TextInput_${enterCode ? 'code' : 'phoneNumber'}`}
              ref={textInput}
              // inputRef={el => this.textInput = el}
              name={enterCode ? 'code' : 'phoneNumber' }
              type={'TextInput'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={onChangeText}
              placeholder={enterCode ? '__ __ __ __ __ __' : placeholderText}
              keyboardType={keyboardType}
              style={[ styles.textInput, textStyle ]}
              returnKeyType='go'
              placeholderTextColor={enterCode ? lightGray : blue}
              selectionColor={'#4A90E2'}
              maxLength={maxLength()}
              onSubmitEditing={getSubmitAction} />
          </View>
  
          <View style={styles.wrapperButton}>
            <TouchableOpacity
              accessibilityLabel={`button_${buttonText}`}
              style={styles.button}
              onPress={getSubmitAction}
              disabled={isBlocked || (enterCode && !code) || (!enterCode && !phoneNumber)}>
                <Text accessibilityLabel={`button_text_${buttonText}`} style={styles.buttonText}>{ buttonText }</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              accessibilityLabel={`button_${buttonBackText}`}
              style={styles.backButton}
              onPress={backToChooseLogin}
              >
                <Text accessibilityLabel={`button_text_${buttonBackText}`} style={styles.backButtonText}>{ buttonBackText }</Text>
            </TouchableOpacity>
  
            {isBlocked ? renderCountDown() : null}
            {renderFooter()}
          </View>
        </View>
  
      )
    }
  
    const setEmailLogin = () => {
      setLoginWith('email')
    }
  
    const setPhoneLogin = () => {
      setLoginWith('phone')
    }
  
    const backToChooseLogin = () => {
      setLoginWith(null)
      setPhoneNumber('')
      setCode('')
      setEnterCode(false)
    }
  
   
  
      return (
  
          <View style={{flex: 1}}>
              <Navbar
                infoNavBar
                showBackButton={false}
                back={() => {
                  navigation.goBack(null)
                }}
              />
              <Loader isLoading={isLoading}/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                  <View style={styles.content}>
  
                  {renderChooseLogin()}
                  {renderOTPlogin()}
  
                  </View>
                </TouchableWithoutFeedback>
          </View>
  
  );
}

LoginScreen.navigationOptions = () => {
  return {
    header: () => false
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  header: {
      textAlign: 'center',
      paddingHorizontal: 10,
      // fontFamily: adelleRegular,
      fontSize: 25 * RATIO_X,
      color: darkGray,
  },
  headerIfNotBlocked: {
      marginTop: 60 * RATIO_Y,
  },
  viewCountDown: {
      height: 100 * RATIO_Y,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignSelf: 'center',
  },
  textCountDown: {
      marginTop: 10 * RATIO_Y,
      // fontFamily: adelleThin,
      textAlign: 'center',
      fontSize: 16 * RATIO_X,
      color: darkGray,
      marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 20 * RATIO_X,
    marginTop: 54 * RATIO_Y,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryPicker: {
      // alignItems: 'left',
      color: 'red',
  },
  textInput: {
      padding: 0,
      margin: 0,
      flex: 1,
      // fontFamily: adelleRegular,
      fontSize: 18 * RATIO_X,
      color: blue
  },
  wrapperButton: {
      flex: 1,
      alignSelf: 'center',
      width: 313 * RATIO_X,
      marginHorizontal: 10,
      marginTop: 30 * RATIO_Y,
  },
  button: {
      height: 45 * RATIO_X,
      backgroundColor: blue,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
  },
  secondButton: {
      height: 45 * RATIO_X,
      backgroundColor: blue,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
      marginTop: 30 * RATIO_Y,
  },
  buttonText: {
      color: 'white',
      // fontFamily: adelleRegular,
      fontSize: 16 * RATIO_X,
  },
  backButton: {
      height: 30 * RATIO_X,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
      marginTop: 30 * RATIO_Y,
  },
  backButtonText: {
      color: 'grey',
      // fontFamily: adelleRegular,
      fontSize: 14 * RATIO_X,
  },
  enterCodeFooterView: {
    borderBottomWidth: 1,
    borderBottomColor: darkGray,
  },
  enterCodeFooterText: {
      textAlign: 'center',
      // fontFamily: adelleThin,
      fontSize: 16 * RATIO_X,
      letterSpacing: 0.5,
  },
  disclaimerText: {
      // fontFamily: adelleThin,
      fontSize: 14 * RATIO_X,
      color: darkGray,
      textAlign: 'center',
  },
  callingCodeView: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: 10,
      paddingLeft: 10,
  },
  callingCodeText: {
      // fontFamily: adelleRegular,
      fontSize: 18 * RATIO_X,
      color: blue,
  },
  enterCodeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 37 * RATIO_Y,
  },
  phoneFooter: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 200 * RATIO_Y,
  },
  wrapperImage: {
      marginTop: 120 * RATIO_Y,
      alignItems: 'flex-start',
  },
  successInfo: {
      textAlign: 'center',
      marginTop: 15,
      // fontFamily: adelleRegular,
      fontSize: 25 * RATIO_X,
      color: darkGray,
  },
  successImage: {
      width: 250 * RATIO_X,
      height: 200 * RATIO_Y,
      resizeMode: 'contain',
  },
})

export default LoginScreen
