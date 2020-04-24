import { ActionConstants } from './login-constants';
import userService from 'services/user-service';
import { myFirebase } from 'services/firebase';

const requestLogin = () => {
  return {
    type: ActionConstants.LOGIN_REQUEST
  };
};

const receiveLogin = user => {
  return {
    type: ActionConstants.LOGIN_SUCCESS,
    payload: user
  };
};

const loginError = error => {
  return {
    type: ActionConstants.LOGIN_FAILURE,
    payload: error
  };
};

const requestLogout = () => {
  return {
    type: ActionConstants.LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: ActionConstants.LOGOUT_SUCCESS
  };
};

const logoutError = () => {
  return {
    type: ActionConstants.LOGOUT_FAILURE
  };
};

export const loginUser = (email, password, successCb, errorCb) => dispatch => {
  dispatch(requestLogin());
  const auth = myFirebase.auth();
  auth
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      if (user) {
        auth.onAuthStateChanged(user => {
          if (user) {
            user.getIdToken(true).then(authToken => {
              userService.setUserSessionId(authToken);
              dispatch(receiveLogin(user));
              successCb && successCb(user);
            });
          } else {
            userService.logoutUser();
            errorCb('auth/nouser');
          }
        });
      } else {
        userService.logoutUser();
        errorCb('auth/nouser');
      }
    })
    .catch(error => {
      userService.logoutUser();
      dispatch(loginError(error));
      errorCb && errorCb(error);
    });
};

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      userService.logoutUser();
      dispatch(receiveLogout());
    })
    .catch(error => {
      userService.logoutUser();
      dispatch(logoutError());
    });
};
