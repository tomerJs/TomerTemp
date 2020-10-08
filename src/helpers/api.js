import moment from 'moment'
import { getConsentText } from './utils'
import { IN_USER_QUESTIONNAIRE } from '../helpers/constants'
const header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const transformSmokerDesireToStopSmokingData = (appPoint, answer) => {
  return {
    'app_point': appPoint,
    'response': answer,
  }
}

export const transformSendQuestionnaireData = dataToSend => {
    results = dataToSend
    const resultData = {}
    results.forEach(function(answer, i){
        resultData[answer['name']] = answer['value']
        });
    return resultData
}

export async function transformAddSmokerData (smoker) {
  const consentText = await getConsentText()

  let data = {
    ...smoker,
    gender: smoker.gender ? 'F' : 'H',
    birth_date: moment(smoker.birth_date, 'DD/MM/YYYY').format('YYYYMMDD'),
    consent_text: consentText,
  }

  if (smoker.smoker === 0) {
    data.date_of_stop_smoking = moment(smoker.date_of_stop_smoking, 'DD/MM/YYYY').format('YYYYMMDD')
  } else {
    data.smoker_desire_to_stop_smoking = transformSmokerDesireToStopSmokingData(IN_USER_QUESTIONNAIRE, smoker.smoker_desire_to_stop_smoking)
  }

  return data
}

const formData = dataToSend => {
  return {
    ...dataToSend,
    simul: 0,
  }
}

export const getDataPackage = (dataToSend, token, method='POST') => {
  const data = formData(dataToSend)
  let headers = header
  if (token) {
      headers['Authorization'] = 'Token ' + token
  }
  console.log('headers', headers);
  console.log(JSON.stringify(data));
  dataPackage = {
    method: method,
    headers: headers,
  }
  // Body not allowed for GET or HEAD requests
  if (method != 'GET' &&  method != 'HEAD') {
    dataPackage = {
      ...dataPackage,
      body: JSON.stringify(data),
    }
  }
  return dataPackage
}
