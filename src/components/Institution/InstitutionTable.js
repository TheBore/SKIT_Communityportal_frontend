import React, {Component} from "react";
import InstitutionRepository from "../../repository/InstitutionRepository";
import {strings} from "../../Localization/Localization";
import InstitutionEdit from "./InstitutionEdit";
import CrudModal from "../Crud/CrudModal";
import CrudService from "../../repository/service/CrudService";
import {toast} from "react-toastify";
import './css/InstitutionTable.css';
import ReactPaginate from "react-paginate";
import InstitutionAdd from "./InstitutionAdd";
import DeleteModal from "../Crud/DeleteModal";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLayerGroup} from "@fortawesome/free-solid-svg-icons";

class InstitutionTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            institutions: [],
            keyword: "",
            pageCount: 1
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    handlePageClick = data => {
        this.fetchData(data.selected);
    };
    fetchData = (selectedPage = 0) => {
        InstitutionRepository.getInstitutionsWithModerator(this.state.keyword, selectedPage).then(res => {
            this.setState({
                institutions: res.data.content,
                pageCount: res.data.totalPages
            })
        })
    }
    handleSearch = (e) => {
        this.setState({keyword: e.target.value}
            , () => {
                this.fetchData();
            })
    }


    deleteInstitution = (id) => {
        return InstitutionRepository.setInactiveInstitution(id).then(() => {
            toast.success(strings.institutionDeleted)
            this.fetchData();
        }).catch(() => {
            toast.error(strings.institutionNotDeleted)
        });
    };

    onAdd = (entity) => {
        return InstitutionRepository.addNewInstitution(entity).then(() => {
            toast.success(strings.successfullyAdInstitution)
            this.fetchData(this.state.keyword);
        }).catch((err) => {
            if (err.message === "Request failed with status code 406") {
                alert(strings.enterValidNumber)
            }
            toast.error(strings.failAddInstitution);
        })
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-6">
                        <h2 style={{textAlign: "left", color: "#1C4857"}}
                            className="mt-4 mb-3">{strings.institutions}</h2>
                    </div>
                    <div className="col-6 justify-content-end text-right">
                        <NavLink to="/EditedInstitutions">
                            <button type="button"
                                    className="defaultBtn btn btn-info mt-4 mr-3">
                                <FontAwesomeIcon icon={faLayerGroup} style={{marginRight: "3px"}}/>
                                {strings.editedInstitutions}
                            </button>
                        </NavLink>

                        <CrudModal
                            entity={{}}
                            icon="add"
                            btnClass="defaultBtnAdd btn-primary mt-4"
                            title={strings.addInstitution}
                            showText={true}
                            onSubmit={this.onAdd}
                            body={InstitutionAdd}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">

                        <InputGroup className="mb-3">
                            <FormControl
                                value={this.state.searchValue}
                                disabled={false}
                                placeholder={strings.search}
                                onChange={this.handleSearch}
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

                <table className="table-hover newTable mt-2" style={{width: '100%'}}>
                    <thead className="tableHead">
                    <th className="tableHeading firstHeading" style={{width: '32%'}}> {strings.name} </th>
                    <th className="tableHeading" style={{width: '22%'}}> {strings.address} </th>
                    <th className="tableHeading" style={{width: '11%'}}> {strings.phone} </th>
                    <th className="tableHeading" style={{width: '15%'}}> {strings.listOfInformations} </th>
                    {/*<th className="tableHeading"> {strings.direktorFirstName} </th>*/}
                    {/*<th className="tableHeading"> {strings.direktorLastName} </th>*/}
                    {/*<th className="tableHeading"> {strings.direktorPhone} </th>*/}
                    {/*<th className="tableHeading"> {strings.direktorEmail} </th>*/}
                    <th className="tableHeading" style={{width: '10%'}}> {strings.actions} </th>
                    <th className="tableHeading lastHeading" style={{width: '10%'}}> {strings.delete} </th>
                    </thead>
                    <tbody>
                    {this.state.institutions.map(this.renderData)}
                    <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                        <td style={{borderRadius: "0 0 0 15px"}}/>
                        <td/>
                        <td/>
                        <td/>
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
        )
    }

    renderData = (institution) => {
        let address = null;
        let name = null

        let addressMk = institution.addressMk !== null ? institution.addressMk : "";

        let addressAl = institution.addressAl !== null ? institution.addressAl : "";

        let addressEn = institution.addressEn !== null ? institution.addressEn : "";


        if (localStorage.getItem('activeLanguage') === 'mk') {
            address = addressMk;
            name = institution.nameMk;
        }
        else if (localStorage.getItem('activeLanguage') === 'al') {
            address = addressAl;
            name = institution.nameAl;
        }
        else {
            address = addressEn;
            name = institution.nameEn;
        }
        return (

            <tr key={institution.id} style={{border: "1px solid lightgray"}}>
                <td className="tableData firstData"> {name !== null && name !== "" ? name : strings.notEntered} </td>
                <td className="tableData">  {address !== null && address !== "" ? address : strings.notEntered}</td>
                <td className="tableData"> {institution.institutionPhone !== null ? institution.institutionPhone : strings.notEntered}
                    {institution.institutionLocales ? " лок. " + institution.institutionLocales : ""}
                </td>
                <td className="tableData">
                    {institution.webSite !== null ? institution.webSite : ""}
                    <br/>
                    {institution.noticeBoard===true ? "*" + strings.infoNoticeBoard : ""}
                </td>
                {/*<td className="tableData"> {institution.direktorFirstName !== null ? institution.direktorFirstName : strings.notEntered} </td>*/}
                {/*<td className="tableData"> {institution.direktorLastName !== null ? institution.direktorLastName : strings.notEntered}</td>*/}
                {/*<td className="tableData"> {institution.direktorPhone !== null ? institution.direktorPhone : strings.notEntered} </td>*/}
                {/*<td className="tableData"> {institution.direktorEmail !== null ? institution.direktorEmail : strings.notEntered} </td>*/}
                <td className="tableData">
                    <CrudModal entity={institution}
                               icon="edit"
                               btnClass="defaultBtnEdit btn-success btn-sm"
                               title={strings.edit}
                               showText={true}
                               onSubmit={this.onEdit}
                               body={InstitutionEdit}
                    />
                </td>
                <td className="tableData">
                    <DeleteModal btnClass={"defaultBtn ml-1"}
                                 prompt={strings.instDeleteQuestion}
                                 showText={true}
                                 doDelete={() => this.deleteInstitution(institution.id)}
                    />
                </td>

            </tr>
        )
    }
    onEdit = (entity) => {
        return CrudService.edit("/rest/institution", entity).then(() => {
            toast.success(strings.successfullyEditInstitution);
            this.fetchData();
        }).catch((err) => {
            if (err.message === "Request failed with status code 406") {
                alert(strings.enterValidNumber)
            }
            toast.error(strings.failEditInstitution)
        })
    }
}

export default InstitutionTable;
