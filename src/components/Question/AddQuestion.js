import React, {Component} from "react";
import QuestionRepository from "../../repository/QuestionRepository.js"
import "./css/Question.css"
import {strings} from "../../Localization/Localization";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave, faChevronCircleLeft} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import {toast} from "react-toastify";
import AreaOfInterestRepository from "../../repository/AreaOfInterestRepository";
import Select from "react-select";


class AddQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            question: {},
            optionsAreas: [],
            areaName: null,
            areaOfInterestId: null,
            area: {}
        }

    }

    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.getAreasOfInterest();
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
        console.log("d", this.state.areaOfInterestId)
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

    AddNewQuestion = (e) => {
        e.preventDefault();

        const form = new FormData();

        form.set('title', this.state.title);
        form.set('areaOfInterestId', this.state.areaOfInterestId)

        if (this.state.title !== "" && this.state.areaOfInterestId !== null) {
            QuestionRepository.addQuestion(form).then(res => {
                toast.success(strings.succAddQuestion);
                this.props.history.push("/Question")
            }).catch(err => {
                toast.error(strings.unSucAddQuestion)
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
                    <div className="col-12 text-center mt-5">
                        <h2>{strings.addNewEntry}</h2>
                    </div>

                <div className="container mt-5">

                    <form onSubmit={this.AddNewQuestion}>
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
                            />
                        </div>

                        <div className="form-group mt-4">
                            <label
                                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.areasOfInterest}</label>
                            <Select
                                placeholder={""}
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


export default (AddQuestion);