import axios from '../axios/app';

const AnnouncementCommentsRepository = {
    getAnnComments: (annId, selectedPage) => {
        return axios.get(`rest/annComm/comments?annId=${annId}&&page=${selectedPage}&size=10`)
    },
    addComment: (email, annId, comment) => {
        return axios.post(`rest/annComm/addComment?email=${email}&annId=${annId}&comment=${comment}`)
    }
}
export default AnnouncementCommentsRepository;