// The purpose of this component is to apply a margin to a child element and reuse it 
// in different screens to maintain a uniform spacing betweel all screens.
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Spacer = ({ children }) => {
  return (
    <View style={styles.spacer}>{children}</View>
  );
}

const styles = StyleSheet.create({
  spacer: {
    margin: 15
  }
});

export default Spacer;