import React, {useEffect, useState} from "react";
import {strings} from "../../../Localization/Localization";
import StatusRepository from "../../../repository/StatusRepository";
import Select from "react-select";

const IndicatorReportEditNew = (props) => {

    const [validation] = useState([])

    const [listReportStatuses, setListReportStatuses] = useState([])
    const [selectedReportStatus, setSelectedReportStatus] = useState(null)

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

    const onSelectedStatusReportChangeHandler = (status) => {
        if(status !== null && status.type !== "blur"){
            props.onChange(status.name, status.value)
            validation["statusReport"].error = false;
            setSelectedReportStatus(status.value)
        }
        else{
            if (status === null || selectedReportStatus === null) {
                props.onChange("statusReport", null)
                validation["statusReport"].error = true;
                setSelectedReportStatus(null);
            }
        }
    }

    const getStatuses = () => {
        StatusRepository.getStatusesByType("ИЗВЕШТАЈ").then(res => {
            res.data.map(item => {
                listReportStatuses.push({value: item.id, label: localStorage.getItem("activeLanguage") === 'mk' ? item.statusMk : item.statusAl, name: "statusReport"})
            })
        })
    }

    useEffect(() => {
        getStatuses();
        setValidationErrors();
        onSelectedStatusReportChangeHandler({
            value: props.entity.status.id,
            label: props.entity.status.statusMk,
            name: "statusReport"
        });
    }, []);

    const setValidationErrors = () => {
        validation["reportMk"]=({error: false, name: 'reportMk', message: 'Please fill report mk'})
        validation["statusReport"]=({error: false, name: 'statusReport', message: strings.fillIndicatorStatusReport})
    }

    return (
        <div className="col-12">
            <div className="row">

                <div className="col-4">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">
                        <small style={{color: "red"}}>*</small>
                        {strings.indicatorReportStatus}
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
                        options={listReportStatuses}
                        onBlur={onSelectedStatusReportChangeHandler}
                        onChange={onSelectedStatusReportChangeHandler}
                        name={"statusReport"}
                        defaultValue={props.entity !== null && props.entity !== undefined ? {
                            value: props.entity.status.id,
                            label: props.entity.status.statusMk,
                            name: "statusReport"
                        } : ""}
                    />
                    <small style={{color: "red"}}>{validation["statusReport"] && validation["statusReport"].error && validation["statusReport"].message}</small>
                    <br/>
                </div>

                <div className="col-8"/>

                <div className="col-4">
                    {strings.reportInMk}
                    <textarea
                        defaultValue={props.entity.reportMk}
                        placeholder={""}
                        name={"reportMk"}
                        rows={6}
                        onBlur={(e) => onChangeHandler(e)}
                        onChange={(e) => onChangeHandler(e)}
                        className="form-control mb-3"
                    />
                    <small style={{color: "red"}}>{validation["reportMk"] && validation["reportMk"].error && validation["reportMk"].message}</small>
                    <br/>
                </div>

                {/*<div className="col-4">*/}
                {/*    {strings.reportInAl}*/}
                {/*    <textarea*/}
                {/*        defaultValue={props.entity.reportAl}*/}
                {/*        placeholder={""}*/}
                {/*        name={"reportAl"}*/}
                {/*        rows={6}*/}
                {/*        onBlur={(e) => onChangeHandler(e)}*/}
                {/*        onChange={(e) => onChangeHandler(e)}*/}
                {/*        className="form-control mb-3"*/}
                {/*    />*/}
                {/*    <br/>*/}
                {/*</div>*/}

                <div className="col-4">
                    Коментар
                    <textarea
                        defaultValue={props.entity.reportEn}
                        placeholder={""}
                        name={"reportEn"}
                        rows={6}
                        onBlur={(e) => onChangeHandler(e)}
                        onChange={(e) => onChangeHandler(e)}
                        className="form-control mb-3"
                    />
                    <br/>
                </div>

            </div>
        </div>
    )
}

export default IndicatorReportEditNew;