import mirror from 'utils/key-mirror';

export const ActionConstants = mirror('USER')(
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
  'LOGOUT_REQUEST',
  'LOGOUT_SUCCESS',
  'LOGOUT_FAILURE'
);