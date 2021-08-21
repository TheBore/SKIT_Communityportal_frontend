import axios from '../axios/app';

const TagRepository = {

    getAllTags:()=> {
        return axios.get("/rest/tag/all")
    },
    getTags:()=>{
        return axios.get("/rest/tag/withinstitutions")
    },
    deleteTag: (id) => {
        return axios.delete("/rest/tag/delete/" + id)
    },

};

export default TagRepository;