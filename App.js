// To create the App and ensure it is with npm type:
// npx expo-cli init tracks --npm

// Then add navigation
// cd tracks
// npm install react-navigation
// npm install react-navigation-stack

// To run the app type:
// npm start

// To run ngrok for new url type in tracker Api:
// ngrok http 3000

import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import AccountScreen from './src/screens/AccountScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { FontAwesome } from '@expo/vector-icons';

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
});

trackListFlow.navigationOptions = {
  title: 'Tracks',
  tabBarIcon: <FontAwesome name="th-list" size={20} />
};

// In a navigator we saw that we have a list of screens with first character in upper case. 
// But it can also include navigators or a group of navigators and there are specified by convention with lower case.
// We could also put the default route name as second argument to createSwitchNavigator ({...}, { ResolveAuth: ResolveAuthScreen})
const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  // We will have a login flow with a stack navigator to toggle betweeen the signin and signup screens.
  // An intermediate screen was added to make the transition to the Signup or TrackList screen depending
  // on the existence of a token on the device. This screen is just blank so we don't have to sue the Signup
  // screen by default. And using the Signup screen to check for the token would create a flash screen.
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  // As a sibbling of the switch flow we will have the main flow
  // Setting icon on the bottom navigation of trackListFlow is not as easy as it is for TrackCreateScreen and AccountScreen.
  // So we will extract the trackListFlow into a separate constant and assign navigationOptions such title and icon to that constant.
  // And then use ES6 syntax to shorten trackListFlow: trackListFLow to just trackListFlow.
  mainFlow:  createBottomTabNavigator({
    trackListFlow,
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen
  })
});

// We will now export our own component that wraps the App component.
//export default createAppContainer(switchNavigator)
const App = createAppContainer(switchNavigator);

// Remember that the App component here is entirely created by React Navigation. 
// So we will give it a prop called ref that will receive an arrow function that accepts the navigator object
// given by React. When the App is created the ref will get called with the navigator object that will be passed around.
// It's like a hook into our component giving child components access to the navigator and navigate to selected screens.
export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App ref={ (navigator) => { setNavigator(navigator) }}/>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
}
