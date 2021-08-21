import React, {Component} from "react";
import {toast} from "react-toastify";
import FeedbackPublicationRepository from "../../repository/FeedbackPublicationRepository";
import {strings} from "../../Localization/Localization";
import {NavLink} from "react-router-dom";
import {faArrowLeft, faFilePdf} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SERVER_ADDRESS} from "../../shared/server-address";


class VisualizeAnswers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            feedbackPublication: null,
            feedbackId: 0,
            options: []
        }
    }

    componentDidMount() {
        this.getAllFeedbackAnswers();
    }

    render() {
        return (
            <div className="container">
                <h2 style={{textAlign: "left", color: "#1C4857"}} className="mt-4 mb-4">{strings.previewAnswer}</h2>
                <div className="row">

                    {this.state.answers.map(this.displayChoice)}
                    <div className="col-12 mt-3 mb-3 text-right">
                        <NavLink to="/myfeedbackpublications">
                            <button type="button" className="btn btn-dark mr-3 visualizeFeedbackButtons">
                                <FontAwesomeIcon icon={faArrowLeft} size="lg"
                                                 style={{paddingRight: '4px'}}/>{strings.goBack}</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }


    displayChoice = (items, index) => {
        let finalOptions = []
        if (items.item.options) {
            debugger
            let optionsQuestion = items.item.options.map((item, index) => {
                if (items.item.type === "SINGLE_CHOICE") {
                    let e;
                    if (items.value === item) {
                        e = <div key={index}>
                            <input name={items.item.id}
                                   className="visualizeFeedbackCheckInput"
                                   readOnly={true}
                                   value={items.value}
                                   checked={true}
                                   type={"radio"}/>
                            <label className="form-check-label ml-1">{item}</label>
                        </div>
                        finalOptions.push(e)
                    } else {
                        e = <div key={index}>
                            <input name={items.item.id}
                                   readOnly={true}
                                   className="visualizeFeedbackCheckInput"
                                   value={items.value}
                                   type={"radio"}/>
                            <label className="form-check-label ml-1">{item}</label>
                        </div>
                        finalOptions.push(e)
                    }
                    return e
                } else if (items.item.type === "MULTIPLE_CHOICE") {
                    let values = items.value.split(";"); // c i s
                    let e;
                    let flag;
                    flag = values.includes(item)
                    if (flag) {
                        e = <div key={index}>
                            <input
                                className="visualizeFeedbackCheckInput"
                                checked={true}
                                readOnly={true}
                                type={"checkbox"}/>
                            <label className="form-check-label ml-1">{item}</label>
                        </div>
                        finalOptions.push(e)

                    } else {
                        e = <div key={index}>
                            <input
                                className="visualizeFeedbackCheckInput"
                                readOnly={true}
                                type={"checkbox"}/>
                            <label className="form-check-label ml-1">{item}</label>
                        </div>
                        finalOptions.push(e)

                    }
                    flag = false;
                    return e
                }

            })
        }

        if (items.item.type === "NUMERIC_FIELD") {
            let y = <div key={index}>
                <input className="visualizeFeedbackCheckInput"
                       value={items.value}
                       readOnly={true}
                       type={"text"}/>
            </div>
            finalOptions.push(y)
        } else if (items.item.type === "TEXT_FIELD") {
            let x = <div key={index}>
                <input className="visualizeFeedbackCheckInput"
                       value={items.value}
                       readOnly={true}
                       type={"text"}/>
            </div>
            finalOptions.push(x)
        }
        else if(items.item.type === "ATTACHMENT"){
            let x = <div key={index}>
                <a style={{color: "blue", marginBottom: "4px"}} className="visualizeFeedbackCheckInput"
                   href={SERVER_ADDRESS + "/rest/attachment/download/" + items.attachment.id}
                   target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFilePdf}
                                     color="red"
                                     size="lg"
                                     style={{paddingRight: '4px'}}
                    />
                    {items.value}
                </a>
            </div>
            finalOptions.push(x)
        }

        return (
            <div className="container-fluid visualizeFeedbackQuestionContainer" key={index}>
                <div className="row visualizeFeedbackQuestionHeaderDiv">
                    <div className="col-12">
                        <h4 title="Question">{items.item.name}</h4>
                    </div>
                </div>
                <div className="row w-100 visualizeFeedbackQuestionBodyDiv">
                    <div className="col-12">
                        <h3>{items.item.description}</h3>
                    </div>
                    <div className="col-12 form-group kt-checkbox">
                        {finalOptions}
                    </div>
                </div>
            </div>
        )
    }

    getAllFeedbackAnswers = () => {
        let feedbackPubId = this.props.match.params.id;
        FeedbackPublicationRepository.getAnswers(feedbackPubId).then(res => {
            this.setState({
                answers: res.data,
            });
        }).then(() => {
            this.state.answers.map(item => {
                this.setState(prevState => ({
                    options: [...prevState.options, item.item.options]
                }))
            })
        }).catch(() => {
            toast.error(strings.failedToLoadAnswers)
        })
    }

}

export default VisualizeAnswers;