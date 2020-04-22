import { combineReducers } from 'redux-immutablejs';

import user from 'base/privateHOC/privateHOC-reducer.js';

export default combineReducers({
  user
});
