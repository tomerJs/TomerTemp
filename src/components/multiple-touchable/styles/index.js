import { StyleSheet } from 'react-native'
import { RATIO_X, RATIO_Y } from '../../../helpers/dimension'
import { lightGray } from '../../../helpers/colors'
// import { adelleThin } from '../../../styles/fonts'

export default StyleSheet.create({

  wrapper: {
    alignItems: 'center',
    marginTop: 20 * RATIO_Y,
  },
  touchableStyle: {
    paddingLeft: 25 * RATIO_X,
    paddingRight: 30 * RATIO_X,
    alignItems: 'center',
  },
  touchableMultiple: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 313 * RATIO_X,
    height: 67 * RATIO_Y,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: lightGray,
  },
  touchableTwo: {
    width: 150 * RATIO_X,
    height: 141 * RATIO_Y,
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: lightGray,
  },
  embeddedImage: {
    marginBottom: 14 * RATIO_Y,
    width: 50 * RATIO_X,
    height: 50 * RATIO_Y,
    resizeMode: 'contain',
  },
  successImage: {
    width: 21 * RATIO_X,
    height: 21 * RATIO_Y,
    resizeMode: 'contain',
  },
  successImageTwo: {
    position: 'absolute',
    top: 10 * RATIO_Y,
    right: 14 * RATIO_X,
  },
  textTwo: {
    textAlign: 'center',
    // fontFamily: adelleThin,
    fontSize: 18 * RATIO_X,
  },
  textMultiple: {
    // fontFamily: adelleThin,
    fontSize: 18 * RATIO_X,
  },
})
