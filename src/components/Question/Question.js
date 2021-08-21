import React, {Component} from "react";
import QuestionRepository from "../../repository/QuestionRepository.js"
import "./css/QuestionDetails.css"
import "./css/Question.css"
import ReactPaginate from "react-paginate";
import {strings} from "../../Localization/Localization";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import DeleteModal from "../Crud/DeleteModal";
import {toast} from "react-toastify";
import {NavLink, Link} from "react-router-dom";
import InfoPopup from "../ErrorHandler/InfoPopup";
import {faEdit, faPlusCircle, faFeatherAlt, faComments} from "@fortawesome/free-solid-svg-icons";
import UnDeleteModal from "../Crud/UnDeleteModal";


class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            activeLanguage: localStorage.getItem("activeLanguage"),
            pageCount: 1,
            numOfElements: 0,
            showDeleteModal: false,
            isAdmin: localStorage.getItem('role') === "ROLE_ADMIN",
            isUser: localStorage.getItem('role') === "ROLE_INSTITUTIONAL_MODERATOR",
            username: localStorage.getItem('email'),
            areas: localStorage.getItem('areas').split(","),
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = (selectedPage = 0) => {
        if (this.state.isAdmin) {
            QuestionRepository.getAllQuestionsAdmin(selectedPage).then(async res => {
                let contentData = res.data.content;

                for (let i = 0; i < contentData.length; i++) {

                    let numberOfElements = 0;
                    await QuestionRepository.numberOfMessagesForQuestion(contentData[i].id).then(snapshot => {
                        numberOfElements = snapshot.data
                    });
                    contentData[i]["numberOfElements"] = numberOfElements;
                }

                this.setState({
                    data: contentData,
                    pageCount: res.data.totalPages
                })
            }).catch(err => {
                console.log(err)
            })
        } else {
            QuestionRepository.getAllQuestions(selectedPage).then(async res => {
                let contentData = res.data.content;
                let areas = localStorage.getItem('areas').split(",");
                let dataToPush = [];
                for (let i = 0; i < contentData.length; i++) {

                    let numberOfElements = 0;
                    await QuestionRepository.numberOfMessagesForQuestion(contentData[i].id).then(snapshot => {
                        numberOfElements = snapshot.data
                    });
                    contentData[i]["numberOfElements"] = numberOfElements;
                    for(let j=0; j<areas.length; j++){
                        if(contentData[i].areaOfInterest.nameMk === areas[j]){
                            dataToPush.push(contentData[i]);
                        }
                    }
                }

                this.setState({
                    data: dataToPush,
                    pageCount: res.data.totalPages
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }



    handlePageClick = data => {
        this.fetchData(data.selected);
    };

    deleteQuestion = (id) => {
        return QuestionRepository.deleteQuestion(id).then(() => {
            toast.success(strings.successfullyDeletedQuestion)
            this.fetchData()
        }).catch(() => {
            toast.error(strings.UnsuccessfullyDeletedQuestion)
        })
    }

    unDeleteQuestion = (id) => {
        return QuestionRepository.unDeleteQuestion(id).then(() => {
            toast.success(strings.shared)
            this.fetchData()
        }).catch(() => {
            toast.error(strings.notShared)
        })
    }


    render() {
        return (
            <div>
                <div className="row mt-4" style={{marginBottom: "15px"}}>
                    <div className="col-md-6">
                        <h2 style={{color: "black"}}>{strings.allActive}</h2>
                    </div>
                    <div className="col-md-6">
                        <NavLink to="/AddQuestion">
                            <button type="button" className="defaultBtn btn btn-primary addQuestionBtn">
                                <FontAwesomeIcon icon={faPlusCircle} size="lg" style={{paddingRight: '4px'}}/>
                                <span>Постави прашање</span>
                            </button>
                        </NavLink>
                        {this.state.isUser && (
                            <Link to="/questions/inactive" className="defaultBtn btn inactiveQuestionsBtn"><i
                                className="fa fa-history"/> <span>{strings.allInactive}</span></Link>
                        )}
                    </div>
                </div>


                {this.state.data.length !== 0 ?
                    this.state.data.map((item, index) => {
                        return (
                            <div key={index} className="row QuestionMainDiv">
                                {this.state.data[index].active ?
                                    <div className="col-12">
                                        <div className="row QuestionRow">
                                            <div className="col-11">
                                                <p style={{fontSize: "11px"}}>{strings.datePublish} {this.state.data[index].dateCreated}</p>
                                            </div>
                                            <div className="col-1">
                                                <h6 style={{float: 'right', color: '#343a40'}}>
                                                    <FontAwesomeIcon icon={faComments} size="lg"
                                                                     style={{paddingRight: '4px'}}/>
                                                    {this.state.data[index].numberOfElements}
                                                </h6>
                                            </div>
                                            <div className="col-12">
                                                <hr className="questionsHr"/>
                                            </div>

                                            <div className="col-12" style={{marginTop: "10px", marginBottom: "10px"}}>
                                                {this.state.activeLanguage === 'mk' &&
                                                <h5 className="mb-0">{item.title}</h5>}
                                                {this.state.activeLanguage === 'al' &&
                                                <h5 className="mb-0">{item.title}</h5>}
                                            </div>
                                            <div className="col-1">
                                                <h3>{item.numberOfElements}</h3>
                                            </div>
                                        </div>

                                        <hr className="questionsHr"/>

                                        <div className="row" style={{marginBottom: "9px"}}>
                                            <div className="col-md-6">
                                                <div className="announcementFooterCol">
                                                    <h6 style={{
                                                        float: 'left',
                                                        color: '#343a40',
                                                        marginTop: "20px",
                                                        fontSize: "14px"
                                                    }}>
                                                        <p style={{display: "inline-block"}}>{strings.authorCreator} {this.state.data[index].author.email} &nbsp;</p>
                                                        {this.state.data[index].author.email === localStorage.getItem("email") ?
                                                            <span className={"badge badge-pill badge-warning"}>{strings.yourQuestion}</span> : ""}
                                                        <br/>
                                                        <p>{strings.institution}: {this.state.data[index].author.institution !== null ? this.state.data[index].author.institution.nameMk : "No institution"}</p>
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="col-md-6">


                                                {(this.state.data[index].author.email === this.state.username || this.state.isAdmin) &&
                                                <div className="row">
                                                    <div className="col-12 ">
                                                        {(this.state.data[index].active) &&
                                                        <DeleteModal btnClass={"defaultBtn ml-1 deleteQuestionBtn"}
                                                                     showText={true}
                                                                     prompt={strings.deleteQuestionForQuestion}
                                                                     doDelete={() => this.deleteQuestion(item.id)}/>}

                                                        <Link to={{
                                                            pathname: `/EditQuestion`,
                                                            state: {
                                                                item: item
                                                            }
                                                        }}
                                                        >
                                                            <button type="button"
                                                                    className="defaultBtn btn btn-info btn-sm editQuestionBtn">
                                                                <FontAwesomeIcon icon={faEdit} size="lg"
                                                                                 style={{paddingRight: '4px'}}/>
                                                                {strings.edit}
                                                            </button>
                                                        </Link>

                                                        {(!this.state.data[index].active) &&
                                                        <UnDeleteModal
                                                            btnClass={"defaultBtn ml-1 QuestionAdminActionButton"}
                                                            showText={true}
                                                            prompt={strings.shareAgain}
                                                            doDelete={() => this.unDeleteQuestion(item.id)}/>}

                                                    </div>
                                                </div>
                                                }
                                                {/*{!(this.state.data[index].author.email === this.state.username || this.state.isAdmin) &&*/}
                                                {/*<div className="row" style={{visibility: 'hidden'}}>*/}
                                                {/*    <div className="col-12 ">*/}
                                                {/*        {(this.state.data[index].active) &&*/}
                                                {/*        <DeleteModal btnClass={"defaultBtn ml-1 deleteQuestionBtn"}*/}
                                                {/*                     showText={true}*/}
                                                {/*                     prompt={strings.deleteQuestionForQuestion}*/}
                                                {/*                     doDelete={() => this.deleteQuestion(item.id)}/>}*/}

                                                {/*        <Link to={{*/}
                                                {/*            pathname: `/EditQuestion`,*/}
                                                {/*            state: {*/}
                                                {/*                item: item*/}
                                                {/*            }*/}
                                                {/*        }}*/}
                                                {/*        >*/}
                                                {/*            <button type="button"*/}
                                                {/*                    className="defaultBtn btn btn-info btn-sm editQuestionBtn">*/}
                                                {/*                <FontAwesomeIcon icon={faEdit} size="lg"*/}
                                                {/*                                 style={{paddingRight: '4px'}}/>*/}
                                                {/*                {strings.edit}*/}
                                                {/*            </button>*/}
                                                {/*        </Link>*/}

                                                {/*        {(!this.state.data[index].active) &&*/}
                                                {/*        <UnDeleteModal*/}
                                                {/*            btnClass={"defaultBtn ml-1 QuestionAdminActionButton"}*/}
                                                {/*            showText={true}*/}
                                                {/*            prompt={strings.shareAgain}*/}
                                                {/*            doDelete={() => this.unDeleteQuestion(item.id)}/>}*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                                {/*}*/}
                                                <div className="row mt-2 justify-content-end"
                                                     style={{marginRight: "inherit"}}>

                                                    <a className="defaultBtn btn"
                                                       style={{
                                                           display: "inline-block",
                                                           textAlign: 'right',
                                                           color: "white",
                                                           background: "#50A5E4"
                                                       }}>
                                                        <FontAwesomeIcon icon={faFeatherAlt} size="lg"
                                                                         style={{paddingRight: '4px'}}/>
                                                        <Link
                                                            to={"/previewQuestion/" + item.id}
                                                            className="announcementLinkButton"
                                                            style={{color: "white"}}>{strings.Answers}</Link>
                                                    </a>
                                                </div>
                                            </div>
                                            {/*<div className="row announcementTitleRow">*/}
                                            {/*    <div className="col-12">*/}
                                            {/*        <h2 className="announcementTitle">{item.title}</h2>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}

                                            {/*<div className="row announcementFooterRow">*/}
                                            {/*    <div className="col-12 announcementFooterCol">*/}
                                            {/*        <h6 style={{float: 'right', color: '#343a40'}}>*/}
                                            {/*            <FontAwesomeIcon icon={faComments} size="lg"*/}
                                            {/*                             style={{paddingRight: '4px'}}/>*/}
                                            {/*            {this.state.numOfElements}*/}
                                            {/*        </h6>*/}

                                            {/*    </div>*/}
                                            {/*</div>*/}


                                        </div>

                                    </div>
                                    : <div className="col-12 opac">

                                        <div className="row QuestionRow">
                                            <div className="col-11">
                                                <p style={{fontSize: "11px"}}>{strings.datePublish} {this.state.data[index].dateCreated}</p>
                                            </div>
                                            <div className="col-1">
                                                <h6 style={{float: 'right', color: '#343a40'}}>
                                                    <FontAwesomeIcon icon={faComments} size="lg"
                                                                     style={{paddingRight: '4px'}}/>
                                                    {this.state.data[index].numberOfElements}
                                                </h6>
                                            </div>
                                            <div className="col-12">
                                                <hr className="questionsHr"/>
                                            </div>

                                            <div className="col-12" style={{marginTop: "10px", marginBottom: "10px"}}>
                                                {this.state.activeLanguage === 'mk' &&
                                                <h5 className="mb-0">{item.title}</h5>}
                                                {this.state.activeLanguage === 'al' &&
                                                <h5 className="mb-0">{item.title}</h5>}
                                            </div>
                                        </div>

                                        <hr className="questionsHr"/>

                                        <div className="row">
                                            {/*<div className="row announcementTitleRow">*/}
                                            {/*    <div className="col-12">*/}
                                            {/*        <h2 className="announcementTitle">{item.title}</h2>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}

                                            {/*<div className="row announcementBodyRow">*/}
                                            {/*    <div className="col-12" style={{textAlign: 'center'}}>*/}
                                            {/*        <a style={{*/}
                                            {/*            display: "inline-block",*/}
                                            {/*            textAlign: 'center',*/}
                                            {/*            fontSize: '20px'*/}
                                            {/*        }}>*/}
                                            {/*        </a>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}

                                            <div className="col-md-6" style={{marginBottom: "12px"}}>
                                                <div className="announcementFooterCol">
                                                    <h6 style={{
                                                        float: 'left',
                                                        color: '#343a40',
                                                        marginTop: "20px",
                                                        fontSize: "14px"
                                                    }}>
                                                        <p style={{display: "inline-block"}}>{strings.authorCreator} {this.state.data[index].author.email} &nbsp;</p>
                                                        {this.state.data[index].author.email === localStorage.getItem("email") ?
                                                            <span className={"badge badge-pill badge-warning"}>{strings.yourQuestion}</span> : ""}
                                                        <br/>
                                                        <p>{strings.institution}: {this.state.data[index].author.institution !== null ? this.state.data[index].author.institution.nameMk : "No institution"}</p>
                                                    </h6>
                                                </div>
                                            </div>

                                            {(this.state.data[index].author.email === this.state.username || this.state.isAdmin) &&
                                            <div className="col-md-6">
                                                {(this.state.data[index].active) &&
                                                <DeleteModal btnClass={"defaultBtn ml-1 QuestionAdminActionButton"}
                                                             showText={true}
                                                             prompt={strings.deleteQuestionForQuestion}
                                                             doDelete={() => this.deleteQuestion(item.id)}/>}

                                                {(!this.state.data[index].active) &&
                                                <UnDeleteModal btnClass={"defaultBtn ml-1 QuestionAdminActionButton"}
                                                               showText={true}
                                                               prompt={strings.shareAgain}
                                                               style={{opacity: '1 !important'}}
                                                               doDelete={() => this.unDeleteQuestion(item.id)}/>}

                                            </div>
                                            }

                                        </div>


                                    </div>
                                }
                            </div>
                        )
                    }) : <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                        <InfoPopup infoMessage={strings.noPublishedQuestions}/>
                    </div>
                }
                {this.state.data.length !== 0 ?
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
                    /> : <div/>
                }

            </div>
        )
    }
}

export default (Question);
