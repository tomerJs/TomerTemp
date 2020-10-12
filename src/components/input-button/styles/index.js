import { StyleSheet } from 'react-native'
import { RATIO_X, RATIO_Y, RATIO } from '../../../styles'
import { lightGray } from '../../../styles/colors'
// import { adelleRegular } from '../../../styles/fonts'

export default StyleSheet.create({
  container: {
    width: 285 * RATIO_X,
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: 312 * RATIO_X,
    height: 45 * RATIO_Y,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: lightGray,
    paddingLeft: 10 * RATIO_X,
  },
  unit: {
    // fontFamily: adelleRegular,
    fontSize: 14 * RATIO_X,
    letterSpacing: 1.3,
    color: '#515151',
    paddingLeft: 10 * RATIO_X,
    paddingRight: 20 * RATIO_X,
  },
  buttonKeyboard: {
    width: 52 * RATIO_X,
    height: 52 * RATIO_Y,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 1,
    height: 15 * RATIO,
  },
})
