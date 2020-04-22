import Immutable from 'immutable';
import { createReducer } from 'utils/create-reducer';
import { ActionConstants } from './privateHOC-constants';

const initialState = Immutable.fromJS({
  user: {}
});

export default createReducer(initialState, {
  [ActionConstants.UPDATE]: (state, payload) => {
    const { data } = payload;
    return state.update(state => {
      return state.set('user', data);
    });
  },

  [ActionConstants.LOGOUT]: (state, payload) => {
    return state.update(state => {
      return state.set('user', Immutable.fromJS({}));
    });
  }
});
