import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './src/screens/HomeScreen'
import LoadingScreen from './src/screens/LoadingScreen'
import SplashScreen from './src/screens/SplashScreen'
import {Provider as AuthPtovider} from './src/context/AuthContext'
import LoginScreen from './src/screens/LoginScreen'
import {setNavigator} from './src/navigationRef'
import SuccessLogin from './src/screens/SuccessLogin'
import StepInitScreen from './src/screens/StepInitScreen'
import StepConsentScreen from './src/screens/StepConsentScreen'
import StepInfoScreen from './src/screens/StepInfoScreen'
import StepFormUserScreen from './src/screens/StepFormUserScreen'
import StepSummaryScreen from './src/screens/StepSummaryScreen'
import { LogBox } from 'react-native';

const stackNavigator = createSwitchNavigator({
  // Loading: LoadingScreen,
  Splash: SplashScreen,
  SuccessLogin: SuccessLogin,
  loginFlow: createStackNavigator({
    Login: LoginScreen
  }),
  firstFlow: createStackNavigator({
    StepInit: StepInitScreen,
    StepConsent: StepConsentScreen,
    StepInfo: StepInfoScreen,
    StepFormUser: StepFormUserScreen,
    StepSummary: StepSummaryScreen,
  }),
  mainFlow: createStackNavigator({
    Home: HomeScreen
  })

})

const App = createAppContainer(stackNavigator)

export default () => {
  // LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  return (
    <AuthPtovider>
      <App
        ref={(navigator) => {
          setNavigator(navigator)
        }}
        />
    </AuthPtovider>
    
  )
}