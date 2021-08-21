import React, {Component} from "react";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {strings} from "../../Localization/Localization";
import AnnouncementRepository from "../../repository/AnnouncementRepository";
import TabInstitutions from "../Feedback/Tab/TabInstitutions";
import TabTags from "../Feedback/Tab/TabTags";
import TabCategories from "../Feedback/Tab/TabCategories";

class AnnouncementToPublishNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            announcement: {},
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

    fetchData = () => {
        let id = this.props.match.params.id;
        AnnouncementRepository.getAnnouncementById(id).then(res => {
            this.setState({announcement: res.data})
        }).catch(err => {
            toast.error(strings.errorOnLoadOfAnnouncement);
        });
    }

    componentDidMount() {
        this.fetchData();
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
        this.changeTabToPublish("institutions")
    }

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
        if (!this.state.announcement) {
            return (<div/>)
        } else {
            return (
                <div className="container-fluid">
                    <div className="row" style={{color: "black", marginTop: "10px"}}>
                        <div className="col-md-12 text-center">
                            <h2 style={{borderBottom: "2px solid gray", display: "inline"}}>
                                {this.state.announcement.title}
                            </h2>
                        </div>
                    </div>

                    <div className="row" style={{color: "black", marginTop: "50px"}}>
                        <div className="col-md-9">
                            <button className="tabButton" onClick={() => this.changeTabToPublish('institutions')}
                                    style={{backgroundColor: this.state.selectedTabInstitutions ? "#DFF6FF" : "#BCDFEF",
                                        padding: "20px", margin: "0px 20px 0px 20px", border: 0,
                                        textDecoration: this.state.selectedTabInstitutions ? "underline" : ""}}>
                                <h6 style={{display: "inline", fontWeight: "600"}}>
                                    {strings.publishToInstitution}:
                                </h6>
                            </button>

                            <button className="tabButton" onClick={() => this.changeTabToPublish('tags')}
                                    style={{backgroundColor: this.state.selectedTabTags ? "#DFF6FF" : "#BCDFEF",
                                        padding: "20px", margin: "0px 20px 0px 20px", border: 0,
                                        textDecoration: this.state.selectedTabTags ? "underline" : ""}}>
                                <h6 style={{display: "inline", fontWeight: "600"}}>
                                    {strings.publishToTags}:
                                </h6>
                            </button>

                            <button className="tabButton" onClick={() => this.changeTabToPublish('categories')}
                                    style={{backgroundColor: this.state.selectedTabCategories ? "#DFF6FF" : "#BCDFEF",
                                        padding: "20px", margin: "0px 20px 0px 20px", border: 0,
                                        textDecoration: this.state.selectedTabCategories ? "underline" : ""}}>
                                <h6 style={{display: "inline", fontWeight: "600"}}>
                                    {strings.publishToCategories}:
                                </h6>
                            </button>
                        </div>

                    </div>

                    {this.state.selectedTabInstitutions ?
                        <TabInstitutions announcementId={this.state.announcement.id}/>
                        : ""
                    }
                    {this.state.selectedTabTags ?
                        <TabTags announcementId={this.state.announcement.id}/>
                        : ""
                    }
                    {this.state.selectedTabCategories ?
                        <TabCategories announcementId={this.state.announcement.id}/>
                        : ""
                    }
                </div>
            )
        }
    }

}

export default AnnouncementToPublishNew;