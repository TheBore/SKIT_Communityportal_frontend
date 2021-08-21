import React, {useState, useEffect} from "react";
import InstitutionRepository from "../../repository/InstitutionRepository";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {strings} from "../../Localization/Localization";
import Select from "react-select";
import AreaOfInterestRepository from "../../repository/AreaOfInterestRepository";

const UserAdd = (props) => {
        strings.setLanguage(localStorage.getItem("activeLanguage"));

        const onChangeHandler = (e) => {
            const value = e.target.value;
            const name = e.target.name;

            if(validation[name] !== undefined){
                validation[name].error = value === null || value === '';
            }

            props.onChange(name, value);
        };

        const [validation] = useState([]);

        const [institutions, setInstitutions] = useState([]);
        const [listInstitutions, setListInstitutions] = useState([]);
        const [selectedInstitutionValue, setSelectedInstitutionValue] = useState([]);

        const [areasOfInterest, setAreasOfInterest] = useState([])
        const [listOfAreas, setListOfAreas] = useState([])

        const [selectedAreaValue, setSelectedAreaValue] = useState([]);

        // async function fetchData() {
        //     InstitutionRepository.getAllInstitutions().then(res => {
        //         setInstitutions(res.data)
        //     }).catch(err => toast.error(strings.failedToLoadData));
        // }

        const getInstitutions = async () => {
            InstitutionRepository.allActiveInstitutions().then(res => {
                setInstitutions(res.data)
                res.data.map(item => {
                    listInstitutions.push({value: item.id, label: item.nameMk, name: "institution_id"})
                })
            }).catch(err => toast.error(strings.failedToLoadData));
        }

        const getAreasOfInterest = () => {
            AreaOfInterestRepository.findAllActive().then(res => {
                setAreasOfInterest(res.data)

                res.data.map(item => {
                    listOfAreas.push({value: item.id, label: item.nameMk, name: "areasOfInterest_ids"})
                })
            })
        }

        const onSelectedInstitutionHandle = (institution) => {
            if (institution !== null && institution.type !== "blur") {
                props.onChange(institution.name, institution.value)
                validation["institution_id"].error = false
                setSelectedInstitutionValue(institution)
            } else {
                if(institution === null || selectedInstitutionValue === null){
                    props.onChange("institution_id", null)
                    validation["institution_id"].error = true
                    setSelectedInstitutionValue(null)
                }
            }
        }

        const handleAreasChange = (areasOfInterest) => {
            if(areasOfInterest != null){
                props.onChange("areasOfInterest_ids", Array.isArray(areasOfInterest) ? areasOfInterest.map(x => x.value) : [])
                validation["areasOfInterest_ids"].error = false
            }
            else{
                props.onChange("areasOfInterest_ids", null);
                validation["areasOfInterest_ids"].error = true
            }
            setSelectedAreaValue(Array.isArray(areasOfInterest) ? areasOfInterest.map(x => x.value) : []);
        }

        const setValidationErrors = () => {
            validation["email"]=({error: false, name: 'email', message: strings.pleaseFillInTheEmail})
            validation["password"]=({error: false, name: 'password', message: strings.pleaseFillInThePassword})
            validation["firstName"]=({error: false, name: 'firstName', message: strings.pleaseFillInFirstName})
            validation["lastName"]=({error: false, name: 'lastName', message: strings.pleaseFillInLastName})
            validation["phone"]=({error: false, name: 'phone', message: strings.pleaseFillInTelNumber})
            validation["locales"]=({error: false, name: 'locales', message: strings.pleaseFillInLocal})
            validation["institution_id"]=({error: false, name: 'institution_id', message: strings.pleaseFillInInstitution})
            validation["role"]=({error: false, name: 'role', message: strings.pleaseFillInTypeOfUser})
            validation["areasOfInterest_ids"]=({error: false, name: 'areasOfInterest_ids', message: strings.pleaseFillInAtLeastOneAreaOfInterest})
        }

        useEffect(() => {
            getInstitutions();
            getAreasOfInterest();
            setValidationErrors();
        }, []);

        const role = localStorage.getItem('role');
        return (
            <div className="col-12">
                <div
                    className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                    style={{color: "red"}}>*</small> {strings.email}</label>

                <input
                    name={"email"}
                    type={"email"}
                    placeholder={"name@example.com"}
                    className="form-control"
                    onChange={(e) => onChangeHandler(e)}
                    onBlur={(e) => onChangeHandler(e)}
                />
                <small style={{color: "red"}}>{validation["email"] && validation["email"].error && validation["email"].message}</small>
                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>
            <br/>

            <div
                className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.alternativeEmail}</label>

                <input
                    name={"alternativeEmail"}
                    type={"email"}
                    placeholder={"name@example.com"}
                    className="form-control"
                    onChange={(e) => onChangeHandler(e)}
                />
                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>
            <br/>

            <div
                className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.alternativeEmail}</label>

                <input
                    name={"alternativeSecondEmail"}
                    type={"email"}
                    placeholder={"name@example.com"}
                    className="form-control"
                    onChange={(e) => onChangeHandler(e)}
                />
                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>
            <br/>
            <div
                className="col-12">
                <label htmlFor={"password"}
                       className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                    style={{color: "red"}}>*</small>{strings.password}</label>

                <input
                    id={"password"}
                    autoComplete="disabled"
                    defaultValue={""}
                    name={"password"}
                    type={"password"}
                    placeholder={strings.password}
                    title={"six or more characters"}
                    className="form-control"
                    onChange={(e) => onChangeHandler(e)}
                    onBlur={(e) => onChangeHandler(e)}
                    required
                />
                <small style={{color: "red"}}>{validation["password"] && validation["password"].error && validation["password"].message}</small>
                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                <small id="passwordHelpBlock" className="form-text text-muted">
                    {strings.passHint}
                </small>
            </div>
            <br/>

            <div
                className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                    style={{color: "red"}}>*</small>{strings.firstName}</label>

                <input
                    name={'firstName'}
                    type={"text"}
                    required
                    placeholder={strings.firstName}
                    className="form-control"
                    onChange={(e) => onChangeHandler(e)}
                    onBlur={(e) => onChangeHandler(e)}
                />
                <small style={{color: "red"}}>{validation["firstName"] && validation["firstName"].error && validation["firstName"].message}</small>
                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>

            <br/>

            <div
                className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                    style={{color: "red"}}>*</small>{strings.lastName}</label>

                <input
                    name={"lastName"}
                    type={"text"}
                    required
                    placeholder={strings.lastName}
                    className="form-control"
                    onChange={(e) => onChangeHandler(e)}
                    onBlur={(e) => onChangeHandler(e)}
                />
                <small style={{color: "red"}}>{validation["lastName"] && validation["lastName"].error && validation["lastName"].message}</small>
                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>
            <br/>
            <div className="col-12">
                <div className="row">
                    <div className="col-9">
                        <label className="weight400 text-upper control-label control-label-xl margin-top-10">
                            <small style={{color: "red"}}>*</small>{strings.phone}
                        </label>

                        <input
                            name={"phone"}
                            type={"text"}
                            required
                            placeholder={strings.phone}
                            className="form-control"
                            onChange={(e) => onChangeHandler(e)}
                            onBlur={(e) => onChangeHandler(e)}
                        />
                        <small style={{color: "red"}}>{validation["phone"] && validation["phone"].error && validation["phone"].message}</small>
                    </div>
                    <div className="col-3">
                        <label className="weight400 text-upper control-label control-label-xl margin-top-10">
                            <small style={{color: "red"}}>*</small>{strings.localFirst}
                        </label>

                        <input
                            name={"locales"}
                            type={"text"}
                            required
                            placeholder={""}
                            className="form-control"
                            onChange={(e) => onChangeHandler(e)}
                            onBlur={(e) => onChangeHandler(e)}
                        />
                        <small style={{color: "red"}}>{validation["locales"] && validation["locales"].error && validation["locales"].message}</small>
                    </div>
                </div>

                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>
            <br/>

            <div className="col-12">
                <div className="row">
                    <div className="col-9">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.alternativePhone}</label>

                        <input
                            name={"alternativePhone"}
                            type={"text"}
                            placeholder={strings.alternativePhone}
                            className="form-control"
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>

                        <input
                            name={"alternativeLocales"}
                            type={"text"}
                            placeholder={""}
                            className="form-control"
                            onChange={(e) => onChangeHandler(e)}
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
                    <div className="col-9">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.alternativeSecondPhone}</label>

                        <input
                            name={"alternativeSecondPhone"}
                            type={"text"}
                            placeholder={strings.alternativeSecondPhone}
                            className="form-control"
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>

                        <input
                            name={"alternativeSecondLocales"}
                            type={"text"}
                            placeholder={""}
                            className="form-control"
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>
                </div>

                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>

            <br/>


            {role === "ROLE_ADMIN" ?
                <div className="col-12">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                        style={{color: "red"}}>*</small>{strings.institution}</label>
                    <Select
                        placeholder={strings.institutionPlaceholder}
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isSearchable={true}
                        options={listInstitutions}
                        onChange={onSelectedInstitutionHandle}
                        onBlur={onSelectedInstitutionHandle}
                        name={"institution_id"}

                    />
                    <small style={{color: "red"}}>{validation["institution_id"] && validation["institution_id"].error && validation["institution_id"].message}</small>
                    {/*{props.error &&*/}
                    {/*<div*/}
                    {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                </div> : <div></div>
            }
            <br/>
            {role === "ROLE_ADMIN" ? <div
                className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                    style={{color: "red"}}>*</small>{strings.role}</label>

                <select
                    name={"role"}
                    required
                    className="form-control custom-select"
                    onChange={(e) => onChangeHandler(e)}
                    onBlur={(e) => onChangeHandler(e)}
                >
                    <option value="">{strings.rolePlaceholder}</option>
                    <option value="ROLE_ADMIN">{strings.admin}</option>
                    <option value="ROLE_INSTITUTIONAL_MODERATOR">{strings.responsiblePerson}</option>
                    <option value="ROLE_EVALUATOR">{strings.evaluator}</option>
                    <option value="ROLE_MODERATOR_EVALUATOR">{strings.moderator}</option>

                </select>
                <small style={{color: "red"}}>{validation["role"] && validation["role"].error && validation["role"].message}</small>
                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}

            </div> : null}

            <div className="col-12 mt-4 mb-5">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.areasOfInterest}
                </label>
                <Select
                    placeholder={""}
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    isMulti={true}
                    isSearchable={true}
                    options={listOfAreas}
                    value={listOfAreas.filter(obj => selectedAreaValue.includes(obj.value))}
                    onChange={handleAreasChange}
                    name={"areasOfInterest_ids"}
                />
                <small style={{color: "red"}}>{validation["areasOfInterest_ids"] && validation["areasOfInterest_ids"].error && validation["areasOfInterest_ids"].message}</small>
            </div>

        </div>
    );

}
;

export default UserAdd;
