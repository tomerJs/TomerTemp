import { StyleSheet } from 'react-native'
import { RATIO_X, RATIO_Y, RATIO } from '../../../styles'
import { gray } from '../../../styles/colors'
// import { adelleThin } from '../../../styles/fonts'

export default StyleSheet.create({
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40 * RATIO,
    width: 40 * RATIO,
    position: 'absolute',
    left: 20 * RATIO_X,
  },
  text: {
    marginBottom: 13 * RATIO_Y,
    // fontFamily: adelleThin,
    fontSize: 14 * RATIO_X,
    color: '#52baff',
  },
  progressBar: {
    height: 6 * RATIO_Y,
    backgroundColor: gray,
  },
  progressBarActive: {
    width: '100%',
    height: 6 * RATIO_Y,
    backgroundColor: '#4d4d4f',
  },
})
