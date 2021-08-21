import React, {Component} from 'react';
import AnnouncementRepository from "../../repository/AnnouncementRepository";
import AnnouncementPublicationRepository from "../../repository/AnnouncementPublicationRepository";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {strings} from "../../Localization/Localization";
import MapEntityInstitutionsPublish from "./MultipleSelecetPublish/MapEntityInstitutionsPublish";
import MapEntityTagsPublish from "./MultipleSelecetPublish/MapEntityTagsPublish";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import './css/AnnouncementToPublish.css';

class AnnouncementToPublish extends Component {


    constructor(props) {
        super(props);
        this.state = {
            announcement: null,
            institutionIds: [],
            tagsIds: [],
            isWaitingToPublish: false
        };
    }


    announcementForPublish = () => {
        let id = this.props.match.params.id;
        AnnouncementRepository.getAnnouncementById(id).then(res => {
            this.setState({announcement: res.data})
        }).catch(err => {
            toast.error(strings.errorWhileLoadingAnnouncement);
        });
    };

    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.announcementForPublish();

    }
    publishToInstitutions = () => {
        this.setState({
            isWaitingToPublish:true
        })
        if (this.state.institutionIds.length !== 0) {
            let annId = this.props.match.params.id;
            let i = this.state.institutionIds.toString();
            AnnouncementPublicationRepository.publishToInstitutions(annId, i).then(() => {
                toast.success(strings.successfullyPublishedAnnouncement)
                this.props.history.push("/publications/"+annId);
                this.setState({
                    isWaitingToPublish:false
                })
            }).catch(() => {
                toast.error(strings.failedToPublishAnnouncement)
                this.setState({
                    isWaitingToPublish:false
                })
            });
        }
    };
    publishToTags = () => {
        this.setState({
            isWaitingToPublish:true
        })
        if (this.state.tagsIds.length !== 0) {
            let annId = this.props.match.params.id;
            let t = this.state.tagsIds.toString();
            AnnouncementPublicationRepository.publishToTags(annId, t).then(() => {
                toast.success(strings.successfullyPublishedAnnouncement)
                this.props.history.push("/publications/"+annId);
                this.setState({
                    isWaitingToPublish:true
                })
            }).catch(() => {
                toast.error(strings.failedToPublishAnnouncement)
                this.setState({
                    isWaitingToPublish:true
                })
            });
        }
    };

    onSelectedInstitutionsChange = (e) => {
        debugger;
        this.setState({institutionIds: e})
    }
    onSelectedTagsChange = (e) => {
        this.setState({tagsIds: e})

    }

    render() {

        return (
            <div style={{height:"100%"}}>
                {!this.state.isWaitingToPublish &&
                    <div className="container mt-5">
                        <h2 style={{textAlign: "left", color: "#1C4857"}} className="mt-4 mb-5">{strings.publishAnnouncement}: {this.state.announcement ? this.state.announcement.title : ""}</h2>
                        <div className="row">
                            <div className="col-6">
                                <MapEntityInstitutionsPublish
                                    groupsUrl="/rest/institution/allActiveInstitutions" //za da gi zemem instituciite
                                    onChange={this.onSelectedInstitutionsChange}
                                />
                                <div>
                                    <button onClick={this.publishToInstitutions} className="btn btn-info mt-3 defaultBtn"
                                            type="button"><FontAwesomeIcon icon={faPaperPlane} size="lg"
                                                                           style={{paddingRight: '4px'}}/>
                                        {strings.publishToInstitutions}
                                    </button>
                                </div>
                            </div>
                            <div className="col-6">
                                <MapEntityTagsPublish
                                    groupsUrl="/rest/tag/all" //za da gi zemem tagovite
                                    onChange={this.onSelectedTagsChange}
                                />
                                <div>
                                    <button onClick={this.publishToTags} className="btn btn-info mt-3 defaultBtn"
                                            type="button"><FontAwesomeIcon icon={faPaperPlane} size="lg" style={{paddingRight:'4px'}} />
                                        {strings.publishToTags}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {this.state.isWaitingToPublish &&
                    <div className="container-fluid loadingContainer">
                        <div className="spinner-grow text-secondary" style={{height:"50px", width:"50px"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-secondary" style={{height:"50px", width:"50px"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-secondary" style={{height:"50px", width:"50px"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
            </div>

        )
    }
}

export default AnnouncementToPublish;