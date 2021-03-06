import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from './Spacer';

// We will use react-native-elements to add stylish elements in our screens.
// One of the many advantages is for input element is that a separate Text
// element for label is not needed, it is included using the label syntax.

// We will also use our custom Spacer component to add a margin around the Text element.
// This Spacer was created to ease up the burden to have to create a style manually to
// each separate element.

// Also here we use a fragment to encapsulate the visible componenents.
// However be aware that a fragment <> cannot have styling. So if we need
// styling rules we replace the <> with a <View>
const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Input 
        label="Email" 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none" 
        autoCorrect={false}
      />
      <Spacer />
      <Input
        secureTextEntry
        label="Password" 
        value={password} 
        onChangeText={setPassword}
        autoCapitalize="none" 
        autoCorrect={false}
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <Spacer>
        <Button title={submitButtonText} onPress={() => onSubmit({ email, password })} />
      </Spacer>
    </>
  );
};

// A View will wrap just the space it needs for the components it encapsultates.
// To take the space of the entire screen we will a use a flex: 1
// We also add a bottom margin to push the content up a little so it is not
// completely at the center of the screen and make look unesthetical.
const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  }
});

export default AuthForm;