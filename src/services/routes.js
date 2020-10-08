// DEV
// const API_URL = 'REPLACE ME'

// ATE - APP Build 1
export const API_URL = 'https://app.smokecheck.fr/'

// AWS - VALIDATION Build 2
// export const API_URL = 'https://qa-app.smokecheck.fr/'

// AWS - DEMO Build 3
// export const API_URL = 'https://demo-app.smokecheck.fr/'

// ATE - VALIDATION Build 4
// export const API_URL = 'https://test-app.smokecheck.fr/'

// ATE - APP
// export const API_URL = 'http://192.168.1.216:8000/'

const API_ACCOUNT = 'accounts/'
const API_QUESTIONNAIRE = 'questionnaire/'
const API_ALERT = 'alert/'

const SENDQUESTIONNAIRE_VERSION = "v2/"
const CHECKALERT_VERSION = "v2/"
const GETHISTORY_VERSION = "v1/"

const SENDOTP = 'sendotp'
const CHECKOTP = 'checkotp'
const ADDSMOKER = 'addsmoker'
const STOPSMOKING = 'update/smoker_desire_to_stop_smoking'
const SENDQUESTIONNAIRE = 'send'
const CHECKALERT = 'checkalert'
const GETHISTORY = 'history'

export const apiSendOtp = API_URL + API_ACCOUNT + SENDOTP

export const apiCheckOtp = API_URL + API_ACCOUNT + CHECKOTP

export const apiAddSmoker = API_URL + API_ACCOUNT + ADDSMOKER

export const apiSendQuestionStopSmoking = API_URL + API_ACCOUNT + STOPSMOKING

export const apiSendQuestionnaire = API_URL + API_QUESTIONNAIRE + SENDQUESTIONNAIRE_VERSION + SENDQUESTIONNAIRE

export const apiCheckAlert = API_URL + API_ALERT + CHECKALERT_VERSION + CHECKALERT

export const apiGetHistory = API_URL + API_QUESTIONNAIRE + GETHISTORY_VERSION + GETHISTORY

export const apiGetAppPoint = API_URL + API_QUESTIONNAIRE + "app_point"
