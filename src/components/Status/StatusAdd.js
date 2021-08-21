import React, {useState, useEffect} from "react";
import {strings} from "../../Localization/Localization";

const StatusAdd = (props) => {

    const onChangeHandler = (e) => {
        let target = e.target
        if (e.target.type === 'checkbox') {
            // onCheckHandler();
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            props.onChange(name,value);
        }
        else{
            props.onChange(e.target.name, e.target.value);
        }
        debugger
    };

    return(
        <div className="col-12">
            <div className="row">
                <div className="col-12 mt-2">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameMk}</label>
                    <input
                        required={true}
                        name={"statusMk"}
                        type={"text"}
                        placeholder={""}
                        className="form-control"
                        onChange={(e) => onChangeHandler(e)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-3">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameAl}</label>
                    <input
                        required={true}
                        name={"statusAl"}
                        type={"text"}
                        placeholder={""}
                        className="form-control"
                        onChange={(e) => onChangeHandler(e)}
                    />
                </div>
            </div>

            <div className="col-12 mt-4">
                <label style={{paddingRight: "10px"}}
                       className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    Дали може да се евалуира со овој статус?
                </label>

                <input
                    style={{margin: "10px", marginBottom: 0, transform: "scale(2)"}}
                    placeholder={""}
                    name={"isEvaluable"}
                    type={"checkbox"}
                    onBlur={(e) => onChangeHandler(e)}
                    onChange={(e) => onChangeHandler(e)}
                />
                {/*no need for validation*/}
            </div>

            <div className="row">
                <div className="col-12 mt-3">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.statType}</label>
                    <select
                        name={"statusType"}
                        className="form-control custom-select"
                        placeholder={""}
                        onChange={(e) => onChangeHandler(e)}
                    >
                        <option value="-1">{strings.chooseStatus}</option>
                        <option value="МЕРКА">{strings.measure}</option>
                        <option value="НАП">{strings.nap}</option>
                        <option value="ИНДИКАТОР">{strings.indicator}</option>
                        <option value="АКТИВНОСТ">{strings.activity}</option>
                        <option value="ИЗВЕШТАЈ">{strings.report}</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
export default StatusAdd;