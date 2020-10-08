import { StyleSheet } from 'react-native'
import { RATIO_X, RATIO_Y, RATIO } from '../../../styles'
import { blue, darkGray, lightGray } from '../../../styles/colors'
// import { adelleRegular, adelleThin } from '../../../styles/fonts'

export default StyleSheet.create({
  container: {
    width: 313 * RATIO_X,
    height: 101 * RATIO_Y,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30 * RATIO_Y,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: lightGray,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginLeft: 20 * RATIO,
    marginRight: 10 * RATIO,
    width: 40 * RATIO_X,
    height: 65 * RATIO_Y,
    resizeMode: 'contain',
  },
  textWrapper: {
    width: 200 * RATIO_X,
    height: 95 * RATIO_Y,
    justifyContent: 'center',
  },
  imageNext: {
    alignSelf: 'center',
    marginLeft: 8 * RATIO,
    width: 12 * RATIO_X,
    height: 12 * RATIO_Y,
    resizeMode: 'contain',
    tintColor: blue,
  },
  wrapperTitle: {
    flexDirection: 'row',
  },
  title: {
    // fontFamily: adelleRegular,
    fontSize: 18 * RATIO_X,
    color: darkGray,
  },
  info: {
    // fontFamily: adelleThin,
    fontSize: 14 * RATIO_X,
    color: darkGray,
  },
})
