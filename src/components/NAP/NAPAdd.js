import React, {useEffect, useState} from "react";
import StatusRepository from "../../repository/StatusRepository";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {strings} from "../../Localization/Localization";

const NAPAdd = (props) => {

    const [statuses, setStatuses] = useState([])
    const [listStatuses, setListStatuses] = useState([])
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [selectedStatus, setSelectedStatus] = useState(null)
    const [selectedStrategyGoal, setSelectedStrategyGoal] = useState(null)

    const [validation] = useState([])

    const getStatuses = () => {
        StatusRepository.getStatusesByType("НАП").then(res => {
            setStatuses(res.data)

            res.data.map(item => {
                listStatuses.push({value: item.id, label: localStorage.getItem("activeLanguage") ? item.statusMk : item.statusAl, name: "status"})
            })
        })
    }

    const onChangeHandler = (e) => {
        const target = e.target;

        const value = target.value;
        const name = target.name;
        console.log("value", value);
        console.log("name", name);

        if(validation[name] !== undefined){
            validation[name].error = value === null || value === '';
        }

        props.onChange(name, value);
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

    const onEndDateChangeHandler = (date) => {
        if(date !== null && date.type !== "blur"){
            setEndDate(date)
            props.onChange("endDate", date.toLocaleDateString())
            validation["endDate"].error = false
        }
        else {
            if(date === null || endDate === null) {
                props.onChange("endDate", null)
                validation["endDate"].error = true
                setEndDate(null)
            }
        }
    }


    const setValidationErrors = () => {
        validation["nameMk"]=({error: false, name: 'nameMk', message: strings.fillNapNameMk})
        validation["startDate"]=({error: false, name: 'startDate', message: strings.startDate})
        validation["endDate"]=({error: false, name: 'endDate', message: strings.endDate})
        validation["descriptionMk"]=({error: false, name: 'descriptionMk', message: strings.descMk})
        validation["status"]=({error: false, name: 'status', message: strings.fillStatus})
    }

    useEffect(() => {
        getStatuses();
        setValidationErrors();
    }, []);

    return(
        <div className="container">
            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.napNameMk}
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
                    {strings.napNameAl}
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
                    {strings.fromTo}
                </label>
                <br/>

                <form autoComplete="off">
                    <DatePicker
                        placeholderText={""}
                        name={"startDate"}
                        selected={startDate}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}
                        isClearable
                        dateFormat={"dd.MM.yyyy"}
                        onBlur={date => onStartDateChangeHandler(date)}
                        onChange={date => onStartDateChangeHandler(date)}
                        className="form-control mb-3"
                    />
                </form>
                <small style={{color: "red"}}>{validation["startDate"] && validation["startDate"].error && validation["startDate"].message}</small>

                <form autoComplete="off">
                    <DatePicker
                        placeholderText={""}
                        name={"end"}
                        selected={endDate}
                        selectsEnd
                        startDate={startDate}
                        minDate={startDate}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}
                        isClearable
                        dateFormat={"dd.MM.yyyy"}
                        onBlur={date => onEndDateChangeHandler(date)}
                        onChange={date => onEndDateChangeHandler(date)}
                        className="form-control mb-3"
                    />
                </form>
                <small style={{color: "red"}}>{validation["endDate"] && validation["endDate"].error && validation["endDate"].message}</small>
            </div>

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.descMk}
                </label>

                <textarea
                    placeholder={""}
                    name={"descriptionMk"}
                    rows={6}
                    onBlur={(e) => onChangeHandler(e)}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control mb-3"
                />
                <small style={{color: "red"}}>{validation["descriptionMk"] && validation["descriptionMk"].error && validation["descriptionMk"].message}</small>
            </div>

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    {strings.descAl}
                </label>

                <textarea
                    placeholder={""}
                    name={"descriptionAl"}
                    rows={6}
                    onBlur={(e) => onChangeHandler(e)}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control mb-3"
                />
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
        </div>
    )

}
export default NAPAdd;