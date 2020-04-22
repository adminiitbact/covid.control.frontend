import agent from 'utils/agent';
import Constants from '../constants';

const base = Constants.baseUrl;
const apiVersion = Constants.apiVersionV1;
const resourcePath = 'users/';
const serverURL = `${base}${apiVersion}${resourcePath}`;

const userApi = {
  get: function (payload = {}) {
    return agent.get(`${serverURL}/${resourcePath}`).query(payload);
  }
};

export default userApi;
