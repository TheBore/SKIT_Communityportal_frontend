import React, {Component} from "react";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FeedbackRepository from "../../repository/FeedbackRepository";
import FeedbackPublicationRepository from "../../repository/FeedbackPublicationRepository";
import moment from "moment";
import ReactPaginate from "react-paginate";
import {ButtonToolbar} from "react-bootstrap";
import DeleteModal from "../Crud/DeleteModal";
import {strings} from "../../Localization/Localization";
import MapEntityTagsPublish from "../Announcement/MultipleSelecetPublish/MapEntityTagsPublish";
import MapEntityInstitutionsPublish from "../Announcement/MultipleSelecetPublish/MapEntityInstitutionsPublish";
import {faCheck, faPaperPlane, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./css/FeedbackToPublish.css"
import CrudModal from "../Crud/CrudModal";
import MailModal from "../Crud/MailModal";
import EscalateModal from "../Crud/EscalateModal";

class FeedbackToPublish extends Component {
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
    handlePageClick = data => {
        this.fetchData(data.selected);
    };
    renderFeedbackPub = item => {
        return (<tr key={item.id} style={{border: "1px solid lightgray"}}>
            <td className="tableData">{item.feedback.name}</td>
            <td className="tableData">{this.localizedProp(item.institution)}</td>
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

    feedbackForPublish = () => {
        let id = this.props.match.params.id;
        FeedbackRepository.getFeedbackById(id).then(res => {
            this.setState({feedback: res.data})
        }).catch(err => {
            toast.error(strings.errorWhileLoadingFeedback);
        });
    };

    componentDidMount() {
        this.fetchData();
        this.feedbackForPublish();
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
    }

    handleInstitutionChange = (e) => {
        this.setState({institutionIds: e})
    }
    handleTagsChange = (e) => {
        this.setState({tagsIds: e})
    };
    publishToInstitutions = () => {
        if (this.state.institutionIds.length !== 0) {
            this.setState({
                isWaitingToPublish: true
            })
            let feedbackId = this.props.match.params.id;
            let i = this.state.institutionIds.toString();
            FeedbackPublicationRepository.publishFeedbackToInstitutions(feedbackId, i).then(() => {
                this.fetchData();
                toast.success(strings.successfullyPublishedFeedback)
                this.setState({
                    isWaitingToPublish: false
                })
                setTimeout(() => {
                    window.location = '/publishfeedback/' + feedbackId
                }, 5000)
            }).catch(err => {
                // toast.error(strings.failedToPublishFeedback)
                this.setState({
                    isWaitingToPublish: false
                })
                setTimeout(() => {
                    window.location = '/publishfeedback/' + feedbackId
                }, 5000)
            });
        }
    }
    publishFeedbackToTags = () => {
        if (this.state.tagsIds.length !== 0) {
            this.setState({
                isWaitingToPublish: true
            })
            let annId = this.props.match.params.id;
            let t = this.state.tagsIds.toString();
            FeedbackPublicationRepository.publishFeedbackToTags(annId, t).then(() => {
                this.fetchData();
                toast.success(strings.successfullyPublishedFeedback)
                this.setState({
                    isWaitingToPublish: false
                })
                setTimeout(() => {
                    window.location = '/publishfeedback/' + annId
                }, 5000)

            }).catch(err => {
                // toast.error(strings.failedToPublishFeedback)
                this.setState({
                    isWaitingToPublish: false
                })
                setTimeout(() => {
                    window.location = '/publishfeedback/' + annId
                }, 5000)

            });
        }
    };

    render() {
        if (!this.state.feedback) {
            return (<div></div>)
        } else {

            return (

                <div style={{height: "100%"}}>

                    {!this.state.isWaitingToPublish &&
                    <div className="col-12">


                        <div className="row mt-5 FeedbackToPublishDetailsContainerDiv">
                            <div className="col-8 FeedbackToPublishDetailsCol">
                                <div className="row mt-2">
                                    <div className="col-12 text-center FeedbackToPublishBlueTextColor"
                                         aria-describedby="emailHelp">
                                        <h4>{this.state.feedback.name}</h4>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-12 FeedbackToPublishTextColor" aria-describedby="emailHelp">
                                        <h6>{this.state.feedback.description}</h6>
                                    </div>
                                </div>
                                <div className="row mb-2 FeedbackToPublishdueDateRow">
                                    <div className=" FeedbackToPublishRedTextColor">
                                        <sub>Рок до:</sub>
                                        <h6 className="text-center">{moment(this.state.feedback.dueDate).local().format('DD-MM-YYYY')}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-6">
                                <h3 className="FeedbackToPublishBlueTextColor">{strings.publishToInstitution}</h3>
                                <div>
                                    <MapEntityInstitutionsPublish
                                        groupsUrl="/rest/institution/allActiveInstitutions" //za da gi zemem instituciite - aktivnite institucii
                                        onChange={this.handleInstitutionChange}
                                    />
                                    <div className="text-right mt-3">
                                        <button onClick={this.publishToInstitutions}
                                                className="btn btn-info defaultBtn"
                                                type="button"><FontAwesomeIcon icon={faPaperPlane} size="lg"
                                                                               style={{paddingRight: '4px'}}/>{strings.publish}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-6">
                                <h3 className="FeedbackToPublishBlueTextColor">{strings.publishToTags}</h3>
                                <div>
                                    <MapEntityTagsPublish
                                        groupsUrl="/rest/tag/all" //za da gi zemem tagovite
                                        onChange={this.handleTagsChange}
                                    />
                                    <div className="text-right mt-3">
                                        <button onClick={this.publishFeedbackToTags}
                                                className="btn btn-info defaultBtn"
                                                type="button"><FontAwesomeIcon icon={faPaperPlane} size="lg"
                                                                               style={{paddingRight: '4px'}}/>{strings.publish}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="row mt-5">
                            <h3 className="FeedbackToPublishBlueTextColor" style={{
                                fontSize: '27px',
                                fontWeight: 'bold'
                            }}>{strings.AllPublicationsForThisFeedback}:</h3>
                            <table className="table-hover newTable mt-3" style={{width: "100%"}}>
                                <thead className="tableHead">
                                <tr>
                                    <th className="tableHeading firstHeading" style={{width: '24%'}}>{strings.name}</th>
                                    <th className="tableHeading" style={{width: '28%'}}>{strings.receiver}</th>
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

export default FeedbackToPublish;