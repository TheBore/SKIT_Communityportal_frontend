import axios from '../../axios/app';

const MailService = {
    sendRequest: (email) => {
        let form = new FormData();
        form.set("email", email);
        return axios.post("/rest/user/resetpassword", form);
    }
};

export default MailService;