// This file is all about saving and retrieving existing tracks from our API.
// The code could have been in LocationContext but it is useful to decouple functionalities, 
// one that manage location points and another that store location points. Both context will 
// coordinate with each other. The LocationContext will pass the name of the track that
// is specified by the user and the TrackContext will save the location points under that name.
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_TRACKS':
      return action.payload;
    default:
      return state;
  }
};

// This function also uses the trackApi to get the track from the database
// hence we will make use of the async await syntax.
const fetchTracks = dispatch => async () => {
  const response = await trackerApi.get('/tracks');
  dispatch({
    type: 'FETCH_TRACKS',
    payload: response.data
  });
};

// We will be using the Api to save the name and locations to the backend database.
// Therefore we will have to use the async await syntax.
const createTrack = dispatch => async (name, locations) => {
  // Post the call to the /tracks url with the name and locations inside of an object.
  // Remember that behind the scene the Api will add the token to this post call.
  console.log('createTrack: ', name);
  await trackerApi.post('/tracks', { name, locations });
  // dispatch({
  //   type: 'CREATE_TRACK',
  //   payload: { name, locations}
  // });
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
);
