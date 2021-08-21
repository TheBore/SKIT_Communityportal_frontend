import React, {Component} from "react";
import InstitutionRepository from "../../repository/InstitutionRepository";
import {toast} from "react-toastify";
import "./css/InstitutionEdited.css"
import {strings} from "../../Localization/Localization";
import InstitutionCategoryRepository from "../../repository/InstitutionCategoryRepository";
import MapEntity from "./MapEntity";
import Select from "react-select";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronCircleLeft, faSave} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import InfoPopup from "../ErrorHandler/InfoPopup";

class MyInstitution extends Component {

    constructor(props) {
        super(props);
        this.state = {
            institution: {},
            id: null,
            allInstitutions: [],
            allCategories: [],
            category: {},
            parentInstitution: {},
            parentInstitutionName: null,
            parentCategoryName: null,
            parentInstitutionId: null,
            parentCategoryId: null,
            listCategories: [],
            options: [],
            optionsInstitutions: [],
            tags: [],
            noticeBoard: "",
        }
    }

    componentDidMount() {
        InstitutionRepository.getInstitutionByUserEmail().then(res => {
            this.setState({
                institution: res.data,
                id: res.data.id,
                category: res.data.category,
                parentInstitution: res.data.parentInstitution,
                parentInstitutionName: res.data.parentInstitution ? res.data.parentInstitution.nameMk : null,
                parentInstitutionId: res.data.parentInstitution ? res.data.parentInstitution.id : null,
                parentCategoryName: res.data.category ? res.data.category.nameMk : null,
                parentCategoryId: res.data.category ? res.data.category.id : null,
                tags: [],
                noticeBoard: res.data.noticeBoard,
            })
        })
        this.fetchData()
    }

    changeBoard = () => {
        this.setState({
            noticeBoard: !this.state.noticeBoard
        })
    }

    getInstitutions = () => {
        InstitutionRepository.allActiveInstitutions().then((res) => {
            let optionsInstitutions = [];
            for (let i = 0; i < res.data.length; i++) {
                optionsInstitutions.push({
                    'value': res.data[i].id,
                    'label': res.data[i].nameMk,
                })
            }
            this.setState({
                optionsInstitutions: optionsInstitutions
            })
        }).catch(err => toast.error(strings.failedToLoadData));
    }

    getCategories = () => {
        InstitutionCategoryRepository.getAllInstitutionCategoryList().then((res) => {
            let options = [];
            for (let i = 0; i < res.data.length; i++) {
                options.push({
                    'value': res.data[i].id,
                    'label': res.data[i].nameMk,
                })
            }
            this.setState({
                options: options
            })
        }).catch(err => toast.error(strings.failedToLoadData));
    }

    fetchData = () => {
        this.getInstitutions();
        this.getCategories();
    }
    validateInput = (e) => {
        if (e.target.className.includes("english")) {
            var verified = String.fromCharCode(e.which).match(/[^a-zA-Z-0-9.\s+]/);

            if (verified) {
                e.preventDefault();
            }
        } else if (e.target.className.includes("macedonish")) {
            var verMkd = String.fromCharCode(e.which).match(/[a-zA-Z@#$%^&*()"'!_=+\\\/?><|;:„“‚‘{}\[\]]/);

            if (verMkd) {
                e.preventDefault();
            }
        } else if (e.target.className.includes("postal")) {
            var verPostal = String.fromCharCode(e.which).match(/[^0-9]/);

            if (verPostal) {
                e.preventDefault();
            }
        }
    }
    onChangeHandler = (e) => {
        const target = e.target || e;
        if (target.type === 'checkbox') {
            this.changeBoard();
        }
        let update = this.state.institution;
        update[target.name] = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({entity: update});
    }

    onSelectedTagsChangeHandler = (tags) => {
        this.setState({institution: {...this.state.institution, tags: tags}})
        // var someProperty = {...this.state.institution}
        // for (var i=0; i<tags.length;i++){
        //     somePropertyEdit.tags.push(tags[i]);
        // }
        // this.setState({somePropertyEdit})
    }

    onSelectedCategoryChangeHandler = (category) => {
        if (category !== null) {
            this.setState({
                parentCategoryName: category.label,
                parentCategoryId: parseInt(category.value),
                category: {
                    id: category.value, nameMk: category.label,
                    dateCreated: "18-03-2021 10:27:49",
                    dateUpdated: "18-03-2021 10:27:50",
                    nameAl: category.label
                },
            })
        } else {
            this.setState({
                parentCategoryName: null,
                parentCategoryId: null
            })
        }
    }

    onSelectedParentChangeHandler = (institution) => {
        if (institution !== null) {
            this.setState({
                parentInstitutionName: institution.label,
                parentInstitutionId: institution.value,
                parentInstitution: institution
            })
        } else {
            this.setState({
                parentInstitutionName: null,
                parentInstitutionId: null
            })
        }
    }

    saveAndUpdate = () => {
        if (this.state.category != null) {
            InstitutionRepository.sendSelected(this.state.id, this.state.institution, this.state.category.id).then(res => {
                toast.success(strings.successfullyEditInstitution)
                this.props.history.push("/")
            }).catch(err => {
                if (err.message === "Request failed with status code 406") {
                    alert(strings.enterValidNumber)
                }
                toast.error(strings.failEditInstitution)
            })
        } else if (this.state.parentInstitution != null) {
            InstitutionRepository.sendSelectedWithInstitution(this.state.id, this.state.institution, this.state.parentInstitutionId).then(res => {
                toast.success(strings.successfullyEditInstitution)
                this.props.history.push("/")
            }).catch(err => {
                if (err.message === "Request failed with status code 406") {
                    alert(strings.enterValidNumber)
                }
                toast.error(strings.failEditInstitution)
            })
        }
    }

    render() {
        return (
            <div className="container mt-5">
                {!this.state.institution.edited ? <div className="row">
                        <div className="col-12">
                            <label
                                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameMk}</label>

                            <input
                                required
                                defaultValue={this.state.institution.nameMk}
                                name={"nameMk"}
                                type={"text"}
                                onChange={this.onChangeHandler}
                                onKeyPress={this.validateInput}
                                className="form-control macedonish"
                            />
                        </div>
                        <br/>

                        <div className="col-12">
                            <label
                                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameAl}</label>

                            <input
                                required
                                defaultValue={this.state.institution.nameAl}
                                name={"nameAl"}
                                type={"text"}
                                onChange={this.onChangeHandler}
                                onKeyPress={this.validateInput}
                                className="form-control english"
                            />
                        </div>
                        <br/>

                        <div className="col-12">
                            <label
                                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameEn}</label>

                            <input
                                required
                                defaultValue={this.state.institution.nameEn}
                                name={"nameEn"}
                                type={"text"}
                                onChange={this.onChangeHandler}
                                onKeyPress={this.validateInput}
                                className="form-control english"
                            />
                        </div>
                        <br/>
                        <div className="col-12 mt-3">
                            <label
                                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.addressMk}</label>

                            <input
                                required
                                disabled={true}
                                defaultValue={this.state.institution.addressMk}
                                name={"addressMk"}
                                type={"text"}
                                onChange={this.onChangeHandler}
                                onKeyPress={this.validateInput}
                                className="form-control macedonish"
                            />
                        </div>
                        <br/>

                        <div className="col-12 mt-3">
                            <label
                                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.addressAl}</label>

                            <input
                                required
                                disabled={true}
                                defaultValue={this.state.institution.addressAl}
                                name={"addressAl"}
                                type={"text"}
                                onChange={this.onChangeHandler}
                                onKeyPress={this.validateInput}
                                className="form-control english"
                            />
                        </div>
                        <br/>

                        <div className="col-12 mt-3">
                            <label
                                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.addressEn}</label>

                            <input
                                required
                                disabled={true}
                                defaultValue={this.state.institution.addressEn}
                                name={"addressEn"}
                                type={"text"}
                                onChange={this.onChangeHandler}
                                onKeyPress={this.validateInput}
                                className="form-control english"
                            />
                        </div>
                        <br/>

                        МК
                        <div className="col-12"
                             style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                            <div className="row">
                                <div className="col-2">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.typeStrMk}</label>
                                    <select
                                        name={"typeOfStreetMk"}
                                        className="form-control custom-select"
                                        onChange={this.onChangeHandler}
                                        style={{marginTop: '-2px'}}
                                        value={this.state.institution.typeOfStreetMk}
                                    >
                                        <option value="">{strings.chooseStr}</option>
                                        <option value="Ул">{strings.streetMac}</option>
                                        <option value="Бул">{strings.boulevardMac}</option>
                                    </select>
                                </div>

                                <div className="col-5">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.strMk}</label>

                                    <input
                                        required
                                        defaultValue={this.state.institution.streetMk}
                                        placeholder={""}
                                        name={"streetMk"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        onKeyPress={this.validateInput}
                                        className="form-control mb-3 macedonish"
                                    />
                                </div>

                                <div className="col-1">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.streetNumMk}</label>

                                    <input
                                        required
                                        defaultValue={this.state.institution.streetNumberMk}
                                        placeholder={""}
                                        name={"streetNumberMk"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        className="form-control mb-3"
                                    />
                                </div>

                                <div className="col-4">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.detailsMk}</label>

                                    <input
                                        required
                                        defaultValue={this.state.institution.addressDetailsMk}
                                        placeholder={""}
                                        name={"addressDetailsMk"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        onKeyPress={this.validateInput}
                                        className="form-control mb-3 macedonish"
                                    />
                                </div>

                            </div>
                        </div>

                        <br/>
                        AL
                        <div className="col-12 "
                             style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                            <div className="row">
                                <div className="col-2">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.typeStrAl}</label>
                                    <select
                                        name={"typeOfStreetAl"}
                                        className="form-control custom-select"
                                        onChange={this.onChangeHandler}
                                        style={{marginTop: '-2px'}}
                                        value={this.state.institution.typeOfStreetAl}
                                    >
                                        <option value="">{strings.chooseStr}</option>
                                        <option value="Ul">{strings.streetMac}</option>
                                        <option value="Bul">{strings.boulevardMac}</option>
                                    </select>
                                </div>
                                <div className="col-5">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.strAl}</label>
                                    <input
                                        required
                                        defaultValue={this.state.institution.streetAl}
                                        placeholder={""}
                                        name={"streetAl"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        onKeyPress={this.validateInput}
                                        className="form-control mb-3 english"
                                    />
                                </div>

                                <div className="col-1">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.streetNumMk}</label>

                                    <input
                                        required
                                        defaultValue={this.state.institution.streetNumberMk}
                                        placeholder={""}
                                        name={"streetNumberMk"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        className="form-control mb-3"
                                    />
                                </div>

                                <div className="col-4">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.detailsAl}</label>

                                    <input
                                        required
                                        defaultValue={this.state.institution.addressDetailsAl}
                                        placeholder={""}
                                        name={"addressDetailsAl"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        onKeyPress={this.validateInput}
                                        className="form-control mb-3 english"
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>

                        EN
                        <div className="col-12 "
                             style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                            <div className="row">
                                <div className="col-2">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.typeStrEn}</label>
                                    <select
                                        name={"typeOfStreetEn"}
                                        className="form-control custom-select"
                                        onChange={this.onChangeHandler}
                                        style={{marginTop: '-2px'}}
                                        value={this.state.institution.typeOfStreetEn}
                                    >
                                        <option value="">{strings.chooseStr}</option>
                                        <option value="Str">{strings.streetMac}</option>
                                        <option value="Bou">{strings.boulevardMac}</option>
                                    </select>
                                </div>
                                <div className="col-5">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.strEn}</label>
                                    <input
                                        required
                                        defaultValue={this.state.institution.streetEn}
                                        placeholder={""}
                                        name={"streetEn"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        onKeyPress={this.validateInput}
                                        className="form-control mb-3 english"
                                    />
                                </div>

                                <div className="col-1">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.streetNumMk}</label>

                                    <input
                                        required
                                        defaultValue={this.state.institution.streetNumberMk}
                                        placeholder={""}
                                        name={"streetNumberMk"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        className="form-control mb-3"
                                    />
                                </div>

                                <div className="col-4">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.detailsEn}</label>

                                    <input
                                        required
                                        defaultValue={this.state.institution.addressDetailsEn}
                                        placeholder={""}
                                        name={"addressDetailsEn"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        onKeyPress={this.validateInput}
                                        className="form-control mb-3 english"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 mt-3"
                             style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                            <div className="row">
                                <div className="col-2">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.postCode}</label>

                                    <input
                                        required
                                        defaultValue={this.state.institution.postalCode}
                                        placeholder={""}
                                        name={"postalCode"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        className="form-control mb-3 postal"
                                    />
                                </div>

                                <div className="col-10">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.cityTownMk}</label>

                                    <input
                                        required
                                        defaultValue={this.state.institution.cityMk}
                                        placeholder={""}
                                        name={"cityMk"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        onKeyPress={this.validateInput}
                                        className="form-control mb-3 macedonish"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 mt-3"
                             style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                            <div className="row">

                                <div className="col-6">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.cityTownAl}</label>

                                    <input
                                        required
                                        defaultValue={this.state.institution.cityAl}
                                        placeholder={""}
                                        name={"cityAl"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        onKeyPress={this.validateInput}
                                        className="form-control mb-3 english"
                                    />
                                </div>

                                <div className="col-6">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.cityTownEn}</label>

                                    <input
                                        required
                                        defaultValue={this.state.institution.cityEn}
                                        placeholder={""}
                                        name={"cityEn"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        onKeyPress={this.validateInput}
                                        className="form-control mb-3 english"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 mt-3">
                            <div className="row">
                                <div className="col-9">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.phone}</label>

                                    <input
                                        defaultValue={this.state.institution.institutionPhone}
                                        name={"institutionPhone"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        className="form-control mb-3"
                                    />
                                </div>
                                <div className="col-3">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>

                                    <input
                                        defaultValue={this.state.institution.institutionLocales}
                                        name={"institutionLocales"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        className="form-control mb-3"
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>

                        <div className="col-12 mt-3">
                            <div className="row">
                                <div className="col-9">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.alternativePhone}</label>

                                    <input
                                        defaultValue={this.state.institution.institutionAlternativePhone}
                                        name={"institutionAlternativePhone"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        className="form-control mb-3"
                                    />
                                </div>
                                <div className="col-3">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>

                                    <input
                                        defaultValue={this.state.institution.institutionAlternativeLocales}
                                        name={"institutionAlternativeLocales"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        className="form-control mb-3"
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>

                        <div className="col-12 mt-3">
                            <div className="row">
                                <div className="col-9">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.alternativeSecondPhone}</label>

                                    <input
                                        defaultValue={this.state.institution.institutionAlternativeSecondPhone}
                                        name={"institutionAlternativeSecondPhone"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        className="form-control mb-3"
                                    />
                                </div>
                                <div className="col-3">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>

                                    <input
                                        defaultValue={this.state.institution.institutionAlternativeSecondLocales}
                                        name={"institutionAlternativeSecondLocales"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        className="form-control mb-3"
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>

                        <div className="col-12">
                            <div className="row">
                                <div className="col-10">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.webSite}</label>

                                    <input
                                        defaultValue={this.state.institution.webSite}
                                        name={"webSite"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        className="form-control mb-3"
                                    />
                                </div>
                                <div className="col-2">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10 ml-4">{strings.infoNoticeBoard}</label>

                                    <input
                                        defaultValue={this.state.institution.noticeBoard}
                                        name={"noticeBoard"}
                                        type={"checkbox"}
                                        checked={this.state.noticeBoard}
                                        onChange={this.onChangeHandler}
                                        className="form-control mb-3"
                                    />
                                </div>
                            </div>
                        </div>

                        {strings.fullDirector}
                        <div className="col-12"
                             style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                            <div className="row">
                                <div className="col-12">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.direktorFirstName}</label>

                                    <input
                                        required
                                        defaultValue={this.state.institution.direktorFirstName}
                                        name={"direktorFirstName"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        className="form-control mb-3"
                                    />
                                </div>
                                <div className="col-12">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.direktorLastName}</label>

                                    <input
                                        required
                                        defaultValue={this.state.institution.direktorLastName}
                                        name={"direktorLastName"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        className="form-control mb-3"
                                    />
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-9">
                                            <label
                                                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.direktorPhone}</label>

                                            <input
                                                required
                                                defaultValue={this.state.institution.direktorPhone}
                                                name={"direktorPhone"}
                                                type={"text"}
                                                onChange={this.onChangeHandler}
                                                className="form-control mb-3"
                                            />
                                        </div>
                                        <div className="col-3">
                                            <label
                                                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>

                                            <input
                                                required
                                                defaultValue={this.state.institution.directorLocales}
                                                name={"directorLocales"}
                                                type={"text"}
                                                onChange={this.onChangeHandler}
                                                className="form-control mb-3"
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="col-12">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.direktorEmail}</label>

                                    <input
                                        required
                                        defaultValue={this.state.institution.direktorEmail}
                                        name={"direktorEmail"}
                                        type={"text"}
                                        onChange={this.onChangeHandler}
                                        className="form-control mb-3"
                                    />
                                </div>

                            </div>
                        </div>


                        <div className="col-12 mt-3">
                            <label
                                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.tags}</label>
                        </div>
                        <div className="col-12">
                            <MapEntity
                                groupsUrl="/rest/tag/all" //za da gi zemem tagovite ili kategorija
                                entityUrl={"/rest/institution/selectedTags/{id}"} // za edit gi zema site selektirani za za taa institucija
                                onChange={this.onSelectedTagsChangeHandler}
                                entityId={this.state.institution.id}
                            />

                        </div>
                        <br/>

                        {this.state.category !== undefined && this.state.category !== null ?
                            <div className="col-12 mt-3" style={{marginBottom: '100px'}}>
                                <label
                                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.institutionCat}</label>

                                <Select
                                    placeholder={this.state.parentCategoryName ? this.state.parentCategoryName : " "}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={true}
                                    isRtl={false}
                                    isSearchable={true}
                                    options={this.state.options}
                                    onChange={this.onSelectedCategoryChangeHandler}
                                    name="categoryId"
                                    value={this.state.parentCategoryId}
                                    defaultValue={{
                                        value: this.state.parentCategoryId,
                                        label: this.state.parentCategoryName,
                                    }}
                                />
                            </div>
                            :
                            <div className="col-12 mt-3" style={{marginBottom: '100px'}}>
                                <label
                                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.parentInstitution}</label>
                                <Select
                                    placeholder={this.state.parentInstitutionName ? this.state.parentInstitutionName : " "}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={true}
                                    isRtl={false}
                                    isSearchable={true}
                                    options={this.state.optionsInstitutions}
                                    onChange={this.onSelectedParentChangeHandler}
                                    name="parentInstitutionId"
                                    value={this.state.parentInstitutionId}
                                    defaultValue={{
                                        value: this.state.parentInstitutionId,
                                        label: this.state.parentInstitutionName,
                                    }}
                                />
                            </div>
                        }
                        <div className="col-12 mt-4 mb-4">
                            <button type="button" onClick={this.saveAndUpdate}
                                    className="btn btn-info btn-sm InstitutionAdminActionButton defaultBtn">
                                <FontAwesomeIcon icon={faSave} size="lg" style={{paddingRight: '4px'}}/>
                                {strings.save}
                            </button>
                            <NavLink to="/">
                                <button type="button" className="btn btn-dark btn-sm InstitutionAdminActionButton defaultBtn">
                                    <FontAwesomeIcon icon={faChevronCircleLeft} size="lg" style={{paddingRight: '4px'}}/>
                                    {strings.goBack}
                                </button>
                            </NavLink>
                        </div>
                    </div> :
                    <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                        <InfoPopup infoMessage={strings.institutionAlreadyChanged}/>
                    </div>
                }

            </div>
        )
    }
}

export default MyInstitution;