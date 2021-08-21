import React, {Component} from "react";
import QuestionRepository from "../../repository/QuestionRepository.js"
import "./css/Question.css"
import {strings} from "../../Localization/Localization";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave, faChevronCircleLeft} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import {toast} from "react-toastify";
import Select from "react-select";
import AreaOfInterestRepository from "../../repository/AreaOfInterestRepository";


class EditQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.item.id,
            question: {},
            optionsAreas: [],
            areaName: null,
            areaOfInterestId: null,
            area: {},
            title: "",
        }
    }


    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));

        QuestionRepository.getQuestionById(this.state.id).then(res => {
            this.setState({
                question: res.data,
                title: res.data.title,
                areaName: res.data.areaOfInterest.nameMk,
                areaOfInterestId: res.data.areaOfInterest.id,
                area: res.data.areaOfInterest,
            });
        });

        this.getAreasOfInterest();
    }

    EditQuestion = (e) => {
        e.preventDefault();
        const form = new FormData();

        form.set('id', this.state.question.id);
        form.set('title', this.state.title);
        form.set('areaOfInterestId', this.state.areaOfInterestId)

        QuestionRepository.updateQuestion(form).then(res => {
            toast.success(strings.succEditQuestion);
            this.props.history.push("/Question")
        }).catch(err => {
            toast.error(strings.unSucEditQuestion)
        })
    }

    getAreasOfInterest = () => {
        AreaOfInterestRepository.findAreasForUser().then((res) => {
            let optionsAreas = [];
            for (let i = 0; i < res.data.length; i++) {
                optionsAreas.push({
                    'value': res.data[i].id,
                    'label': res.data[i].nameMk,
                })
            }
            this.setState({
                optionsAreas: optionsAreas
            })
        }).catch(err => toast.error(strings.failedToLoadData));
    }

    onSelectedAreaChangeHandler = (areaOfInterest) => {
        if (areaOfInterest !== null) {
            this.setState({
                areaName: areaOfInterest.label,
                areaOfInterestId: areaOfInterest.value,
                area: areaOfInterest
            })
        } else {
            this.setState({
                areaName: null,
                areaOfInterestId: null
            })
        }
    }

    onChangeHandler = (e) => {
        const target = e.target || e;
        let update = this.state.question;
        update[target.name] = target.value;
        this.setState({entity: update});
    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    };

    render() {
        return (
            <div>

                <div className="col-12 mt-5 centerDiv">
                    <h2>{strings.edit}</h2>
                </div>

                <div className="container mt-5">
                    <form onSubmit={this.EditQuestion}>

                        <div className="form-group mt-4">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.questionn}</label>

                        <textarea
                            required
                            placeholder=""
                            name={"title"}
                            rows={5}
                            onChange={this.handleTitleChange}
                            className="form-control"
                            defaultValue={this.state.title}
                        />
                    </div>

                    <div className="form-group mt-4">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.areasOfInterest}</label>
                        <Select
                            placeholder={this.state.areaName ? this.state.areaName : " "}
                            className="basic-single"
                            classNamePrefix="select"
                            isDisabled={false}
                            isLoading={false}
                            isClearable={true}
                            isRtl={false}
                            isSearchable={true}
                            options={this.state.optionsAreas}
                            onChange={this.onSelectedAreaChangeHandler}
                            name="areaOfInterestId"
                            value={this.state.areaOfInterestId}
                            defaultValue={{
                                value: this.state.areaOfInterestId,
                                label: this.state.areaName,
                            }}
                        />
                    </div>

                    <div className="col-12 mt-4 mb-4">
                        <button type="submit"
                                className="btn btn-info btn-sm QuestionAdminActionButton">
                            <FontAwesomeIcon icon={faSave}
                                             size="lg"
                                             style={{paddingRight: '4px'}}/>
                            {strings.save}
                        </button>

                        <NavLink to="/Question">
                            <button type="button"
                                    className="btn btn-dark btn-sm QuestionAdminActionButton">
                                <FontAwesomeIcon icon={faChevronCircleLeft}
                                                 size="lg"
                                                 style={{paddingRight: '4px'}}/>
                                {strings.goBack}
                            </button>
                        </NavLink>
                    </div>
                </form>

                </div>
            </div>

        )
    }
}


export default (EditQuestion);