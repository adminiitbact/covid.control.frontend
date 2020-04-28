import defaults from 'superagent-defaults';
import UserService from 'services/user-service';
import SuperAgentPromise from './superagent-promise';
import SuperAgent from 'superagent';
import Promise from 'promise';
// import * as Sentry from '@sentry/browser';

function interceptor(next) {
  return function handler(err, response) {
    if (err && err.status === 401) {
      window.location.href = '/login';
    } else {
      next(err, response);
    }
  };
}

const promiseAgent = SuperAgentPromise(SuperAgent, Promise, interceptor);
const defaultSuperAgentWithSession = defaults(promiseAgent);

const request = {
  init: () =>
    defaultSuperAgentWithSession.set(
      'authToken',
      UserService.getUserSessionId()
    ),
  delete: url => request.init().delete(url),
  get: url => request.init().get(url),
  post: url => request.init().post(url),
  put: url => request.init().put(url),
  patch: url => request.init().patch(url)
};

export default request;
