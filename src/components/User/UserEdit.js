import React, {useEffect, useState} from "react";
import InstitutionRepository from "../../repository/InstitutionRepository";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {strings} from "../../Localization/Localization";
import Select from "react-select";
import AreaOfInterestRepository from "../../repository/AreaOfInterestRepository";

const UserEdit = (props) => {

    const [validation] = useState([]);

    const [institutions, setInstitutions] = useState([]);
    const [listInstitutions, setListInstitutions] = useState([]);
    const [selectedInstitutionValue, setSelectedInstitutionValue] = useState([]);

    const [areasOfInterest, setAreasOfInterest] = useState([])
    const [listAreasOfInterest, setListAreasOfInterest] = useState([])

    const [selectedAreaValue, setSelectedAreaValue] = useState([]);
    const [chosenAreas, setChosenAreas] = useState([]);

    const getAreas = () => {
        AreaOfInterestRepository.findAllActive().then(res => {
            setAreasOfInterest(res.data)

            res.data.map(item => {
                listAreasOfInterest.push({value: item.id, label: item.nameMk, name: "areasOfInterest_ids"})
            })
        })
    }

    strings.setLanguage(localStorage.getItem("activeLanguage"));

    const getInstitutions = async () => {
        InstitutionRepository.allActiveInstitutions().then(res => {
            setInstitutions(res.data)
            res.data.map(item => {
                listInstitutions.push({value: item.id, label: item.nameMk, name: "institution_id"})
            })
        }).catch(err => toast.error(strings.failedToLoadData));
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

    let getIncludedAreas =  () => {
        if(props.entity.areasOfInterest !== undefined) {
            props.entity.areasOfInterest.map((item) => {
                chosenAreas.push({value: item.id, label: item.nameMk, name: "areasOfInterest_ids"})
            })
        }
    }

    const setValidationErrors = () => {
        validation["email"]=({error: false, name: 'email', message: 'Ве молиме пополнете е-пошта'})
        validation["firstName"]=({error: false, name: 'firstName', message: 'Ве молиме пополнете име'})
        validation["lastName"]=({error: false, name: 'lastName', message: 'Ве молиме пополнете презиме'})
        validation["phone"]=({error: false, name: 'phone', message: 'Ве молиме пополнете телефон'})
        validation["locales"]=({error: false, name: 'locales', message: 'Ве молиме пополнете локал'})
        validation["institution_id"]=({error: false, name: 'institution_id', message: 'Ве молиме пополнете институција'})
        validation["role"]=({error: false, name: 'role', message: 'Ве молиме пополнете тип на корисник'})
        validation["areasOfInterest_ids"]=({error: false, name: 'areasOfInterest_ids', message: 'Ве молиме пополнете барем една област од интерес'})
    }

    useEffect(() => {
        getInstitutions();
        getAreas();
        getIncludedAreas();
        setValidationErrors();
        if(props.entity.institution !== undefined && props.entity.institution !== null)
            props.onChange("institution_id", props.entity.institution.id)
        chosenAreas.map(item => {
            handleAreasChange(item);
        })
    }, []);

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        if(validation[name] !== undefined){
            validation[name].error = value === null || value === '';
        }

        props.onChange(name, value);
    };
    // const onActiveChangeHandler = (e) => {
    //     props.onChange(e.target.name, e.target.checked);
    // };
    const onRoleChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        if(validation[name] !== undefined){
            validation[name].error = value === null || value === '';
        }

        props.onChange(name, value);
    };

    const onSelectedInstitutionChangeHandler = (institution) => {
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


    let rolefront;
    let role = localStorage.getItem('role');
    role === "ROLE_ADMIN" ? rolefront = <div className="col">
        <label className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.role}</label>

        <select
            name={"role"}
            required
            className="form-control custom-select"
            onChange={(e) => onRoleChangeHandler(e)}
            value={props.entity.role !== undefined ? props.entity.role : ""}
        >
            <option value="">{strings.rolePlaceholder}</option>
            <option value="ROLE_ADMIN">{strings.admin}</option>
            <option value="ROLE_INSTITUTIONAL_MODERATOR">{strings.responsiblePerson}</option>
            <option value="ROLE_EVALUATOR">{strings.evaluator}</option>
            <option value="ROLE_MODERATOR_EVALUATOR">{strings.moderator}</option>
        </select>
        <small style={{color: "red"}}>{validation["role"] && validation["role"].error && validation["role"].message}</small>
    </div> : rolefront = <div></div>;

    return (
        <div>
            <div className="col">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.firstName}</label>

                <input
                    required
                    defaultValue={props.entity.firstName}
                    name={"firstName"}
                    type={"text"}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                />
                <small style={{color: "red"}}>{validation["firstName"] && validation["firstName"].error && validation["firstName"].message}</small>
            </div>
            <div className="col">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.lastName}</label>

                <input
                    name={"lastName"}
                    defaultValue={props.entity.lastName}
                    type={"text"}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    required
                />
                <small style={{color: "red"}}>{validation["lastName"] && validation["lastName"].error && validation["lastName"].message}</small>
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-9">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.phone}</label>

                        <input
                            name={"phone"}
                            defaultValue={props.entity.phone}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control"
                            required
                        />
                        <small style={{color: "red"}}>{validation["phone"] && validation["phone"].error && validation["phone"].message}</small>
                    </div>
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>

                        <input
                            name={"locales"}
                            defaultValue={props.entity.locales}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control"
                            required
                        />
                        <small style={{color: "red"}}>{validation["locales"] && validation["locales"].error && validation["locales"].message}</small>
                    </div>
                </div>
            </div>
            <br/>

            <div className="col-12">
                <div className="row">
                    <div className="col-9">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.alternativePhone}</label>

                        <input
                            name={"alternativePhone"}
                            defaultValue={props.entity.alternativePhone}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>

                        <input
                            name={"alternativeLocales"}
                            defaultValue={props.entity.alternativeLocales}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
            </div>
            <br/>

            <div className="col-12">
                <div className="row">
                    <div className="col-9">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.alternativeSecondPhone}</label>

                        <input
                            name={"alternativeSecondPhone"}
                            defaultValue={props.entity.alternativeSecondPhone}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-3">
                        <label
                            className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.localFirst}</label>

                        <input
                            name={"alternativeSecondLocales"}
                            defaultValue={props.entity.alternativeSecondLocales}
                            type={"text"}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
            </div>
            <br/>

            <div className="col">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.email}</label>

                <input
                    name={"email"}
                    defaultValue={props.entity.email}
                    type={"email"}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    required
                />
                <small style={{color: "red"}}>{validation["email"] && validation["email"].error && validation["email"].message}</small>
            </div>
            <div className="col">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.alternativeEmail}</label>

                <input
                    name={"alternativeEmail"}
                    defaultValue={props.entity.alternativeEmail}
                    type={"email"}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    required
                />
            </div>
            <div className="col">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.alternativeEmail}</label>

                <input
                    name={"alternativeSecondEmail"}
                    defaultValue={props.entity.alternativeSecondEmail}
                    type={"email"}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    required
                />
            </div>
            {rolefront}
            {role === "ROLE_ADMIN" ?
                <div className="col">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.institution}</label>
                    <Select
                        placeholder={strings.searchForInstitution}
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isSearchable={true}
                        options={listInstitutions}
                        onChange={onSelectedInstitutionChangeHandler}
                        name={"institution_id"}
                        defaultValue={props.entity.institution !== null && props.entity.institution !== undefined ? {
                            value: props.entity.institution.id,
                            label: props.entity.institution.nameMk,
                            name: "institution"
                        } : ""}

                    />
                    <small style={{color: "red"}}>{validation["institution_id"] && validation["institution_id"].error && validation["institution_id"].message}</small>
                </div> : <div></div>
            }

            {/*<div className="col">*/}
            {/*    <label*/}
            {/*        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.active}</label>*/}
            {/*    {props.entity.active !== null && props.entity.active !== undefined && props.entity.active ?*/}
            {/*        <input*/}
            {/*            name={"active"}*/}
            {/*            type={"checkbox"}*/}
            {/*            checked={true}*/}
            {/*            onChange={(e) => onActiveChangeHandler(e)}*/}
            {/*            className="form-control"*/}
            {/*        /> :*/}
            {/*        <input*/}
            {/*            name={"active"}*/}
            {/*            type={"checkbox"}*/}
            {/*            onChange={(e) => onActiveChangeHandler(e)}*/}
            {/*            className="form-control"*/}
            {/*        />}*/}
            {/*</div>*/}

            <div className="col mt-4 mb-4">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.areasOfInterest}
                </label>

                {chosenAreas.length > 0 ? (
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
                        options={listAreasOfInterest}
                        defaultValue={chosenAreas}
                        onChange={handleAreasChange}
                        name={"areasOfInterest_ids"}
                    />
                ) : ""}

                {chosenAreas.length === 0 ? (
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
                        options={listAreasOfInterest}
                        onChange={handleAreasChange}
                        name={"areasOfInterest_ids"}
                    />
                ) : ""}

                <small style={{color: "red"}}>{validation["areasOfInterest_ids"] && validation["areasOfInterest_ids"].error && validation["areasOfInterest_ids"].message}</small>

            </div>
        </div>
    );
};
export default UserEdit;
