import React, {Component} from 'react';
import SendRequestForEvaluationRepository from "../../repository/SendRequestForEvaluationRepository";
import {strings} from "../../Localization/Localization";
import ReactPaginate from "react-paginate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import CrudModal from "../Crud/CrudModal";
import NotifyDirector from "./NotifyDirector";
import {toast} from "react-toastify";
import InstitutionRepository from "../../repository/InstitutionRepository";

class AllRequestsPaged extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allRequests: [],
            pageCount: 1,
            listUsers: [],
            isWaitingToPublish: false,
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = (selectedPage = 0) => {
        SendRequestForEvaluationRepository.findAllPaged(selectedPage).then(res => {
            this.setState({
                allRequests: res.data.content,
                pageCount: res.data.totalPages,
            })
        })
    }

    handlePageClick = data => {
        this.fetchData(data.selected)
    }

    notifyDirector = async (entity) => {

        await InstitutionRepository.getDirectorEmailsForInstitution(entity.sentRequest.receiver.id).then(res => {
             this.setState({
                listUsers: res.data
            })
        })

        if (this.state.listUsers.length > 0 && entity.message !== "" && entity.message !== undefined && entity.message !== "undefined") {
            this.setState({
                isWaitingToPublish: true
            })
            return SendRequestForEvaluationRepository.notifyDirectors(this.state.listUsers, entity.message).then(() => {
                toast.success(strings.successfullySentMail)
                this.setState({
                    isWaitingToPublish: false
                })
            }).catch(() => {
                toast.error(strings.failedToSendMail)
                this.setState({
                    isWaitingToPublish: false
                })
            })
        }
        else{
            alert(strings.validRequest)
        }

    }

    render() {
        return (
            <div className="mt-5">
                {!this.state.isWaitingToPublish &&
                <div>
                    <div className="row">
                        <div className="col-12">
                            <h2 className="text-center" style={{color: "#1C4857"}}>{strings.allRequests}</h2>

                            <table className="table-hover newTable mt-5" style={{width: "100%"}}>
                                <thead className="tableHead">
                                    <th className="tableHeading firstHeading" style={{width: '25%'}}> {strings.creator} </th>
                                    <th className="tableHeading" style={{width: '45%'}}> {strings.institution} </th>
                                    <th className="tableHeading" style={{width: '15%'}}> {strings.dateSent} </th>
                                    <th className="tableHeading lastHeading" style={{width: '15%'}}>{strings.options}</th>
                                </thead>
                                <tbody>
                                {this.state.allRequests.map(this.renderData)}
                                <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                                    <td style={{borderRadius: "0 0 0 15px"}}/>
                                    <td/>
                                    <td/>
                                    <td style={{borderRadius: "0 0 15px 0"}}/>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
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

                    <div className="col-12 text-right">
                        <NavLink to="/sendRequest">
                            <button type="button"
                                    className="btn btn-dark ml-2 mt-5 defaultBtn">
                                <FontAwesomeIcon icon={faArrowLeft} size="lg"
                                                 style={{paddingRight: '4px'}}/>
                                {strings.goBack}
                            </button>
                        </NavLink>
                    </div>
                </div>
                }
                {this.state.isWaitingToPublish &&
                <div className="container-fluid loadingContainer">
                    <div className="spinner-grow text-secondary" style={{height: "50px", width: "50px"}}
                         role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-secondary" style={{height: "50px", width: "50px"}}
                         role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-secondary" style={{height: "50px", width: "50px"}}
                         role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                }
            </div>
        );
    }

    renderData = (sentRequest) => {
        return (
            <tr key={sentRequest.id} style={{border: "1px solid lightgray"}}>
                <td className="tableData">{sentRequest.sender.firstName + " " + sentRequest.sender.lastName}</td>
                <td className="tableData">{sentRequest.receiver.nameMk}</td>
                <td className="tableData">{sentRequest.dateCreated.replaceAll("-", ".")}</td>
                <CrudModal entity={{sentRequest}}
                           icon="mail"
                           btnClass="btn-info btn-sm mt-1 defaultBtn"
                           title={strings.notifyDir}
                           onSubmit={this.notifyDirector}
                           body={NotifyDirector}
                           showText={true}
                />
            </tr>
        )
    }
}

export default AllRequestsPaged;