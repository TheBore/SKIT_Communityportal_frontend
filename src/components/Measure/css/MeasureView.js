import React, {Component} from "react";
import {strings} from "../../../Localization/Localization";
import ActivityRepository from "../../../repository/ActivityRepository";

class MeasureView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities : [],
        }
    }

    componentDidMount() {
        ActivityRepository.getActivitiesByMeasureId(this.props.measure.id).then( res => {
            this.setState({
                activities: res.data,
            })
        }).catch( err => {
            console.log(err);
        })
    }

    render() {
        let key = 0;

        if(this.props.measure !== null){

            let statusUnderlineColor = null;

            if (this.props.measure.status.statusMk === "Реализиран") {
                statusUnderlineColor = '#5BB385';
            }
            if (this.props.measure.status.statusMk === "Во подготовка") {
                statusUnderlineColor = '#ECC673';
            }
            if (this.props.measure.status.statusMk === "Нереализиран") {
                statusUnderlineColor = '#EB5658';
            }

            let statusRealizedColor = '#5BB385';
            let statusInPreparationColor = '#ECC673';
            let statusNotRealizedColor = '#EB5658';

            let activityStatusRealized = 0;
            let activityStatusUnrealized = 0;
            let activityStatusInPreparation = 0;

            for(let i = 0; i < this.state.activities.length; i++){
                if (this.state.activities[i].status.statusMk === "Реализиран")
                    activityStatusRealized++;
                if (this.state.activities[i].status.statusMk === "Во подготовка")
                    activityStatusInPreparation++;
                if (this.state.activities[i].status.statusMk === "Нереализиран")
                    activityStatusUnrealized++;
            }

            return(
                <div>
                    <div className="row activity">
                        <div className="col-md-6" style={{ color: "black", padding: "10px"}}>
                            <div className="activityLeft">
                                <a href={`/measure/${this.props.measure.id}?napId=${this.props.nap.id}&problemId=${this.props.problemId}`} style={{color: "black", align: "left"}}>
                                    <b style={{fontSize: "20px", fontWeight: "700"}}>{this.props.measure.nameMk}</b>
                                </a>

                                <p style={{fontSize: "14px", paddingTop: "3px"}}>
                                    - Година за реализација: {this.props.measure.startDate} - {this.props.measure.endDate}
                                </p>
                                <p style={{fontSize: "14px", paddingTop: "3px"}}>
                                    - {strings.status}:&nbsp;
                                    <span style={{textDecoration: "underline solid " + statusUnderlineColor + " 3px"}}>
                                    {this.props.measure.status.statusMk}
                                </span>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-3" style={{padding: "10px", position: "relative"}}>
                            <div>
                                <b style={{fontSize: "20px", fontWeight: "700", color: "black"}}><span>{strings.activities}:</span></b>
                                <p style={{fontSize: "14px", color: "black"}}>- {strings.inPreparation}:
                                    <span style={{color: statusInPreparationColor, fontWeight: "bold"}}>&nbsp;{activityStatusInPreparation}</span>
                                </p>
                                <p style={{fontSize: "14px", color: "black"}}>- {strings.realized}:
                                    <span style={{color: statusRealizedColor, fontWeight: "bold"}}>&nbsp;{activityStatusRealized}</span>
                                </p>
                                <p style={{fontSize: "14px", color: "black"}}>- {strings.unrealized}:
                                    <span style={{color: statusNotRealizedColor, fontWeight: "bold"}}>&nbsp;{activityStatusUnrealized}</span>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-3" style={{position: "relative"}}>
                            <span className="badge badge-pill badge-primary" style={{fontWeight: "550",fontSize: "12px", float: "right", marginTop: "10px", background: "#03DAC5", color: "black"}}>
                                Мерка
                            </span>
                            <a  href={`/measure/${this.props.measure.id}?napId=${this.props.nap.id}&problemId=${this.props.problemId}`}
                                className="defaultBtn btn btn-primary justify-content-end text-right"
                                style={{float: "right", position: "absolute", bottom: "10px", right: "10px"}}>
                                Повеќе
                            </a>
                        </div>
                    </div>
                </div>
            )
        }
        else
            return null;
    }
}

export default MeasureView;