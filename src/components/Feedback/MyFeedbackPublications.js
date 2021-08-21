import React, {Component} from "react";
import {Link} from "react-router-dom";
import FeedbackPublicationRepository from "../../repository/FeedbackPublicationRepository";
import ReactPaginate from "react-paginate";
import {strings} from "../../Localization/Localization";
import InfoPopup from "../ErrorHandler/InfoPopup";
import "./css/MyFeedbackPublications.css";
import {faCalendarAlt, faCalendarPlus, faUniversity, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";

class MyFeedbackPublications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackpubs: [],
            pageCount: 1,
            numOfElements: 0,
            activeLanguage:localStorage.getItem("activeLanguage"),
            areas: []

        }
    }

    componentDidMount() {
        this.fetchData();
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({
            areas: localStorage.getItem('areas').split(',')
        });

    }

    fetchData = (selectedPage = 0) => {
        let institutionId = localStorage.getItem('institutionId');
        let areas = localStorage.getItem('areas').split(",");
        FeedbackPublicationRepository.getFeedbackPublicationsForInstitution(institutionId, selectedPage).then(res => {

            let contentData = res.data.content;
            let listFeedbacks = []

            for(let i=0; i<contentData.length; i++){
                for(let j=0; j<areas.length; j++){
                    if(contentData[i].feedback.areaOfInterest.nameMk === areas[j]){
                        listFeedbacks.push(contentData[i]);
                    }
                }
            }

            this.setState({
                numOfElements: res.data.numberOfElements,
                feedbackpubs: listFeedbacks,
                pageCount: res.data.totalPages
            })
        }).catch(err => {
            console.log(err)
        })
    }

    handlePageClick = data => {
        this.fetchData(data.selected);
    };

    renderFeedbackPub = feedpub => {
        let button = feedpub.finished ?
            (<Link to={"/visualizeAnswers/" + feedpub.id}
                   className="btn btn-dark myFeedbackPublicationsButton mb-2">{strings.previewAnswer}</Link>) :
            (<Link to={"/visualizeFeedback/" + feedpub.id}
                   className="btn btn-info myFeedbackPublicationsButton mb-2">{strings.answer}</Link>);
        return (
            <div className="row mt-3">
                <div className="container-fluid">
                <div className="col-12 myFeedbackPublicationsContainer">

                    <div className="row w-100">
                        <div className="col-6 mb-2 myFeedbackPublicationsPublicationTitleCol">
                            <h3>{feedpub.feedback.name}</h3>
                        </div>
                        <div className="col-6 mb-2">
                            {button}
                        </div>
                    </div>
                    <div className="row myFeedbackPublicationsRowFooter">
                        <div className="col-12 mt-1 myFeedbackPublicationsColFooter">
                            <h6 className="myFeedbackPublicationsFooterText mr-3">
                                <FontAwesomeIcon icon={faUser} size="lg" className="mr-1"/>
                                {feedpub.feedback.creator.firstName + " " + feedpub.feedback.creator.lastName}
                            </h6>
                            <h6 className="myFeedbackPublicationsFooterText mr-3">
                                <FontAwesomeIcon icon={faUniversity} size="lg" className="mr-1"/>
                                {this.state.activeLanguage==='mk' &&
                                feedpub.institution.nameMk}
                                {this.state.activeLanguage==='al' &&
                                feedpub.institution.nameAl}
                            </h6>
                            <h6 className="myFeedbackPublicationsFooterText">
                                <FontAwesomeIcon icon={faCalendarPlus} size="lg" className="mr-2"/>
                                {feedpub.dateCreated}
                            </h6>
                            <h6 className="myFeedbackPublicationsFooterText myFeedbackPublicationsFooterRightText">
                                {strings.dueDate+":   "}<FontAwesomeIcon icon={faCalendarAlt} size="lg" className="mr-2"/>
                                {moment(feedpub.feedback.dueDate).local().format('DD-MM-YYYY')}
                            </h6>
                        </div>
                    </div>

                </div>
            </div>
            </div>
        )
    }

    render() {
        if (this.state.feedbackpubs.length !== 0) {
            return (
                <div>
                    <div className="row">
                        <div className="col-12">
                            <h2 style={{textAlign: "left", color: "#1C4857"}}
                                className="mt-4">{strings.myfeedbackpublications}</h2>
                        </div>
                    </div>
                    {this.state.feedbackpubs.map(this.renderFeedbackPub)}
                    <div className="row">

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
            )
        } else {
            return (
                <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                    <InfoPopup infoMessage={strings.noPublishedFeedbacks}/>
                </div>
            )
        }

    }

}

export default MyFeedbackPublications;