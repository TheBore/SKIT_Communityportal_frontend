import React, {Component} from "react";
import QuestionRepository from "../../repository/QuestionRepository.js"
import "./css/Question.css"
import ReactPaginate from "react-paginate";
import {strings} from "../../Localization/Localization";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {toast} from "react-toastify";
import {NavLink, Link} from "react-router-dom";
import InfoPopup from "../ErrorHandler/InfoPopup";
import {faComments, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import UnDeleteModal from "../Crud/UnDeleteModal";


class InactiveQuestions extends Component {
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
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = (selectedPage = 0) => {
        if (this.state.isUser) {
            QuestionRepository.getAllInactiveQuestions(selectedPage).then(async res => {
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

                console.log(this.state.username)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    handlePageClick = data => {
        this.fetchData(data.selected);
    };

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
                <div className="row mt-4" style={{color: "black", marginBottom: "15px"}}>
                    <div className="col-md-6">
                        <h2>{strings.allInactive}</h2>
                    </div>
                    <div className="col-md-6">
                        <NavLink to="/AddQuestion">
                            <button type="button" className="defaultBtn btn addQuestionBtn">
                                <FontAwesomeIcon icon={faPlusCircle} size="lg" style={{paddingRight: '4px'}}/>
                                Додади прашање
                            </button>
                        </NavLink>
                        <Link to="/Question" className="defaultBtn btn questionsBtn"><i
                            className="fa fa-history"/> {strings.allActive}</Link>
                    </div>
                </div>

                {this.state.data.length !== 0 ?
                    this.state.data.map((item, index) => {
                        return (
                            <div key={index} className="row QuestionMainDiv">
                                <div className="col-12">

                                    <div className="row QuestionRow">
                                        <div className="col-11">
                                            {this.state.activeLanguage === 'mk' &&
                                            <h5 className="mb-0">{item.title}</h5>}
                                            {this.state.activeLanguage === 'al' && <h5>{item.title}</h5>}
                                        </div>
                                        <div className="col-1">
                                            <h6 style={{float: 'right', color: '#343a40'}}>
                                                <FontAwesomeIcon icon={faComments} size="lg"
                                                                 style={{paddingRight: '4px'}}/>
                                                {this.state.data[index].numberOfElements}
                                            </h6>
                                        </div>

                                    </div>

                                    <div className="container-fluid publicationDivContainer">
                                        {/*<div className="row announcementTitleRow">*/}
                                        {/*    <div className="col-12">*/}
                                        {/*        <h2 className="announcementTitle">{item.title}</h2>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        <div className="row announcementBodyRow">
                                            <div className="col-12" style={{textAlign: 'center'}}>
                                                <a style={{
                                                    display: "inline-block",
                                                    textAlign: 'center',
                                                    fontSize: '20px'
                                                }}>
                                                    {/*<Link*/}
                                                    {/*    to={"/previewQuestion/" + item.id}*/}
                                                    {/*    className="announcementLinkButton">{strings.Answers}</Link>*/}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="col-12 announcementFooterCol">
                                            <h6 style={{float: 'left', color: '#343a40', fontSize: "5px"}}>
                                                <p>{strings.authorCreator} {this.state.data[index].author.email}</p>
                                                <p>{strings.institution}: {this.state.data[index].author.institution !== null ? this.state.data[index].author.institution.nameMk : "No institution"}</p>
                                                <span><small>{strings.datePublish} {this.state.data[index].dateCreated}</small></span>
                                            </h6>

                                        </div>

                                    </div>
                                    {console.log(this.state.data[index].author.email)}

                                    {(this.state.data[index].author.email === this.state.username || this.state.isAdmin) &&
                                    <div className="row">
                                        <div className="col-12 ">
                                            {(!this.state.data[index].active) &&
                                            <UnDeleteModal btnClass={"ml-1 QuestionAdminActionButton"}
                                                           showText={true}
                                                           prompt={strings.shareAgain}
                                                           doDelete={() => this.unDeleteQuestion(item.id)}/>}

                                        </div>
                                    </div>
                                    }

                                </div>
                            </div>
                        )
                    }) : <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                        <InfoPopup infoMessage={strings.noInactiveQuestions}/>
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
                    /> : <div></div>
                }

            </div>
        )
    }
}

export default (InactiveQuestions);
