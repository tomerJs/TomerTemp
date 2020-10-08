import PushNotification from 'react-native-push-notification'
// import { PushNotificationIOS } from 'react-native'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import moment from 'moment/min/moment-with-locales'

const configure = () => {
  PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
      // process the notification

      // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
      notification.finish(PushNotificationIOS.FetchResult.NoData)
    },
  })
}

const localNotificationSchedule = (date) => {
  moment.locale('fr')

  PushNotification.localNotificationSchedule({
    title: 'Nouveau questionnaire SmokeCheck',
    message: 'Merci de compléter votre nouveau questionnaire SmokeCheck.',
    date: date,
  })
}

const cancelAllLocalNotifications = () => {
  PushNotification.cancelAllLocalNotifications()
}

export {
 configure,
 localNotificationSchedule,
 cancelAllLocalNotifications,
}
