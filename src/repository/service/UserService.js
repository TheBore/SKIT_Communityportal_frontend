const UserService = {
    transform: (data) => {
        let lang = localStorage.getItem('activeLanguage')
        if(lang === 'mk'){
        return data.map(d => {
            return {
                id: d.id,
                firstName: d.firstName,
                lastName: d.lastName,
                username: d.username,
                phone: d.phone != null ? d.phone : "",
                email: d.email,
                dateCreated: d.dateCreated,
                dateUpdated: d.dateUpdated,
                active: d.active,
                role: d.role,
                institution: d.institution,
                institutionName: d.institution != null ? d.institution.nameMk : "Нема институција",
            }
        });}else{
            return data.map(d => {
                return {
                    id: d.id,
                    firstName: d.firstName,
                    lastName: d.lastName,
                    username: d.username,
                    phone: d.phone != null ? d.phone : "",
                    email: d.email,
                    dateCreated: d.dateCreated,
                    dateUpdated: d.dateUpdated,
                    active: d.active,
                    role: d.role,
                    institution: d.institution,
                    institutionName: d.institution != null ? d.institution.nameAl : "Nuk ka institucion",
                }
            });
        }
    },
    beforeSave: (data) => {
        return data;
    }
};

export default UserService;