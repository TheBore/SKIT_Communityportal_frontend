import {strings} from "../../Localization/Localization";
import React from "react";

const StrategyGoalAdd = (props) => {
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
                        required={true}
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
                        required={true}
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
                        required={true}
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
                        required={true}
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

export default StrategyGoalAdd;