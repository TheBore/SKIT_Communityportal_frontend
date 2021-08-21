import React, {Component} from "react";
import {strings} from "../../Localization/Localization";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import {ButtonToolbar} from "react-bootstrap";
import CrudModal from "../Crud/CrudModal";
import MailModal from "../Crud/MailModal";
import EscalateModal from "../Crud/EscalateModal";
import DeleteModal from "../Crud/DeleteModal";
import FeedbackPublicationRepository from "../../repository/FeedbackPublicationRepository";
import {toast} from "react-toastify";
import FeedbackRepository from "../../repository/FeedbackRepository";

class FeedbackPreviousPublications extends Component{
    constructor(props) {
        super(props);
        this.state = {
            feedback: null,
            institutionIds: [],
            tagsIds: [],
            feedbackPublications: [],
            pageCount: 1,
            isWaitingToPublish: false
        }
    }

    handlePageClick = data => {
        this.fetchData(data.selected);
    };

    componentDidMount() {
        this.fetchData();
        this.feedbackForPublish();
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
    }

    feedbackForPublish = () => {
        let id = this.props.match.params.id;
        FeedbackRepository.getFeedbackById(id).then(res => {
            this.setState({feedback: res.data})
        }).catch(err => {
            toast.error(strings.errorWhileLoadingFeedback);
        });
    };

    fetchData = (selectedPage = 0) => {
        let feedbackId = this.props.match.params.id;
        FeedbackPublicationRepository.getFeedbackPublication(feedbackId, selectedPage).then(res => {
            this.setState({
                feedbackPublications: res.data.content,
                pageCount: res.data.totalPages
            })
        }).catch(err => {
            console.log(err)
        })
    }

    lang = localStorage.getItem('activeLanguage')
    localizedProp = (item, name) => {
        name = name || 'name';

        if (this.lang === "mk") {
            return item[name + 'Mk'];
        }
        if (this.lang === "en") {
            return item[name + 'En'];
        }
        if (this.lang === "al") {
            return item[name + 'Al'];
        }

    }

    remindPublication = (entity) => {
        if (entity.message !== "") {
            this.setState({
                isWaitingToPublish: true
            })
            return FeedbackPublicationRepository.remindFeedbackPub(entity.institutionId, entity.message).then(() => {
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
    }

    escalatePublication = (entity) => {
        if (entity.message !== "" || entity.direktorEmail !== "") {
            this.setState({
                isWaitingToPublish: true
            })
            return FeedbackPublicationRepository.escalateFeedbackPub(entity.direktorEmail, entity.message).then(() => {
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
    }

    deletePublication = (feedpubId) => {
        return FeedbackPublicationRepository.deleteFeedbackPub(feedpubId).then(() => {
            this.fetchData();
            toast.success(strings.successfullyDeletedFeedbackPublication)
        }).catch(() => {
            toast.error(strings.failedToDeleteFeedbackPublication)
        })
    }

    renderFeedbackPub = item => {
        return (<tr key={item.id} style={{border: "1px solid lightgray"}}>
            <td className="tableData">{item.feedback.name}</td>
            <td className="tableData">{this.localizedProp(item.institution)}</td>
            <td className="tableData">{item.feedback.areaOfInterest.nameMk ? item.feedback.areaOfInterest.nameMk : ""}</td>
            <td className="tableData">{item.read === true ? <FontAwesomeIcon icon={faCheck} size="lg"
                                                                             style={{
                                                                                 paddingLeft: '20p',
                                                                                 marginLeft: '25px',
                                                                                 color: "green"
                                                                             }}
                                                                             className="text-center"/> :
                <FontAwesomeIcon icon={faTimes} size="lg"
                                 style={{paddingLeft: '20p', marginLeft: '25px', color: "#dc3545"}}
                                 className="text-center"/>}</td>
            <td className="tableData">{item.readAt ? item.readAt : `${strings.NotReaded}`}</td>
            <td className="tableData">
                <ButtonToolbar>
                    {item.read === false ?
                        <CrudModal entity={{
                            institutionId: item.institution.id
                        }}
                                   icon="mail"
                                   btnClass="btn-dark btn-sm mr-2 defaultBtn"
                                   title={strings.remind}
                                   onSubmit={this.remindPublication}
                                   body={MailModal}
                                   showText={true}/>
                        :
                        <p/>}
                    {item.read === false ?
                        <CrudModal entity={{}}
                                   icon="mail"
                                   btnClass="btn-info btn-sm mr-2 defaultBtn"
                                   title={strings.escalate}
                                   onSubmit={this.escalatePublication}
                                   body={EscalateModal}
                                   showText={true}/>
                        : <p/>}
                    {item.read === false ? <DeleteModal btnClass={"ml-1 defaultBtn"}
                                                        prompt={strings.deleteFeedbackPub}
                                                        doDelete={() => this.deletePublication(item.id)}
                                                        showText={true}/> :
                        <p/>}
                </ButtonToolbar>

            </td>
        </tr>);
    }

    render() {
        if (!this.state.feedback) {
            return (<div></div>)
        } else {

            return (
                <div style={{height: "100%"}}>
                    {!this.state.isWaitingToPublish &&
                    <div className="col-12">
                        <div className="row mt-5" style={{color: "black"}}>
                            <div className="col-md-12 text-center mb-3">
                                <h2 style={{borderBottom: "2px solid gray", display: "inline"}}>
                                    {this.state.feedback.name}
                                </h2>
                            </div>
                            <h2 style={{fontSize: "16pt"}}>{strings.AllPublicationsForThisFeedback}:</h2>
                            <table className="table-hover newTable mt-3" style={{width: "100%"}}>
                                <thead className="tableHead">
                                <tr>
                                    <th className="tableHeading firstHeading" style={{width: '18%'}}>{strings.name}</th>
                                    <th className="tableHeading" style={{width: '24%'}}>{strings.receiver}</th>
                                    <th className="tableHeading" style={{width: '10%'}}>{strings.areasOfInterest}</th>
                                    <th className="tableHeading" style={{width: '10%'}}>{strings.read}</th>
                                    <th className="tableHeading" style={{width: '14%'}}>{strings.readAt}</th>
                                    <th className="tableHeading lastHeading text-center"
                                        style={{width: '24%'}}>{strings.actions}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>{this.state.feedbackPublications.map(this.renderFeedbackPub)}</tbody>
                                <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                                    <td style={{borderRadius: "0 0 0 15px"}}/>
                                    <td/>
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
    }
}

export default FeedbackPreviousPublications;