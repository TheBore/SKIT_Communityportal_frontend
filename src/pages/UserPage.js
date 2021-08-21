import React, {Component} from 'react';
import CrudTable from './../components/Crud/CrudTable/CrudTable';
import UserService from "../repository/service/UserService";
import UserEdit from "../components/User/UserEdit";
import UserAdd from "../components/User/UserAdd";
import {strings} from "../Localization/Localization";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {}
        }
    }

    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
    }

    render() {
        let ColumnNames = [
            {id: 'firstName', label: strings.firstName},
            {id: 'lastName', label: strings.lastName},
            {id: 'email', label: strings.email},
            {id: 'dateCreated', label: strings.dateCreated},
            {id: 'dateUpdated', label: strings.dateUpdated},
            {id: 'institutionName', label: strings.institution},
            {id: 'phone', label: strings.phone}
        ]
        return (
            <div>
                <CrudTable
                    numCols={8}
                    addModalComp={UserAdd}
                    editModalComp={UserEdit}
                    url="/rest/user"
                    theadClassName="text-uppercase thead-orange"
                    filter={this.state.filter}
                    columns={ColumnNames}
                    transform={UserService.transform}
                    editModalBody={"user"}
                    roles={true}
                    canEdit={true}
                    beforeSave={UserService.beforeSave}
                    showButton={true}
                    entityName="User"
                    canShowHistory={false}
                    showInactive={true}
                    userTable
                />
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default UserPage;