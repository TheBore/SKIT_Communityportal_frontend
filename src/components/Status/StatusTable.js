import React, {Component} from 'react';
import StatusRepository from "../../repository/StatusRepository";
import {toast} from "react-toastify";
import {strings} from "../../Localization/Localization";
import CrudModal from "../Crud/CrudModal";
import DeleteModal from "../Crud/DeleteModal";
import StatusEdit from "./StatusEdit";
import StatusAdd from "./StatusAdd";
import SearchBar from "../Search/SearchBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faLongArrowAltRight, faTimes} from "@fortawesome/free-solid-svg-icons";

class StatusTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allStatuses: [],
            activeLanguage: localStorage.getItem("activeLanguage"),
            isAdmin: localStorage.getItem('role') === "ROLE_ADMIN",
            keyword: null,
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = (keyword) => {
        StatusRepository.getAllStatuses(keyword).then(res => {
            this.setState({
                allStatuses: res.data
            })
        })
    }

    addStatus = (entity) => {
        return StatusRepository.createStatus(entity).then(res => {
            toast.success(strings.succAdded);
            this.fetchData();
        }).catch(err => {
            toast.error(strings.failTryAgain);
        })
    }

    editStatus = (entity) => {
        return StatusRepository.updateStatus(entity).then(async res => {
            toast.success(strings.succChanged);
            await this.sleep(3000);
            window.location.reload();
            this.fetchData();
        }).catch(err => {
            toast.error(strings.failTryAgain);
        })
    }

    deleteStatus = (statusId) => {
        return StatusRepository.deleteStatus(statusId).then(res => {
            toast.success(strings.deleteModal)
            this.fetchData();
        }).catch(err => {
            if(err.message === "Request failed with status code 405"){
                toast.error(strings.noDeleteStatus)
            }
        })
    }

    handleSearchData = (keyword) => {
        this.setState({
            keyword: keyword
        })
        this.fetchData(keyword);
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    sortStatuses = () => {
        this.state.allStatuses.sort((a, b) => (a.statusType > b.statusType) ? 1 : -1)
    }

    render() {

        {
            this.sortStatuses()
        }
        return (
            <div className="col-12">

                <div className="row">
                    <div className="col-6">
                        <h2 style={{textAlign: "left", color: "#1C4857"}}
                            className="mt-4 mb-3">{strings.statuses}</h2>
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
                            title={strings.addStatus}
                            showText={true}
                            onSubmit={this.addStatus}
                            body={StatusAdd}
                        />
                    </div>
                </div>

                <table className="table-hover newTable mt-2" style={{width: '100%'}}>
                    <thead className="tableHead">
                        <th className="tableHeading firstHeading" style={{width: '20%'}}> {strings.nameMk}</th>
                        <th className="tableHeading" style={{width: '20%'}}> {strings.nameAl}</th>
                        <th className="tableHeading" style={{width: '20%'}}> {strings.statType} </th>
                        <th className="tableHeading" style={{width: '10%'}}> Дали може да се евалуира </th>
                        <th className="tableHeading" style={{width: '15%'}}> {strings.options}</th>
                        <th className="tableHeading lastHeading" style={{width: '15%'}}> {strings.delete}</th>
                    </thead>
                    <tbody>
                    {this.state.allStatuses.map(this.renderStatuses)}
                    </tbody>
                    <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                        <td style={{borderRadius: "0 0 0 15px"}}/>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td style={{borderRadius: "0 0 15px 0"}}/>
                    </tr>
                </table>

            </div>
        );
    }

    renderStatuses = (status) => {
        return(
            <tr key={status.id} style={{border: "1px solid lightgray"}}>
                <td className="tableData">{status.statusMk}</td>
                <td className="tableData">{status.statusAl}</td>
                <td className="tableData">{status.statusType ? status.statusType : ""}</td>
                <td className="tableData" style={{textAlign: "center"}}>{status.isEvaluable !== null
                    ? (status.isEvaluable
                        ? <FontAwesomeIcon icon={faCheck} style={{color: "green"}} size={'2x'}/>
                        : <FontAwesomeIcon icon={faTimes} style={{color: "red"}} size={'2x'}/>)
                    : ""}
                </td>
                <td className="tableData">
                    <CrudModal entity={status}
                               icon="edit"
                               btnClass="defaultBtnEdit btn-success btn-sm"
                               title={strings.edit}
                               showText={true}
                               onSubmit={this.editStatus}
                               body={StatusEdit}
                    />
                </td>
                <td className="tableData">
                    <DeleteModal btnClass={"defaultBtn ml-1"}
                                 prompt={strings.statusDeleteQuestion}
                                 showText={true}
                                 doDelete={() => this.deleteStatus(status.id)}
                    />
                </td>
            </tr>
        )
    }
}

export default StatusTable;