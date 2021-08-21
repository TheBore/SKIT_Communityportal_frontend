import React, {useEffect, useState} from "react";
import StatusRepository from "../../repository/StatusRepository";
import InstitutionRepository from "../../repository/InstitutionRepository";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "./css/ActivityAdd.css"
import ActivityInstitutionRepository from "../../repository/ActivityInstitutionRepository";
import {strings} from "../../Localization/Localization";

const ActivityEdit = (props) => {

    const [statuses, setStatuses] = useState([])
    const [listStatuses, setListStatuses] = useState([])

    const [listCompetentInstitutions, setListCompetentInstitutions] = useState([]);
    const [selectedInstitutionValue, setSelectedInstitutionValue] = useState([]);

    const [listIncludedInstitutions, setListIncludedInstitutions] = useState([]);
    const [selectedIncludedInstitutions, setSelectedIncludedInstitutions] = useState([]);

    const [chosenInstitutions, setChosenInstitutions] = useState([]);

    const [selectedStatus, setSelectedStatus] = useState(null)

    const [validation] = useState([])

    const [yearDate, setYearDate] = useState(null)

    const setDate = () => {
        let date = props.entity.yearDate;
        setYearDate(new Date(date));
    }

    const getStatuses = () => {
        StatusRepository.getStatusesByType("АКТИВНОСТ").then(res => {
            setStatuses(res.data)

            res.data.map(item => {
                listStatuses.push({value: item.id, label: localStorage.getItem("activeLanguage") === 'mk' ? item.statusMk : item.statusAl, name: "status"})
            })
        })
    }

    const getInstitutions = () => {
        ActivityInstitutionRepository.findAllActivityInstitutions().then(res => {
            res.data.map(item => {
                listCompetentInstitutions.push({value: item.id, label: localStorage.getItem("activeLanguage") === 'mk' ? item.nameMk : item.nameAl, name: "competentInstitution"})
                listIncludedInstitutions.push({value: item.id, label: localStorage.getItem("activeLanguage") === 'mk' ? item.nameMk : item.nameAl, name: "activityInstitutions"})
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

    const handleCompetentInstitutionsChange = (institution) => {
        if(institution !== null && institution.type !== "blur"){
            props.onChange(institution.name, institution.value)
            validation["competentInstitution"].error = false;
            setSelectedInstitutionValue(institution.value)
        }
        else{
            if (institution === null || selectedInstitutionValue === null) {
                props.onChange("competentInstitution", null)
                validation["competentInstitution"].error = true;
                setSelectedInstitutionValue(null);
            }
        }
    }

    const handleIncludedInstitutionsChange = (competentInstitutions) => {
        if(competentInstitutions != null){
            props.onChange("activityInstitutions", Array.isArray(competentInstitutions) ? competentInstitutions.map(x => x.value) : [])
        }
        else{
            props.onChange("activityInstitutions", null);
        }
        setSelectedIncludedInstitutions(Array.isArray(competentInstitutions) ? competentInstitutions.map(x => x.value) : []);
    }

    const onDateChangeHandler = (date) => {
        if(date !== null){
            setYearDate(date)
            props.onChange("yearDate", date.getFullYear().toString())
        }
    }

    const setValidationErrors = () => {
        validation["nameMk"]=({error: false, name: 'nameMk', message: strings.fillActivityNameMk})
        // validation["endDate"]=({error: false, name: 'endDate', message: strings.endDate})
        validation["status"]=({error: false, name: 'color', message: strings.fillStatus})
        validation["competentInstitution"]=({error: false, name: 'competentInstitution', message: strings.fillCompetentInstitution})
    }

    let getIncludedInstitutions =  () => {
        if(Array.isArray(props.entity.activityInstitutions)){
            props.entity.activityInstitutions.map( (item) => {
                chosenInstitutions.push({value: item.id, label: localStorage.getItem("activeLanguage") === 'mk' ? item.nameMk : item.nameAl, name: "activityInstitutions"})
            })
        }
        else {
            chosenInstitutions.push({value: props.entity.activityInstitutions.id, label: localStorage.getItem("activeLanguage") === 'mk' ? props.entity.activityInstitutions.nameMk : props.entity.activityInstitutions.nameAl, name: "activityInstitutions"})
        }
    }

    useEffect(() => {
        getStatuses();
        setDate();
        getIncludedInstitutions();
        getInstitutions();
        setValidationErrors();
        onSelectedStatusChangeHandler({
            value: props.entity.status.id,
            label: localStorage.getItem("activeLanguage") === 'mk' ? props.entity.status.statusMk : props.entity.status.statusAl,
            name: "status"
        })
        handleCompetentInstitutionsChange({
            value: props.entity.competentInstitution.id,
            label: localStorage.getItem("activeLanguage") === 'mk' ? props.entity.competentInstitution.statusMk : props.entity.competentInstitution.statusAl,
            name: "competentInstitution"
        })
        handleIncludedInstitutionsChange(chosenInstitutions);
        }, []);


        return (
            <div className="container">
                <div className="col-12">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">
                        <small style={{color: "red"}}>*</small>
                        {strings.activityNameMk}
                    </label>
                    <input
                        defaultValue={props.entity.nameMk}
                        required={true}
                        placeholder={""}
                        name={"nameMk"}
                        type={"text"}
                        onBlur={(e) => onChangeHandler(e)}
                        onChange={(e) => onChangeHandler(e)}
                        className="form-control mb-3"
                    />
                    <small
                        style={{color: "red"}}>{validation["nameMk"] && validation["nameMk"].error && validation["nameMk"].message}</small>
                </div>

                <div className="col-12">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">
                        {strings.activityNameAl}
                    </label>

                    <input
                        defaultValue={props.entity.nameAl}
                        placeholder={""}
                        name={"nameAl"}
                        type={"text"}
                        onBlur={(e) => onChangeHandler(e)}
                        onChange={(e) => onChangeHandler(e)}
                        className="form-control mb-3"
                    />
                </div>

                <div className="col-12">
                    <div className="row">
                        <div className="col-6">
                            <label
                                className="weight400 text-upper control-label control-label-xl margin-top-10">
                                {strings.deadlineForRealization}
                            </label>

                            <select
                                name="activityDateType"
                                defaultValue={props.entity.activityDateType ? props.entity.activityDateType : ""}
                                className="form-control custom-select mb-3"
                                onChange={(e) => onChangeHandler(e)}>

                                <option value="NOTDEFINED">Не е дефинирано</option>
                                <option value="FIRSTHALF">Прва половина</option>
                                <option value="SECONDHALF">Втора половина</option>

                            </select>
                        </div>

                        <div className="col-4">
                            <label
                                className="weight400 text-upper control-label control-label-xl margin-top-10">
                                {strings.selectYear}
                            </label>
                            <br/>

                            <DatePicker
                                selected={yearDate}
                                name="yearDate"
                                showYearPicker
                                dateFormat={"yyyy"}
                                onChange={date => onDateChangeHandler(date)}
                                className="form-control mb-3"
                            />
                        </div>
                        <div className="col-2 text-right">
                            <label
                                className="weight400 text-upper control-label control-label-xl margin-top-10">
                                <small style={{color: "red"}}>*</small>
                                Континуирано
                            </label>
                            <br/>

                            <input
                                defaultValue={props.entity.continuously}
                                checked={props.entity.continuously}
                                style={{marginTop: "15px", marginLeft: '10px', marginRight: '30px', marginBottom: 0, transform: "scale(3)"}}
                                placeholder={""}
                                name={"continuously"}
                                type={"checkbox"}
                                onChange={(e) => onChangeHandler(e)}
                            />
                        </div>
                    </div>

                </div>

                <div className="col-12 mt-4">
                    <label style={{paddingRight: "10px"}}
                           className="weight400 text-upper control-label control-label-xl margin-top-10">
                        <small style={{color: "red"}}>*</small>
                        {strings.financialImplications}
                    </label>

                    <input
                        defaultValue={props.entity.financialImplications}
                        style={{margin: "10px", marginBottom: 0, transform: "scale(2)"}}
                        placeholder={""}
                        checked={props.entity.financialImplications}
                        name={"financialImplications"}
                        type={"checkbox"}
                        onChange={(e) => onChangeHandler(e)}
                    />
                    {/*no need for validation*/}
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
                        defaultValue={props.entity.status !== null && props.entity.status !== undefined ? {
                            value: props.entity.status.id,
                            label: localStorage.getItem("activeLanguage") === 'mk' ? props.entity.status.statusMk : props.entity.status.statusAl,
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
                        {strings.responsibleInstitutions}
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
                        onBlur={handleCompetentInstitutionsChange}
                        onChange={handleCompetentInstitutionsChange}
                        name={"competentInstitution"}
                        defaultValue={props.entity.competentInstitution !== null && props.entity.competentInstitution !== undefined ? {
                            value: props.entity.competentInstitution.id,
                            label: localStorage.getItem("activeLanguage") === 'mk' ? props.entity.competentInstitution.nameMk : props.entity.competentInstitution.nameAl,
                            name: "competentInstitution"
                        } : ""}
                    />
                    <small
                        style={{color: "red"}}>{validation["competentInstitution"] && validation["competentInstitution"].error && validation["competentInstitution"].message}</small>
                </div>

                <div className="col-12 mt-4">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">
                        <small style={{color: "red"}}>*</small>
                        {strings.includedInstitutions}
                    </label>

                    {chosenInstitutions.length > 0 ?
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
                            name={"activityInstitutions"}
                        /> : ""
                    }

                    {chosenInstitutions.length === 0 ?
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
                            onChange={handleIncludedInstitutionsChange}
                            name={"activityInstitutions"}
                        /> : ""
                    }

                </div>
            </div>
        )
}

export default ActivityEdit;