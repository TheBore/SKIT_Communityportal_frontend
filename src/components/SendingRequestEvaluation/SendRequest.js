import React, {Component} from 'react';
import {strings} from "../../Localization/Localization";
import SendRequestForEvaluationRepository from "../../repository/SendRequestForEvaluationRepository";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import TabInstitutions from "../Feedback/Tab/TabInstitutions";
import TabTags from "../Feedback/Tab/TabTags";
import TabCategories from "../Feedback/Tab/TabCategories";

class SendRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            institutionIds: [],
            isWaitingToPublish: false,
            title: "",
            body: "",
            tagsIds: [],
            categoriesIds: [],
            selectedTabInstitutions: true,
            selectedTabTags: false,
            selectedTabCategories: false,
            institutions: [],
            tags: [],
            categories: []
        }
    }

    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.getTitleAndBody();
        this.changeTabToPublish("institutions")
    }

    getTitleAndBody = () => {
        this.setState({
            title: "Предефиниран наслов дефиниран од страна на ...",
            body: "Тело на пораката кое може да биде променето бидејки...",
        })
    }

    onTitleHandleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    onBodyHandleChange = (e) => {
        this.setState({
            body: e.target.value
        })
    }

    onSelectedInstitutionsChange = (e) => {
        this.setState({
            institutionIds: e
        })
    }
    onSelectedTagsChange = (e) => {
        this.setState({
            tagsIds: e
        })
    }

    onSelectedCategoriesChange = (e) => {
        this.setState({
            categoriesIds: e
        })
    }


    sendToInstitutions = () => {
        this.setState({
            isWaitingToPublish: true
        })

        if (this.state.institutionIds.length !== 0) {
            let institutions = this.state.institutionIds.toString();

            SendRequestForEvaluationRepository.sendRequestForEvaluation(institutions, this.state.title, this.state.body).then(res => {
                toast.success(strings.successRequest)
                this.props.history.push("/sendRequest");
                this.setState({
                    isWaitingToPublish: false,
                })
            }).catch(err => {
                toast.error(strings.resetPassNotSuccessful)
                this.setState({
                    isWaitingToPublish: false
                })
            })
        } else {
            alert(strings.pleaseChooseInstitution)
            window.location = '/sendRequest'
        }
    }

    sendToTags = () => {
        this.setState({
            isWaitingToPublish: true
        })

        if (this.state.tagsIds.length !== 0) {
            let tags = this.state.tagsIds.toString();

            SendRequestForEvaluationRepository.sendRequestForEvaluationTags(tags, this.state.title, this.state.body).then(res => {
                toast.success(strings.successRequest)
                this.props.history.push("/sendRequest");
                this.setState({
                    isWaitingToPublish: false,
                })
            }).catch(err => {
                toast.error(strings.resetPassNotSuccessful)
                this.setState({
                    isWaitingToPublish: false
                })
            })
        } else {
            alert(strings.pleaseChooseTags)
            window.location = '/sendRequest'
        }
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

    sendToCategories = () => {
        this.setState({
            isWaitingToPublish: true
        })

        if (this.state.categoriesIds.length !== 0) {
            let categories = this.state.categoriesIds.toString();

            SendRequestForEvaluationRepository.sendRequestForEvaluationCategories(categories, this.state.title, this.state.body).then(res => {
                toast.success(strings.successRequest)
                this.props.history.push("/sendRequest");
                this.setState({
                    isWaitingToPublish: false,
                })
            }).catch(err => {
                toast.error(strings.resetPassNotSuccessful)
                this.setState({
                    isWaitingToPublish: false
                })
            })
        } else {
            alert(strings.pleaseChooseCategories)
            window.location = '/sendRequest'
        }
    }

    render() {
        return (
            <div className="mt-5 ">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center"
                            style={{color: "#1C4857"}}>
                            {strings.sendingRequests}
                        </h2>

                        <div className="col-12 text-right mt-5">
                            <NavLink to="/allRequests">
                                <button type="button" className="btn btn-success defaultBtn">
                                    <FontAwesomeIcon icon={faList} size="lg" style={{paddingRight: '4px'}}/>
                                    {strings.allRequests}
                                </button>
                            </NavLink>
                        </div>

                        <div style={{
                            border: '1px solid lightgray',
                            borderRadius: '25px',
                            padding: '20px 10px 10px 10px'
                        }} className="mt-2">
                            <div className="col-12">
                                <label
                                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.title}</label>
                                <input
                                    defaultValue={this.state.title}
                                    name={"title"}
                                    type={"text"}
                                    onChange={this.onTitleHandleChange}
                                    className="form-control"
                                    style={{borderRadius: '15px'}}
                                />
                            </div>

                            <div className="col-12 mt-4">
                                <label
                                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.body}</label>
                                <textarea
                                    defaultValue={this.state.body}
                                    name={"body"}
                                    rows={4}
                                    onChange={this.onBodyHandleChange}
                                    className="form-control mb-3"
                                    style={{borderRadius: '15px'}}
                                />
                            </div>
                        </div>

                        {/*<div className="row mt-3">*/}
                        {/*    <div className="col-4 mt-4">*/}
                        {/*        <MapEntityInstitutionsPublish*/}
                        {/*            groupsUrl="/rest/institution/allActiveInstitutions"*/}
                        {/*            onChange={this.onSelectedInstitutionsChange}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*    <div className="col-4 mt-4">*/}
                        {/*        <MapEntityTagsPublish*/}
                        {/*            groupsUrl="/rest/tag/all"*/}
                        {/*            onChange={this.onSelectedTagsChange}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*    <div className="col-4 mt-4">*/}

                        {/*    </div>*/}
                        {/*</div>*/}


                        {/*<div className="row">*/}
                        {/*    <div className="col-4 text-right">*/}
                        {/*        <button onClick={this.sendToInstitutions}*/}
                        {/*                className="btn mt-3 ml-3 btn-info defaultBtn"*/}
                        {/*                type="button"*/}
                        {/*        >*/}
                        {/*            <FontAwesomeIcon icon={faPaperPlane} size="lg"*/}
                        {/*                             style={{paddingRight: '4px'}}/>*/}
                        {/*            {strings.publishToInstitutions}*/}
                        {/*        </button>*/}
                        {/*    </div>*/}

                        {/*    <div className="col-4 text-right">*/}
                        {/*        <button onClick={this.sendToTags}*/}
                        {/*                className="btn mt-3 ml-3 btn-info defaultBtn"*/}
                        {/*                type="button"*/}
                        {/*        >*/}
                        {/*            <FontAwesomeIcon icon={faPaperPlane} size="lg"*/}
                        {/*                             style={{paddingRight: '4px'}}/>*/}
                        {/*            {strings.publishToTags}*/}
                        {/*        </button>*/}
                        {/*    </div>*/}

                        {/*    <div className="col-4 text-right">*/}
                        {/*        <button onClick={this.sendToCategories}*/}
                        {/*                className="btn mt-3 ml-3 btn-info defaultBtn"*/}
                        {/*                type="button"*/}
                        {/*        >*/}
                        {/*            <FontAwesomeIcon icon={faPaperPlane} size="lg"*/}
                        {/*                             style={{paddingRight: '4px'}}/>*/}
                        {/*            {strings.publishToCategories}*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

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
                        </div>

                        {this.state.selectedTabInstitutions ?
                            <TabInstitutions title={this.state.title} body={this.state.body} />
                            : ""
                        }
                        {this.state.selectedTabTags ?
                            <TabTags title={this.state.title} body={this.state.body}/>
                            : ""
                        }
                        {this.state.selectedTabCategories ?
                            <TabCategories title={this.state.title} body={this.state.body} />
                            : ""
                        }
                    </div>
                </div>


                {/*{this.state.isWaitingToPublish &&*/}
                {/*<div className="container-fluid loadingContainer">*/}
                {/*    <div className="spinner-grow text-secondary" style={{height: "50px", width: "50px"}} role="status">*/}
                {/*        <span className="sr-only">Loading...</span>*/}
                {/*    </div>*/}
                {/*    <div className="spinner-grow text-secondary" style={{height: "50px", width: "50px"}} role="status">*/}
                {/*        <span className="sr-only">Loading...</span>*/}
                {/*    </div>*/}
                {/*    <div className="spinner-grow text-secondary" style={{height: "50px", width: "50px"}} role="status">*/}
                {/*        <span className="sr-only">Loading...</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*}*/}
            </div>
        );
    }
}

export default SendRequest;