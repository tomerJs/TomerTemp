import { StyleSheet } from 'react-native'
import { RATIO_X, RATIO_Y, RATIO } from '../../../helpers/dimension'
import { blue } from '../../../helpers/colors'
// import { adelleThin } from '../../../styles/fonts'

export default StyleSheet.create({
  wrapper: {
    marginTop: 10 * RATIO_Y,
    marginBottom: 10 * RATIO_Y,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 200 * RATIO,
    height: 80 * RATIO,
    resizeMode: 'contain',
    marginTop: 15
  },

  wrapperBig: {
    marginTop: 63 * RATIO_Y,
    marginBottom: 35 * RATIO_Y,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundBlue: {
    backgroundColor: blue,
  },
  backgroundWhite: {
    backgroundColor: 'white',
  },
  imageBig: {
    width: 187 * RATIO,
    height: 126 * RATIO,
  },

  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    left: 18 * RATIO_X,
  },
  backImage: {
    width: 10 * RATIO_X,
    height: 10 * RATIO_Y,
    resizeMode: 'contain',
  },
  backText: {
    color: blue,
    // fontFamily: adelleThin,
    fontSize: 14 * RATIO_X,
    paddingLeft: 1 * RATIO_X,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: '#DFDFDF',
  },
})
