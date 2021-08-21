import React, {useEffect, useState} from "react";
import {strings} from "../../Localization/Localization";

const IndicatorReportAdd = (props) => {

    const [indicatorReports, setIndicatorReports] = useState([]);

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

    if(flag === 0){
        debugger
        setFlag(1);
        for (const report in props.entity){
            if(report !== "indicator" && report !== "dolz"){
                indicatorReports.push(props.entity[report])
            }
        }
    }

    useEffect(() => {
        setValidationErrors();
    }, []);

    const setValidationErrors = () => {
        validation["reportMk"]=({error: false, name: 'reportMk', message: 'Please fill report mk'})
        validation["reportAl"]=({error: false, name: 'reportAl', message: 'Please fill report al'})
    }

    debugger

    if (indicatorReports.length !== 0) {
        return (
            indicatorReports.map((item, index) => {
                if(index === 0){
                    return ( <div className="col-12">
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
                                    disabled
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
                                Коментар
                                <textarea
                                    disabled
                                    defaultValue={item.reportEn}
                                    name={"reportEn" + index}
                                    placeholder={""}
                                    rows={6}
                                    onBlur={(e) => onChangeHandler(e)}
                                    onChange={(e) => onChangeHandler(e)}
                                    className="form-control mb-3"
                                />
                            </div>
                            <hr/>
                        </div>
                    </div>)
                }

                else {
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
                                    Коментар
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
                }
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
                            disabled
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

export default IndicatorReportAdd;