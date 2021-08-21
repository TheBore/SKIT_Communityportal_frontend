import React, {useEffect, useState} from "react";
import StatusRepository from "../../repository/StatusRepository";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {strings} from "../../Localization/Localization";

const EvaluationOpenClose = (props) => {
    return(
        <div>
            <h5 style={{color: "black"}}>
                {strings.doYouWantToCloseEvaluation}
            </h5>
        </div>
    )
}
export default EvaluationOpenClose;