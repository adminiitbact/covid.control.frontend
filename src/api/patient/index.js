import agent from 'utils/agent';
import Constants from '../constants';
import UserService from 'services/user-service';
// import stubJson from './stub';
// import stubUtil from 'utils/stub';

// const base = Constants.baseUrl;
// const apiVersion = Constants.apiVersionV1;
const patientPath = 'patients';
const serverURL = Constants.url;

const patientApi = {
    getPatientList: function (pageNo, payload = {}) {
        const payloadWithToken = Object.assign({}, payload, {
            authToken: UserService.getUserSessionId()
        });
        return agent
            .post(`${serverURL}${patientPath}/${pageNo}`)
            .send(payloadWithToken);
    },
    getPatientAgeStats: function(payload = {}) {
        const payloadWithToken = Object.assign({}, payload, {
            authToken: UserService.getUserSessionId()
        });
        return agent
            .post(`${serverURL}${patientPath}/stats/age/`)
            .send(payloadWithToken);
    },
    getPatientGenderStats: function(payload = {}) {
        const payloadWithToken = Object.assign({}, payload, {
            authToken: UserService.getUserSessionId()
        });
        return agent
            .post(`${serverURL}${patientPath}/stats/gender/`)
            .send(payloadWithToken);
    },
    getPatientStats: function(facilityId, payload = {}) {
        const payloadWithToken = Object.assign({}, payload, {
            authToken: UserService.getUserSessionId()
        });
        return agent
            .post(`${serverURL}${patientPath}/stats/${facilityId}`)
            .send(payloadWithToken);        
    }    
};

export default patientApi;
