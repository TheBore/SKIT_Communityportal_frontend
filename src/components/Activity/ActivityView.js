import React, {Component} from "react";
import IndicatorRepository from "../../repository/IndicatorRepository";
import "./css/ActivityView.css"
import {Link} from "react-router-dom";
import Activity from "./Activity"
import {strings} from "../../Localization/Localization";
import IndicatorReportRepository from "../../repository/IndicatorReportRepository";

class ActivityView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indicators: [],
            activity: props.activity,
            indicatorReports: [],
        }
    }

    componentDidMount() {
        IndicatorRepository.getAllIndicatorsByActivityId(this.state.activity.id).then( res => {
            this.setState({
                indicators: res.data
            })
        })
        IndicatorReportRepository.getAllByActivity(this.state.activity.id).then( res => {
            this.setState({
                indicatorReports: res.data
            })
        })
    }

    render() {
        let key = 0;

        if(this.state.activity !== null){
            let statusUnderlineColor = null;

            let statusRealized = 0;
            let statusUnrealized = 0;
            let statusInPreparation = 0;

            let reportStatusRealized = 0;
            let reportStatusUnrealized = 0;
            let reportStatusInPreparation = 0;

            let statusRealizedColor = '#5BB385';
            let statusInPreparationColor = '#ECC673';
            let statusNotRealizedColor = '#EB5658';

            if (this.state.activity.status.statusMk === "Реализиран") {
                statusUnderlineColor = '#5BB385';
            }
            if (this.state.activity.status.statusMk === "Во подготовка") {
                statusUnderlineColor = '#ECC673';
            }
            if (this.state.activity.status.statusMk === "Нереализиран") {
                statusUnderlineColor = '#EB5658';
            }

            for(let i = 0; i < this.state.indicators.length; i++){
                if (this.state.indicators[i].status.statusMk === "Реализиран")
                    statusRealized++;
                if (this.state.indicators[i].status.statusMk === "Во подготовка")
                    statusInPreparation++;
                if (this.state.indicators[i].status.statusMk === "Нереализиран")
                    statusUnrealized++;
            }

            for(let i = 0; i < this.state.indicatorReports.length; i++){
                if (this.state.indicatorReports[i].status.statusMk === "Реализиран")
                    reportStatusRealized++;
                if (this.state.indicatorReports[i].status.statusMk === "Во подготовка")
                    reportStatusInPreparation++;
                if (this.state.indicatorReports[i].status.statusMk === "Нереализиран")
                    reportStatusUnrealized++;
            }

            return(
                <div>
                    <div className="row activity">
                        <div className="col-md-6" style={{ color: "black", padding: "10px"}}>
                            <div className="activityLeft">
                                {localStorage.getItem("activeLanguage") === 'mk'
                                ?
                                    <p style={{color: "black", align: "left"}}>
                                        <b style={{fontSize: "20px", fontWeight: "700"}}>{this.state.activity.nameMk}</b>
                                    </p>
                                :
                                    <p style={{color: "black", align: "left"}}>
                                        <b style={{fontSize: "20px", fontWeight: "700"}}>{this.state.activity.nameAl}</b>
                                    </p>
                                }

                                <p style={{fontSize: "14px", paddingTop: "3px"}}>
                                    - {strings.deadlineForRealization}:
                                    {this.state.activity.activityDateType !== "NOTDEFINED" ? (this.state.activity.activityDateType === "FIRSTHALF" ? "прва половина" : "втора половина") : " "} {this.state.activity.yearDate ? " - " + this.state.activity.yearDate : ""}{this.state.activity.continuously ? ", континуирано" : ""}
                                </p>
                                <p style={{fontSize: "14px", paddingTop: "3px"}}>
                                    - {strings.financialImplications}:&nbsp;
                                    <span style={{textDecoration: "underline solid black 2px"}}>
                                    {this.state.activity.financialImplications ? strings.has : strings.hasNot}
                                </span>
                                </p>
                                <p style={{fontSize: "14px", paddingTop: "3px"}}>
                                    - {strings.status}:&nbsp;
                                    <span style={{textDecoration: "underline solid " + statusUnderlineColor + " 3px"}}>
                                        {localStorage.getItem("activeLanguage") === 'mk'
                                            ?
                                            this.state.activity.status.statusMk
                                            :
                                            this.state.activity.status.statusAl }

                                </span>
                                </p>
                                <p style={{fontSize: "14px", paddingTop: "3px"}}>
                                    - {strings.competentInstitution}: <br/>
                                    {localStorage.getItem("activeLanguage") === 'mk'
                                    ?
                                        <span style={{fontWeight: "bold"}}>
                                            &nbsp; &nbsp; &nbsp; - {this.state.activity.competentInstitution ? this.state.activity.competentInstitution.nameMk : ""}
                                        </span>
                                    :
                                        <span style={{fontWeight: "bold"}}>
                                            &nbsp; &nbsp; &nbsp; - {this.state.activity.competentInstitution ? this.state.activity.competentInstitution.nameAl : ""}
                                        </span>
                                    }

                                </p>
                                <p style={{fontSize: "14px", paddingTop: "3px"}}>
                                    - {strings.includedInstitutions}:
                                    {this.state.activity.activityInstitutions.map((item,index) => {
                                        return(
                                            <span key={item.id}>
                                                <br/>
                                                &nbsp; &nbsp; &nbsp; - {localStorage.getItem("activeLanguage") === 'mk'
                                                                        ?
                                                                        item.nameMk
                                                                        :
                                                                        item.nameAl}
                                            </span>
                                        )
                                    })}
                                </p>
                                <a href={`/activity/${this.state.activity.id}?measureId=${this.state.activity.measure.id}&napId=${this.state.activity.measure.problem.nap.id}&problemId=${this.state.activity.measure.problem.id}`}
                                   className="defaultBtn btn btn-sm btn-light justify-content-end text-right"
                                   style={{float: "right", marginTop: "10px", marginRight: "10px", backgroundColor: "#E2E6EA"}}>
                                    {strings.more}
                                </a>
                            </div>
                        </div>
                        <div className="col-md-3" style={{padding: "10px", position: "relative"}}>
                            <div className="activityLeft">
                                <b style={{fontSize: "20px", fontWeight: "700", color: "black"}}><span>{strings.indicators}:</span></b>
                                <p style={{fontSize: "14px", color: "black"}}>- {strings.inPreparation}:
                                    <span style={{color: statusInPreparationColor, fontWeight: "bold"}}>&nbsp;{statusInPreparation}</span>
                                </p>
                                <p style={{fontSize: "14px", color: "black"}}>- {strings.realized}:
                                    <span style={{color: statusRealizedColor, fontWeight: "bold"}}>&nbsp;{statusRealized}</span>
                                </p>
                                <p style={{fontSize: "14px", color: "black"}}>- {strings.unrealized}:
                                    <span style={{color: statusNotRealizedColor, fontWeight: "bold"}}>&nbsp;{statusUnrealized}</span>
                                </p>
                                <a href={`/indicators/${this.state.activity.id}?measureId=${this.state.activity.measure.id}&napId=${this.state.activity.measure.problem.nap.id}&problemId=${this.state.activity.measure.problem.id}`}
                                   className="defaultBtn btn btn-sm btn-primary justify-content-end text-right"
                                   style={{float: "right", position: "absolute", bottom: "10px", right: "10px"}}>
                                    {strings.indicators}
                                </a>
                            </div>
                        </div>

                        <div className="col-md-3" style={{padding: "10px", position: "relative"}}>
                            <div>
                                <b style={{fontSize: "20px", fontWeight: "700", color: "black"}}><span>{strings.allReports}:</span></b>
                                <p style={{fontSize: "14px", color: "black"}}>- {strings.inPreparation}:
                                    <span style={{color: statusInPreparationColor, fontWeight: "bold"}}>&nbsp;{reportStatusInPreparation}</span>
                                </p>
                                <p style={{fontSize: "14px", color: "black"}}>- {strings.realized}:
                                    <span style={{color: statusRealizedColor, fontWeight: "bold"}}>&nbsp;{reportStatusRealized}</span>
                                </p>
                                <p style={{fontSize: "14px", color: "black"}}>- {strings.unrealized}:
                                    <span style={{color: statusNotRealizedColor, fontWeight: "bold"}}>&nbsp;{reportStatusUnrealized}</span>
                                </p>
                                <a href={`/indicatorReports/${this.state.activity.id}?measureId=${this.state.activity.measure.id}&napId=${this.state.activity.measure.problem.nap.id}&problemId=${this.state.activity.measure.problem.id}`}
                                   className="defaultBtn btn btn-sm btn-info justify-content-end text-right"
                                   style={{float: "right", position: "absolute", bottom: "10px", right: "10px"}}>
                                    {strings.allReports}
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            )
        }
        else
            return null;
    }
}

export default ActivityView;