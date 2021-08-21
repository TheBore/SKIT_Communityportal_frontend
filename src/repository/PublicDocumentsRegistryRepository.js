import axios from '../axios/app';

const PublicDocumentsRegistryRepository = {

    savePublicDocForYear: (form) => {
        return axios.post("/rest/publicdocument/save", form);
    },
    getUrlForYear: (year, institutionId) => {
        return axios.get(`/rest/publicdocument/url?year=${year}&institutionId=${institutionId}`)
    },
    getAllYear: () => {
        return axios.get(`/rest/publicdocument/years`)
    },
    monitoring: () => {
        return axios.get("/rest/publicdocument/monitoring")
    },
    getSingleDoc: (year, institutionId,typeId) => {
        return axios.get(`/rest/publicdocument/getone?year=${year}&institutionId=${institutionId}&typeId=${typeId}`)

    }

};

export default PublicDocumentsRegistryRepository;