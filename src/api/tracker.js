import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// We need to pass the login token when making any call to the backend database.
// So we will transform the axios.create into a variable that can take parameters
// and we insert the json token which is required to authenticate the user and
// validate access to the backend database.

// export default axios.create({
//   baseURL: ' http://dc4eb68a8b4e.ngrok.io'
// });

const instance = axios.create({
  baseURL: 'http://97eaf854f197.ngrok.io'
});

// The interceptors request takes two functions. The first function is automatically called and
// we can pass it a config object that contains the URL we are making the request to, the method 
// of the request and any headers attached to the request as well. Inside this function we can 
// modify the config object to modify the request we are making. In our case we modify the
// config object to attach the token from AsyncStorage into the authorization header. Since
// we use AsyncStorage in this first function we must use the async await syntax.
// The second function is called if something is wrong such as no internet connection or any 
/// other kind of errors in the first function call.
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    // Now we can add the token to the backend Api with Express expected authorization syntax.
    // Remember that Express will extract the headers object from the request and then extract the
    // json token from the headers object and verify it through invoking the jwt.verify function.
    // const token = req.headers.authorization.replace('Bearer', '');
    // jwt.verify(token, 'MY_SECRET_KEY', async(err, payload) => {});
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // return the modify config object
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;