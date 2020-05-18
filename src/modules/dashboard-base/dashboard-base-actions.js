import { ActionConstants } from './dashboard-base-constants.js';

import baseApi from 'api/base';

const requestAreaListStart = () => {
  return {
    type: ActionConstants.REQUEST_AREA_LIST_START
  };
};

const requestAreaListSuccess = payload => {
  return {
    type: ActionConstants.REQUEST_AREA_LIST_SUCCESS,
    payload
  };
};

const requestAreaListFailure = payload => {
  return {
    type: ActionConstants.REQUEST_AREA_LIST_FAILURE,
    payload
  };
};

export const fetchAreaList = () => dispatch => {
  dispatch(requestAreaListStart());
  const req = baseApi.getAreasList();
  req.then(
    res => {
      dispatch(requestAreaListSuccess(res.body.data.list));
    },
    err => {
      dispatch(requestAreaListFailure(err));
    }
  );
};

export const setViewportType = (payload) => dispatch => {
  dispatch({
    type: ActionConstants.SET_VIEWPORT_TYPE,
    payload
  });
};
