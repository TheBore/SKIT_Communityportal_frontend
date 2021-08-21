import axios from '../axios/app';

const UserRepository = {

    getAllUsers: (firstName, lastName, instName, page) => {
        return axios.get(`/rest/user/paged1?firstName=${firstName}&lastName=${lastName}&instName=${instName}&&page=${page}&size=10`)
    },
    addNewUser: (entity) => {
        return axios.post('/rest/user', entity)
    },
    updateUser: (entity) => {
        return axios.patch('/rest/user', entity)
    },
    deleteUser: (id) => {
        return axios.delete("/rest/user/delete/" + id)
    },

    setInactiveUser: (Id) => {
        return axios.patch(`/rest/user/setinactive?Id=${Id}`)
    }

};

export default UserRepository;