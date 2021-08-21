const AllAnnouncementsService = {
    transform: (data) => {
        return data.map(d => {
            return {
                id: d.id,
                title: d.title,
                creatorFirstName: d.creator.firstName,
                creatorLastName: d.creator.lastName,
                user: d.creator,
                body: d.body,
                dateCreated: d.dateCreated,
                dateUpdated: d.dateUpdated,
            }
        });
    },
    beforeSave: (data) => {
        return data;
    }
};

export default AllAnnouncementsService;