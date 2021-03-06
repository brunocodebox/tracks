// This file is to encapsulate common logic to track a position. It is extracted from 
// TrackCreateScreen and it will help manage the case when the user changes screen 
// and in this case we stop tracking the position because it consumes battery power.

// The logic used to start and stop the tracking of the location is by using useEffect
// with a boolean variable passed from an outside screen. When the value of the boolean
// changes then useLocation is rerendered and the watching will either stop or start again.

// A subscriber is used to stop the watchPositionAsync function from returning events.

import { useState, useEffect } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  // Here on first implementation we set a subscriber state variable to manage the listening of position locations.
  // However the subscriber is only ever used inside the useEffect function. Since the useEeffect function is always
  // defined as a single instance regardless of the number of re-renders, we can set the subscriber as a local
  // variable inside the useEffect function and update its value every time the subscription, that is the listening 
  // to location points is turned off and on. So we can comment out this subscriber as a state variable.
  //const [subscriber, setSubscriber] = useState(null);

  useEffect(() => {

    // The subscriber variable is defined here as local variable instead of having it as a state variable.
    let subscriber;

    // This is a tip from the React development team. Any function that refrences a prop or value
    // used inside useEffect should be defined inside useEffect. That way we can see at quick glance
    // with a visual scan which props or values used inside the function should be references in the 
    // dependency list of arguments. So here startWatching is now defined inside the useEffect function 
    // and we can see that it is using a callback function which in this case should be referenced
    // as a second dependency argument in the useEffect function.
    const startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync();
        if (!granted) {
          throw new Error('Location permission not granted');
        }
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          // The first instance of this callback is setup in useEffect and receives a recording set to false. 
          // If we don't update the instance of this callback then it will always be called with a recording 
          // set to false and the location points in addLocation will not be saved in the state.
          callback
        );
        //setSubscriber(sub);
      } catch (e) {
        setErr(e);
      }
    };

    // We do the same for stopWatching for consistency. Note that a state function such as setSubscriber is always
    // defined once, will always have one instance, unlike the callback function which can have multiple instances
    // if called multiple times. 
    const stopWatching = () => {
      subscriber?.remove();
      //setSubscriber(null); // We removed the subscriber being a state variable
      subscriber = null;
    };

    // Start or stop watching the location events depending on visibilty of TrackScreateScreen
    shouldTrack ? startWatching() : stopWatching();

    // We return a cleanup function in case of re-running useEffect following a change in its second argument, especially the callback.
    // The reason for this is to avoid calling startWatching multiple times. This would create multiple listeners and eventually the App
    // will crash. The callback parameter here controls the startRecording and stopRecording actions from the user.
    return () => stopWatching();

  }, [shouldTrack, callback]);

  return [err];
}