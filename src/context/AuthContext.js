//import { AsyncStorage } from 'react-native'; // now deprecated from react-native
import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

// The authReducer function will be called by React directly whenver the dispatch function is called.
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return { ...state, errorMessage: action.payload };
    case 'LOGIN_TOKEN':
      // On signup or signin we want to have a clean state with no error message and just save the token.
      // We don't want to keep possible error messages from previous unsuccessful signups or signins.
      return { token: action.payload, errorMessage: '' };
    case 'SIGNOUT':
      return { token: null, errorMessage: '' };
    case 'CLEAR_ERROR':
      console.log('clearing any error message');
      return { ...state, errorMessage: ''}
    default:
      return state;
  }
};

// This helper function is an action to attempt to fetch the jwt token of the last user that was logged in.
// The user may have logged out of the App and the state is totally clean. If a token is found on the device
// then we can use it to login the user automatically and show the TrackList screen automatically. We can
// just dispatch an action using the type 'LOGIN_TOKEN' to save the token in the context state.
const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  // Save the token in the context state
  if (token) {
    console.log('Loggin in with token');
    dispatch({
      type: 'LOGIN_TOKEN',
      payload: token
    });

    // Navigate to the TrackList screen
    navigate('TrackList');
  } else {
    // Navigate to the Signup screen or loginFlow which will direct to the Signup screen
    navigate('Signup');
  }
}

// We need a helper function to clear the possible error message left over from a SignUp or SignIn
// screen and switching to the other screen.
const clearError = dispatch => () => {
  dispatch({
    type: 'CLEAR_ERROR'
  });
}

// Now we can define the action functions
const signup = dispatch => async ({ email, password }) => {
  try {
    // The abbreviated EM6 syntax of email and password is used and their values will be placed in the body of the request.
    // The signup route inside the server will receive this body in the 'req' parameter.
    const response = await trackerApi.post('/signup', { email ,password });
    // We expect to receive a jwt back from the server in the response.data
    // We will save the token in the system persistent storage (mysql or rocks) 
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ 
      type: 'LOGIN_TOKEN', 
      payload: response.data.token 
    });
    // Now for this action instead of providing a callback that will navigate
    // to the main flow, we can do this navigation right here. However getting
    // access to the navigation property outside of a component is difficult. 
    // A component in contrast receives from React the navigation as a property.
    // So we need to have a clever function to get access to the navigator for
    // everyone else to use. This function is now defined in navigationRef.js

    // We navigate to 'TrackList' but we could have navigated to 'mainFlow'.
    // But here it makes sense to navigate to TrackList.
    navigate('TrackList');    
  } catch (err) {
    dispatch({ 
      type: 'LOGIN_ERROR', 
      payload: 'Something went wrong with sign up'
    });
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    console.log('signin: ...');
    const response = await trackerApi.post('/signin', { email, password });

    console.log('signin: async set item token=', response.data.token);

    await AsyncStorage.setItem('token', response.data.token);
    dispatch({
      type: 'LOGIN_TOKEN',
      payload: response.data.token
    });
    // We navigate to 'TrackList' but we could have navigated to 'mainFlow'.
    // But here it makes sense to navigate to TrackList.
    navigate('TrackList'); 
  } catch (err) {
    dispatch({
      type: 'LOGIN_ERROR',
      payload: 'Something went wrong with sign in'
    });
  }
}

const signout = dispatch => async () => {
    // Unset the token of authentication
    await AsyncStorage.removeItem('token');
    // Clear the token the context state
    dispatch({
      type: 'SIGNOUT'
    });
    navigate('loginFlow');
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearError, tryLocalSignin },
  // The presence of a not null token means the user is logged in
  { token: null, errorMessage: '' }
);
