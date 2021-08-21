import React, {Component} from "react";
import FeedbackItemRepository from "../../repository/FeedbackItemRepository";
import {toast} from "react-toastify";
import {strings} from "../../Localization/Localization";
import "./css/VisualizeFeedback.css"
import {faArrowLeft, faExclamation, faShare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";


class PreviewFeedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedItems: [],
        }
    }

    componentDidMount() {
        this.getFeedbackItemsByFeedbackId(this.props.match.params.id);
    }

    sortFeedbackItems = () => {
        this.state.feedItems.sort((a, b) => (a.dateCreated > b.dateCreated) ? 1 : -1)
    }

    render() {
        {
            this.sortFeedbackItems();
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
            else if (item.type === "ATTACHMENT"){
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
                    <NavLink to={"/desingfeedback/"+ this.props.match.params.id}>
                        <button type="button" className="btn btn-dark mr-3 visualizeFeedbackButtons defaultBtn"><FontAwesomeIcon icon={faArrowLeft} size="lg" style={{paddingRight:'4px'}} />{strings.goBack}</button>
                    </NavLink>
                    <NavLink to={"/publishfeedback/" + this.props.match.params.id}>
                        <button type="button" className="btn btn-info mr-3 visualizeFeedbackButtons defaultBtn"><FontAwesomeIcon icon={faShare} size="lg" style={{paddingRight:'4px'}} />{strings.publish}</button>
                    </NavLink>
                </div>
            </div>
        )
    }


    getFeedbackItemsByFeedbackId = (feedbackId) => {
        FeedbackItemRepository.getAllFeedbackItemsRest(feedbackId).then((res) => {
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
        const options = item.options.map(option => (<div key={item.id}>
            <input name={item.id}
                   disabled={true}
                   className="visualizeFeedbackCheckInput"
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
                {/*<div className="col-12">*/}
                {/*    <h3>{item.description}</h3>*/}
                {/*</div>*/}
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
        </div>);

    }


    textField = (item) => {
        return this.displayInput(item, 'text');
    }

    numericField = (item) => {
        return this.displayInput(item, 'number');
    }

    attachmentField = (item) => {
        return this.displayInput(item, 'file')
    }


    displayInput = (item, type) => {
        return (<div className="container-fluid visualizeFeedbackQuestionContainer" key={item.id}>
            <div className="row visualizeFeedbackQuestionHeaderDiv">
                <div className="col-12">
                    <h4 title="Question">{item.name}</h4>
                </div>
            </div>
            <div className="row w-100 visualizeFeedbackQuestionBodyDiv">
                {/*<div className="col-12">*/}
                {/*    <h3>{item.description}</h3>*/}
                {/*</div>*/}
                <div className="col-12 w-100 form-group">
                    <input name={item.id}
                           disabled={true}
                           className="w-100 pl-2 pr-2 visualizeFeedbackTextInput"
                           type={type}
                           />
                    {type==="number" && <small id="emailHelp" className="form-text text-muted">{strings.numberOnly}</small>}
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
        </div>);

    }
}

export default PreviewFeedback;