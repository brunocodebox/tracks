import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
// We will use another method to detect the shift in focus to a screen
//import { NavigationEvents } from 'react-navigation';
import { withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { FontAwesome } from '@expo/vector-icons';

// When using { withNavigationFocus } the component receives a new prop called "isFocused" that
// tells whether the component has the focus and is visible on the screen. We will use this
// prop to stop and restart the async location events triggered by the "useLocation" hook. 

const TrackCreateScreen = ({ isFocused }) => {

  const { state: { recording }, addLocation } = useContext(LocationContext);

  // The 'useCallback' function is a hook to prevent multiple definitions of addLocation callback in memory
  // every time the component rerenders. It works like useEffect, a new callback will be defined when the 
  // dependency value in second argument list is changed. Here the dependency is the state.recording variable.
  const callback = useCallback(location => addLocation(location, recording), [recording]);
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h2>Create a Track</Text>
      <Map />
      {/* <NavigationEvents onWillBlur={() => console.log('LEAVING')} /> */}
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

// We can setup options directly in the navigation options.
// Icons can be found here: https://expo.github.io/vector-icons/
TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
  tabBarIcon: <FontAwesome name="plus" size={20} />
};

const styles = StyleSheet.create({

});

export default withNavigationFocus(TrackCreateScreen);