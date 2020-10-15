import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import {Alert} from 'react-native'
import { MINUTE_FOR_NOTIFICATION } from '../helpers/constants'
import moment from 'moment/min/moment-with-locales'


let identifier;
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('', 'Failed to get push token for push notification!')
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    Alert.alert('', 'Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const localNotificationSchedule = async (date) => {
  moment.locale('fr')
  const trigger = new Date(date.getTime()) 
  identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Nouveau questionnaire SmokeCheck',
      body: 'Merci de compléter votre nouveau questionnaire SmokeCheck.',
    },
    trigger
  });
}


const cancelAllLocalNotifications = () => {
   Notifications.cancelScheduledNotificationAsync(identifier);
}

export {
  registerForPushNotificationsAsync,
  localNotificationSchedule,
  cancelAllLocalNotifications,
 }