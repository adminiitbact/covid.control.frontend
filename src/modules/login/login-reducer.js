import Immutable from 'immutable';
import { createReducer } from 'utils/create-reducer';
import { ActionConstants } from './login-constants';

const initialState = Immutable.fromJS({
  firebaseUser: null
});

export default createReducer(initialState, {
  [ActionConstants.LOGIN_SUCCESS]: (state, payload) => {
    return state.update(state => {
      return state.set('firebaseUser', payload);
    });
  },

  [ActionConstants.LOGOUT]: (state, payload) => {
    return state.update(state => {
      return state.set('firebaseUser', null);
    });
  }
});
