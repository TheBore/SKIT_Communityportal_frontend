import React, {Component} from "react";
import AnnouncementPublicationRepository from "../../repository/AnnouncementPublicationRepository";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {strings} from "../../Localization/Localization";
import DeleteModal from "../Crud/DeleteModal";
import ReactPaginate from "react-paginate";
import MailModal from "../Crud/MailModal";
import CrudModal from "../Crud/CrudModal";
import EscalateModal from "../Crud/EscalateModal";


class PublicationsForAnnouncements extends Component {

    state = {
        data: null,
        pageCount: 1,
        isWaitingToPublish: false
    };

    getData = (selectedPage = 0) => {
        let id = this.props.match.params.id;
        AnnouncementPublicationRepository.getPublicationByAnnId(id, selectedPage).then(res => {
            this.setState({
                data: res.data.content,
                pageCount: res.data.totalPages
            })
        }).catch(err => {
            toast.error(strings.failedToLoadAnnouncementPub)
        })
    };

    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
        this.getData();
    }

    deleteAnnPub = (id) => {
        return AnnouncementPublicationRepository.deleteAnnPub(id).then(() => {
            toast.success(strings.successDeletedAnnounPub)
            this.getData();
        }).catch(() => {
            toast.error(strings.failedToDeleteAnnounPub)
        });

    };
    remind = (entity) => {
        if (entity.message !== "") {
            this.setState({
                isWaitingToPublish: true
            })
            return AnnouncementPublicationRepository.sendMailRemind(entity.apinstitutionId, entity.message)
                .then(() => {
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
    };
    escalate = (entity) => {
        console.log(entity)
        if (entity.message !== "" || entity.direktorEmail !== "") {
            this.setState({
                isWaitingToPublish: true
            })
            return AnnouncementPublicationRepository.sendMailEscalate(entity.direktorEmail, entity.message)
                .then(() => {
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
    };
    handlePageClick = data => {
        this.getData(data.selected);
    };

    render() {
        let role = localStorage.getItem('role');
        if (!this.state.data) {
            return (<div></div>)
        }
        return (
            <div>
                {!this.state.isWaitingToPublish &&
                <div className="col-12">
                    <h2 style={{textAlign: "left", color: "#1C4857"}} className="mt-4 mb-5">{strings.publication}</h2>
                    <table className="table-hover newTable mt-2" style={{width: '100%'}}>
                        <thead className="tableHead">
                            <th className="tableHeading firstHeading" style={{width: '27%'}}>{strings.announcement}</th>
                            <th className="tableHeading" style={{width: '27%'}}>{strings.receiver}</th>
                            <th className="tableHeading text-center" style={{width: '12%'}}>{strings.read}</th>
                            <th className="tableHeading" style={{width: '12%'}}>{strings.readAt}</th>
                            <th className="tableHeading lastHeading text-center"
                                style={{width: '30%'}}>{strings.actions}
                            </th>
                        </thead>
                        <tbody>
                        {this.state.data.map((item, index) => {
                            let lang = localStorage.getItem("activeLanguage");
                            return (<tr key={item.id} style={{border: "1px solid lightgray"}}>
                                <td className="tableData">{item.announcement.title}</td>
                                <td className="tableData">{lang === "mk" ? item.receiver.nameMk : item.receiver.nameAl}</td>
                                <td className="tableData text-center">{item.read ? <i class="fa fa-check-square fa-2x"></i> :
                                    <i className="fa fa-minus-square fa-2x"></i>}</td>
                                <td className="tableData">{item.readAt ? item.readAt : `${strings.NotReaded}`}</td>
                                <td colSpan={3} className="tableData">
                                    <CrudModal entity={{
                                        apinstitutionId: item.receiver.id
                                    }}
                                               icon="mail"
                                               btnClass="btn-dark btn-sm mr-2 defaultBtn"
                                               title={strings.remind}
                                               onSubmit={this.remind}
                                               body={MailModal}
                                               showText={true}/>

                                    <CrudModal entity={{}}
                                               icon="mail"
                                               btnClass="btn-info btn-sm mr-2 defaultBtn"
                                               title={strings.escalete}
                                               onSubmit={this.escalate}
                                               body={EscalateModal}
                                               showText={true}/>
                                    {role === "ROLE_ADMIN" ?
                                        <DeleteModal btnClass={"ml-1 defaultBtn"}
                                                     prompt={strings.removePublicationPrompt}
                                                     showText={true}
                                                     doDelete={() => this.deleteAnnPub(item.id)}/> : <div></div>}
                                </td>
                            </tr>)
                        })}
                        <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                            <td style={{borderRadius: "0 0 0 15px"}}/>
                            <td/>
                            <td/>
                            <td/>
                            <td style={{borderRadius: "0 0 15px 0"}}/>
                        </tr>
                        </tbody>
                    </table>
                    <div className={"text-center"}>
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
                }
                {this.state.isWaitingToPublish &&
                <div className="container-fluid loadingContainer">
                    <div className="spinner-grow text-secondary" style={{height: "50px", width: "50px"}}
                         role="status">
                        <span className="sr-only">{strings.loading}...</span>
                    </div>
                    <div className="spinner-grow text-secondary" style={{height: "50px", width: "50px"}}
                         role="status">
                        <span className="sr-only">{strings.loading}...</span>
                    </div>
                    <div className="spinner-grow text-secondary" style={{height: "50px", width: "50px"}}
                         role="status">
                        <span className="sr-only">{strings.loading}...</span>
                    </div>
                </div>
                }

            </div>
        )
    }


};

export default PublicationsForAnnouncements;