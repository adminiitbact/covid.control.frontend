import { combineReducers } from 'redux-immutablejs';

import user from 'base/privateHOC/privateHOC-reducer.js';
import login from 'modules/login/login-reducer.js';
import dashboardBase from 'modules/dashboard-base/dashboard-base-reducer.js';

export default combineReducers({
  user,
  login,
  dashboardBase
});
