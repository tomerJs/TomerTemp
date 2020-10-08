import {
    Dimensions,
  } from 'react-native'
  
  // Precalculate Device Dimensions for better performance
  const x = Dimensions.get('window').width
  const y = Dimensions.get('window').height
  
  // Calculating ratio from iPhone breakpoints
  export const RATIO_X = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1
  export const RATIO_Y = y < 667 ? (y < 568 ? 0.75 : 0.875) : 1
  export const RATIO = RATIO_Y