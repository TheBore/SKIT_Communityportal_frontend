import React, {useState, useEffect} from "react";
import {strings} from "../../Localization/Localization";

const AreaOfInterestEdit = (props) => {
    const onChangeHandler = (e) => {
        props.onChange(e.target.name, e.target.value);
    };

    return(
        <div className="col-12">
            <div className="row">
                <div className="col-12 mt-2">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameMk}</label>
                    <input
                        defaultValue={props.entity.nameMk ? props.entity.nameMk : ""}
                        name={"nameMk"}
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
                        defaultValue={props.entity.nameAl ? props.entity.nameAl : ""}
                        name={"nameAl"}
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
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.descMk}</label>
                    <textarea
                        defaultValue={props.entity.descriptionMk ? props.entity.descriptionMk : ""}
                        name={"descriptionMk"}
                        rows={3}
                        placeholder={""}
                        className="form-control"
                        onChange={(e) => onChangeHandler(e)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-3">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.descAl}</label>
                    <textarea
                        defaultValue={props.entity.descriptionAl ? props.entity.descriptionAl : ""}
                        name={"descriptionAl"}
                        rows={3}
                        placeholder={""}
                        className="form-control"
                        onChange={(e) => onChangeHandler(e)}
                    />
                </div>
            </div>
        </div>
    )

}

export default AreaOfInterestEdit;