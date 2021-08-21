import React, {Component} from "react";
import MessageRepository from "../../repository/MessageRepository";
import QuestionRepository from "../../repository/QuestionRepository";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./css/Question.css"
import "./css/QuestionDetails.css"
import {strings} from "../../Localization/Localization";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarPlus, faEdit, faReply, faShare, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link, NavLink} from "react-router-dom";
import ReactPaginate from "react-paginate";
import DeleteModal from "../Crud/DeleteModal";
import UnDeleteModal from "../Crud/UnDeleteModal";


class QuestionDetails extends Component {
    constructor(props) {
        super();
        this.state = {
            data: "",
            messageInput: "",
            messages: [],
            pageCount: 1,
            title: "",
            author: "",
            dateCreated: "",
            dateUpdated: "",
            message: {},
            isAdmin: localStorage.getItem('role') === "ROLE_ADMIN",
            isUser: localStorage.getItem('role') === "ROLE_INSTITUTIONAL_MODERATOR",
            username: localStorage.getItem('email'),
            parentMessageId: null,
        }
    }

    getQuestion = () => {
        let id = this.props.match.params.id;
        return QuestionRepository.getQuestionById(id).then(res => {
            this.setState({
                data: res.data,
                title: res.data.title,
                author: res.data.author.email,
                dateCreated: res.data.dateCreated,
                dateUpdated: res.data.dateUpdated,
            });
            console.log(this.state.data);
        }).catch(err => {
            toast.error(`${strings.errorOpeningAnnouncementPub}`);
        });
    }

    getMessages = (selectedPage = 0) => {
        let id = this.props.match.params.id;
        return MessageRepository.getMessagesForAdmin(id, selectedPage).then(res => {
            this.setState({
                pageCount: res.data.totalPages,
                messages: res.data.content,
            })
        }).catch(err => console.log(err))
    }

    componentDidMount() {
        this.getMessages();
        this.getQuestion();
    }


    handleMessageChange = (e) => {
        const target = e.target || e;
        let update = this.state.message;
        update[target.name] = target.value;
        this.setState({entity: update});
    }

    handlePageClick = data => {
        this.getMessages(data.selected);
    };


    addMessage = () => {
        let email = localStorage.getItem('email');
        let questionId = this.props.match.params.id;
        // if (this.state.message.body !== "")
        return MessageRepository.createMessageInQuestion(email, questionId, this.state.message).then(() => {
            toast.success(strings.successfullComent)
            this.getQuestion();
            this.getMessages();
            setTimeout(function () {
                window.location.reload(1);
            }, 3000);
        }).catch(() => toast.error(strings.failedToComment))
    }

    addReplyMessage = () => {
        let email = localStorage.getItem('email');
        let questionId = this.props.match.params.id;
        return MessageRepository.createReplyMessage(this.state.parentMessageId, questionId, email, this.state.message).then(() => {
            toast.success(strings.successfullComent);
            this.getQuestion();
            this.getMessages();
            setTimeout(function () {
                window.location.reload(1);
            }, 3000);
        }).catch(() => toast.error(strings.failedToComment))
    }

    deleteMessage = (id) => {
        return MessageRepository.deleteMessage(id).then(() => {
            toast.success(strings.messageSuccDeleted);
            this.getQuestion();
            this.getMessages();
        }).catch(() => {
            toast.error(strings.messageUnSuccDeleted)
        })
    }

    unDeleteMessage = (id) => {
        return MessageRepository.unDeleteMessage(id).then(() => {
            toast.success(strings.messageSuccSharedAgain)
            this.getQuestion();
            this.getMessages();
        }).catch(() => {
            toast.error(strings.messageUnSuccSharedAgain)
        })
    }


    showCommentSection = (messageId) => {

        this.setState({
            parentMessageId: messageId
        }, function () {
            var showComment = document.getElementById(this.state.parentMessageId).getElementsByClassName('showComment')[0];
            if (showComment.style.display === 'none') {
                showComment.style.display = 'inline-block';
            } else if (showComment.style.display === 'inline-block') {
                showComment.style.display = 'none'
            }
        });

    }


    render() {

        if (!this.state.messages) {
            return (<div></div>)
        }
        return (
            <div>
                {/*this is the question */}
                <div className="container openedAnnouncementContainer" style={{minHeight: '80px !important'}}>

                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-center mt-3 openedAnnouncementTitle">{strings.questionn}: {this.state.title}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-2 openedAnnouncementInfoCol">
                            <div className="openedAnnouncementInfoDiv">
                                <h6 className="mr-3 openedAnnouncementInfo" style={{float: 'left', color: '#343a40'}}>
                                    <FontAwesomeIcon icon={faUser} size="lg" style={{paddingRight: '4px'}}/>
                                    {this.state.author}
                                </h6>
                                <h6 className="mr-3 openedAnnouncementInfo" style={{float: 'left', color: '#343a40'}}>
                                    <FontAwesomeIcon icon={faCalendarPlus} size="lg" style={{paddingRight: '4px'}}/>
                                    {this.state.dateCreated}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>

                {/*this is the comment section*/}
                <div className="container openedAnnouncementAddCommentContainer">
                    <div className="row w-100 mr-3 ml-3 mt-2 mb-2">
                        <div className="input-group">
                            <input type="text"
                                   className="form-control openedAnnouncementAddCommentTextInput"
                                   placeholder={strings.commentPlaceholder}
                                   name={"body"}
                                   onChange={this.handleMessageChange}/>
                            <span className="input-group-btn">
                            <button className="btn btn-primary openedAnnouncementAddCommentButton"
                                    type="button"
                                    onClick={this.addMessage}>
                                {strings.comment}</button>
                        </span>
                        </div>
                    </div>
                </div>
                {this.state.messages.map((message, index) =>
                        (message.active ?
                                (message.parentMessage === null ?

                                    // these are all the active messages which are main messages
                                    <div id={message.id} className="container openedAnnouncementAddCommentContainer"
                                         style={{width: '50%', marginLeft: '570px'}}>
                                        <div className="row w-100 mr-3 ml-3 mt-2 mb-2">
                                            <div className="col-12">
                                                <div className="row" key={message.id}>
                                                    <div className="col-12">
                                                        {message.parentMessage === null ?
                                                            <h5 style={{wordWrap: "break-word"}}>{message.body}</h5> :
                                                            <div>
                                                                <p style={{
                                                                    fontSize: '15px',
                                                                    fontStyle: 'italic',
                                                                    color: 'black',
                                                                    wordWrap: "break-word"
                                                                }}>
                                                                    Reply to: {message.parentMessage.body}
                                                                    {/*Reply to: <span style={{fontWeight: 'bold'}}>{message.parentMessage.body}</span>*/}
                                                                    <hr/>
                                                                </p>
                                                                <h5 style={{wordWrap: "break-word"}}>
                                                                    {message.body}
                                                                </h5>
                                                            </div>}
                                                        <hr/>
                                                        <p className="mr-3 openedAnnouncementInfo"
                                                           style={{float: 'left', color: '#343a40'}}>
                                                            <FontAwesomeIcon icon={faUser} size="lg"
                                                                             style={{paddingRight: '4px'}}/>
                                                            {message.author.email}
                                                        </p>
                                                        <p className="mr-3 openedAnnouncementInfo"
                                                           style={{float: 'left', color: '#343a40'}}>
                                                            <FontAwesomeIcon icon={faCalendarPlus} size="lg"
                                                                             style={{paddingRight: '4px'}}/>
                                                            {message.dateUpdated}
                                                        </p>
                                                        {(message.active && this.state.isAdmin) &&
                                                        <DeleteModal btnClass={"ml-1 QuestionAdminActionButton"}
                                                                     showText={true}
                                                                     prompt={strings.deleteMessageForMessage}
                                                                     doDelete={() => this.deleteMessage(message.id)}/>}

                                                        {((!message.active) && this.state.isAdmin) &&
                                                        <UnDeleteModal btnClass={"ml-1 QuestionAdminActionButton"}
                                                                       showText={true}
                                                                       prompt={strings.shareMessageForMessage}
                                                                       doDelete={() => this.unDeleteMessage(message.id)}/>}

                                                        {(message.active) && (message.author.email === this.state.username) && (!this.state.isAdmin) &&
                                                        <DeleteModal btnClass={"ml-1 QuestionAdminActionButton"}
                                                                     showText={true}
                                                                     prompt={strings.deleteMessageForMessage}
                                                                     doDelete={() => this.deleteMessage(message.id)}/>}
                                                        {(!message.active) && (message.author.email === this.state.username) && (!this.state.isAdmin) &&
                                                        <UnDeleteModal btnClass={"ml-1 QuestionAdminActionButton"}
                                                                       showText={true}
                                                                       prompt={strings.shareMessageForMessage}
                                                                       doDelete={() => this.unDeleteMessage(message.id)}/>}

                                                        {(message.active && (this.state.isAdmin || this.state.username === message.author.email)) &&
                                                        <Link to={{
                                                            pathname: `/EditMessage`,
                                                            state: {
                                                                message: message
                                                            }
                                                        }}
                                                        >
                                                            <button type="button"
                                                                    className="btn btn-info btn-sm QuestionAdminActionButton">
                                                                <FontAwesomeIcon icon={faEdit} size="lg"
                                                                                 style={{paddingRight: '4px'}}/>
                                                                {strings.edit}
                                                            </button>
                                                        </Link>}
                                                        <button className="btn btn-success btn-sm"
                                                                style={{float: 'right', width: '100px', height: '35px'}}
                                                                onClick={() => this.showCommentSection(message.id)}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faReply} size="lg"
                                                                style={{paddingRight: '4px'}}/>
                                                            Одговори
                                                        </button>

                                                        <div className="container showComment"
                                                             style={{display: 'none'}}>
                                                            <div className="row w-100 mr-3 ml-3 mt-2 mb-2">
                                                                <div className="input-group">
                                                                    <input type="text"
                                                                           className="form-control openedAnnouncementAddCommentTextInput"
                                                                           placeholder={strings.commentPlaceholder}
                                                                           name={"body"}
                                                                           onChange={this.handleMessageChange}/>
                                                                    <span className="input-group-btn">
                                                                        <button
                                                                            className="btn btn-primary openedAnnouncementAddCommentButton"
                                                                            type="button"
                                                                            onClick={this.addReplyMessage}
                                                                        >
                                                                            {strings.comment}</button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> :

                                    // these are all active messages which are reply to some other message
                                    <div className="container openedAnnouncementAddCommentContainer" id={message.id}
                                         style={{width: '44%', marginLeft: '670px'}}>
                                        <div className="row w-100 mr-3 ml-3 mt-2 mb-2">
                                            <div className="col-12">
                                                <div className="row" key={message.id}>
                                                    <div className="col-12">
                                                        {message.parentMessage === null ?
                                                            <h5 style={{wordWrap: "break-word"}}>{message.body}</h5> :
                                                            <div>
                                                                <p style={{
                                                                    fontSize: '15px',
                                                                    fontStyle: 'italic',
                                                                    color: 'black',
                                                                    wordWrap: "break-word"
                                                                }}>
                                                                    Reply to: {message.parentMessage.body}
                                                                    {/*Reply to: <span style={{fontWeight: 'bold'}}>{message.parentMessage.body}</span>*/}
                                                                    <hr/>
                                                                </p>
                                                                <h5 style={{wordWrap: "break-word"}}>
                                                                    {message.body}
                                                                </h5>
                                                            </div>}
                                                        <hr/>
                                                        <p className="mr-3 openedAnnouncementInfo"
                                                           style={{float: 'initial', color: '#343a40'}}>
                                                            <FontAwesomeIcon icon={faUser} size="lg"
                                                                             style={{paddingRight: '4px'}}/>
                                                            {message.author.email}
                                                        </p>
                                                        <p className="mr-3 openedAnnouncementInfo"
                                                           style={{float: 'left', color: '#343a40'}}>
                                                            <FontAwesomeIcon icon={faCalendarPlus} size="lg"
                                                                             style={{paddingRight: '4px'}}/>
                                                            {message.dateUpdated}
                                                        </p>
                                                        {(message.active && this.state.isAdmin) &&
                                                        <DeleteModal btnClass={"ml-1 QuestionAdminActionButton"}
                                                                     showText={true}
                                                                     prompt={strings.deleteMessageForMessage}
                                                                     doDelete={() => this.deleteMessage(message.id)}/>}

                                                        {((!message.active) && this.state.isAdmin) &&
                                                        <UnDeleteModal btnClass={"ml-1 QuestionAdminActionButton"}
                                                                       showText={true}
                                                                       prompt={strings.shareMessageForMessage}
                                                                       doDelete={() => this.unDeleteMessage(message.id)}/>}

                                                        {(message.active) && (message.author.email === this.state.username) && (!this.state.isAdmin) &&
                                                        <DeleteModal btnClass={"ml-1 QuestionAdminActionButton"}
                                                                     showText={true}
                                                                     prompt={strings.deleteMessageForMessage}
                                                                     doDelete={() => this.deleteMessage(message.id)}/>}
                                                        {(!message.active) && (message.author.email === this.state.username) && (!this.state.isAdmin) &&
                                                        <UnDeleteModal btnClass={"ml-1 QuestionAdminActionButton"}
                                                                       showText={true}
                                                                       prompt={strings.shareMessageForMessage}
                                                                       doDelete={() => this.unDeleteMessage(message.id)}/>}

                                                        {(message.active && (this.state.isAdmin || this.state.username === message.author.email)) &&
                                                        <Link to={{
                                                            pathname: `/EditMessage`,
                                                            state: {
                                                                message: message
                                                            }
                                                        }}
                                                        >
                                                            <button type="button"
                                                                    className="btn btn-info btn-sm QuestionAdminActionButton">
                                                                <FontAwesomeIcon icon={faEdit} size="lg"
                                                                                 style={{paddingRight: '4px'}}/>
                                                                {strings.edit}
                                                            </button>
                                                        </Link>}

                                                        <button className="btn btn-success btn-sm"
                                                                style={{float: 'right', width: '100px', height: '35px'}}
                                                                onClick={() => this.showCommentSection(message.id)}>
                                                            <FontAwesomeIcon
                                                                icon={faReply} size="lg"
                                                                style={{paddingRight: '4px'}}/>
                                                            Одговори
                                                        </button>

                                                        <div className="container showComment"
                                                             style={{display: 'none'}}>
                                                            <div className="row w-100 mr-3 ml-3 mt-2 mb-2">
                                                                <div className="input-group">
                                                                    <input type="text"
                                                                           className="form-control openedAnnouncementAddCommentTextInput"
                                                                           placeholder={strings.commentPlaceholder}
                                                                           name={"body"}
                                                                           onChange={this.handleMessageChange}/>
                                                                    <span className="input-group-btn">
                                                                        <button
                                                                            className="btn btn-primary openedAnnouncementAddCommentButton"
                                                                            type="button"
                                                                            onClick={this.addReplyMessage}>
                                                                            {strings.comment}</button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                                :

                                // these are all inactive messages, no matter if it is reply or just message
                                (this.state.isAdmin || message.author.email === this.state.username ?
                                    <div className="container openedAnnouncementAddCommentContainer opacityComment"
                                         style={{width: '50%', marginLeft: '570px'}}>
                                        <div className="row w-100 mr-3 ml-3 mt-2 mb-2">
                                            <div className="col-12">
                                                <div className="row" key={message.id}>
                                                    <div className="col-12">
                                                        {message.parentMessage === null ?
                                                            <h5 style={{wordWrap: "break-word"}}>{message.body}</h5> :
                                                            <div>
                                                                <p style={{
                                                                    fontSize: '15px',
                                                                    fontStyle: 'italic',
                                                                    color: 'black',
                                                                    wordWrap: "break-word"
                                                                }}>
                                                                    Reply to: {message.parentMessage.body}
                                                                    {/*Reply to: <span style={{fontWeight: 'bold'}}>{message.parentMessage.body}</span>*/}
                                                                    <hr/>
                                                                </p>
                                                                <h5 style={{wordWrap: "break-word"}}>
                                                                    {message.body}
                                                                </h5>
                                                            </div>}
                                                        <hr/>
                                                        <p className="mr-3 openedAnnouncementInfo"
                                                           style={{float: 'left', color: '#343a40'}}>
                                                            <FontAwesomeIcon icon={faUser} size="lg"
                                                                             style={{paddingRight: '4px'}}/>
                                                            {message.author.email}
                                                        </p>
                                                        <p className="mr-3 openedAnnouncementInfo"
                                                           style={{float: 'left', color: '#343a40'}}>
                                                            <FontAwesomeIcon icon={faCalendarPlus} size="lg"
                                                                             style={{paddingRight: '4px'}}/>
                                                            {message.dateUpdated}
                                                        </p>

                                                        {(message.active && this.state.isAdmin) &&
                                                        <DeleteModal btnClass={"ml-1 QuestionAdminActionButton"}
                                                                     showText={true}
                                                                     prompt={strings.deleteMessageForMessage}
                                                                     doDelete={() => this.deleteMessage(message.id)}/>}

                                                        {((!message.active) && this.state.isAdmin && this.state.username === message.deletedByUserEmail) &&
                                                        <UnDeleteModal btnClass={"ml-1 QuestionAdminActionButton"}
                                                                       showText={true}
                                                                       prompt={strings.shareMessageForMessage}
                                                                       doDelete={() => this.unDeleteMessage(message.id)}
                                                                       className="classForButtonOpacity"/>}

                                                        {(message.active) && (message.author.email === this.state.username) && (!this.state.isAdmin) &&
                                                        <DeleteModal btnClass={"ml-1 QuestionAdminActionButton"}
                                                                     showText={true}
                                                                     prompt={strings.deleteMessageForMessage}
                                                                     doDelete={() => this.deleteMessage(message.id)}/>}

                                                        {(!message.active) && (message.author.email === this.state.username) && (!this.state.isAdmin) &&
                                                        <UnDeleteModal btnClass={"ml-1 QuestionAdminActionButton"}
                                                                       showText={true}
                                                                       prompt={strings.shareMessageForMessage}
                                                                       doDelete={() => this.unDeleteMessage(message.id)}
                                                                       className="classForButtonOpacity"
                                                        />}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : <div></div>)
                        )
                )}
                <div>
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
                <div className="container">
                    <NavLink to="/Question">
                        <button type="button"
                                className="btn btn-info openedAnnouncementAddCommentButton openedAnnouncementBackButton">{strings.goBack}</button>
                    </NavLink>
                </div>
            </div>
        )
    }

}

export default QuestionDetails;