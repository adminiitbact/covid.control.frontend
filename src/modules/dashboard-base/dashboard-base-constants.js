import mirror from 'utils/key-mirror';

export const ActionConstants = mirror('BASE')(
  'REQUEST_AREA_LIST_START',
  'REQUEST_AREA_LIST_SUCCESS',
  'REQUEST_AREA_LIST_FAILURE'
);
