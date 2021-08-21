import axios from '../axios/app';

const IndicatorReportRepository = {

    getAllIndicatorReportsList: () => {
        return axios.get('/rest/indicator-report/all-list')
    },

    createIndicatorReport: (entity) => {
        return axios.post('/rest/indicator-report/create', entity)
    },

    updateIndicatorReport: (entity, activity, evaluation) => {
        return axios.post(`/rest/indicator-report/update/${activity}/${evaluation}`, entity)
    },

    getAllByActivity: (id) => {
        return axios.get(`/rest/indicator-report/all-by-activity/${id}`)
    },

    getAllIndicatorReportsPageByActivityId: (id, page) => {
        return axios.get(`/rest/indicator-report/all-by-activity-page/${id}?page=${page}&size=5`)
    }



}

export default IndicatorReportRepository;