import agent from 'utils/agent';
import Constants from '../constants';
import UserService from 'services/user-service';

// const base = Constants.baseUrl;
// const apiVersion = Constants.apiVersionV1;
const resourcePath = 'facility';
const serverURL = Constants.url;

const userApi = {
  create: function (payload = {}) {
    const payloadWithToken = Object.assign({}, payload, {
      authToken: UserService.getUserSessionId()
    });
    return agent
      .post(`${serverURL}/${resourcePath}/create`)
      .send(payloadWithToken);
  },
  patch: function (id, payload = {}) {
    const payloadWithToken = Object.assign({}, payload, {
      authToken: UserService.getUserSessionId()
    });
    return agent
      .post(`${serverURL}/${resourcePath}/${id}/edit`)
      .send(payloadWithToken);
  },
  get: function (id, payload = {}) {
    const payloadWithToken = Object.assign({}, payload, {
      authToken: UserService.getUserSessionId()
    });
    return agent
      .get(`${serverURL}/${resourcePath}/${id}`)
      .query(payloadWithToken);
  }
};

export default userApi;
