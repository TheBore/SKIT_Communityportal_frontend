import React from "react";
import {strings} from "../../Localization/Localization";

const AddPdf = (props) => {
    const handleFileChange = (e) => {

        props.handleChange(e, e.target.files[0]);
    }

    return (
        <div>
            <div
                className="col">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.pdfDoc}</label>

                <input
                    required
                    id="attachment"
                    name={"attachment"}
                    type={"file"}
                    className="form-control"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );

};

export default AddPdf;
