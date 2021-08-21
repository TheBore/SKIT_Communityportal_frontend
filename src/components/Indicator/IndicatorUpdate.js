import React, {useEffect, useState} from "react";
import StatusRepository from "../../repository/StatusRepository";
import InstitutionRepository from "../../repository/InstitutionRepository";
import Select from "react-select";
import DatePicker from "react-datepicker";
import ActivityInstitutionRepository from "../../repository/ActivityInstitutionRepository";
import {strings} from "../../Localization/Localization";
import ActivityRepository from "../../repository/ActivityRepository";

const IndicatorUpdate = (props) => {

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

    const setValidationErrors = () => {
        validation["status"]=({error: false, name: 'status', message: strings.fillStatus})
    }

    useEffect(() => {
        props.onChange('id', props.entity.id)
        getStatuses();
        setValidationErrors();
        onSelectedStatusChangeHandler({
            value: props.entity.status.id,
            label: localStorage.getItem("activeLanguage") === 'mk' ? props.entity.status.statusMk : props.entity.status.statusAl,
            name: "status"
        })
    }, []);


    return(
        <div className="container">

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
                    defaultValue={props.entity.status !== null && props.entity.status !== undefined ? {
                        value: props.entity.status.id,
                        label: localStorage.getItem("activeLanguage") === 'mk' ? props.entity.status.statusMk : props.entity.status.statusAl,
                        name: "status"
                    } : ""}
                />
                <small style={{color: "red"}}>{validation["status"] && validation["status"].error && validation["status"].message}</small>
            </div>

            {props.entity.indicatorType === "BOOLEAN" ?
                <div className="col-12 mt-4">
                    <label style={{paddingRight: "10px"}}
                           className="weight400 text-upper control-label control-label-xl margin-top-10">
                        <small style={{color: "red"}}>*</small>
                        {strings.reportForIndicatorBool}
                    </label>

                    <input
                        defaultValue={props.entity.finished}
                        checked={props.entity.finished}
                        style={{margin: "10px", marginBottom: 0, transform: "scale(2)"}}
                        placeholder={""}
                        name={"finished"}
                        type={"checkbox"}
                        onBlur={(e) => onChangeHandler(e)}
                        onChange={(e) => onChangeHandler(e)}
                    />
                </div>

                :

                <div className="col-12 mt-4">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">
                        <small style={{color: "red"}}>*</small>
                        {strings.reportForIndicatorNum}
                    </label>
                    <input
                        required={true}
                        placeholder={""}
                        name={"counter"}
                        type={"number"}
                        onBlur={(e) => onChangeHandler(e)}
                        onChange={(e) => onChangeHandler(e)}
                        className="form-control mb-3"
                    />
                </div>
            }

        </div>
    )

}

export default IndicatorUpdate;