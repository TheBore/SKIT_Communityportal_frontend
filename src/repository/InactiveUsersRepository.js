import axios from '../axios/app';

const InactiveUsersRepository = {
    getAllInactiveUsers: (page = 0, size = 10) => {
        return axios.get(`/rest/user/inactive/all?page=${page}&size=${size}`)
    },
    getAllInactiveUsersByInstName: (instName,page = 0, size = 10) => {
        return axios.get(`/rest/user/inactive?instName=${instName}&page=${page}&size=${size}`)
    },
    setActiveUser: (userId) => {
        return axios.patch(`/rest/user/setactive?userId=${userId}`)
    }
}
export default InactiveUsersRepository;