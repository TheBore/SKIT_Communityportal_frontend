import React, {Component} from "react";
import InstitutionRepository from "../../repository/InstitutionRepository";
import {strings} from "../../Localization/Localization";
import CrudModal from "../Crud/CrudModal";
import {toast} from "react-toastify";
import './css/InstitutionEdited.css';
import ReactPaginate from "react-paginate";
import DeleteModal from "../Crud/DeleteModal";
import {NavLink} from "react-router-dom";
import InstitutionEditedFields from "./InstitutionEditedFields";


class EditedInstitutions extends Component {

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
        InstitutionRepository.getAllEdited(selectedPage).then(res => {
            this.setState({
                institutions: res.data.content,
                pageCount: res.data.totalPages
            })
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


    render() {
        return (
            <div className="col-12">
                <div className="row">
                    <div className="col-6">
                        <h2 style={{textAlign: "left", color: "#1C4857"}}
                            className="mt-4">{strings.editedInstitutions}</h2>
                    </div>
                    <div className="col-6 justify-content-end text-right">
                        <NavLink to="/institutions">
                            <button type="button"
                                    className="btn btn-dark ml-5 mt-4 defaultBtn"
                                    style={{float: "right"}}>{strings.institutions}</button>
                        </NavLink>
                    </div>
                </div>

                <table className="table-hover newTable mt-3" style={{width: "100%"}}>
                    <thead className="tableHead">
                    <th className="tableHeading firstHeading" style={{width: '32%'}}> {strings.name} </th>
                    <th className="tableHeading" style={{width: '22%'}}> {strings.address} </th>
                    <th className="tableHeading" style={{width: '11%'}}> {strings.phone} </th>
                    <th className="tableHeading" style={{width: '15%'}}> {strings.listOfInformations} </th>
                    {/*<th> {strings.direktorFirstName} </th>*/}
                    {/*<th> {strings.direktorLastName} </th>*/}
                    {/*<th> {strings.direktorPhone} </th>*/}
                    {/*<th> {strings.direktorEmail} </th>*/}
                    <th className="tableHeading text-center" style={{width: '10%'}}> {strings.actions} </th>
                    <th className="tableHeading lastHeading text-center" style={{width: '10%'}}> {strings.delete} </th>
                    </thead>
                    <tbody>
                    {this.state.institutions.map(this.renderData)}
                    <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                        <td style={{borderRadius: "0 0 0 15px"}}/>
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
                <td  className="tableData"> {name !== null && name !== "" ? name : strings.notEntered} </td>
                <td  className="tableData">  {address !== null && address !== "" ? address : strings.notEntered}</td>
                <td  className="tableData"> {institution.institutionPhone !== null ? institution.institutionPhone : strings.notEntered}
                    {institution.institutionLocales ? " лок. " + institution.institutionLocales : ""}
                </td>
                <td className="tableData">
                    {institution.webSite !== null ? institution.webSite : ""}
                    <br/>
                    {institution.noticeBoard ? "*" + strings.infoNoticeBoard : ""}
                </td>
                {/*<td> {institution.direktorFirstName !== null ? institution.direktorFirstName : strings.notEntered} </td>*/}
                {/*<td> {institution.direktorLastName !== null ? institution.direktorLastName : strings.notEntered}</td>*/}
                {/*<td> {institution.direktorPhone !== null ? institution.direktorPhone : strings.notEntered} </td>*/}
                {/*<td> {institution.direktorEmail !== null ? institution.direktorEmail : strings.notEntered} </td>*/}
                <td className="tableData">
                    <CrudModal entity={institution}
                               icon="edit"
                               btnClass="btn-success btn-sm"
                               title={strings.seeChanges}
                               showText={true}
                               onSubmit={this.onEdit}
                               body={InstitutionEditedFields}
                    />
                </td>
                <td className="tableData">
                    <DeleteModal btnClass={"ml-1"}
                                 prompt={strings.deleteChanges}
                                 showText={true}
                                 doDelete={() => this.deleteInstitution(institution.id)}
                    />
                </td>

            </tr>
        )
    }
    onEdit = (entity) => {
        return InstitutionRepository.recreateInstitution(entity).then(() => {
            toast.success(strings.successfullyEditInstitution);
            this.props.history.push("/institutions")
        }).catch((err) => {
            if (err.message === "Request failed with status code 406") {
                alert(strings.enterValidNumber)
            }
            toast.error(strings.failEditInstitution)
        })
    }
}

export default EditedInstitutions;
