import { StyleSheet } from 'react-native'
import { RATIO_X, RATIO_Y, RATIO } from '../../../styles'
import { lightGray } from '../../../styles/colors'
// import { adelleRegular } from '../../../styles/fonts'

export default StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    datePicker: {
      width: 313 * RATIO_X,
      height: 45 * RATIO_Y,
    },
    dateInput: {
        borderWidth: 0,
    },
    dateTouchBody: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: lightGray,
    },
    dateText: {
        // fontFamily: adelleRegular,
        fontSize: 16 * RATIO_X,
        letterSpacing: 1.5,
        color: '#515151',
    },
    dateIcon: {
        width: 28 * RATIO_X,
        height: 28 * RATIO_Y,
        marginLeft: 5,
        marginRight: 5,
    },
})
