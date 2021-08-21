import React, {useState, useEffect} from "react";
import {strings} from "../../Localization/Localization";
import InstitutionCategoryRepository from "../../repository/InstitutionCategoryRepository";
import {toast} from "react-toastify";
import Select from 'react-select';
import InstitutionRepository from "../../repository/InstitutionRepository";
import MapEntity from "./MapEntity";
import $ from "jquery";


const EditInstitutionNew = (props) => {
    strings.setLanguage(localStorage.getItem("activeLanguage"));
    const [institutions, setInstitutions] = useState([]);
    const [listInstitutions, setListInstitutions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [listCategories, setListCategories] = useState([]);
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

    const onSelectedParentChangeHandler = (institution) => {
        if (institution !== null) {
            props.onChange(institution.name, institution.value)
        } else {
            props.onChange("parentInstitutionId", null)
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

    const onSelectedCategoryChangeHandler = (category) => {
        if (category !== null) {
            props.onChange(category.name, category.value)
        } else {
            props.onChange("categoryId", null)
        }
    }
    const onSelectedTagsChangeHandler = (tags) => {
        props.onChange('tags', tags)
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
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameMk}</label>

                <input
                    required
                    defaultValue={props.entity.nameMk}
                    name={"nameMk"}
                    type={"text"}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control macedonish"
                />
            </div>
            <br/>
            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameAl}</label>

                <input
                    required
                    defaultValue={props.entity.nameAl}
                    name={"nameAl"}
                    type={"text"}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control english"
                />
            </div>

            <br/>
            <div className="col-12">
     {/*           <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameEn}</label>

                <input
                    required
                    defaultValue={props.entity.nameEn}
                    name={"nameEn"}
                    type={"text"}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control english"
                />*/}
            </div>

            <br/>
            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.addressMk}</label>

                <input
                    required
                    disabled={true}
                    defaultValue={props.entity.addressMk}
                    name={"addressMk"}
                    type={"text"}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control macedonish"
                />
            </div>

            <br/>
            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.addressAl}</label>

                <input
                    required
                    disabled={true}
                    defaultValue={props.entity.addressAl}
                    name={"addressAl"}
                    type={"text"}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control english"
                />
            </div>

            <br/>
            <div className="col-12">
   {/*             <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.addressEn}</label>

                <input
                    required
                    disabled={true}
                    defaultValue={props.entity.addressEn}
                    name={"addressEn"}
                    type={"text"}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control english"
                />*/}
            </div>

            <br/>
            МК
            <div className="col-12" style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                <div className="row">
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.typeStrMk}</label>

                        <select
                            name={"typeOfStreetMk"}
                            className="form-control custom-select mt-3"
                            onChange={(e) => onChangeHandler(e)}
                            style={{marginTop: '-2px'}}
                            defaultValue={props.entity.typeOfStreetMk}
                        >
                            <option value="">{strings.chooseStr}</option>
                            <option value="Ул">{strings.streetMac}</option>
                            <option value="Бул">{strings.boulevardMac}</option>
                        </select>
                    </div>

                    <div className="col-6 mt-3" style={{padding: 0}}>
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.strMk}</label>
                        <input
                            required
                            defaultValue={props.entity.streetMk}
                            placeholder={""}
                            name={"streetMk"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 macedonish"
                        />
                    </div>

                    <div className="col-3 mt-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.streetNumMk}</label>

                        <input
                            required
                            defaultValue={props.entity.streetNumberMk}
                            placeholder={""}
                            name={"streetNumberMk"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.detailsMk}</label>

                        <input
                            required
                            defaultValue={props.entity.addressDetailsMk}
                            placeholder={""}
                            name={"addressDetailsMk"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 macedonish"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.postCode}</label>

                        <input
                            required
                            defaultValue={props.entity.postalCode}
                            placeholder={""}
                            name={"postalCode"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 postal"
                        />
                    </div>

                    <div className="col-8">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.cityTownMk}</label>

                        <input
                            required
                            defaultValue={props.entity.cityMk}
                            placeholder={""}
                            name={"cityMk"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 macedonish"
                        />
                    </div>
                </div>
            </div>

            <br/>
            AL
            <div className="col-12" style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                <div className="row">
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.typeStrAl}</label>

                        <select
                            name={"typeOfStreetAl"}
                            className="form-control custom-select mt-3"
                            onChange={(e) => onChangeHandler(e)}
                            style={{marginTop: '-2px'}}
                            defaultValue={props.entity.typeOfStreetAl}
                        >
                            <option value="">{strings.chooseStr}</option>
                            <option value="Ul">{strings.streetMac}</option>
                            <option value="Bul">{strings.boulevardMac}</option>
                        </select>
                    </div>

                    <div className="col-6 mt-3" style={{padding: 0}}>
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.strAl}</label>
                        <input
                            required
                            defaultValue={props.entity.streetAl}
                            placeholder={""}
                            name={"streetAl"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 english"
                        />
                    </div>

                    <div className="col-3 mt-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.streetNumMk}</label>
                        <input
                            required
                            defaultValue={props.entity.streetNumberMk}
                            placeholder={""}
                            name={"streetNumberMk"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.detailsAl}</label>

                        <input
                            required
                            defaultValue={props.entity.addressDetailsAl}
                            placeholder={""}
                            name={"addressDetailsAl"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 english"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.postCode}</label>

                        <input
                            required
                            defaultValue={props.entity.postalCode}
                            placeholder={""}
                            name={"postalCode"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 postal"
                        />
                    </div>

                    <div className="col-8">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.cityTownAl}</label>

                        <input
                            required
                            defaultValue={props.entity.cityAl}
                            placeholder={""}
                            name={"cityAl"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 english"
                        />
                    </div>
                </div>
            </div>

            <br/>
           {/* EN
            <div className="col-12" style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                <div className="row">
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.typeStrEn}</label>

                        <select
                            name={"typeOfStreetEn"}
                            required
                            className="form-control custom-select mt-3"
                            onChange={(e) => onChangeHandler(e)}
                            style={{marginTop: '-2px'}}
                            defaultValue={props.entity.typeOfStreetEn}
                        >
                            <option value="">{strings.chooseStr}</option>
                            <option value="Str">{strings.streetMac}</option>
                            <option value="Bou">{strings.boulevardMac}</option>
                        </select>
                    </div>

                    <div className="col-6 mt-3" style={{padding: 0}}>
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.strEn}</label>
                        <input
                            required
                            defaultValue={props.entity.streetEn}
                            placeholder={""}
                            name={"streetEn"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 english"
                        />
                    </div>

                    <div className="col-3 mt-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.streetNumMk}</label>

                        <input
                            required
                            defaultValue={props.entity.streetNumberMk}
                            placeholder={""}
                            name={"streetNumberMk"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.detailsEn}</label>

                        <input
                            required
                            defaultValue={props.entity.addressDetailsEn}
                            placeholder={""}
                            name={"addressDetailsEn"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 english"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.postCode}</label>

                        <input
                            required
                            defaultValue={props.entity.postalCode}
                            placeholder={""}
                            name={"postalCode"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 postal"
                        />
                    </div>

                    <div className="col-8">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.cityTownEn}</label>

                        <input
                            required
                            defaultValue={props.entity.cityEn}
                            placeholder={""}
                            name={"cityEn"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3 english"
                        />
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
                            defaultValue={props.entity.institutionPhone}
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
                            defaultValue={props.entity.institutionLocales}
                            name={"institutionLocales"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                    </div>
                </div>

            </div>

            <div className="col-12 mt-3">
                <div className="row">
                    <div className="col-9">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.alternativePhone}</label>

                        <input
                            defaultValue={props.entity.institutionAlternativePhone}
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
                            defaultValue={props.entity.institutionAlternativeLocales}
                            name={"institutionAlternativeLocales"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                    </div>
                </div>

            </div>

            <div className="col-12 mt-3">
                <div className="row">
                    <div className="col-9">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.alternativeSecondPhone}</label>

                        <input
                            defaultValue={props.entity.institutionAlternativeSecondPhone}
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
                            defaultValue={props.entity.institutionAlternativeSecondLocales}
                            name={"institutionAlternativeSecondLocales"}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                    </div>
                </div>

            </div>


            <div className="col-12">
                <div className="row">
                    <div className="col-11">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.webSite}</label>

                        <input
                            defaultValue={props.entity.webSite}
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
                            defaultValue={props.entity.noticeBoard}
                            name={"noticeBoard"}
                            type={"checkbox"}
                            checked={props.entity.noticeBoard}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                    </div>
                </div>

            </div>

            {strings.fullDirector}
            <div className="row" style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                <div className="col-12">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.direktorFirstName}</label>

                    <input
                        defaultValue={props.entity.direktorFirstName}
                        name={"direktorFirstName"}
                        type={"text"}
                        onChange={(e) => onChangeHandler(e)}
                        className="form-control mb-3"
                    />
                </div>
                <div className="col-12">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.direktorLastName}</label>

                    <input
                        defaultValue={props.entity.direktorLastName}
                        name={"direktorLastName"}
                        type={"text"}
                        onChange={(e) => onChangeHandler(e)}
                        className="form-control mb-3"
                    />
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-9">
                            <label
                                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.direktorPhone}</label>

                            <input
                                defaultValue={props.entity.direktorPhone}
                                name={"direktorPhone"}
                                type={"text"}
                                onChange={(e) => onChangeHandler(e)}
                                className="form-control mb-3"
                            />
                        </div>
                        <div className="col-3">
                            <label
                                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>

                            <input
                                defaultValue={props.entity.directorLocales}
                                name={"directorLocales"}
                                type={"text"}
                                onChange={(e) => onChangeHandler(e)}
                                className="form-control mb-3"
                            />
                        </div>
                    </div>

                </div>
                <div className="col-12">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.direktorEmail}</label>

                    <input
                        defaultValue={props.entity.direktorEmail}
                        name={"direktorEmail"}
                        type={"text"}
                        onChange={(e) => onChangeHandler(e)}
                        className="form-control mb-3"
                    />
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
                    onChange={onSelectedTagsChangeHandler}
                    entityId={props.entity.id}
                />

            </div>
            <br/>

            {props.entity.category !== undefined && props.entity.category !== null ?
                <div className="col-12">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.institutionCat}</label>

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
                        defaultValue={props.entity.category !== null && props.entity.category !== undefined ? {
                            value: props.entity.category.id,
                            label: props.entity.category.nameMk,
                            name: "category"
                        } : ""}
                    />
                </div>
                :
                <div className="col-12">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.parentInstitution}</label>

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
                        defaultValue={props.entity.parentInstitution !== null && props.entity.parentInstitution !== undefined ? {
                            value: props.entity.parentInstitution.id,
                            label: props.entity.parentInstitution.nameMk,
                            name: "parentInstitution"
                        } : ""}

                    />
                </div>
            }

            <br/>
            {/*{strings.responsiblePerson}*/}
            {/*<div className="row" style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>*/}
            {/*    <div className="col-12">*/}
            {/*        <label*/}
            {/*            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.moderatorFirstName}</label>*/}

            {/*        <input*/}
            {/*            defaultValue={props.entity.firstName}*/}
            {/*            name={"firstName"}*/}
            {/*            type={"text"}*/}
            {/*            onChange={(e) => onChangeHandler(e)}*/}
            {/*            className="form-control mb-3"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className="col-12">*/}
            {/*        <label*/}
            {/*            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.moderatorLastName}</label>*/}

            {/*        <input*/}
            {/*            name={"lastName"}*/}
            {/*            defaultValue={props.entity.lastName}*/}
            {/*            type={"text"}*/}
            {/*            onChange={(e) => onChangeHandler(e)}*/}
            {/*            className="form-control mb-3"*/}
            {/*            required*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className="col-12">*/}
            {/*        <label*/}
            {/*            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.moderatorEmail}</label>*/}

            {/*        <input*/}
            {/*            name={"email"}*/}
            {/*            defaultValue={props.entity.email}*/}
            {/*            type={"email"}*/}
            {/*            onChange={(e) => onChangeHandler(e)}*/}
            {/*            className="form-control mb-3"*/}
            {/*            required*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    <div className="col-12">*/}
            {/*        <label*/}
            {/*            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.moderatorSecond}</label>*/}

            {/*        <input*/}
            {/*            name={"alternativeEmail"}*/}
            {/*            defaultValue={props.entity.alternativeEmail}*/}
            {/*            type={"email"}*/}
            {/*            onChange={(e) => onChangeHandler(e)}*/}
            {/*            className="form-control mb-3"*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    <div className="col-12">*/}
            {/*        <label*/}
            {/*            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.moderatorThird}</label>*/}

            {/*        <input*/}
            {/*            name={"alternativeSecondEmail"}*/}
            {/*            defaultValue={props.entity.alternativeSecondEmail}*/}
            {/*            type={"email"}*/}
            {/*            onChange={(e) => onChangeHandler(e)}*/}
            {/*            className="form-control mb-3"*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    <div className="col-12">*/}
            {/*        <label*/}
            {/*            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.password}</label>*/}

            {/*        <input*/}
            {/*            name={"password"}*/}
            {/*            defaultValue={props.entity.password}*/}
            {/*            type={"password"}*/}
            {/*            onChange={(e) => onChangeHandler(e)}*/}
            {/*            className="form-control mb-3"*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    <div className="col-12">*/}
            {/*        <div className="row">*/}
            {/*            <div className="col-9">*/}
            {/*                <label*/}
            {/*                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.moderatorPhone}</label>*/}

            {/*                <input*/}
            {/*                    defaultValue={props.entity.moderatorPhone}*/}
            {/*                    name={"moderatorPhone"}*/}
            {/*                    type={"text"}*/}
            {/*                    onChange={(e) => onChangeHandler(e)}*/}
            {/*                    className="form-control mb-3"*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <div className="col-3">*/}
            {/*                <label*/}
            {/*                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>*/}

            {/*                <input*/}
            {/*                    defaultValue={props.entity.locales}*/}
            {/*                    name={"locales"}*/}
            {/*                    type={"text"}*/}
            {/*                    onChange={(e) => onChangeHandler(e)}*/}
            {/*                    className="form-control mb-3"*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <br/>*/}

            {/*    <div className="col-12">*/}
            {/*        <div className="row">*/}
            {/*            <div className="col-9">*/}
            {/*                <label*/}
            {/*                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.moderatorAlternativePhone}</label>*/}

            {/*                <input*/}
            {/*                    defaultValue={props.entity.moderatorAlternativePhone}*/}
            {/*                    name={"moderatorAlternativePhone"}*/}
            {/*                    type={"text"}*/}
            {/*                    onChange={(e) => onChangeHandler(e)}*/}
            {/*                    className="form-control mb-3"*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <div className="col-3">*/}
            {/*                <label*/}
            {/*                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>*/}

            {/*                <input*/}
            {/*                    defaultValue={props.entity.alternativeLocales}*/}
            {/*                    name={"alternativeLocales"}*/}
            {/*                    type={"text"}*/}
            {/*                    onChange={(e) => onChangeHandler(e)}*/}
            {/*                    className="form-control mb-3"*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*    <br/>*/}

            {/*    <div className="col-12">*/}
            {/*        <div className="row">*/}
            {/*            <div className="col-9">*/}
            {/*                <label*/}
            {/*                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.moderatorAlternativeSecondPhone}</label>*/}

            {/*                <input*/}
            {/*                    defaultValue={props.entity.moderatorAlternativeSecondPhone}*/}
            {/*                    name={"moderatorAlternativeSecondPhone"}*/}
            {/*                    type={"text"}*/}
            {/*                    onChange={(e) => onChangeHandler(e)}*/}
            {/*                    className="form-control mb-3"*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <div className="col-3">*/}
            {/*                <label*/}
            {/*                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>*/}

            {/*                <input*/}
            {/*                    defaultValue={props.entity.alternativeSecondLocales}*/}
            {/*                    name={"alternativeSecondLocales"}*/}
            {/*                    type={"text"}*/}
            {/*                    onChange={(e) => onChangeHandler(e)}*/}
            {/*                    className="form-control mb-3"*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*</div>*/}

        </div>

    );
};
export default EditInstitutionNew;
