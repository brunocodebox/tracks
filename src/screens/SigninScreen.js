import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
//import { useFocusEffect } from '@react-navigation/native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

// We will use react-native-elements to add stylish elements in our screens.
// One of the many advantages is for input element is that a separate Text
// element for label is not needed, it is included using the label syntax.

// We will also use our custom Spacer component to add a margin around the Text element.
// This Spacer was created to ease up the burden to have to create a style manually to
// each separate element.

// Also here we use a fragment to encapsulate the visible componenents.
// However be aware that a fragment <> cannot have styling. So if we need
// styling rules we replace the <> with a <View>
const SigninScreen = ({ navigation }) => {

  const { state, signin, clearError } = useContext(AuthContext);
  
  // We want to make sure to clear any error message when this screen gets focus.
  // In a different project we had used the navigation.addlistener('didFocus') to
  // catch the focus event but we can use another more compact method by importing 
  // and using the NavigationEvents component from React. This component doesn't
  // display anything on the screen, instead we can pass it predefined callbacks 
  // as props and NavigationEvents will call them automatically when we navigate to 
  // or away from the Signin screen or the SignUp screen.
  // Unfortunately these callbacks are no longer supported by newest versions of React.
  // So instead we could use useFocusEffect from @react-navigation/native version 5
  // but here we have version 4. So we will use the addListener method from the navigation
  // object in the life cycle method useEffect.

  // useEffect(() => {
  //   // Do something right away when getting focus if needed
  //   // Otherwise listen to the didFocus event to clear outstanding error messages.
  //   const listener = navigation.addListener('didFocus', clearError);
  //   // Cleanup the listener when the screen component is dismissed.
  //   return () => {
  //     listener.remove();
  //   };
  // }, []);

  //<NavigationEvents 
    //onWillBlur={clearError}  // When we are just about to navigate away from the SignIn screen
    //onDidBlur={() => {}}   // When we have navigated away from the SignIn screen and the transition completes
    //onWillFocus={() => {}} // When we are just about to navigate to the SignIn screen
    //onDidFocus={() => {}}  // When we have navigated to the SignIn screen 
  ///>
  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearError} />
      <AuthForm 
        headerText="Sign In to Your Account" 
        errorMessage={state.errorMessage} 
        onSubmit={signin} 
        submitButtonText="Sign In"
      />
      <NavLink 
        routeName="Signup" 
        linkText="Don't have an account? Sign up instead."
      />
    </View>
  );
};

// The navigation option is used to hide the header on the top area of the screen.
// We don't have to use a function to make use of navigationOptions. Last time we
// used it to get access to the navigation property coming in to this function so
// we could wire up an icon and when the user tap this icon we could do some
// navigation. Bit we could simply return an object instead of a function.
SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  }; 
}

// A View will wrap just the space it needs for the components it encapsultates.
// To take the space of the entire screen we will a use a flex: 1
// We also add a bottom margin to push the content up a little so it is not
// completely at the center of the screen and make look unesthetical.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  }
});

export default SigninScreen;