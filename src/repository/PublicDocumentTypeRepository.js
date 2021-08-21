import axios from '../axios/app';

const PublicDocumentTypeRepository = {

    getAllTypes: () => {
        return axios.get("/publicdocument/type/all");
    },
    addPubDocType: (name) => {
        return axios.post(`/publicdocument/type/add?name=${name}`);
    },
    editPubDocType: (obj) => {
        return axios.patch("publicdocument/type/edit", obj)
    }

};

export default PublicDocumentTypeRepository;