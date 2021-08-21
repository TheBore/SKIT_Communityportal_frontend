import React, {useEffect, useState} from "react";
import EvaluationRepository from "../../repository/EvaluationRepository";
import IndicatorRepository from "../../repository/IndicatorRepository";
import Select from "react-select";
import StatusRepository from "../../repository/StatusRepository";
import { StickyContainer, Sticky } from 'react-sticky';
import "./css/IndicatorReport.css"
import {strings} from "../../Localization/Localization";


const IndicatorReportEdit = (props) => {

    const [indicatorReports, setIndicatorReports] = useState([]);
    const [indicator, setIndicator] = useState(null)

    const [statuses, setStatuses] = useState([])
    const [listStatuses, setListStatuses] = useState([])
    const [listReportStatuses, setListReportStatuses] = useState([])
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [selectedReportStatus, setSelectedReportStatus] = useState(null)

    const [flag, setFlag] = useState(0);

    const [validation] = useState([])

    const onChangeHandler = (e) => {
        const target = e.target;

        const value = target.value;
        const name = target.name;
        console.log("value", value);
        console.log("name", name);

        validation[name].error = value === null || value === '';

        props.onChange(name, value);
    };

    const getStatuses = () => {
        StatusRepository.getStatusesByType("ИНДИКАТОР").then(res => {
            //setStatuses(res.data)

            res.data.map(item => {
                listStatuses.push({value: item.id, label: localStorage.getItem("activeLanguage") === 'mk' ? item.statusMk : item.statusAl, name: "status"})
            })
        })
        StatusRepository.getStatusesByType("ИЗВЕШТАЈ").then(res => {
            //setStatuses(res.data)

            res.data.map(item => {
                listReportStatuses.push({value: item.id, label: localStorage.getItem("activeLanguage") === 'mk' ? item.statusMk : item.statusAl, name: "statusReport"})
            })
        })
    }

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

    const onSelectedStatusReportChangeHandler = (status) => {
        if(status !== null && status.type !== "blur"){
            props.onChange(status.name, status.value)
            validation["statusReport"].error = false;
            setSelectedReportStatus(status.value)
        }
        else{
            if (status === null || selectedStatus === null) {
                props.onChange("statusReport", null)
                validation["statusReport"].error = true;
                setSelectedReportStatus(null);
            }
        }
    }

    const setInds =  () => {
        if(flag === 0){
            setFlag(1);
            for (let i = 0; i < props.entity["dolz"]; i++){
                indicatorReports.push(props.entity[i])
            }
            indicatorReports.sort(function(a,b) {
                return ( a.evaluation.open === true ) ? -1 : 1;
            })
        }
        onSelectedStatusChangeHandler({
            value: props.entity.indicator.status.id,
            label: props.entity.indicator.status.statusMk,
            name: "status"
        });
        onSelectedStatusChangeHandler({
            value: indicatorReports[0].status.id,
            label: indicatorReports[0].status.statusMk,
            name: "statusReport"
        });
    }


    useEffect(   () => {
        setValidationErrors();
        setInds();
        setReports();
        getStatuses();
    }, []);

    const setValidationErrors = () => {
        validation["reportMk"]=({error: false, name: 'reportMk', message: strings.fillReportMk})
        validation["reportAl"]=({error: false, name: 'reportAl', message: strings.fillReportAl})
        validation["reportEn"]=({error: false, name: 'reportEn', message: strings.fillReportEn})
        validation["status"]=({error: false, name: 'status', message: strings.fillIndicatorStatus})
        validation["statusReport"]=({error: false, name: 'statusReport', message: strings.fillIndicatorStatusReport})
    }

    const setReports = () => {
        props.onChange("reportMk", indicatorReports[0].reportMk)
        props.onChange("reportAl", indicatorReports[0].reportAl)
        props.onChange("reportEn", indicatorReports[0].reportEn)
    }

    if (indicatorReports.length !== 0) {
        return (
            indicatorReports.map((item, index) => {
                if(index === 0){
                    return ( <div className="col-12">
                        <div className="row">
                            {/*<StickyContainer>*/}
                            {/*    <Sticky>*/}
                            <div className="col-8"/>

                            {localStorage.getItem('role') !== "ROLE_EVALUATOR" ?
                                <div className="col-4 fixedStatus">
                                    <label
                                        className="weight400 text-upper control-label control-label-xl margin-top-10">
                                        <small style={{color: "red"}}>*</small>
                                        INDICATOR Status
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
                                        defaultValue={props.entity.indicator !== null && props.entity.indicator !== undefined ? {
                                            value: props.entity.indicator.status.id,
                                            label: props.entity.indicator.status.statusMk,
                                            name: "status"
                                        } : ""}
                                    />
                                    <small style={{color: "red"}}>{validation["status"] && validation["status"].error && validation["status"].message}</small>
                                    <br/>
                                </div>
                                : ""
                            }

                            {localStorage.getItem('role') !== "ROLE_EVALUATOR" ?
                                <div>
                                    <div className="col-4"/>
                                    <div className="col-4 fixedStatus">
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
                                                value: indicatorReports[0].status.id,
                                                label: indicatorReports[0].status.statusMk,
                                                name: "statusReport"
                                            } : ""}
                                        />
                                        <small style={{color: "red"}}>{validation["statusReport"] && validation["statusReport"].error && validation["statusReport"].message}</small>
                                        <br/>
                                    </div>
                                </div>
                                : ""
                            }


                            <div className="col-12" style={{marginTop: localStorage.getItem('role') === "ROLE_EVALUATOR" ? "0" : "81px"}}>
                                <label
                                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                                    {strings.firstAndLastName}: {item.createdByUser ? item.createdByUser.firstName + " " + item.createdByUser.lastName : ""}
                                </label>
                                <br/>
                                <label
                                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                                    {strings.dateCreated}: {item.dateCreated}
                                </label>
                                <br/>
                                <label
                                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                                    {strings.evaluationPlan}: {item.evaluation.descriptionMk !== null ? item.evaluation.descriptionMk : ""}
                                </label>
                                <br/>
                            </div>
                            <div className="col-4">
                                Mk
                                <textarea
                                    defaultValue={item.reportMk}
                                    name={"reportMk"}
                                    placeholder={""}
                                    rows={6}
                                    onBlur={(e) => onChangeHandler(e)}
                                    onChange={(e) => onChangeHandler(e)}
                                    className="form-control mb-3"
                                />
                            </div>
                            <div className="col-4">
                                Al
                                <textarea
                                    defaultValue={item.reportAl}
                                    name={"reportAl"}
                                    placeholder={""}
                                    rows={6}
                                    onBlur={(e) => onChangeHandler(e)}
                                    onChange={(e) => onChangeHandler(e)}
                                    className="form-control mb-3"
                                />
                            </div>
                            {localStorage.getItem('role') === "ROLE_EVALUATOR" ?
                                <div className="col-4">
                                    {strings.comment}:
                                    <textarea
                                        disabled
                                        defaultValue={item.reportEn}
                                        name={"reportEn"}
                                        placeholder={""}
                                        rows={6}
                                        onBlur={(e) => onChangeHandler(e)}
                                        onChange={(e) => onChangeHandler(e)}
                                        className="form-control mb-3"
                                    />
                                </div> :
                                <div className="col-4">
                                    {strings.comment}:
                                    <textarea
                                        defaultValue={item.reportEn}
                                        name={"reportEn"}
                                        placeholder={""}
                                        rows={6}
                                        onBlur={(e) => onChangeHandler(e)}
                                        onChange={(e) => onChangeHandler(e)}
                                        className="form-control mb-3"
                                    />
                                </div>
                            }

                            <hr/>
                        </div>
                    </div>)
                }


                return (
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12">
                                <label
                                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                                    {strings.firstAndLastName}: {item.createdByUser ? item.createdByUser.firstName + " " + item.createdByUser.lastName : ""}
                                </label>
                                <br/>
                                <label
                                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                                    {strings.dateCreated}: {item.dateCreated}
                                </label>
                                <br/>
                                <label
                                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                                    {strings.evaluationPlan}: {item.evaluation.descriptionMk !== null ? item.evaluation.descriptionMk : ""}
                                </label>
                                <br/>
                            </div>
                            <div className="col-4">
                                Mk
                                <textarea
                                    disabled
                                    defaultValue={item.reportMk}
                                    name={"reportMk" + index}
                                    placeholder={""}
                                    rows={6}
                                    onBlur={(e) => onChangeHandler(e)}
                                    onChange={(e) => onChangeHandler(e)}
                                    className="form-control mb-3"
                                />
                            </div>
                            <div className="col-4">
                                Al
                                <textarea
                                    disabled
                                    defaultValue={item.reportAl}
                                    name={"reportAl" + index}
                                    placeholder={""}
                                    rows={6}
                                    onBlur={(e) => onChangeHandler(e)}
                                    onChange={(e) => onChangeHandler(e)}
                                    className="form-control mb-3"
                                />
                            </div>
                            <div className="col-4">
                                En
                                <textarea
                                    disabled
                                    defaultValue={item.reportEn}
                                    placeholder={""}
                                    name={"reportEn" + index}
                                    rows={6}
                                    onBlur={(e) => onChangeHandler(e)}
                                    onChange={(e) => onChangeHandler(e)}
                                    className="form-control mb-3"
                                />
                            </div>
                            <hr/>
                        </div>
                    </div>
                )
            })
        )
    }
    else {
        return (
            <div className="col-12">
                <div className="row">
                    <div className="col-4">
                        {strings.reportInMk}
                        <textarea
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
                    <div className="col-4">
                        {strings.reportInAl}
                        <textarea
                            placeholder={""}
                            name={"reportAl"}
                            rows={6}
                            onBlur={(e) => onChangeHandler(e)}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                        <small style={{color: "red"}}>{validation["reportAl"] && validation["reportAl"].error && validation["reportAl"].message}</small>
                        <br/>
                    </div>
                    <div className="col-4">
                        {strings.reportInEn}
                        <textarea
                            placeholder={""}
                            name={"reportEn"}
                            rows={6}
                            onBlur={(e) => onChangeHandler(e)}
                            onChange={(e) => onChangeHandler(e)}
                            className="form-control mb-3"
                        />
                        <small style={{color: "red"}}>{validation["reportEn"] && validation["reportEn"].error && validation["reportEn"].message}</small>
                        <br/>
                    </div>
                    <hr/>
                </div>
            </div>
        )
    }

}

export default IndicatorReportEdit;