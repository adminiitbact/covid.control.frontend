import Immutable from 'immutable';
import { createReducer } from 'utils/create-reducer';
import { ActionConstants } from './dashboard-base-constants';

const initialState = Immutable.fromJS({
  areaList: null,
  areaListLoading: false,
  areaListErr: null
}).set('areaList', []);

export default createReducer(initialState, {
  [ActionConstants.REQUEST_AREA_LIST_START]: (state, payload) => {
    return state.set('areaListLoading', true);
  },

  [ActionConstants.REQUEST_AREA_LIST_SUCCESS]: (state, payload) => {
    return state.update(state => {
      return state
        .set('areaList', payload)
        .set('areaListLoading', false)
        .set('areaListErr', null);
    });
  },

  [ActionConstants.REQUEST_AREA_LIST_FAILURE]: (state, payload) => {
    return state.update(state => {
      return state
        .set('areaList', [])
        .set('areaListErr', payload)
        .set('areaListLoading', false);
    });
  }
});
