import React, {Component} from "react";
import FAQRepository from "../../repository/FAQRepository.js"
import "./FAQ.css"
import ReactPaginate from "react-paginate";
import {strings} from "../../Localization/Localization";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusCircle,faEdit,faFileDownload } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../Crud/DeleteModal";
import {toast} from "react-toastify";
import {NavLink, Link} from "react-router-dom";
import InfoPopup from "../ErrorHandler/InfoPopup";
import {SERVER_ADDRESS} from "../../shared/server-address";



class FAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            activeLanguage: localStorage.getItem("activeLanguage"),
            pageCount: 1,
            numOfElements: 0,
            attachmentFile: null,
            showDeleteModal: false,
            isAdmin: localStorage.getItem('role') === "ROLE_ADMIN"
        }

    }


    componentDidMount() {
        this.fetchData();
    }

    fetchData = (selectedPage = 0) => {
        FAQRepository.getAllFAQ(selectedPage).then(res => {
            this.setState({
                data: res.data.content,
                numOfElements: res.data.numOfElements,
                pageCount: res.data.totalPages
            })
        }).catch(err => {
            console.log(err)
        })
    }

    handlePageClick = data => {
        this.fetchData(data.selected);
    };

    deleteFAQEntry = (id) =>{
        return   FAQRepository.deleteFAQ(id).then(()=> {
            toast.success(strings.successfullyDeletedFeedbackItem)
            this.fetchData()
        }).catch(()=>{toast.error(strings.deleteModalfailed)})
    }



    render() {
        return (
            <div className="container" style={{marginTop: '30px'}}>
                {this.state.isAdmin &&
                <div className="row" style={{paddingTop: '15px'}}>
                    <NavLink to="/AddFAQ">
                        <button type="button" className="btn defaultBtnAdd btn-primary mt-4 btn btn-primary">
                            <FontAwesomeIcon icon={faPlusCircle} size="lg" style={{paddingRight: '4px'}}/>
                            {strings.add}
                        </button>
                    </NavLink>
                </div>
                }
                {this.state.data.length !== 0 ?
                    this.state.data.map((item, index) => {
                        return (
                            <div key={index} className="row FAQMainDiv">
                                <div className="col-12">

                                    <div className="row FAQQuestionRow">
                                        <div className="col-12">
                                            {this.state.activeLanguage === 'mk' &&
                                            <h4 className="mb-0">{item.questionMK}</h4>}
                                            {this.state.activeLanguage === 'al' && <h4>{item.questionAL}</h4>}
                                        </div>
                                    </div>

                                <div className="row mt-3 mb-2">
                                    <div className="col-12">
                                        {this.state.activeLanguage==='mk' && <p className={"newLine"}>{item.answerMK}</p>}
                                        {this.state.activeLanguage==='al' && <p className={"newLine"}>{item.answerAL}</p>}

                                        </div>
                                    </div>

                                {item.docName ?
                                    <div className="row mt-5 mb-2">
                                        <div className="col-12">
                                            <a href={SERVER_ADDRESS + "/rest/faq/download/" + item.id}
                                               target="_blank" rel="noopener noreferrer" className={"document"}>
                                                <FontAwesomeIcon icon={faFileDownload}/>
                                                &nbsp;{item.docName}
                                            </a>
                                        </div>
                                    </div>
                                    : ""
                                }

                                    {this.state.isAdmin &&
                                    <div className="row">
                                        <div className="col-12 ">
                                            <DeleteModal btnClass={"ml-1 FAQAdminActionButton defaultBtn"}
                                                         showText={true}
                                                         prompt={strings.deleteQuestinForModal}
                                                         doDelete={() => this.deleteFAQEntry(item.id)}/>
                                            <Link to={{
                                                pathname: `/EditFAQ`,
                                                state: {
                                                    item: item
                                                }
                                            }}
                                            >
                                                <button type="button" className="btn defaultBtnEdit btn-sm FAQAdminActionButton defaultBtn">
                                                    <FontAwesomeIcon icon={faEdit} size="lg" style={{paddingRight:'4px'}} />
                                                    {strings.edit}
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    }

                                </div>
                            </div>
                        )
                    }) : <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                        <InfoPopup infoMessage={strings.noPublishedFAQ}/>
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

export default (FAQ);
