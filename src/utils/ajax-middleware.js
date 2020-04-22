export default function ajaxMiddleware({ dispatch, getState }) {
  return next => {
    return action => {
      const {
        types,
        promise,
        shouldCallAPI = () => true,
        promiseSuccess,
        promiseFailure,
        payload = {},
        params
      } = action;

      if (!types) {
        return next(action);
      }

      if (
        !Array.isArray(types) ||
        types.length !== 3 ||
        !types.every(type => typeof type === 'string')
      ) {
        if (types.every(type => typeof type === 'undefined')) {
          throw new Error(
            'Action strings are undefined. You probably forgot to declare action strings in constants.'
          );
        } else {
          throw new Error('Expected an array of three string types.');
        }
      }

      if (typeof promise !== 'function') {
        throw new Error('Expected promise to be a function.');
      }

      if (!shouldCallAPI(getState())) {
        return false;
      }

      const [requestStartType, successType, failureType] = types;
      let dispatchObj = {
        type: requestStartType,
        payload
      };
      if (params) {
        dispatchObj = {
          type: requestStartType,
          payload: {
            ...payload,
            params
          }
        };
      }

      dispatch(dispatchObj);

      return promise(payload)
        .then(
          response => {
            let responseValue = response.body;
            if (
              payload &&
              payload.params &&
              payload.params.data_format === 'csv'
            ) {
              responseValue = response.text;
            }
            if (promiseSuccess) {
              promiseSuccess(responseValue, dispatch);
            }
            dispatch({
              type: successType,
              payload: {
                responseJSON: responseValue,
                payload,
                params
              }
            });
          },

          error => {
            if (promiseFailure) {
              promiseFailure(error, payload, dispatch);
            }
            dispatch({
              type: failureType,
              payload: {
                error: error,
                payload,
                params
              }
            });
          }
        )
        .done();
    };
  };
}
