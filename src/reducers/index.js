import { combineReducers } from 'redux-immutablejs';

import user from 'base/privateHOC/privateHOC-reducer.js';
import firebase from 'modules/login/login-reducer';

export default combineReducers({
  user,
  firebase
});
