import axios from "../axios/app";

const InstitutionCategoryRepository = {

    getAllInstitutionCategory: (keyword, page = 0, size = 10) => {
        return axios.get(`/rest/institutionCategory/paged?keyword=${keyword}&page=${page}&size=${size}`)
    },
    AddInstitutionCategory: (institutionCategory) => {
        return axios.post("/rest/institutionCategory/add", institutionCategory)
    },
    editInstitutionCategory: (obj) => {
        return axios.patch("/rest/institutionCategory/update", obj)
    },
    getAllInstitutionCategoryList: () => {
        return axios.get(`/rest/institutionCategory/list/all`)
    },
    deleteInstitutionCategory: (institutionCategoryId) => {
        return axios.delete("/rest/institutionCategory/deleteCategory/" + institutionCategoryId)
    },
    changeCategoriesOrder: (categoryIds) => {
        return axios.put(`/rest/institutionCategory/changeCategoriesOrder/${categoryIds}`)
    }
};

export default InstitutionCategoryRepository;
