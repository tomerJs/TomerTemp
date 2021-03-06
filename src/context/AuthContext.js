import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return { errorMsg: '', token: action.payload };

    case 'save_user':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({
      type: 'signin',
      payload: token,
    });

    navigate('Home');
  } else {
    navigate('Splash');
  }
};


const signin = (dispatch) => async ({ email, password }) => {
  try {
    // const response = await trackerApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({
      type: 'signin',
      payload: response.data.token,
    });

    navigate('Home');
  } catch (err) {
    navigate('loginFlow');
  }
};

const saveUser = (dispatch) => (user) => {

  dispatch({
    type: 'save_user',
    payload: user,
  });
 
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signin, tryLocalSignIn, saveUser },
  { token: null, errorMsg: '', user:{} }
);
