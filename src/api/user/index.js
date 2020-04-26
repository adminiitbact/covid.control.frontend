import agent from 'utils/agent';
import Constants from '../constants';
import UserService from 'services/user-service';

// const base = Constants.baseUrl;
// const apiVersion = Constants.apiVersionV1;
const resourcePath = 'admin/user/profile';
const serverURL = Constants.url;

const userApi = {
  get: function (payload = {}) {
    const payloadWithToken = Object.assign({}, payload, {
      authToken: UserService.getUserSessionId()
    });
    return agent.get(`${serverURL}${resourcePath}`).query(payloadWithToken);
  }
};

export default userApi;
