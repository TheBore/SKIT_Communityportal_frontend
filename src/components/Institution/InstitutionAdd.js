import React, {useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {strings} from "../../Localization/Localization";
import MapEntity from "../Institution/MapEntity";
import Select from "react-select";
import {toast} from "react-toastify";
import InstitutionRepository from "../../repository/InstitutionRepository";
import InstitutionCategoryRepository from "../../repository/InstitutionCategoryRepository";
import $ from 'jquery';

const InstitutionAdd = (props) => {
    strings.setLanguage(localStorage.getItem("activeLanguage"));
    const [institutions, setInstitutions] = useState([]);
    const [listInstitutions, setListInstitutions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [showParent, setShowParent] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [checkedOne, setCheckedOne] = useState(false);

    const onCheckHandler = () => setCheckedOne(!checkedOne);


    const getInstitutions = async () => {
        InstitutionRepository.allActiveInstitutions().then(res => {
            setInstitutions(res.data)
            res.data.map(item => {
                listInstitutions.push({value: item.id, label: item.nameMk, name: "parentInstitutionId"})
            })
        }).catch(err => toast.error(strings.failedToLoadData));
    }
    const getCategories = async () => {
        InstitutionCategoryRepository.getAllInstitutionCategoryList().then(res => {
            setCategories(res.data)
            res.data.map(item => {
                listCategories.push({value: item.id, label: item.nameMk, name: "categoryId"})
            })
        }).catch(err => toast.error(strings.failedToLoadData));
    }
    useEffect(() => {
        getInstitutions();
        getCategories();
    }, []);

    const show = (e) => {
        if (e.target.value === "1") {
            setShowParent(true)
            setShowCategory(false)
        } else {
            setShowParent(false)
            setShowCategory(true)
        }
    }
    const onChangeHandler = (e) => {

        const target = e.target;
        if (target.type === 'checkbox') {
            onCheckHandler();
        }
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        props.onChange(name, value);
    };

    // const onCheckHandler = (e) => {
    //     const target = e.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;
    //     props.onChange([name], value);
    // }

    const onSelectedTagsChangeHandler = (tags) => {
        props.onChange('tags', tags)
    }

    const onSelectedCategoryChangeHandler = (category) => {
        if (category !== null) {
            props.onChange(category.name, category.value)
        } else {
            props.onChange("categoryId", null)
        }
    }
    const onSelectedParentChangeHandler = (institution) => {
        if (institution !== null) {
            props.onChange(institution.name, institution.value)
        } else {
            props.onChange("parentInstitutionId", null)
        }
    }

    $(".english").keypress(function (e) {
        var verified = String.fromCharCode(e.which).match(/[^a-zA-Z-0-9.\s+]/);
        if (verified) {
            e.preventDefault();
        }
    });

    $(".macedonish").keypress(function (e) {
        var verified = String.fromCharCode(e.which).match(/[a-zA-Z@#$%^&*()"'!_=+\\\/?><|;:„“‚‘{}\[\]]/);
        if (verified) {
            e.preventDefault();
        }
    });

    $(".postal").keypress(function (e) {
        var verified = String.fromCharCode(e.which).match(/[^0-9]/);
        if (verified) {
            e.preventDefault();
        }
    });


    return (
        <div className="col-12">
            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                    style={{color: "red"}}>*</small>{strings.nameMk}</label>

                <input
                    placeholder={""}
                    name={"nameMk"}
                    type={"text"}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control mb-3 macedonish"
                />
                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>
            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                    style={{color: "red"}}>*</small>{strings.nameAl}</label>

                <input
                    placeholder={""}
                    name={"nameAl"}
                    type={"text"}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control mb-3 english"
                />
                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>

            <div className="col-12">
               {/* <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                    style={{color: "red"}}>*</small>{strings.nameEn}</label>

                <input
                    placeholder={""}
                    name={"nameEn"}
                    type={"text"}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control mb-3 english"
                />*/}
                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>

            MK
            <div className="col-12" style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                <div className="row">
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.typeStrMk}</label>
                        <select
                            name={"typeOfStreetMk"}
                            className="form-control custom-select mt-3"
                            onChange={(e) => onChangeHandler(e)}
                            style={{marginTop: '-2px'}}
                        >
                            <option value="">{strings.chooseStr}</option>
                            <option value="Ул">{strings.streetMac}</option>
                            <option value="Бул">{strings.boulevardMac}</option>
                        </select>
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    </div>
                    <div className="col-6 mt-3" style={{padding: '0'}}>
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.strMk}</label>

                        <input
                            placeholder={""}
                            name={"streetMk"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 macedonish"
                        />
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    </div>
                    <div className="col-3 mt-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.streetNumMk}</label>

                        <input
                            placeholder={""}
                            name={"streetNumberMk"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}</div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.detailsMk}</label>

                        <input
                            placeholder={""}
                            name={"addressDetailsMk"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 macedonish"
                        />
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.postCode}</label>

                        <input
                            placeholder={""}
                            name={"postalCode"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 postal"
                        />
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    </div>
                    <div className="col-8">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.cityTownMk}</label>

                        <input
                            placeholder={""}
                            name={"cityMk"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 macedonish"
                        />
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    </div>
                </div>
            </div>

            <br/>
            AL
            <div className="col-12" style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                <div className="row">
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.typeStrAl}</label>

                        <select
                            name={"typeOfStreetAl"}
                            className="form-control custom-select mt-3"
                            onChange={(e) => onChangeHandler(e)}
                            style={{marginTop: '-2px'}}
                        >
                            <option value="">{strings.chooseStr}</option>
                            <option value="Ul">{strings.streetMac}</option>
                            <option value="Bul">{strings.boulevardMac}</option>
                        </select>
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    </div>
                    <div className="col-6 mt-3" style={{padding: '0'}}>
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.strAl}</label>
                        <input
                            placeholder={""}
                            name={"streetAl"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 english"
                        />
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    </div>
                    <div className="col-3 mt-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.streetNumMk}</label>

                        <input
                            placeholder={""}
                            name={"streetNumberMk"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.detailsAl}</label>

                        <input
                            placeholder={""}
                            name={"addressDetailsAl"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 english"
                        />
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.postCode}</label>

                        <input
                            placeholder={""}
                            name={"postalCode"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 postal"
                        />
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    </div>
                    <div className="col-8">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.cityTownAl}</label>

                        <input
                            placeholder={""}
                            name={"cityAl"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 english"
                        />
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    </div>
                </div>
            </div>

            <br/>
{/*            EN
            <div className="col-12" style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                <div className="row">
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.typeStrEn}</label>

                        <select
                            name={"typeOfStreetEn"}
                            className="form-control custom-select mt-3"
                            onChange={(e) => onChangeHandler(e)}
                            style={{marginTop: '-2px'}}
                        >
                            <option value="">{strings.chooseStr}</option>
                            <option value="Str">{strings.streetMac}</option>
                            <option value="Bou">{strings.boulevardMac}</option>
                        </select>
                        {props.error &&
                        <div
                            className="alert alert-danger error-msg">{strings.invalidInput}</div>}
                    </div>
                    <div className="col-6 mt-3" style={{padding: '0'}}>
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.strEn}</label>

                        <input
                            placeholder={""}
                            name={"streetEn"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 english"
                        />
                        {props.error &&
                        <div
                            className="alert alert-danger error-msg">{strings.invalidInput}</div>}
                    </div>
                    <div className="col-3 mt-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.streetNumMk}</label>

                        <input
                            placeholder={""}
                            name={"streetNumberMk"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                        {props.error &&
                        <div
                            className="alert alert-danger error-msg">{strings.invalidInput}</div>}</div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.detailsEn}</label>

                        <input
                            placeholder={""}
                            name={"addressDetailsEn"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 english"
                        />
                        {props.error &&
                        <div
                            className="alert alert-danger error-msg">{strings.invalidInput}</div>}
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.postCode}</label>

                        <input
                            placeholder={""}
                            name={"postalCode"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 postal"
                        />
                        {props.error &&
                        <div
                            className="alert alert-danger error-msg">{strings.invalidInput}</div>}
                    </div>
                    <div className="col-8">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.cityTownEn}</label>

                        <input
                            placeholder={""}
                            name={"cityEn"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 english"
                        />
                        {props.error &&
                        <div
                            className="alert alert-danger error-msg">{strings.invalidInput}</div>}
                    </div>
                </div>
            </div>*/}

            <br/>


            <div className="col-12 mt-3">
                <div className="row">
                    <div className="col-9">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.phone}</label>

                        <input
                            placeholder={""}
                            name={"institutionPhone"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                    </div>
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>

                        <input
                            placeholder={""}
                            name={"institutionLocales"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                    </div>
                </div>

                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>
            <br/>

            <div className="col-12 mt-3">
                <div className="row">
                    <div className="col-9">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.alternativePhone}</label>

                        <input
                            placeholder={""}
                            name={"institutionAlternativePhone"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                    </div>
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>

                        <input
                            placeholder={""}
                            name={"institutionAlternativeLocales"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                    </div>
                </div>

                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>
            <br/>

            <div className="col-12 mt-3">
                <div className="row">
                    <div className="col-9">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.alternativeSecondPhone}</label>

                        <input
                            placeholder={""}
                            name={"institutionAlternativeSecondPhone"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                    </div>
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>

                        <input
                            placeholder={""}
                            name={"institutionAlternativeSecondLocales"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                    </div>
                </div>

                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>
            <br/>

            <div className="col-12">
                <div className="row">

                    <div className="col-11">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.webSite}</label>

                        <input
                            placeholder={""}
                            name={"webSite"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                    </div>

                    <div className="col-1">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.infoNoticeBoard}</label>

                        <input
                            name={"noticeBoard"}
                            type={"checkbox"}
                            checked={checkedOne}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                    </div>
                </div>

                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>

            {strings.fullDirector}
            <div className="col-12" style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                <div className="row">
                    <div className="col-12">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.direktorFirstName}</label>

                        <input
                            placeholder={""}
                            name={"direktorFirstName"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    </div>
                    <div className="col-12">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.direktorLastName}</label>

                        <input
                            placeholder={""}
                            name={"direktorLastName"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-9">
                                <label
                                    className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                                    style={{color: "red"}}>*</small>{strings.direktorPhone}</label>

                                <input
                                    placeholder={""}
                                    name={"direktorPhone"}
                                    type={"text"}
                                    onChange={(e) => onChangeHandler(e)}
                                    className="form-control mb-3"
                                />
                            </div>
                            <div className="col-3">
                                <label
                                    className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                                    style={{color: "red"}}>*</small>{strings.localFirst}</label>

                                <input
                                    placeholder={""}
                                    name={"directorLocales"}
                                    type={"text"}
                                    onChange={(e) => onChangeHandler(e)}
                                    className="form-control mb-3"
                                />
                            </div>
                        </div>
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    </div>
                    <div className="col-12">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                            style={{color: "red"}}>*</small>{strings.direktorEmail}</label>

                        <input
                            placeholder={""}
                            name={"direktorEmail"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                        {/*{props.error &&*/}
                        {/*<div*/}
                        {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    </div>
                </div>
            </div>

            <div className="col-12 mt-3">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                    style={{color: "red"}}>*</small>{strings.tags}</label>
            </div>
            <div className="col-12">
                <MapEntity
                    groupsUrl="/rest/tag/all" //za da gi zemem tagovite ili kategorija
                    onChange={onSelectedTagsChangeHandler}
                />
                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>

            <div className="col-12 mt-4">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                    style={{color: "red"}}>*</small>{strings.typeParent}</label>
            </div>
            <div className="col-12">
                <input type="radio" value="1" name="type" onChange={show}/> {strings.institution}
                <input type="radio" value="2" name="type" onChange={show}
                       className="ml-2"/> {strings.institutionCategory}
            </div>
            {/*{props.error &&*/}
            {/*<div*/}
            {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}

            {showCategory === true ?
                <div className="col-12 mt-4">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                        style={{color: "red"}}>*</small>{strings.institutionCat}</label>

                    <Select
                        placeholder={strings.searchForCategories}
                        className="basic-single mb-5"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isSearchable={true}
                        options={listCategories}
                        onChange={onSelectedCategoryChangeHandler}
                        name={"categoryId"}

                    />
                    {props.error &&
                    <div
                        className="alert alert-danger error-msg">{strings.invalidInput}</div>}

                </div> : null}

            {showParent === true ?
                <div className="col-12 mt-4">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                        style={{color: "red"}}>*</small>{strings.parentInstitution}</label>

                    <Select
                        placeholder={strings.searchForInstitution}
                        className="basic-single mb-5"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isSearchable={true}
                        options={listInstitutions}
                        onChange={onSelectedParentChangeHandler}
                        name={"parentInstitutionId"}

                    />
                    {/*{props.error &&*/}
                    {/*<div*/}
                    {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                </div> : null}

            <br/>
            {/*{strings.responsiblePerson}*/}
            {/*<div className="col-12" style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>*/}
            {/*    <div className="row">*/}
            {/*        <div className="col-12">*/}
            {/*            <label*/}
            {/*                className="weight400 text-upper control-label control-label-xl margin-top-10"><small*/}
            {/*                style={{color: "red"}}>*</small>{strings.moderatorFirstName}</label>*/}

            {/*            <input*/}
            {/*                placeholder={""}*/}
            {/*                name={"firstName"}*/}
            {/*                type={"text"}*/}
            {/*                onChange={(e) => onChangeHandler(e)}*/}
            {/*                className="form-control mb-3"*/}
            {/*            />*/}
            {/*            /!*{props.error &&*!/*/}
            {/*            /!*<div*!/*/}
            {/*            /!*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*!/*/}
            {/*        </div>*/}

            {/*        <div className="col-12">*/}
            {/*            <label*/}
            {/*                className="weight400 text-upper control-label control-label-xl margin-top-10"><small*/}
            {/*                style={{color: "red"}}>*</small>{strings.moderatorLastName}</label>*/}

            {/*            <input*/}
            {/*                required*/}
            {/*                placeholder={""}*/}
            {/*                name={"lastName"}*/}
            {/*                type={"text"}*/}
            {/*                onChange={(e) => onChangeHandler(e)}*/}
            {/*                className="form-control mb-3"*/}
            {/*            />*/}
            {/*            /!*{props.error &&*!/*/}
            {/*            /!*<div*!/*/}
            {/*            /!*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*!/*/}
            {/*        </div>*/}

            {/*        <div className="col-12">*/}
            {/*            <label*/}
            {/*                className="weight400 text-upper control-label control-label-xl margin-top-10"><small*/}
            {/*                style={{color: "red"}}>*</small>{strings.moderatorEmail}</label>*/}
            {/*            <input*/}
            {/*                placeholder={""}*/}
            {/*                name={"email"}*/}
            {/*                type={"email"}*/}
            {/*                onChange={(e) => onChangeHandler(e)}*/}
            {/*                className="form-control mb-3"*/}
            {/*            />*/}
            {/*            /!*{props.error &&*!/*/}
            {/*            /!*<div*!/*/}
            {/*            /!*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*!/*/}
            {/*        </div>*/}
            {/*        <div className="col-12">*/}
            {/*            <label*/}
            {/*                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.moderatorSecond}</label>*/}
            {/*            <input*/}
            {/*                placeholder={""}*/}
            {/*                name={"alternativeEmail"}*/}
            {/*                type={"email"}*/}
            {/*                onChange={(e) => onChangeHandler(e)}*/}
            {/*                className="form-control mb-3"*/}
            {/*            />*/}
            {/*            /!*{props.error &&*!/*/}
            {/*            /!*<div*!/*/}
            {/*            /!*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*!/*/}
            {/*        </div>*/}
            {/*        <div className="col-12">*/}
            {/*            <label*/}
            {/*                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.moderatorThird}</label>*/}
            {/*            <input*/}
            {/*                placeholder={""}*/}
            {/*                name={"alternativeSecondEmail"}*/}
            {/*                type={"email"}*/}
            {/*                onChange={(e) => onChangeHandler(e)}*/}
            {/*                className="form-control mb-3"*/}
            {/*            />*/}
            {/*            /!*{props.error &&*!/*/}
            {/*            /!*<div*!/*/}
            {/*            /!*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*!/*/}
            {/*        </div>*/}
            {/*        <div className="col-12">*/}
            {/*            <label*/}
            {/*                className="weight400 text-upper control-label control-label-xl margin-top-10"><small*/}
            {/*                style={{color: "red"}}>*</small>{strings.password}</label>*/}
            {/*            <input*/}
            {/*                required*/}
            {/*                placeholder={""}*/}
            {/*                name={"password"}*/}
            {/*                type={"password"}*/}
            {/*                onChange={(e) => onChangeHandler(e)}*/}
            {/*                className="form-control mb-3"*/}
            {/*            />*/}
            {/*            /!*{props.error &&*!/*/}
            {/*            /!*<div*!/*/}
            {/*            /!*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*!/*/}
            {/*        </div>*/}
            {/*        <div className="col-12">*/}
            {/*            <div className="row">*/}
            {/*                <div className="col-9">*/}
            {/*                    <label*/}
            {/*                        className="weight400 text-upper control-label control-label-xl margin-top-10"><small*/}
            {/*                        style={{color: "red"}}>*</small>{strings.moderatorPhone}</label>*/}

            {/*                    <input*/}
            {/*                        placeholder={""}*/}
            {/*                        name={"moderatorPhone"}*/}
            {/*                        type={"text"}*/}
            {/*                        onChange={(e) => onChangeHandler(e)}*/}
            {/*                        className="form-control mb-3"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*                <div className="col-3">*/}
            {/*                    <label*/}
            {/*                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>*/}

            {/*                    <input*/}
            {/*                        placeholder={""}*/}
            {/*                        name={"locales"}*/}
            {/*                        type={"text"}*/}
            {/*                        onChange={(e) => onChangeHandler(e)}*/}
            {/*                        className="form-control mb-3"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            /!*{props.error &&*!/*/}
            {/*            /!*<div*!/*/}
            {/*            /!*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*!/*/}
            {/*        </div>*/}
            {/*        <br/>*/}

            {/*        <div className="col-12">*/}
            {/*            <div className="row">*/}
            {/*                <div className="col-9">*/}
            {/*                    <label*/}
            {/*                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.moderatorAlternativePhone}</label>*/}

            {/*                    <input*/}
            {/*                        placeholder={""}*/}
            {/*                        name={"moderatorAlternativePhone"}*/}
            {/*                        type={"text"}*/}
            {/*                        onChange={(e) => onChangeHandler(e)}*/}
            {/*                        className="form-control mb-3"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*                <div className="col-3">*/}
            {/*                    <label*/}
            {/*                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>*/}

            {/*                    <input*/}
            {/*                        placeholder={""}*/}
            {/*                        name={"alternativeLocales"}*/}
            {/*                        type={"text"}*/}
            {/*                        onChange={(e) => onChangeHandler(e)}*/}
            {/*                        className="form-control mb-3"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            /!*{props.error &&*!/*/}
            {/*            /!*<div*!/*/}
            {/*            /!*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*!/*/}
            {/*        </div>*/}
            {/*        <br/>*/}

            {/*        <div className="col-12">*/}
            {/*            <div className="row">*/}
            {/*                <div className="col-9">*/}
            {/*                    <label*/}
            {/*                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.moderatorAlternativeSecondPhone}</label>*/}

            {/*                    <input*/}
            {/*                        placeholder={""}*/}
            {/*                        name={"moderatorAlternativeSecondPhone"}*/}
            {/*                        type={"text"}*/}
            {/*                        onChange={(e) => onChangeHandler(e)}*/}
            {/*                        className="form-control mb-3"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*                <div className="col-3">*/}
            {/*                    <label*/}
            {/*                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>*/}

            {/*                    <input*/}
            {/*                        placeholder={""}*/}
            {/*                        name={"alternativeSecondLocales"}*/}
            {/*                        type={"text"}*/}
            {/*                        onChange={(e) => onChangeHandler(e)}*/}
            {/*                        className="form-control mb-3"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            /!*{props.error &&*!/*/}
            {/*            /!*<div*!/*/}
            {/*            /!*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*!/*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    );
};
export default InstitutionAdd;
