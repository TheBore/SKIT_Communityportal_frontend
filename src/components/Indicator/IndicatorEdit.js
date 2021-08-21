import React, {useEffect, useState} from "react";
import StatusRepository from "../../repository/StatusRepository";
import InstitutionRepository from "../../repository/InstitutionRepository";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {strings} from "../../Localization/Localization";

const IndicatorEdit = (props) => {

    const [statuses, setStatuses] = useState([])
    const [listStatuses, setListStatuses] = useState([])

    const [competentInstitutions, setCompetentInstitutions] = useState([])
    const [listCompetentInstitutions, setListCompetentInstitutions] = useState([])

    const [includedInstitutions, setIncludedInstitutions] = useState([])
    const [listIncludedInstitutions, setListIncludedInstitutions] = useState([])

    const [selectedStatus, setSelectedStatus] = useState(null)
    const [selectedInstitution, setSelectedInstitution] = useState(null)

    const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);

    const [validation] = useState([])

    const [selectedInstitutionValue, setSelectedInstitutionValue] = useState([]);

    const [chosenInstitutions, setChosenInstitutions] = useState([]);


    const getStatuses = () => {
        StatusRepository.getStatusesByType("ИНДИКАТОР").then(res => {
            setStatuses(res.data)

            res.data.map(item => {
                listStatuses.push({value: item.id, label: localStorage.getItem("activeLanguage") === 'mk' ? item.statusMk : item.statusAl, name: "status"})
            })
        })
    }

    const getInstitutions = () => {
        InstitutionRepository.allActiveInstitutions().then(res => {
            setCompetentInstitutions(res.data)
            setIncludedInstitutions(res.data)

            res.data.map(item => {
                listCompetentInstitutions.push({value: item.id, label: item.nameMk, name: "competentInstitution"})
                listIncludedInstitutions.push({value: item.id, label: item.nameMk, name: "includedInstitutions"})
            })
        })
    }

    const handleIncludedInstitutionsChange = (includedInstitutions) => {
        if(includedInstitutions != null){
            props.onChange("includedInstitutions", Array.isArray(includedInstitutions) ? includedInstitutions.map(x => x.value) : [])
            validation["includedInstitutions"].error = false;
        }
        else{
            props.onChange("includedInstitutions", null);
            validation["includedInstitutions"].error = true;
        }
        setSelectedInstitutionValue(Array.isArray(includedInstitutions) ? includedInstitutions.map(x => x.value) : []);
    }

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

    const onSelectedInstitutionChangeHandler = (institution) => {
        if(institution !== null && institution.type !== "blur"){
            props.onChange(institution.name, institution.value)
            validation["competentInstitution"].error = false;
            setSelectedInstitution((institution.value))
        }
        else{
            if (institution === null || selectedInstitution === null) {
                props.onChange("competentInstitution", null)
                validation["competentInstitution"].error = true;
                setSelectedInstitution(null);
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

    // const onEndDateChangeHandler = (date) => {
    //     if(date !== null && date.type !== "blur"){
    //         setEndDate(date)
    //         props.onChange("endDate", date.toLocaleDateString())
    //         validation["endDate"].error = false
    //     }
    //     else {
    //         if(date === null || endDate === null) {
    //             props.onChange("endDate", null)
    //             validation["endDate"].error = true
    //             setEndDate(null)
    //         }
    //     }
    // }

    const setDates = () => {
        let startDateSplit = props.entity.startDate.split(".")
        setStartDate(new Date(startDateSplit[1] + "." + startDateSplit[0] + "." + startDateSplit[2]))
    }

    const setValidationErrors = () => {
        validation["nameMk"] = ({error: false, name: 'nameMk', message: strings.fillIndicatorDescMk})
        validation["startDate"] = ({error: false, name: 'startDate', message: strings.startDate})
        validation["status"] = ({error: false, name: 'color', message: strings.fillStatus})
        validation["competentInstitution"] = ({
            error: false,
            name: 'competentInstitution',
            message: 'Please fill competent institution'
        })
        validation["includedInstitutions"] = ({
            error: false,
            name: 'includedInstitutions',
            message: 'Please fill at least one institution'
        })
    }

    let getIncluded =  () => {
         props.entity.includedInstitutions.map( (item) => {
            chosenInstitutions.push({value: item.id, label: localStorage.getItem("activeLanguage") === 'mk' ? item.nameMk : item.nameAl, name: "includedInstitutions"})
        })
    }

    useEffect(() => {
        getStatuses();
        getInstitutions();
        setValidationErrors();
        setDates();
        getIncluded();
        onSelectedStatusChangeHandler({
            value: props.entity.status.id,
            label: localStorage.getItem("activeLanguage") === 'mk' ? props.entity.status.statusMk : props.entity.status.statusAl,
            name: "status"
        })
        onSelectedInstitutionChangeHandler({
            value: props.entity.competentInstitution.id,
            label: localStorage.getItem("activeLanguage") === 'mk' ? props.entity.competentInstitution.nameMk : props.entity.competentInstitution.nameAl,
            name: "competentInstitution"
        });
        let startDateSplit = props.entity.startDate.split(".");
        props.onChange("startDate", startDateSplit[1] + "/" +
            startDateSplit[0] + "/" +
            startDateSplit[2]);
        chosenInstitutions.map(item => {
            handleIncludedInstitutionsChange(item);
        })
    }, []);




    return (
        <div className="container">
            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.indicatorNameMk}
                </label>
                <input
                    defaultValue={props.entity.nameMk}
                    required={true}
                    placeholder={""}
                    name={"nameMk"}
                    type={"text"}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control mb-3"
                />
                <small
                    style={{color: "red"}}>{validation["nameMk"] && validation["nameMk"].error && validation["nameMk"].message}</small>
            </div>

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    {strings.indicatorNameAl}
                </label>

                <input
                    defaultValue={props.entity.nameAl}
                    placeholder={""}
                    name={"nameAl"}
                    type={"text"}
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
                        onChange={date => onStartDateChangeHandler(date)}
                        className="form-control mb-3"
                    />
                </form>

                <small
                    style={{color: "red"}}>{validation["startDate"] && validation["startDate"].error && validation["startDate"].message}</small>

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
                    onChange={onSelectedStatusChangeHandler}
                    name={"status"}
                    defaultValue={props.entity.status !== null && props.entity.status !== undefined ? {
                        value: props.entity.status.id,
                        label: props.entity.status.statusMk,
                        name: "status"
                    } : ""}
                />
                <small
                    style={{color: "red"}}>{validation["status"] && validation["status"].error && validation["status"].message}</small>
            </div>

            <div className="col-12 mt-4">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.competentInstitutions}
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
                    onChange={onSelectedInstitutionChangeHandler}
                    name={"competentInstitution"}
                    defaultValue={props.entity.competentInstitution !== null && props.entity.competentInstitution !== undefined ? {
                        value: props.entity.competentInstitution.id,
                        label: props.entity.competentInstitution.nameMk,
                        name: "competentInstitution"
                    } : ""}
                />
                <small
                    style={{color: "red"}}>{validation["competentInstitution"] && validation["competentInstitution"].error && validation["competentInstitution"].message}</small>
            </div>

            {/*TODO INCLUDED INSTITUTION VALIDATION*/}
            <div className="col-12 mt-4">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.includedInstitutions}
                </label>

                {chosenInstitutions.length > 0 ? (
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
                        options={listIncludedInstitutions}
                        defaultValue={chosenInstitutions}
                        onChange={handleIncludedInstitutionsChange}
                        name={"includedInstitutions"}
                    />
                ) : ""}
                <small style={{color: "red"}}>{validation["includedInstitutions"] && validation["includedInstitutions"].error && validation["includedInstitutions"].message}</small>
            </div>
        </div>
    )

}

export default IndicatorEdit;