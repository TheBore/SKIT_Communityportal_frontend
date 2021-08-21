import axios from '../axios/app';

const InstitutionCategoryHeadingRepository = {

    getAllInstCateHead: (page = 0, size = 10) => {
        return axios.get(`/rest/instCateHead/all?page=${page}&size=${size}`)
    },
    addInstCateHead: (obj) => {
        return axios.post("/rest/instCateHead/add", obj)
    },
    editInstCateHead: (obj) => {
        return axios.patch("/rest/instCateHead/edit", obj)
    }

};

export default InstitutionCategoryHeadingRepository;