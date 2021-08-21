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
import {faCheck, faCopy, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./css/FeedbackToPublish.css"
import CrudModal from "../Crud/CrudModal";
import MailModal from "../Crud/MailModal";
import EscalateModal from "../Crud/EscalateModal";
import TabInstitutions from "./Tab/TabInstitutions";
import TabTags from "./Tab/TabTags";
import TabCategories from "./Tab/TabCategories";
import InstitutionRepository from "../../repository/InstitutionRepository";
import TagRepository from "../../repository/TagRepository";
import InstitutionCategoryRepository from "../../repository/InstitutionCategoryRepository";

class FeedbackToPublishNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: null,
            institutionIds: [],
            tagsIds: [],
            feedbackPublications: [],
            pageCount: 1,
            isWaitingToPublish: false,
            selectedTabInstitutions: true,
            selectedTabTags: false,
            selectedTabCategories: false,
            institutions: [],
            tags: [],
            categories: []
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
        this.changeTabToPublish("institutions")
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

    changeTabToPublish = (name) => {
        if(name === "institutions"){
            this.setState({
                selectedTabInstitutions: true,
                selectedTabTags: false,
                selectedTabCategories: false
            })
        } else if(name === "tags"){
            this.setState({
                selectedTabInstitutions: false,
                selectedTabTags: true,
                selectedTabCategories: false
            })
        } else if(name === "categories"){
            this.setState({
                selectedTabInstitutions: false,
                selectedTabTags: false,
                selectedTabCategories: true
            })
        }
    }

    render() {
        if (!this.state.feedback) {
            return (<div/>)
        } else {
            return (
                <div className="container-fluid">
                    <div className="row" style={{color: "black", marginTop: "10px"}}>
                        <div className="col-md-12 text-center">
                            <h2 style={{borderBottom: "2px solid gray", display: "inline"}}>
                                {this.state.feedback.name}
                            </h2>
                        </div>
                        <div className="col-md-12 text-center" style={{marginTop: "20px"}}>
                            <h5 style={{fontWeight: "300"}}>
                                {this.state.feedback.description}
                            </h5>
                        </div>
                        <div className="col-md-12 text-left" style={{color: "red", fontSize: "12pt"}}>
                            <span>
                                Рок до:&nbsp;
                            </span>
                            <span style={{fontWeight: "500"}}>
                                {moment(this.state.feedback.dueDate).local().format('DD-MM-YYYY')}
                            </span>
                        </div>
                    </div>

                    <div className="row" style={{color: "black", marginTop: "50px"}}>
                        <div className="col-md-9">
                            <button className="tabButton" onClick={() => this.changeTabToPublish('institutions')}
                                style={{backgroundColor: this.state.selectedTabInstitutions ? "#DFF6FF" : "#BCDFEF",
                                    padding: "20px", margin: "0px 20px 0px 20px", border: 0,
                                    textDecoration: this.state.selectedTabInstitutions ? "underline" : ""}}>
                                <h6 style={{display: "inline", fontWeight: "600"}}>
                                    Објави на институција:
                                </h6>
                            </button>

                            <button className="tabButton" onClick={() => this.changeTabToPublish('tags')}
                                style={{backgroundColor: this.state.selectedTabTags ? "#DFF6FF" : "#BCDFEF",
                                    padding: "20px", margin: "0px 20px 0px 20px", border: 0,
                                    textDecoration: this.state.selectedTabTags ? "underline" : ""}}>
                                <h6 style={{display: "inline", fontWeight: "600"}}>
                                    Објави на ознаки:
                                </h6>
                            </button>

                            <button className="tabButton" onClick={() => this.changeTabToPublish('categories')}
                                style={{backgroundColor: this.state.selectedTabCategories ? "#DFF6FF" : "#BCDFEF",
                                    padding: "20px", margin: "0px 20px 0px 20px", border: 0,
                                    textDecoration: this.state.selectedTabCategories ? "underline" : ""}}>
                                <h6 style={{display: "inline", fontWeight: "600"}}>
                                    Објави на категории:
                                </h6>
                            </button>
                        </div>

                        <div className="col-md-3 text-right">
                            <a href={`/feedback/${this.state.feedback.id}/previouspublications`} className="defaultBtn btn btn-primary" style={{float: "right"}}>
                                <FontAwesomeIcon icon={faCopy}/>
                                &nbsp;Сите објави за оваа анкета
                            </a>
                        </div>
                    </div>

                    {this.state.selectedTabInstitutions ?
                        <TabInstitutions feedbackId={this.state.feedback.id}/>
                        : ""
                    }
                    {this.state.selectedTabTags ?
                        <TabTags feedbackId={this.state.feedback.id}/>
                        : ""
                    }
                    {this.state.selectedTabCategories ?
                        <TabCategories feedbackId={this.state.feedback.id}/>
                        : ""
                    }
                </div>
            )
        }
    }

}

export default FeedbackToPublishNew;