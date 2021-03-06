// Test only file to fake user moving locations
import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001;

// Make a fake location reading
const getLocation = increment => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      latitude: 50.0505666 + increment * tenMetersWithDegrees,
      longitude: 14.3441687 + increment * tenMetersWithDegrees
    }
  };
};

// Now we emit a fake location to the location library every second
let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  });
  counter++;
}, 2000);
