import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

// We will use react-native-elements to add stylish elements in our screens.
// One of the many advantages is for input element is that a separate Text
// element for label is not needed, it is included using the label syntax.

// We will also use our custom Spacer component to add a margin around the Text element.
// This Spacer was created to ease up the burden to have to create a style manually to
// each separate element.

// Also here we use a fragment to encapsulate the visible components.
// However be aware that a fragment <> cannot have styling. So if we need
// styling rules we replace the <> with a <View>
const SignupScreen = ({ navigation }) => {

  // Attempt to Signup automatically by checking the existence of a token.
  // Note that the Signup screen is the first screen to show in the login flow.
  const { state, signup, clearError } = useContext(AuthContext);
  
  // Need to revisit this code method to clear error messages. 
  // Could use NavigationEvents in Navigation version 5 for this. 
  // useEffect(() => {
  //   // Do something right away when getting focus if needed
  //   // Otherwise listen to the didFocus event to clear outstanding error messages.
  //   const listener = navigation.addListener('didFocus', clearError);
  //   // Cleanup the listener when the screen component is dismissed.
  //   return () => {
  //     listener.remove();
  //   };
  // }, []);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearError} />
      <AuthForm 
        headerText="Sign Up for Tracker" 
        errorMessage={state.errorMessage} 
        onSubmit={signup} 
        submitButtonText="Sign Up"
      />
      <NavLink 
        routeName="Signin" 
        linkText="Already have an account? Signin instead."
      />
    </View>
  );
};

// The navigation option is used to hide the header on the top area of the screen.
// We don't have to use a function to make use of navigationOptions. Last time we
// used it to get access to the navigation property coming in to this function so
// we could wire up an icon and when the user tap this icon we could do some
// navigation. Bit we could simply return an object instead of a function.
SignupScreen.navigationOptions = () => {
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

export default SignupScreen;