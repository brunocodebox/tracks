// This custom hook will help coordinate information between the LocationContext and TrackContext.
// It exports a function that will provide the name and the list of locations fetched from two different contexts.
// It is a great way to integrate information between multiple different contexts.
import { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import { navigate } from '../navigationRef';

export default () => {
  const { createTrack } = useContext(TrackContext);
  const { state: { locations, name }, 
          resetLocations
        } = useContext(LocationContext);

  // Expose a saveTrack functionality for external components to use instead of creating a track through
  // the server and database Api right here. In effect the exposed function provides the name and list of
  // locations ready to be used or be stored wherever.
  // We use the async await syntax to wait for the successful creation of the track and then reset the location context.
  const saveTrack = async () => {
    // Call the action creator function from the TrackContext and give it the name and locations retrieved
    // from the state of LocationContext.
    console.log('saveTrack: ', name);
    await createTrack(name, locations);
    resetLocations();
    // Now navigate to the Track List screen using the navigation object that has been setup inside the App.
    navigate('TrackList');
  };

  // So now when we need to save a track we only need to import 'useSaveTrack'.
  // By convention from a hook the function is returned in an array. It could be without or in an object 
  // but the convention is to use an array.
  return [saveTrack];
};
