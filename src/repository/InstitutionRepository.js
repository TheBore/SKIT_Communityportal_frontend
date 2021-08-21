import axios from '../axios/app';

const InstitutionRepository = {

    getAllInstitutions: () => {
        return axios.get("/rest/institution/all")
    },
    getAllEditedInstitutions: () => {
        return axios.get("/rest/institution/allEdited")
    },
    getInstitutionById: (id) => {
        return axios.get(`/rest/institution/${id}`)
    },
    getInstitutionsWithModerator: (keyword, page) => {
        return axios.get(`/rest/institution/paged?keyword=${keyword}&page=${page}&size=10`)
    },
    addNewInstitution: (entity) => {
        return axios.post('/rest/institution', entity)
    },
    updateInstitution: (entity) => {
        return axios.patch('/rest/institution', entity)
    },
    deleteInstitution: (id) => {
        return axios.delete("/rest/institution/deleteInst/" + id)
    },
    setInactiveInstitution: (id) => {
        return axios.patch(`/rest/institution/deleteInst/${id}`)
    },
    getInstitutionByUserEmail: () => {
        return axios.get(`/rest/institution/selectedInstitution`)
    },
    sendSelected: (institutionId, institution, categoryId) => {
        return axios.post(`/rest/institution/sendSelected/${institutionId}/${categoryId}`, institution)
    },
    sendSelectedWithInstitution: (institutionId, institution, parentInstitutionId) => {
        return axios.post(`/rest/institution/sendSelectedWithParent/${institutionId}/${parentInstitutionId}`, institution)
    },
    getAllEdited: (page) => {
        return axios.get(`/rest/institution/getAllEdited?page=${page}&size=10`)
    },
    recreateInstitution: (institution) => {
        return axios.post(`/rest/institution/recreateInstitution`, institution)
    },
    allActiveInstitutions: () => {
        return axios.get(`/rest/institution/allActiveInstitutions`)
    },
    allInstitutionsByParentRecursively: (ids) => {
        return axios.get(`/rest/institution/allByParentRecursively/${ids}`)
    },
    allInstitutionsByTags: (ids) => {
        return axios.get(`/rest/institution/allByTags/${ids}`)
    },
    allInstitutionsByCategories: (ids) => {
        return axios.get(`/rest/institution/allByCategoriesRecursively/${ids}`)
    },
    getDirectorEmailsForInstitution: (institutionId) => {
        return axios.get(`/rest/institution/getDirectorEmails/${institutionId}`)
    }
};

export default InstitutionRepository;