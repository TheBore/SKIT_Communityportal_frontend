import React, {Component} from "react";
import FAQRepository from "../../repository/FAQRepository.js"
import "./FAQ.css"
import {strings} from "../../Localization/Localization";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave, faChevronCircleLeft} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import {toast} from "react-toastify";


class AddFAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            questionMK: '',
            questionAL: '',
            replyMK: '',
            replyAL: '',
            attachment: null,
            id: null
        }

    }

    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({
            fileName: strings.uploadYourFile
        });
    }

    fileOnChange = (e) => {
        this.displaySelectedFileName(e);
        this.onFileChangeHandler(e);
    }

    displaySelectedFileName = (e) => {
        let files = e.target.files
        this.setState({
            fileName: files[0].name
        })
    }

    AddNewFAQ = () => {
        if (this.state.questionMK !== "" && this.state.replyMK !== "") {
            FAQRepository.addFAQ(this.state.questionMK, this.state.questionAL, this.state.replyMK, this.state.replyAL, this.state.attachment).then(res => {
                toast.success(strings.successfullyAddedFeedbackItem);
                this.props.history.push("/FAQ")
            }).catch(err => {
                toast.error(strings.failedToAddFeedbackItem)
            })
        }
    }

    onChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    onFileChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.files[0]})
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-5 centerDiv"><h2>{strings.addNewEntry}</h2></div>

                    <div className="col-12 mt-4">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">Прашање</label>

                        <input
                            required
                            placeholder=""
                            name={"questionMK"}
                            type={"text"}
                            onChange={this.onChangeHandler}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12 mt-4">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">Pyetje</label>

                        <input
                            required
                            placeholder=""
                            name={"questionAL"}
                            type={"text"}
                            onChange={this.onChangeHandler}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12 mt-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">Одговор</label>

                        <textarea
                            required
                            rows="6"
                            placeholder=""
                            name={"replyMK"}
                            type={"text"}
                            onChange={this.onChangeHandler}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12 mt-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">Përgjigje</label>

                        <textarea
                            required
                            rows="6"
                            placeholder=""
                            name={"replyAL"}
                            type={"text"}
                            onChange={this.onChangeHandler}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12 mt-3">

                        <div className="custom-file">
                            <input
                                name="attachment"
                                type="file"
                                className="custom-file-input"
                                id="customFile"
                                onChange={this.fileOnChange}
                            />
                            <label className="custom-file-label" htmlFor="customFile">{this.state.fileName}</label>
                        </div>

                    </div>

                    <div className="col-12 mt-4 mb-4">
                        <button type="button" onClick={this.AddNewFAQ}
                                className="btn btn-info btn-sm FAQAdminActionButton defaultBtn">
                            <FontAwesomeIcon icon={faSave} size="lg" style={{paddingRight: '4px'}}/>
                            {strings.save}
                        </button>
                        <NavLink to="/FAQ">
                            <button type="button" className="btn btn-dark btn-sm FAQAdminActionButton defaultBtn">
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


export default (AddFAQ);