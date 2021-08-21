import React, {useEffect, useState} from "react";
import {strings} from "../../../Localization/Localization";

const IndicatorReportAddNew = (props) => {

    const [validation] = useState([])

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

    useEffect(() => {
        setValidationErrors();
    }, []);

    const setValidationErrors = () => {
        validation["reportMk"]=({error: false, name: 'reportMk', message: 'Please fill report mk'})
    }

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

                {/*<div className="col-4">*/}
                {/*    {strings.reportInAl}*/}
                {/*    <textarea*/}
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
                    Коментар:
                    <textarea
                        disabled
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

export default IndicatorReportAddNew;