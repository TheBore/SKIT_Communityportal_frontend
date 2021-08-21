import React, {Component} from "react";
import AnnouncementPublicationRepository from "../../repository/AnnouncementPublicationRepository";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './css/AnnouncementComments.css';
import {strings} from "../../Localization/Localization";
import AnnouncementCommentsRepository from "../../repository/AnnouncementCommentsRepository";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BorderWrapper from 'react-border-wrapper'
import {faArrowLeft, faCalendarPlus, faFilePdf, faUser} from "@fortawesome/free-solid-svg-icons";
import './css/AnnouncementPublicationDetails.css'
import {NavLink} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {SERVER_ADDRESS} from "../../shared/server-address";


class AnnouncementPublicationDetails extends Component {
    constructor(props) {
        super();
        this.state = {
            data: null,
            commentInput: "",
            comments: [],
            attachments: [],
            pageCount: 1,
        }
    }

    getAnnPub = () => {
        let id = this.props.match.params.id;
        AnnouncementPublicationRepository.markReadAndOpenAnnPub(id).then(res => {
            this.setState({
                data: res.data
            });
        }).catch(err => {
            toast.error(`${strings.errorOpeningAnnouncementPub}`);
        });
    }
    getComments = (selectedPage = 0) => {
        const queryString = require('query-string');
        let parsed = queryString.parse(this.props.location.search);
        let annId = parseInt(parsed.ann);
        AnnouncementCommentsRepository.getAnnComments(annId, selectedPage).then(res => {
            this.setState({
                pageCount: res.data.totalPages,
                comments: res.data.content,
            })
        }).catch(err => console.log(err))
    }
    getAttachmentsForPublication=()=>{
        let annPubId = this.props.match.params.id;
        AnnouncementPublicationRepository.getAttachemtsForPublication(annPubId).then(res=>{
            this.setState({attachments:res.data})
        })
    }

    componentDidMount() {
        this.getAnnPub();
        this.getAttachmentsForPublication();
        this.getComments();
    }


    handleCommentChange = (e) => {
        this.setState({commentInput: e.target.value})
    }

    handlePageClick = data => {
        this.getAnnPub(data.selected);
        this.getAttachmentsForPublication(data.selected);
        this.getComments(data.selected);
    };

    addComment = (e) => {
        let email = localStorage.getItem('email');
        const queryString = require('query-string');
        let parsed = queryString.parse(this.props.location.search);
        let annId = parseInt(parsed.ann);

        if (this.state.commentInput !== "")
            AnnouncementCommentsRepository.addComment(email, annId, this.state.commentInput).then(() => {
                toast.success(strings.successfullComent)
                this.getComments();
                this.setState({commentInput: ""})
            }).catch(() => toast.error(strings.failedToComment))
    }

    renderComments = (comment,index) => {
        return (
            <div className="container openedAnnouncementAddCommentContainer">
                <div className="row w-100 mr-3 ml-3 mt-2 mb-2">
                    <div className="col-12">
                        <div className="row" key={index}>
                            <div className="col-12">
                                <BorderWrapper
                                    borderColour="dimgrey"
                                    borderWidth="3px"
                                    borderRadius="15px"
                                    borderType="solid"
                                    innerPadding="30px"
                                    topElement={
                                        <h6 className="openedAnnouncementInfo" style={{ float:'center',color:'#343a40', whiteSpace:'nowrap'}}>
                                        <FontAwesomeIcon icon={faUser} size="lg" style={{paddingRight:'4px'}} />
                                        {comment.submittedByUser.email}
                                        </h6>
                                    }
                                    topPosition={0.05}
                                    topOffset="10px"
                                    topGap="10px"
                                    bottomElement={
                                        <h6 className="openedAnnouncementInfo" style={{ float:'left',color:'#343a40', whiteSpace:'nowrap'}}>
                                        <FontAwesomeIcon icon={faCalendarPlus} size="lg" style={{paddingRight:'4px'}} />
                                        {comment.submittedAt}
                                        </h6>
                                    }
                                    bottomPosition={0.9}
                                    bottomOffset="10px"
                                    bottomGap="15px"
                                >
                                    <div style={{width:"1000px"}}>
                                        <p className="openedAnnouncementBody">{comment.comment}</p>

                                    </div>
                                </BorderWrapper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {

        if (!this.state.data) {
            return (<div></div>)
        }
        return (
            <div>


                <div className="container openedAnnouncementContainer">

                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-center mt-3 openedAnnouncementTitle">{this.state.data.announcement.title}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p className="mt-3 openedAnnouncementBody">{this.state.data.announcement.body}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 openedAnnouncementAttachmentDiv">
                            {this.state.attachments.map((item, index) => {
                                return (<div key={index}><a style={{color: "blue"}}
                                                            href={SERVER_ADDRESS + "/rest/attachment/download/" + item.id}
                                                            target="_blank" rel="noopener noreferrer"><FontAwesomeIcon
                                    icon={faFilePdf} color="red" size="lg" style={{paddingRight: '4px'}}/>
                                    {item.name}</a></div>)
                            })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-2 openedAnnouncementInfoCol">
                            <div className="openedAnnouncementInfoDiv">
                                <h6 className="mr-3 openedAnnouncementInfo" style={{float: 'left', color: '#343a40'}}>
                                    <FontAwesomeIcon icon={faUser} size="lg" style={{paddingRight: '4px'}}/>
                                    {this.state.data.announcement.creator.email}
                                </h6>
                                <h6 className="mr-3 openedAnnouncementInfo" style={{float: 'left', color: '#343a40'}}>
                                    <FontAwesomeIcon icon={faCalendarPlus} size="lg" style={{paddingRight: '4px'}}/>
                                    {this.state.data.announcement.dateCreated}
                                </h6>
                                {/*<h6 style={{float: 'right', color: '#343a40'}}>*/}
                                {/*    <FontAwesomeIcon icon={faComments} size="lg" style={{paddingRight: '4px'}}/>*/}
                                {/*    {this.state.comments.length}*/}
                                {/*</h6>*/}
                            </div>
                        </div>
                    </div>

                </div>

                {/*<div className="container openedAnnouncementAddCommentContainer">*/}
                {/*    <div className="row w-100 mr-3 ml-3 mt-2 mb-2">*/}
                {/*        <div className="input-group">*/}
                {/*            <input type="text" className="form-control openedAnnouncementAddCommentTextInput"*/}
                {/*                   placeholder={strings.commentPlaceholder}*/}
                {/*                   value={this.state.commentInput}*/}
                {/*                   onChange={(e) => this.handleCommentChange(e)}/>*/}
                {/*            <span className="input-group-btn">*/}
                {/*                <button className="btn btn-primary openedAnnouncementAddCommentButton" type="button"*/}
                {/*                        onClick={this.addComment}>{strings.comment}</button>*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {this.state.comments.map(this.renderComments)}
                {/*<div>*/}
                {/*    <ReactPaginate*/}
                {/*        previousLabel={"<<"}*/}
                {/*        nextLabel={">>"}*/}
                {/*        breakLabel={'...'}*/}
                {/*        pageCount={this.state.pageCount}*/}
                {/*        marginPagesDisplayed={2}*/}
                {/*        pageRangeDisplayed={5}*/}
                {/*        onPageChange={this.handlePageClick}*/}
                {/*        breakClassName={'page-item'}*/}
                {/*        breakLinkClassName={'page-link'}*/}
                {/*        containerClassName={'pagination'}*/}
                {/*        pageClassName={'page-item'}*/}
                {/*        pageLinkClassName={'page-link'}*/}
                {/*        previousClassName={'page-item'}*/}
                {/*        previousLinkClassName={'page-link'}*/}
                {/*        nextClassName={'page-item'}*/}
                {/*        nextLinkClassName={'page-link'}*/}
                {/*        activeClassName={'active'}*/}
                {/*    />*/}
                {/*</div>*/}
                <div className="container mt-3">
                    <NavLink to="/mypublications">
                        <button type="button"
                                className="btn btn-info openedAnnouncementAddCommentButton openedAnnouncementBackButton">
                            <FontAwesomeIcon icon={faArrowLeft} size="lg"
                                             style={{paddingRight: '4px'}}
                                             className="mr-1"
                            />
                            {strings.goBack}
                        </button>
                    </NavLink>
                </div>
            </div>
        )
    }


}

export default AnnouncementPublicationDetails;