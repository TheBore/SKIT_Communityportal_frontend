import React from "react";
import {strings} from "../../Localization/Localization";

const AddLink = (props) => {

    return (
        <div>
            <div
                className="col">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.Url}</label>

                <input
                    required
                    name={"url"}
                    type={"text"}
                    value={props.entity.url || ""}
                    className="form-control"
                    onChange={props.handleChange}
                />
            </div>
        </div>
    );

};

export default AddLink;
