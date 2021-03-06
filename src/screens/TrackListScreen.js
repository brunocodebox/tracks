import React, { useContext } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';

// We will use onWillFocus in this component to detect focus to the screen.
// The function onWillFocus takes a callback that is called when the screen gets focus.

// The chevron property in the ListItem shows an icon at the very right hand side of each list item

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);
  return (
    <>
      <NavigationEvents onWillFocus={fetchTracks} />
      <FlatList
        data={state}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          console.log('item name = ', item.name);
          return (
            <TouchableOpacity onPress={() => navigation.navigate('TrackDetail', { _id: item._id})}>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          ); 
        }}
      />
    </>
  );
};

// We can either return an object of a function normall used to optimize the navigation object from parameters passed. 
// But here we just want to set the title so we use the object directly
TrackListScreen.navigationOptions = {
  title: <Text h2>Tracks</Text> 
}

const styles = StyleSheet.create({
});

export default TrackListScreen;