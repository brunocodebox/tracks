import React, { useContext } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';

// A map just like an image needs to be assigned dimensions to be able to show.
const Map = () => {

  const { state: { currentLocation, locations } } = useContext(LocationContext);

  if (!currentLocation) {
    return (
      <ActivityIndicator size="large" style={{ marginTop: 200 }} />
    );
  }

  console.log(currentLocation.coords.latitude);

  // The map can be updated at every "_mock" seconds by adding the region property. With this additional prop
  // the map will update with the new currentLocation and rezoom as well.
  return (
    <MapView 
      style={styles.map} 
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
      // region={{
      //   ...currentLocation.coords,
      //   latitudeDelta: 0.01,
      //   longitudeDelta: 0.01
      // }}
    >
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
      <Polyline coordinates={locations.map(loc => loc.coords)}
      />
    </MapView>
  );
};

//      {/* { state.currentLocation ? <Polyline coordinates={state.currentLocation}/> : null }   */}

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});

export default Map;