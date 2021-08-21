import axios from '../axios/app';

const AnnualReportRepository = {

    getAllByYear: (year) => {
        return axios.get("/rest/yearlyreport/all?year="+year)
    },
    getByYearAndInstitution:(institutionId, year) =>{
      return axios.get(`/rest/yearlyreport?institutionId=${institutionId}&year=${year}`)
    },
    saveByYear: (form) => {
        return axios.post("/rest/yearlyreport/savereport",form)
    },

    updateAnnualReport: (form) => {
        return axios.patch("/rest/yearlyreport/updateReport",form)
    },

    submitAnnualReport: (pyrId) => {
        return axios.post("/rest/yearlyreport/submitReport?pyrId="+pyrId)
    },

    uploadSignedFile: (request) => {
        return axios.post("/rest/yearlyreport/uploadAttachment",request)
    }

};

export default AnnualReportRepository;
