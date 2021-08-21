import axios from '../axios/app';

const MeetingRepository = {

    getAllMeetingsByInstitutionId: (institutionId) => {
        return axios.get(`/rest/bbb/all-by-institution/${institutionId}`)
    },

    createMeeting: (insIds, name, meetingDate) => {
        return axios.post(`/rest/bbb/create/${insIds}?name=${name}&meetingDate=${meetingDate}`)
    },

    getMeetingUrl: (meetingId) => {
        return axios.get(`/rest/bbb/url/${meetingId}`)
    },

    closeMeetingSession: (id) => {
        return axios.put(`/rest/bbb/close-session/${id}`)
    },

    getAllMeetingsForAdmin: () => {
        return axios.get(`/rest/bbb/getAllForAdmin`)
    },

    getNumberOfParticipants: (meetingId, password) => {
        return axios.get(`/rest/bbb/getNumberOfParticipants/${meetingId}/${password}`)
    }

}

export default MeetingRepository;