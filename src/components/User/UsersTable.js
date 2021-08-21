import React, {Component} from "react";
import UserRepository from "../../repository/UserRepository";
import CrudModal from "../Crud/CrudModal";
import {strings} from "../../Localization/Localization";
import UserEdit from "./UserEdit";
import ReactPaginate from "react-paginate";
import CrudService from "../../repository/service/CrudService";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import UserAdd from "./UserAdd";
import "./Css/UsersTable.css"
import Deactivation from "./Deactivation";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {faUserTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            instName: "",
            users: [],
            pageCount: 1,
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    handleFirstAndLastName = (e) => {
        let firstAndLastName = e.target.value.split(" ");
        let firstName = firstAndLastName[0];
        let lastName = firstAndLastName[1];
        if (lastName === undefined) {
            lastName = firstName;
        }

        this.setState({
            firstName: firstName,
            lastName: lastName
        }, () => {
            this.fetchData()
        })
    }
    handleInstitutionName = (e) => {
        this.setState({
            instName: e.target.value
        }, () => {
            this.fetchData();
        })
    }
    handlePageClick = data => {
        this.fetchData(data.selected);
    };
    fetchData = (selectedPage = 0) => {
        UserRepository.getAllUsers(this.state.firstName, this.state.lastName, this.state.instName, selectedPage).then(r => {
            this.setState({
                users: r.data.content,
                pageCount: r.data.totalPages
            })
        })
    }

    render() {

        const userAddValidations = ['email', 'password', 'firstName', 'lastName', 'phone', 'locales', 'institution_id', 'role', 'areasOfInterest_ids']

        return (
            <div className="col-12">
                <div className="row">
                    <div className="col-6" style={{paddingLeft: "0"}}>
                        <h2 style={{textAlign: "left", color: "#1C4857"}}
                            className="mt-4 mb-3">{strings.users}</h2>
                    </div>
                    <div className="col-6 justify-content-end text-right" style={{paddingLeft: "0"}}>
                        <Link to="/users/inactive" className="defaultBtn btn btn-info mt-4 mr-2">
                            <FontAwesomeIcon icon={faUserTimes} style={{marginRight: "3px"}}/>
                            {strings.inactiveUsers}
                        </Link>
                        <CrudModal
                            entity={{}}
                            icon="add"
                            btnClass="defaultBtnAdd btn mt-4"
                            style={{backgroundColor: '#03DAC5'}}
                            title={strings.addUser}
                            showText={true}
                            onSubmit={this.onAdd}
                            body={UserAdd}
                            validations={userAddValidations}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4" style={{paddingLeft: "0"}}>

                        <InputGroup className="mb-3">
                            <FormControl
                                value={this.state.searchValue}
                                disabled={false}
                                placeholder={strings.firstlastname}
                                onChange={this.handleFirstAndLastName}
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">
                                    <Button className={"btn btn-sm"} onClick={this.fetchDataBySearch}
                                            variant="outline-secondary"
                                            disabled={true}
                                    >
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </Button>
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>

                    </div>
                    <div className="col-4">

                        <InputGroup className="mb-3">
                            <FormControl
                                value={this.state.searchValue}
                                disabled={false}
                                placeholder={strings.institution}
                                onChange={this.handleInstitutionName}
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">
                                    <Button className={"btn btn-sm"} onClick={this.fetchDataBySearch}
                                            variant="outline-secondary"
                                            disabled={true}
                                    >
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </Button>
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>

                    </div>

                </div>
                <div className="row">
                    <table className="table-hover newTable mt-3" style={{width: "100%"}}>
                        <thead className="tableHead">
                        <th className="tableHeading firstHeading" style={{width: '14%'}}>{strings.firstName}</th>
                        <th className="tableHeading" style={{width: '14%'}}>{strings.lastName}</th>
                        <th className="tableHeading"  style={{width: '14%'}}>{strings.email}</th>
                        <th className="tableHeading"  style={{width: '12%'}}>{strings.phone}</th>
                        <th className="tableHeading"  style={{width: '26%'}}>{strings.institution}</th>
                        {/*<th>{strings.dateCreated}</th>*/}
                        {/*<th>{strings.dateUpdated}</th>*/}
                        <th className="tableHeading" style={{width: '10%'}}>{strings.actions}</th>
                        <th className="tableHeading lastHeading" style={{width: '10%'}}>{strings.delete}</th>
                        </thead>
                        <tbody>
                        {this.state.users.map(this.renderUsers)}
                        <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                            <td style={{borderRadius: "0 0 0 15px"}}/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td style={{borderRadius: "0 0 15px 0"}}/>
                        </tr>
                        </tbody>
                    </table>
                    <ReactPaginate
                        previousLabel={"<<"}
                        nextLabel={">>"}
                        breakLabel={'...'}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        )
    }

    onAdd = (entity) => {
        return CrudService.save("/rest/user", entity).then(res => {
            toast.success(strings.successfullyAddedUser);
            this.fetchData();
        }).catch((err) => {
            console.log(err)
            if(err.response.data === "User already exists")
                toast.error(strings.userAlreadyExists);
            else
                toast.error(strings.failedToAddUser);
        })
    }

    onEdit = (entity) => {
        return CrudService.edit("/rest/user", entity).then(res => {
            toast.success(strings.successfullyEditedUser);
            this.fetchData();
        }).catch(() => {
            toast.error(strings.failedToEditUser);
        })
    }

    // deleteUser = (id) => {
    //     return UserRepository.deleteUser(id).then(() => {
    //         toast.success("Корисникот е успешно избришан")
    //         this.fetchData();
    //     }).catch(() => {
    //         toast.error("Корисникот не е избришан")
    //     });
    // };

    handleDeleteUser = (Id) => {
        return UserRepository.setInactiveUser(Id).then(() => {
            toast.success(strings.userSuccessfullyDeleted)
            this.fetchData();
        }).catch(() => {
            toast.error(strings.userNotDeleted)
        });
    }


    renderUsers = (user) => {
        const userEditValidations = ['email', 'firstName', 'lastName', 'phone', 'locales', 'institution_id', 'role', 'areasOfInterest_ids']

        let lang = localStorage.getItem('activeLanguage');
        return (
            <tr key={user.id} style={{border: "1px solid lightgray"}}>
                <td className="tableData firstData">{user.firstName}</td>
                <td className="tableData">{user.lastName}</td>
                <td className="tableData">{user.email}</td>
                <td className="tableData">{user.phone}</td>
                {lang === 'mk' ?
                    <td className="tableData">{user.institution !== null ? user.institution.nameMk : strings.noInstitution} </td> :
                    <td className="tableData">{user.institution !== null ? user.institution.nameAl : strings.noInstitution} </td>}
                {/*<td>{user.dateCreated}</td>*/}
                {/*<td>{user.dateUpdated}</td>*/}
                <td className="tableData">
                    <CrudModal
                        entity={user}
                        icon="edit"
                        btnClass="defaultBtnEdit btn btn-success btn-sm"
                        title={strings.edit}
                        showText={true}
                        onSubmit={this.onEdit}
                        body={UserEdit}
                        validations={userEditValidations}
                    />
                </td>
                <td className="tableData">
                    <Deactivation
                        className="defaultBtn"
                        handleDeleteUser={() => this.handleDeleteUser(user.id)}
                        prompt={strings.deleteQuestionForUser}
                    />
                </td>
            </tr>
        )
    }
}

export default UsersTable;
