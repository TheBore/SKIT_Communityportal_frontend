import React, {useEffect, useState} from "react";
import StatusRepository from "../../repository/StatusRepository";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {strings} from "../../Localization/Localization";

const NAPAdd = (props) => {

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

    const setValidationErrors = () => {
        validation["descriptionMk"]=({error: false, name: 'descriptionMk', message: strings.fillDescMk})
    }

    useEffect(() => {
        setValidationErrors();
    }, []);

    return(
        <div className="container">
            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.evaluationDescriptionMk}
                </label>
                <input
                    required={true}
                    placeholder={""}
                    name={"descriptionMk"}
                    type={"text"}
                    onBlur={(e) => onChangeHandler(e)}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control mb-3"
                />
                <small style={{color: "red"}}>{validation["descriptionMk"] && validation["descriptionMk"].error && validation["descriptionMk"].message}</small>
            </div>

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    {strings.evaluationDescriptionAl}
                </label>

                <input
                    placeholder={""}
                    name={"descriptionAl"}
                    type={"text"}
                    onBlur={(e) => onChangeHandler(e)}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control mb-3"
                />
            </div>

            {/*<div className="col-12">*/}
            {/*    <label*/}
            {/*        className="weight400 text-upper control-label control-label-xl margin-top-10">*/}
            {/*        <small style={{color: "red"}}>*</small>*/}
            {/*        {strings.evaluationDescriptionEn}*/}
            {/*    </label>*/}

            {/*    <input*/}
            {/*        placeholder={""}*/}
            {/*        name={"descriptionEn"}*/}
            {/*        type={"text"}*/}
            {/*        onBlur={(e) => onChangeHandler(e)}*/}
            {/*        onChange={(e) => onChangeHandler(e)}*/}
            {/*        className="form-control mb-3"*/}
            {/*    />*/}
            {/*    <small style={{color: "red"}}>{validation["descriptionEn"] && validation["descriptionEn"].error && validation["descriptionEn"].message}</small>*/}
            {/*</div>*/}

        </div>
    )

}
export default NAPAdd;