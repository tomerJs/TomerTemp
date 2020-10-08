import {
  apiSendOtp,
  apiCheckOtp,
  apiAddSmoker,
  apiSendQuestionStopSmoking,
  apiSendQuestionnaire,
  apiCheckAlert,
  apiGetHistory,
  apiGetAppPoint
} from './routes'
import {
  getDataPackage,
  transformAddSmokerData,
  transformSendQuestionnaireData
} from '../helpers/api'
import {
  getToken
} from '../helpers/utils'

export function sendOtp(data, sendOtpToken) {
  const dataToSend = getDataPackage(data)

  dataToSend['headers'] = {
    ...dataToSend['headers'],
    'X-SendOtpToken': sendOtpToken,
  }
  return fetch(apiSendOtp, dataToSend)
    .then(response => response.json())
    .then(res => {
      console.log(JSON.stringify(res))
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

export async function getAppPoint(data) {
  token = await getToken()
  const dataToSend = getDataPackage(data, token, method = 'GET')
  return fetch(apiGetAppPoint, dataToSend)
    .then(response => response.json())
    
    .then(res => {
      console.log(JSON.stringify(res))
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

export function checkOtp(data) {
  const dataToSend = getDataPackage(data)
  return fetch(apiCheckOtp, dataToSend)
    .then(response => response.json())
    .then(res => {
      console.log(JSON.stringify(res))
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

export async function addSmoker(data) {
  token = await getToken()
  const dataTransformed = await transformAddSmokerData(data)
  const dataToSend = getDataPackage(dataTransformed, token)
  return fetch(apiAddSmoker, dataToSend)
    .then(response => response.json())
    .then(res => {
      console.log(JSON.stringify(res))
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

export async function sendQuestionnaire(data) {
  token = await getToken()
  const dataTransformed = transformSendQuestionnaireData(data)
  const dataToSend = getDataPackage(dataTransformed, token)
  return fetch(apiSendQuestionnaire, dataToSend)
    .then(response => response.json())
    .then(res => {
      console.log(JSON.stringify(res))
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

export async function checkAlert(data) {
  token = await getToken()
  const dataToSend = getDataPackage(data, token)
  return fetch(apiCheckAlert, dataToSend)
    .then(response => response.json())
    .then(res => {
      console.log(JSON.stringify(res))
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

export async function getHistory(data) {
  token = await getToken()
  const dataToSend = getDataPackage(data, token, method = 'GET')
  return fetch(apiGetHistory, dataToSend)
    .then(response => response.json())
    .then(res => {
      console.log(JSON.stringify(res))
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

export async function sendQuestionStopSmoking(data) {
  const token = await getToken()
  const dataToSend = getDataPackage(data, token)
  return fetch(apiSendQuestionStopSmoking, dataToSend)
    .then(response => response.json())
    .then(res => {
      console.log(JSON.stringify(res))
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}
