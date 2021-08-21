import React, {Component} from 'react';
import ActivityInstitutionRepository from "../../repository/ActivityInstitutionRepository";
import {toast} from "react-toastify";
import {strings} from "../../Localization/Localization";
import CrudModal from "../Crud/CrudModal";
import DeleteModal from "../Crud/DeleteModal";
import ActivityInstitutionEdit from "./ActivityInstitutionEdit";
import ActivityInstitutionAdd from "./ActivityInstitutionAdd";
import ReactPaginate from "react-paginate";
import SearchBar from "../Search/SearchBar";

class ActivityInstitutionTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allActivityInstitutions: [],
            activeLanguage: localStorage.getItem("activeLanguage"),
            isAdmin: localStorage.getItem('role') === "ROLE_ADMIN",
            pageCount: 1,
            keyword: "",
            selectedData: 0,
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = (keyword, selectedPage = 0) => {
        ActivityInstitutionRepository.getAllActivityInstitutionPaged(keyword, selectedPage).then(res => {
            this.setState({
                allActivityInstitutions: res.data.content,
                pageCount: res.data.totalPages
            })
        }).catch(err => {
            console.log(err);
        })
    }

    handleSearchData = (keyword) => {
        this.setState({
            keyword: keyword
        })
        if (keyword === "") {
            this.fetchData(keyword, this.state.selectedData)
        } else {
            this.fetchData(keyword, 0)
        }
    }

    addActivityInstitution = (entity) => {
        return ActivityInstitutionRepository.createActivityInstitution(entity).then(res => {
            toast.success(strings.succAdded);
            this.fetchData();
        }).catch(err => {
            toast.error(strings.failTryAgain);
        })
    }

    editActivityInstitution = (entity) => {
        return ActivityInstitutionRepository.updateActivityInstitution(entity).then(async res => {
            toast.success(strings.succChanged);
            await this.sleep(3000);
            window.location.reload();
            this.fetchData();
        }).catch(err => {
            toast.error(strings.failTryAgain);
        })
    }

    deleteActivityInstitution = (activityInstitutionId) => {
        return ActivityInstitutionRepository.deleteActivityInstitution(activityInstitutionId).then(res => {
            toast.success(strings.deleteModal)
            this.fetchData();
        }).catch(err => {
            toast.error(strings.failTryAgain)
        })
    }

    handlePageClick = async data => {
        await this.setState({
            selectedData: data.selected
        })
        this.fetchData(this.state.keyword, this.state.selectedData)
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    render() {

        return (
            <div className="col-12">

                <div className="row">
                    <div className="col-6">
                        <h2 style={{textAlign: "left", color: "#1C4857"}}
                            className="mt-4 mb-3">{strings.responsibleInstitutions}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <SearchBar handleSearch={this.handleSearchData}/>
                    </div>
                    <div className="col-9 justify-content-end text-right">
                        <CrudModal
                            entity={{}}
                            icon="add"
                            btnClass="defaultBtnAdd btn-primary mt-4"
                            title={strings.addResponsibleInstitution}
                            showText={true}
                            onSubmit={this.addActivityInstitution}
                            body={ActivityInstitutionAdd}
                        />
                    </div>
                </div>

                <table className="table-hover newTable mt-2" style={{width: '100%'}}>
                    <thead className="tableHead">
                    <th className="tableHeading firstHeading" style={{width: '27%'}}> {strings.nameMk}</th>
                    <th className="tableHeading" style={{width: '27%'}}> {strings.nameAl}</th>
                    <th className="tableHeading" style={{width: '27%'}}> Поврзана институција</th>
                    <th className="tableHeading" style={{width: '11%'}}> {strings.options}</th>
                    <th className="tableHeading lastHeading" style={{width: '11%'}}> {strings.delete}</th>
                    </thead>
                    <tbody>
                    {this.state.allActivityInstitutions.map(this.renderActivityInstitutions)}
                    </tbody>
                    <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                        <td style={{borderRadius: "0 0 0 15px"}}/>
                        <td/>
                        <td/>
                        <td/>
                        <td style={{borderRadius: "0 0 15px 0"}}/>
                    </tr>
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
        );
    }

    renderActivityInstitutions = (activityInstitution) => {
        return (
            <tr key={activityInstitution.id} style={{border: "1px solid lightgray"}}>
                <td className="tableData">{activityInstitution.nameMk}</td>
                <td className="tableData">{activityInstitution.nameAl}</td>
                <td className="tableData">{activityInstitution.institution ? activityInstitution.institution.nameMk : ""}</td>
                <td className="tableData">
                    <CrudModal entity={activityInstitution}
                               icon="edit"
                               btnClass="defaultBtnEdit btn-success btn-sm"
                               title={strings.edit}
                               showText={true}
                               onSubmit={this.editActivityInstitution}
                               body={ActivityInstitutionEdit}
                    />
                </td>
                <td className="tableData">
                    <DeleteModal btnClass={"defaultBtn ml-1"}
                                 prompt={strings.deleteResponsibleInstitution}
                                 showText={true}
                                 doDelete={() => this.deleteActivityInstitution(activityInstitution.id)}
                    />
                </td>
            </tr>
        )
    }
}

export default ActivityInstitutionTable;