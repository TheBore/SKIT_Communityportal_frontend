import React, {useState, useEffect} from "react";
import {strings} from "../../Localization/Localization";
import Select from 'react-select';
import MapEntity from "./MapEntity";
import './css/InstitutionEdited.css';


const InstitutionEditedFields = (props) => {
    strings.setLanguage(localStorage.getItem("activeLanguage"));
    const [institutions, setInstitutions] = useState([]);
    const [listInstitutions, setListInstitutions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [listCategories, setListCategories] = useState([]);

    return (
        <div className="col-12">

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameMk}</label>

                <input disabled
                       required
                       defaultValue={props.entity.nameMk}
                       name={"nameMk"}
                       type={"text"}
                       className="form-control"
                />
            </div>
            <br/>

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameAl}</label>

                <input disabled
                       required
                       defaultValue={props.entity.nameAl}
                       name={"nameAl"}
                       type={"text"}
                       className="form-control"
                />
            </div>
            <br/>

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameEn}</label>

                <input disabled
                       required
                       defaultValue={props.entity.nameEn}
                       name={"nameEn"}
                       type={"text"}
                       className="form-control"
                />
            </div>
            <br/>

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.addressMk}</label>

                <input disabled
                       required
                       defaultValue={props.entity.addressMk}
                       name={"addressMk"}
                       type={"text"}
                       className="form-control"
                />
            </div>
            <br/>

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.addressAl}</label>

                <input disabled
                       required
                       defaultValue={props.entity.addressAl}
                       name={"addressAl"}
                       type={"text"}
                       className="form-control"
                />
            </div>
            <br/>

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.addressEn}</label>

                <input disabled
                       required
                       defaultValue={props.entity.addressEn}
                       name={"addressEn"}
                       type={"text"}
                       className="form-control"
                />
            </div>
            <br/>


            MK
            <div className="col-12" style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                <div className="row">
                    <div className="col-3 mt-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.typeStrMk}</label>

                        <input
                            required
                            disabled
                            defaultValue={props.entity.typeOfStreetMk}
                            placeholder={""}
                            name={"typeOfStreetMk"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                    <div className="col-9 mt-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.strMk}</label>

                        <input
                            required
                            disabled
                            defaultValue={props.entity.streetMk}
                            placeholder={""}
                            name={"streetMk"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                </div>

                <div className="row mt-1">
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.streetNumMk}</label>
                        <input
                            required
                            disabled
                            defaultValue={props.entity.streetNumberMk}
                            placeholder={""}
                            name={"streetNumberMk"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                    <div className="col-9">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.detailsMk}</label>

                        <input
                            required
                            disabled
                            defaultValue={props.entity.addressDetailsMk}
                            placeholder={""}
                            name={"addressDetailsMk"}
                            type={"text"}
                            className="form-control mb-3"
                        />
                    </div>
                </div>

                <div className="row mt-1">
                    <div className="col-4">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.postCode}</label>

                        <input
                            required
                            disabled
                            defaultValue={props.entity.postalCode}
                            placeholder={""}
                            name={"postalCode"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                    <div className="col-8">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.cityTownMk}</label>

                        <input
                            required
                            disabled
                            defaultValue={props.entity.cityMk}
                            placeholder={""}
                            name={"cityMk"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                </div>

            </div>

            <br/>
            AL
            <div className="col-12" style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                <div className="row">
                    <div className="col-3 mt-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.typeStrAl}</label>

                        <input
                            required
                            disabled
                            defaultValue={props.entity.typeOfStreetAl}
                            placeholder={""}
                            name={"typeOfStreetAl"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                    <div className="col-9 mt-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.strAl}</label>

                        <input
                            required
                            disabled
                            defaultValue={props.entity.streetAl}
                            placeholder={""}
                            name={"streetAl"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                </div>

                <div className="row mt-1">
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.streetNumMk}</label>
                        <input
                            required
                            disabled
                            defaultValue={props.entity.streetNumberMk}
                            placeholder={""}
                            name={"streetNumberMk"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                    <div className="col-9">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.detailsAl}</label>

                        <input
                            required
                            disabled
                            defaultValue={props.entity.addressDetailsAl}
                            placeholder={""}
                            name={"addressDetailsAl"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                </div>

                <div className="row mt-1">
                    <div className="col-4">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.postCode}</label>

                        <input
                            disabled
                            required
                            defaultValue={props.entity.postalCode}
                            placeholder={""}
                            name={"postalCode"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                    <div className="col-8">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.cityTownAl}</label>

                        <input
                            disabled
                            required
                            defaultValue={props.entity.cityAl}
                            placeholder={""}
                            name={"cityAl"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                </div>
            </div>

            EN
            <div className="col-12" style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                <div className="row">
                    <div className="col-3 mt-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.typeStrEn}</label>

                        <input
                            required
                            disabled
                            defaultValue={props.entity.typeOfStreetEn}
                            placeholder={""}
                            name={"typeOfStreetEn"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                    <div className="col-9 mt-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.strEn}</label>

                        <input
                            required
                            disabled
                            defaultValue={props.entity.streetEn}
                            placeholder={""}
                            name={"streetEn"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                </div>

                <div className="row mt-1">
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.streetNumMk}</label>
                        <input
                            required
                            disabled
                            defaultValue={props.entity.streetNumberMk}
                            placeholder={""}
                            name={"streetNumberMk"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                    <div className="col-9">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.detailsEn}</label>

                        <input
                            required
                            disabled
                            defaultValue={props.entity.addressDetailsEn}
                            placeholder={""}
                            name={"addressDetailsEn"}
                            type={"text"}
                            className="form-control mb-3"
                        />
                    </div>
                </div>

                <div className="row mt-1">
                    <div className="col-4">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.postCode}</label>

                        <input
                            required
                            disabled
                            defaultValue={props.entity.postalCode}
                            placeholder={""}
                            name={"postalCode"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                    <div className="col-8">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.cityTownEn}</label>

                        <input
                            required
                            disabled
                            defaultValue={props.entity.cityEn}
                            placeholder={""}
                            name={"cityEn"}
                            type={"text"}

                            className="form-control mb-3"
                        />
                    </div>
                </div>

            </div>

            <br/>

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.phone}</label>

                <input disabled
                       required
                       defaultValue={props.entity.institutionPhone}
                       name={"institutionPhone"}
                       type={"text"}
                       className="form-control mb-3"
                />
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-11">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.webSite}</label>

                        <input disabled
                               required
                               defaultValue={props.entity.webSite}
                               name={"webSite"}
                               type={"text"}
                               className="form-control mb-3"
                        />
                    </div>
                    <div className="col-1">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.infoNoticeBoard}</label>

                        <input disabled
                               defaultValue={props.entity.noticeBoard}
                               name={"noticeBoard"}
                               type={"checkbox"}
                               checked={props.entity.noticeBoard}
                               className="form-control mb-3"
                        />
                    </div>
                </div>

            </div>

            {strings.fullDirector}
            <div className="col-12" style={{border: '1px solid lightgray', borderRadius: '25px', paddingTop: '10px'}}>
                <div className="row">
                    <div className="col-12">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.direktorFirstName}</label>

                        <input disabled
                               required
                               defaultValue={props.entity.direktorFirstName}
                               name={"direktorFirstName"}
                               type={"text"}
                               className="form-control mb-3"
                        />
                    </div>
                    <div className="col-12">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.direktorLastName}</label>

                        <input disabled
                               required
                               defaultValue={props.entity.direktorLastName}
                               name={"direktorLastName"}
                               type={"text"}
                               className="form-control mb-3"
                        />
                    </div>
                    <div className="col-12">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.direktorPhone}</label>

                        <input disabled
                               required
                               defaultValue={props.entity.direktorPhone}
                               name={"direktorPhone"}
                               type={"text"}
                               className="form-control mb-3"
                        />
                    </div>
                    <div className="col-12">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.direktorEmail}</label>

                        <input disabled
                               required
                               defaultValue={props.entity.direktorEmail}
                               name={"direktorEmail"}
                               type={"text"}
                               className="form-control mb-3"
                        />
                    </div>

                </div>
            </div>


            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.tags}</label>
            </div>
            <div className="col-12">
                <MapEntity
                    className="disabled"
                    groupsUrl="/rest/tag/all" //za da gi zemem tagovite ili kategorija
                    entityUrl={"/rest/institution/selectedTags/{id}"} // za edit gi zema site selektirani za za taa institucija
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
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={true}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isSearchable={true}
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
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={true}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isSearchable={true}
                        name={"parentInstitutionId"}
                        defaultValue={props.entity.parentInstitution !== null && props.entity.parentInstitution !== undefined ? {
                            value: props.entity.parentInstitution.id,
                            label: props.entity.parentInstitution.nameMk,
                            name: "parentInstitution"
                        } : ""}

                    />
                </div>
            }
        </div>

    );
};
export default InstitutionEditedFields;
