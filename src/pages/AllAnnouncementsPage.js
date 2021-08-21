import React,{Component} from 'react';
import CrudTable from './../components/Crud/CrudTable/CrudTable';
import AllAnnouncementsService from "../repository/service/AllAnnouncementsService";
import UserAdd from "../components/User/UserAdd";
import UserEdit from "../components/User/UserEdit";
import {strings} from "../Localization/Localization";

class AllAnnouncementsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            filter : {}
        }
    }

    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
    }

    render(){
        let  ColumnNames= [
            {id: 'title', label: strings.title},
            {id: 'creatorFirstName', label: strings.creatorFirstName},
            {id: 'creatorLastName', label: strings.creatorLastName},
            {id: 'dateCreated', label: strings.dateCreated},
            {id: 'num', label: strings.numOfPublishes}
        ];
        return(
            <div>

                <CrudTable
                    numCols={6}
                    addModalComp={UserAdd}
                    editModalComp={UserEdit}
                    url="/rest/allannouncements"
                    theadClassName="text-uppercase thead-orange"
                    filter={this.state.filter}
                    columns={ColumnNames}
                    transform={AllAnnouncementsService.transform}
                    beforeSave={AllAnnouncementsService.beforeSave}
                    showButton={false}
                    showPublish={true}
                />
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}
export default AllAnnouncementsPage;