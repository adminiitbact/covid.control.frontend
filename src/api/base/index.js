import agent from 'utils/agent';
import Constants from '../constants';
import UserService from 'services/user-service';

const serverURL = Constants.url;

const baseApi = {
  getAreasList: function (payload = {}) {
    const payloadWithToken = Object.assign({}, payload, {
      authToken: UserService.getUserSessionId()
    });
    return agent.post(`${serverURL}areas/list`).send(payloadWithToken);
  }
};

export default baseApi;
