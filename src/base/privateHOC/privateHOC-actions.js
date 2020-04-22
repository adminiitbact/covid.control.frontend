import { ActionConstants } from './privateHOC-constants';

export function updateUser(payload) {
  return {
    type: ActionConstants.UPDATE,
    payload
  };
}

export function logoutUser(payload) {
  return {
    type: ActionConstants.LOGOUT,
    payload
  };
}