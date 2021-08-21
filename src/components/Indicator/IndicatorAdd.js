import React, {useEffect, useState} from "react";
import StatusRepository from "../../repository/StatusRepository";
import InstitutionRepository from "../../repository/InstitutionRepository";
import Select from "react-select";
import DatePicker from "react-datepicker";
import ActivityInstitutionRepository from "../../repository/ActivityInstitutionRepository";
import {strings} from "../../Localization/Localization";
import ActivityRepository from "../../repository/ActivityRepository";

const IndicatorAdd = (props) => {

    const [listStatuses, setListStatuses] = useState([])

    const [selectedStatus, setSelectedStatus] = useState(null)

    const [listCompetentInstitutions, setListCompetentInstitutions] = useState([])
    const [selectedInstitutionValue, setSelectedInstitutionValue] = useState([]);

    const [types, setSelectedTypes] = useState([]);
    const [selectedType, setSelectedType] = useState([]);

    const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);

    const [validation] = useState([])


    const getStatuses = () => {
        StatusRepository.getStatusesByType("ИНДИКАТОР").then(res => {
            res.data.map(item => {
                listStatuses.push({value: item.id, label: localStorage.getItem("activeLanguage") === 'mk' ? item.statusMk : item.statusAl, name: "status"})
            })
        })
    }

    const getInstitutions = () => {
        ActivityRepository.getAllInstitutionsByActivity(props.entity.activityId).then(res => {
            res.data.map(item => {
                listCompetentInstitutions.push({value: item.id, label: localStorage.getItem("activeLanguage") === 'mk' ? item.nameMk : item.nameAl, name: "institution"})
            })
        })
    }

    const handleCompetentInstitutionsChange = (institution) => {
        if(institution !== null && institution.type !== "blur"){
            props.onChange(institution.name, institution.value)
            validation["institution"].error = false;
            setSelectedInstitutionValue(institution.value)
        }
        else{
            if (institution === null || selectedInstitutionValue === null) {
                props.onChange("institution", null)
                validation["institution"].error = true;
                setSelectedInstitutionValue(null);
            }
        }}

    const onChangeHandler = (e) => {
        const target = e.target;
        if (target.type === 'checkbox') {
            // onCheckHandler();
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            props.onChange(name,value);
        }
        else{
            const value = target.value;
            const name = target.name;
            console.log("value", value);
            console.log("name", name);

            if(validation[name] !== undefined){
                validation[name].error = value === null || value === '';
            }

            props.onChange(name, value);
        }

    };

    const onSelectedStatusChangeHandler = (status) => {
        if(status !== null && status.type !== "blur"){
            props.onChange(status.name, status.value)
            validation["status"].error = false;
            setSelectedStatus(status.value)
        }
        else{
            if (status === null || selectedStatus === null) {
                props.onChange("status", null)
                validation["status"].error = true;
                setSelectedStatus(null);
            }
        }
    }

    const onSelectedTypeChangeHandler = (type) => {
        if(type !== null && type.type !== "blur"){
            props.onChange(type.name, type.value)
            validation["type"].error = false;
            setSelectedType(type.value)
        }
        else{
            if (type === null || selectedType === null) {
                props.onChange("type", null)
                validation["type"].error = true;
                setSelectedType(null);
            }
        }
    }

    const onStartDateChangeHandler = (date) => {
        if(date !== null && date.type !== "blur"){
            setStartDate(date)
            props.onChange("startDate", date.toLocaleDateString())
            validation["startDate"].error = false
        }
        else {
            if(date === null || startDate === null) {
                props.onChange("startDate", null)
                validation["startDate"].error = true
                setStartDate(null)
            }
        }
    }

    const setValidationErrors = () => {
        validation["nameMk"]=({error: false, name: 'nameMk', message: strings.fillIndicatorNameMk})
        validation["startDate"]=({error: false, name: 'startDate', message: strings.endDate})
        validation["status"]=({error: false, name: 'color', message: strings.fillStatus})
        validation["institution"]=({error: false, name: 'institution', message: strings.fillInstitution})
        validation["type"]=({error: false, name: 'type', message: strings.addType})

        types.push({value: "BOOLEAN", label: strings.bool, name: "type"});
        types.push({value: "NUMBER", label: strings.num, name: "type"});
    }

    useEffect(() => {
        getStatuses();
        setValidationErrors();
        getInstitutions();
    }, []);

    return(
        <div className="container">
            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.indicatorNameMk}
                </label>
                <input
                    required={true}
                    placeholder={""}
                    name={"nameMk"}
                    type={"text"}
                    onBlur={(e) => onChangeHandler(e)}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control mb-3"
                />
                <small style={{color: "red"}}>{validation["nameMk"] && validation["nameMk"].error && validation["nameMk"].message}</small>
            </div>

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    {strings.indicatorNameAl}
                </label>

                <input
                    placeholder={""}
                    name={"nameAl"}
                    type={"text"}
                    onBlur={(e) => onChangeHandler(e)}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control mb-3"
                />
            </div>

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.dateStarted}
                </label>
                <br/>

                <form autoComplete="off">
                    <DatePicker
                        placeholderText={""}
                        name={"startDate"}
                        selected={startDate}
                        selectsStart
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}
                        autocomplete="off"
                        isClearable
                        dateFormat={"dd.MM.yyyy"}
                        onBlur={date => onStartDateChangeHandler(date)}
                        onChange={date => onStartDateChangeHandler(date)}
                        className="form-control mb-3"
                    />
                </form>

                <small style={{color: "red"}}>{validation["startDate"] && validation["startDate"].error && validation["startDate"].message}</small>

            </div>

            <div className="col-12 mt-4">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.status}
                </label>

                <Select
                    placeholder={""}
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    options={listStatuses}
                    onBlur={onSelectedStatusChangeHandler}
                    onChange={onSelectedStatusChangeHandler}
                    name={"status"}
                />
                <small style={{color: "red"}}>{validation["status"] && validation["status"].error && validation["status"].message}</small>
            </div>

            <div className="col-12 mt-4">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.typeOfIndicator}
                </label>

                <Select
                    placeholder={""}
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    options={types}
                    onBlur={onSelectedTypeChangeHandler}
                    onChange={onSelectedTypeChangeHandler}
                    name={"type"}
                />

                <small style={{color: "red"}}>{validation["type"] && validation["type"].error && validation["type"].message}</small>
            </div>

            <div className="col-12 mt-4">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.competentInstitution}
                </label>

                <Select
                    placeholder={""}
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    options={listCompetentInstitutions}
                    onChange={handleCompetentInstitutionsChange}
                    onBlur={handleCompetentInstitutionsChange}
                    name={"institution"}
                />

                <small style={{color: "red"}}>{validation["institution"] && validation["institution"].error && validation["institution"].message}</small>
            </div>
        </div>
    )

}

export default IndicatorAdd;