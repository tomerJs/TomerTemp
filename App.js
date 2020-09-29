import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './src/screens/HomeScreen'
import LoadingScreen from './src/screens/LoadingScreen'
import SplashScreen from './src/screens/SplashScreen'
import {Provider as AuthPtovider} from './src/context/AuthContext'
import LoginScreen from './src/screens/LoginScreen'
import {setNavigator} from './src/navigationRef'

const stackNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  Splash: SplashScreen,
  loginFlow: createStackNavigator({
    Login: LoginScreen
  }),
  mainFlow: createStackNavigator({
    Home: HomeScreen
  })

})

const App = createAppContainer(stackNavigator)

export default () => {
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