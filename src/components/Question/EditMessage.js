import React, {Component} from "react";
import MessageRepository from "../../repository/MessageRepository.js"
import "./css/Question.css"
import {strings} from "../../Localization/Localization";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave, faChevronCircleLeft} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import {toast} from "react-toastify";

class EditMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.message.id,
            message: {},
            questionId: null,
        }
    }


    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        debugger;
        MessageRepository.findMessageById(this.state.id).then(res => {
            this.setState({message: res.data, questionId: res.data.question.id});
        });
    }

    EditMessage = () => {
        MessageRepository.updateMessage(this.state.message).then(res => {
            toast.success(strings.succEditMessage);
            this.props.history.push("/previewQuestion/" + this.state.questionId);
        }).catch(err => {
            toast.error(strings.unSuccEditMessage)
        })

    }

    onChangeHandler = (e) => {
        const target = e.target || e;
        let update = this.state.message;
        update[target.name] = target.value;
        this.setState({entity: update});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-5 centerDiv"><h2>{strings.edit}</h2></div>

                    <div className="col-12 mt-4">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">
                            {strings.messageBody}
                        </label>
                        <input
                            required
                            placeholder=""
                            name={"body"}
                            type={"text"}
                            onChange={this.onChangeHandler}
                            className="form-control"
                            value={this.state.message.body}
                        />
                    </div>

                    <div className="col-12 mt-4 mb-4">
                        <button type="button" onClick={this.EditMessage}
                                className="btn btn-info btn-sm QuestionAdminActionButton">
                            <FontAwesomeIcon icon={faSave} size="lg" style={{paddingRight: '4px'}}/>
                            {strings.save}
                        </button>
                        <NavLink to={"/previewQuestion/" + this.state.questionId}>
                            <button type="button" className="btn btn-dark btn-sm QuestionAdminActionButton">
                                <FontAwesomeIcon icon={faChevronCircleLeft} size="lg" style={{paddingRight: '4px'}}/>
                                {strings.goBack}
                            </button>
                        </NavLink>
                    </div>

                </div>
            </div>

        )
    }
}


export default (EditMessage);