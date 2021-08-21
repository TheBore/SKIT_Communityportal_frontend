import React, {useEffect, useState} from "react";
import {strings} from "../../Localization/Localization";

const IndicatorReportsList = (props) => {

    const [indicatorReports, setIndicatorReports] = useState([]);

    const onChangeHandler = (e) => {

    };

    for (const report in props.entity){
        indicatorReports.push(props.entity[report])
    }

    return (
        indicatorReports.map((item, index) => {
            console.log("i", item)
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
                                placeholder={""}
                                name={"reportMk"}
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
                                placeholder={""}
                                name={"reportMk"}
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
                                name={"reportMk"}
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


        // })
    // }
}

export default IndicatorReportsList;