import AsyncStorage from '@react-native-community/async-storage';

export const formattedDate = d => {
  let date = new Date(d)
  let month = String(date.getMonth() + 1)
  let day = String(date.getDate())
  const year = String(date.getFullYear()).substr(-2)

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return `${day}.${month}.${year}`
}

export const stringToFloat = value => parseFloat(value.replace(',', '.'))

export const Isinvalid = (name, value) => {
  switch (name) {
      case 'height': {
        if(!(value && value >=100 && value <= 250)) {
            return true
        }
        return false
      }
      case 'weight': {
        if(!(value && value >=30 && value <= 200)) {
            return true
        }
        return false
      }
      default: return false
  }
}

export const getToken = async() => {
  token = await AsyncStorage.getItem('token')
  return token ? token : ""
}

export const getConsentText = async() => {
  consent_text = await AsyncStorage.getItem('consent_text')
  return consent_text ? consent_text : ""
}
