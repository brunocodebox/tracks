import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Spacer from './Spacer';
import { withNavigation } from 'react-navigation'; // we could pass the navigation as a prop to a child or using withNavigation

// We will also use our custom Spacer component to add a margin around the Text element.
// This Spacer was created to ease up the burden to have to create a style manually to
// each separate element.

// Also note that NavLink is a child component of SignupScreen and SigninScreen.
// We need to navigate to navigate to one of those screens from NavLink therefore
// instead of passing a navigation property from SignupScreen or SigninScreen 
// we will make use of the withNvigation function from React Navigation.
const NavLink = ({ navigation, routeName, linkText }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Spacer>
        <Text style={styles.link}>{linkText}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'blue'
  }
});

export default withNavigation(NavLink);