import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  loaderContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBackground: {
    backgroundColor: 'black',
    opacity: 0.2,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
