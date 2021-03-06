import createDataContext from "./createDataContext";

// The authReducer function will be called by React directly whenver the dispatch function is called.
const locationReducer = (state, action) => {
  switch (action.type) {
    case 'SAVE_CURRENT_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'START_RECORDING':
      return { ...state, recording: true };
    case 'STOP_RECORDING':
      return { ...state, recording: false };
    case 'ADD_LOCATION':
      return { ...state, locations: [...state.locations, action.payload] };
    case 'CHANGE_NAME':
      return { ...state, name: action.payload };
    case 'RESET_LOCATIONS':
      return { ...state, name: '', locations: [] };
    default:
      return state;
  }
};

// Provide an action to save and update the name of the track
const changeName = dispatch => name => {
  dispatch({ type: 'CHANGE_NAME', payload: name });
};

// Action function we will need
const startRecording = dispatch => () => {
  dispatch({
    type: 'START_RECORDING'
  });
}

const stopRecording = dispatch => () => {
  dispatch({
    type: 'STOP_RECORDING'
  });
}

// We can't use the state inside an action creator function.
// Instead we pass a second argument to the addLocation provided by the caller of addLocation.
const addLocation = dispatch => (location, recording) => {
  console.log('addLocation... SAVE_CURRENT_LOCATION');
  dispatch({  type: 'SAVE_CURRENT_LOCATION', payload: location });
  if (recording) {
    console.log('addLocation...recording .. ADD_LOCATION');
    dispatch({ type: 'ADD_LOCATION' , payload: location});
  }
}

// Provide an action creator to reset the state of the location context.
// This is a useful action after saving a track with a name and locations.
// There is no need for a payload in this action.
const resetLocations = dispatch => () => {
  dispatch({ type: 'RESET_LOCATIONS' });
}; 

export const { Provider, Context } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName, resetLocations },
  { name: '', recording: false, locations: [], currentLocation: null }
);
