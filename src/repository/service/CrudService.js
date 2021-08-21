import axios from '../../axios/app';

const CrudService = {
    fetch: (url, sort, page, pageSize, filter) => {
        let filterOpt = [];
        if (filter) {
            filterOpt = Object.keys(filter).map(function (key) {
                if (filter[key] !== undefined && filter[key] !== '')
                    return "&filter%5B" + key + "%5D=" + filter[key] + "";
                return "";
            });
        }
        return axios.get(`${url}/paged?sort=&page=${page}&pageSize=${pageSize}` + filterOpt.join(''));
    },
    save: (url, body) => {
        return axios.post(url, body);
    },
    edit: (url, body) => {
        return axios.patch(url, body);
    },
    delete: (url, body) => {
        return axios.delete(url + '/' + body.id);
    },
    transform: (object) => {
        for (let property in object) {
            if (object.hasOwnProperty(property)) {
                if (property.indexOf('_') !== -1) {
                    let keys = property.split("_");
                    if (!object.hasOwnProperty(keys[0])) {
                        object[keys[0]] = {};
                    }
                    object[keys[0]][keys[1]] = object[property];
                }
            }
        }
        return object;
    },
};
export default CrudService;