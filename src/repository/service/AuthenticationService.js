import axios from '../../axios/app'

const AuthenticationService = {
    loginUser: (request) => {
        return axios.post('/rest/login', request);
    }
};

export default AuthenticationService;