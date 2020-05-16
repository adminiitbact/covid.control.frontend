import agent from 'utils/agent';
import Constants from '../constants';
import UserService from 'services/user-service';
// import stubJson from './stub';
// import stubUtil from 'utils/stub';

// const base = Constants.baseUrl;
// const apiVersion = Constants.apiVersionV1;
const resourcePath = 'facilities';
const serverURL = Constants.url;

const userApi = {
  create: function (payload = {}) {
    const payloadWithToken = Object.assign({}, payload, {
      authToken: UserService.getUserSessionId()
    });
    return agent.post(`${serverURL}${resourcePath}/new`).send(payloadWithToken);
  },
  patch: function (id, payload = {}) {
    const payloadWithToken = Object.assign({}, payload, {
      authToken: UserService.getUserSessionId()
    });
    return agent
      .post(`${serverURL}${resourcePath}/${id}/post`)
      .send(payloadWithToken);
  },
  get: function (id, payload = {}) {
    const payloadWithToken = Object.assign({}, payload, {
      authToken: UserService.getUserSessionId()
    });
    return agent
      .post(`${serverURL}${resourcePath}/${id}/get`)
      .send(payloadWithToken);
  },
  getFacilityList: function (offset, limit, payload = {}) {
    const payloadWithToken = Object.assign({}, payload, {
      authToken: UserService.getUserSessionId()
    });
    return agent
      .post(`${serverURL}${resourcePath}/${offset}/${limit}`)
      .send(payloadWithToken);
    // return stubUtil(stubJson.facilityList);
  },
  getLinks: function (id, payload = {}) {
    const payloadWithToken = Object.assign({}, payload, {
      authToken: UserService.getUserSessionId()
    });
    return agent
      .post(`${serverURL}${resourcePath}/${id}/links/get`)
      .send(payloadWithToken);
  },
  saveLink: function (id, payload = {}) {
    const payloadWithToken = Object.assign({}, payload, {
      authToken: UserService.getUserSessionId()
    });
    return agent
      .post(`${serverURL}${resourcePath}/${id}/links/post`)
      .send(payloadWithToken);
  }
};

export default userApi;
