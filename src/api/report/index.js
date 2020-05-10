import UserService from 'services/user-service';
import agent from 'utils/agent';
import Constants from '../constants';

const serverURL = Constants.url;

const reportApi = {
    post: function(payload = {}) {
        const payloadWithToken = Object.assign({}, payload, {
            authToken: UserService.getUserSessionId()
        })
        return agent.post(`${serverURL}common/reports/generate`).send(payloadWithToken);

    }
}

export default reportApi;