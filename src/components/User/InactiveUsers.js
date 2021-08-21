import React, {Component} from "react";
import InactiveUsersRepository from "../../repository/InactiveUsersRepository";
import {strings} from "../../Localization/Localization";
import Activation from "./Activation";
import {toast} from "react-toastify";
import './Css/InactiveUsers.css'
import {faUniversity, faUser, faCalendar, faCogs, faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

class InactiveUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listUsers: [],
            instName: "",
            pageCount: 1
        }
    }

    getAllInactiveUsers = (selectedPage = 0) => {
        InactiveUsersRepository.getAllInactiveUsersByInstName("", selectedPage).then(res => {
            this.setState({
                listUsers: res.data.content,
                pageCount: res.data.totalPages
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    handlePageClick = data => {
        this.getAllInactiveUsers(data.selected);
    };


    componentDidMount() {
        this.getAllInactiveUsers();
    }

    render() {
        return (

            <div>
                <div className="row">
                    <div className="col-12">
                        <h2 style={{textAlign: "left", color: "#1C4857"}} className="mt-4 mb-4">{strings.inactiveUsers}</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                           <div className="form-group has-search mb-4">
                                <span className="fa fa-search form-control-feedback"/>
                                <input type="text" className="form-control" placeholder={strings.searchByInst} style={{width:"38%"}} onChange={this.handleSearch}/>
                           </div>
                    </div>
                </div>

                <table className="table-hover newTable" style={{width: "100%"}}>
                    <thead className="tableHead">
                    <th className="tableHeading firstHeading" style={{width: '15%'}}>{strings.firstName}</th>
                    <th className="tableHeading" style={{width: '15%'}}>{strings.lastName}</th>
                    <th className="tableHeading" style={{width: '45%'}}>{strings.institution}</th>
                    <th className="tableHeading" style={{width: '15%'}}>{strings.dateCreated}</th>
                    <th className="tableHeading lastHeading text-center" style={{width: '10%'}}>{strings.actions}</th>
                    </thead>

                    <tbody>
                    {this.state.listUsers.map(this.renderUsers)}
                    </tbody>
                    <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                        <td style={{borderRadius: "0 0 0 15px"}}/>
                        <td/>
                        <td/>
                        <td/>
                        <td style={{borderRadius: "0 0 15px 0"}}/>
                    </tr>
                </table>


                <div className="row">
                    <div className="col-10"/>
                    <div className="col-2 text-right justify-content-end">
                        <Link to={'/users/'}
                              className="btn btn-dark defaultBtn mt-5">
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="mr-1"/>{strings.goBack}</Link>
                    </div>
                </div>

            </div>
        )
    }

    renderUsers = user => {
        let instNameMk = user.institution ? user.institution.nameMk : "";
        let instNameAl = user.institution ? user.institution.nameAl : "";
        return (

            <tr key={user.id} style={{border: "1px solid lightgray"}}>
                <td className="tableData" style={{color: 'black', fontSize: '15px'}}>{user.firstName}</td>
                <td className="tableData" style={{color: 'black', fontSize: '15px'}}>{user.lastName}</td>
                <td className="tableData" style={{
                    color: 'black',
                    fontSize: '15px'
                }}>{localStorage.getItem("activeLanguage") === "mk" ? instNameMk : instNameAl}</td>
                <td className="tableData" style={{color: 'black', fontStyle: 'bold'}}>{user.dateCreated}</td>
                <td className="tableData" style={{color: 'black', fontWeight: 'bold'}}>
                    <Activation
                        handleActivationUser={() => this.handleActivationUser(user.id)}
                        prompt={strings.userActivate}
                    />
                </td>
            </tr>
        )
    }

    handleActivationUser = (userId) => {
        return InactiveUsersRepository.setActiveUser(userId).then(() => {
            toast.success(strings.activatedUser);
            this.getAllInactiveUsers();
        }).catch(() => {
            toast.error(strings.deactivatedUser);
        })
    }


    handleSearch = (e) => {
        this.setState({instName:e.target.value},()=>{
            InactiveUsersRepository.getAllInactiveUsersByInstName(this.state.instName).then(r => this.setState({
                listUsers: r.data.content,
                pageCount: r.data.totalPages}));
        })
    }
}

export default InactiveUsers;
