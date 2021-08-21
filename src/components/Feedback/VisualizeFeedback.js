import React, {Component} from "react";
import FeedbackItemRepository from "../../repository/FeedbackItemRepository";
import {toast} from "react-toastify";
import FeedbackPublicationRepository from "../../repository/FeedbackPublicationRepository";
import {strings} from "../../Localization/Localization";
import "./css/VisualizeFeedback.css"
import {faArrowLeft, faExclamation, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";

class VisualizeFeedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedItems: [],
            answers: {},
            feedbackPublication: null,
            feedbackId: 0,
            feedbackTitle:"",
            file: null,
            files: [],
            errors: {},
        }
    }

    componentDidMount() {
        this.markReadFeedbackPublication();
        this.getAllFeedbacksItems();
    }

    sortFeedbackItems = () => {
        this.state.feedItems.sort((a, b) => (a.dateCreated > b.dateCreated) ? 1 : -1)
    }

    render() {
        {
            this.sortFeedbackItems()
        }

        const questions = this.state.feedItems.map(item => {
            let display = null;
            if (item.type === "SINGLE_CHOICE") {
                display = this.singleChoice(item);
            } else if (item.type === "MULTIPLE_CHOICE") {
                display = this.multipleChoice(item);
            } else if (item.type === "NUMERIC_FIELD") {
                display = this.numericField(item);
            } else if (item.type === "TEXT_FIELD") {
                display = this.textField(item);
            }
            else if(item.type === "ATTACHMENT"){
                display = this.attachmentField(item);
            }
            return display;
        });
        return (
            <div className="container">
                <div className="row mt-4 titleText">
                    <div className="col-12"><h2>{this.state.feedbackTitle}</h2></div>
                </div>
                {questions}
                <div className="col-12 mt-3 mb-3 text-right">
                    <NavLink to="/myfeedbackpublications">
                        <button type="button" className="btn btn-dark mr-3 visualizeFeedbackButtons"><FontAwesomeIcon icon={faArrowLeft} size="lg" style={{paddingRight:'4px'}} />{strings.goBack}</button>
                    </NavLink>
                    <button className="btn btn-pill btn-info visualizeFeedbackButtons" onClick={this.submitAnswers}><FontAwesomeIcon icon={faPaperPlane} size="lg"
                                                                                                                                     style={{paddingRight: '4px'}}/>{strings.answer}</button>
                </div>
            </div>
        )
    }

    validate = () => {

        let errors = {}
        let subbmitable = true;

        for (let i = 0; i < this.state.feedItems.length; i++){

            const item = this.state.feedItems[i]
            const answer = this.state.answers[item.id]

            if(item.required === true &&
                (answer === undefined || answer === null ||
                    answer.length === 0 || answer === '')){

                errors[item.id] = true
                subbmitable = false
            }
            else{
                errors[item.id] = false
            }
        }

        this.setState({
            errors: errors
        })

        return !subbmitable;


    }

    submitAnswers = () => {

        if(this.validate()) return;

        FeedbackPublicationRepository.submitAnswers(this.state.feedbackPublication.id, this.state.answers).then(r => {

            for(let b=0; b<this.state.files.length; b++){
                const form = new FormData();
                console.log("b", this.state.files[b])
                if (this.state.files[b] !== null) {
                    form.append("feedbackPublicationId", this.state.feedbackPublication.id)
                    form.append("feedbackItemId", this.state.files[b].id)
                    form.append("attachment", this.state.files[b].content);
                    FeedbackItemRepository.saveFileForFeedbackAnswer(form).then(res => {
                        this.setState({
                        })
                    })
                }
            }

            toast.success(strings.successfullySubmittedAnswers)
            this.props.history.push("/myfeedbackpublications");
        }).catch(error => {
            toast.error(strings.failedTSubmitAnswers)
        });
    }


    markReadFeedbackPublication = () => {
        let feedbackPubId = this.props.match.params.id;
        FeedbackPublicationRepository.markReadFeedPub(feedbackPubId);
    }

    getAllFeedbacksItems = () => {
        let feedbackPubId = this.props.match.params.id;
        FeedbackPublicationRepository.getFeedbackPublicationById(feedbackPubId).then(res => {
            this.setState({
                feedbackPublication: res.data,
                feedbackId: res.data.feedback.id,
                feedbackTitle: res.data.feedback.name,
            });
            this.getFeedbackItemsByFeedbackId();
        }).catch(() => {
            toast.error(strings.failedToGetFeedbackId)
        })
    }
    getFeedbackItemsByFeedbackId = () => {
        FeedbackItemRepository.getAllFeedbackItemsRest(this.state.feedbackId).then((res) => {
            this.setState({feedItems: res.data})
        }).catch(() => {
            toast.error(strings.failedToLoadData)
        })
    }


    singleChoice = (item) => {
        return this.displayChoice(item, 'radio');
    }


    multipleChoice = (item) => {
        return this.displayChoice(item, 'checkbox')
    }

    displayChoice = (item, type) => {
        const options = item.options.map(option => (<div key={option}>
            <input name={item.id}
                   className="visualizeFeedbackCheckInput"
                   onChange={this.updateAnswer}
                   value={option}
                   type={type}/>
            <label className="form-check-label ml-1">{option}</label>
        </div>));
        return (<div className="container-fluid visualizeFeedbackQuestionContainer" key={item.id}>
            <div className="row visualizeFeedbackQuestionHeaderDiv">
                <div className="col-12">
                    <h4 title="Question">{item.name}</h4>
                </div>
            </div>
            <div className="row w-100 visualizeFeedbackQuestionBodyDiv">
                <div className="col-12">
                    <h3>{item.description}</h3>
                </div>
                <div className="col-12 form-group kt-checkbox">
                    {options}
                </div>
            </div>
            {item.required && <div className="row w-100">
                <div className="col-12 w-100 visualizeFeedbackQuestionFooterDiv">
                    <span className="badge badge-pill badge-danger p-2 ">
                        <FontAwesomeIcon icon={faExclamation} size="md" className="mr-1"/>
                        {strings.required}
                    </span>
                </div>
            </div>}

            {this.state.errors[item.id] === true ?
                <p style={{color: "red", fontWeight: "bold"}}>
                    {strings.pleaseFillInThisField}
                </p>
            : ""}
        </div>);

    }

    attachmentField = (item) => {
        return this.displayInput(item, 'file');
    }


    textField = (item) => {
        return this.displayInput(item, 'text');
    }

    numericField = (item) => {
        return this.displayInput(item, 'number');
    }

    preventNonNumericalInput = (e) => {
        e = e || window.event;
        const charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
        const charStr = String.fromCharCode(charCode);

        if (!charStr.match(/^[0-9]+$/))
            e.preventDefault();
    }


    displayInput = (item, type) => {
        // return (<div className="col-12" key={item.id}>
        //     <h4 title="Question">{item.name}</h4>
        //     <p>{item.description}</p>
        //     <div className="col-12">
        //         <input name={item.id}
        //                type={type}
        //                onChange={this.updateAnswer}/>
        //     </div>
        // </div>);

        return (<div className="container-fluid visualizeFeedbackQuestionContainer" key={item.id}>
            <div className="row visualizeFeedbackQuestionHeaderDiv">
                <div className="col-12">
                    <h4 title="Question">{item.name}</h4>
                </div>
            </div>
            <div className="row w-100 visualizeFeedbackQuestionBodyDiv">
                <div className="col-12">
                    <h3>{item.description}</h3>
                </div>
                {type==="number" ?
                    <div className="col-12 w-100 form-group">
                        <input name={item.id}
                               className="w-100 pl-2 pr-2 visualizeFeedbackTextInput"
                                       type={type}
                                       onKeyPress={this.preventNonNumericalInput}
                                       onChange={this.updateAnswer}/>
                        {type==="number" && <small id="emailHelp" className="form-text text-muted">{strings.numberOnly}</small>}
                    </div>
                    :
                    <div className="col-12 w-100 form-group">
                        <input name={item.id}
                               className="w-100 pl-2 pr-2 visualizeFeedbackTextInput"
                               type={type}
                               onChange={this.updateAnswer}/>
                        {type==="number" && <small id="emailHelp" className="form-text text-muted">{strings.numberOnly}</small>}
                    </div>
                }
            </div>
            {item.required && <div className="row w-100">
                <div className="col-12 w-100 visualizeFeedbackQuestionFooterDiv">
                    <span className="badge badge-pill badge-danger p-2 ">
                        <FontAwesomeIcon icon={faExclamation} size="md" className="mr-1"/>
                        {strings.required}
                    </span>
                </div>
            </div>}

            {this.state.errors[item.id] === true ?
                <p style={{color: "red", fontWeight: "bold"}}>
                    {strings.pleaseFillInThisField}
                </p>
                : ""}
        </div>);

    }

    updateAnswer = (e) => {
        const checked = e.target.checked;
        const name = e.target.name;
        let value = "";
        let file=null;

        if(e.target.type === "file"){
            value = e.target.files[0].name
            file = e.target.files[0]
            // AttachmentRepository.addAttachment(file).then(r =>
            //     toast.success("data")
            // )
        }else{
            value = e.target.value;
        }

        const type = e.target.type;

        this.setState((state) => {
            const answers = state.answers || {};
            if (type === 'checkbox') {
                const prev = answers[name] || [];
                if (checked) {
                    prev.push(value);
                } else {
                    prev.splice(prev.indexOf(value), 1);
                }
                answers[name] = prev;
            }
            else {
                if (type === "file") {
                    debugger

                    let files = this.state.files
                    files.push({id: name, content: file});

                    this.setState({
                        files: files
                    })
                }
                answers[name] = value;
            }

            return {answers: answers};
        });
    }
}

export default VisualizeFeedback;