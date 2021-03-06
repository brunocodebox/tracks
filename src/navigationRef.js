import { NavigationActions } from 'react-navigation';

// Getting access to the navigation property outside of a component is difficult. 
// A component receives from React the navigation as a property. So we define here
// a clever function to get access to the navigator for everyone else to use.
// This function will be imported and used by App.js 

// We use a let variable so it can be reassigned at some other time in the future.
let navigator;

// Here is the clever function. The nav parameter is coming from by React Navigation
export const setNavigator = (nav) => {
  navigator = nav;
}

// We export the function that will help us change screen according to a route name.
// We take advantage of the fact that React has its own dispatch function defined
// in NavigationActions to navigate to screens by route name.

// Also remember that navigation objects can be given params to pass over to the screen.
export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};
