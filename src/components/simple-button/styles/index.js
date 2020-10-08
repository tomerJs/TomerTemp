import { StyleSheet } from 'react-native'
import { RATIO_X, RATIO_Y } from '../../../styles'
import { blue } from '../../../styles/colors'
// import { adelleThin, adelleRegular } from '../../../styles/fonts'

export default StyleSheet.create({
  container: {
    width: 313 * RATIO_X,
    height: 45 * RATIO_Y,
    backgroundColor: blue,
    borderRadius: 4,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 14 * RATIO_X,
    height: 14 * RATIO_Y,
    marginRight: 7.5 * RATIO_X,
    tintColor: blue,
  },
  title: {
    // fontFamily: adelleRegular,
    fontSize: 16 * RATIO_X,
    textAlign: 'center',
    color: 'white',
  },
})
