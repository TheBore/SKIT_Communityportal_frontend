import React, {Component} from "react";
import CrudModal from "../Crud/CrudModal";
import NAPRepository from "../../repository/NAPRepository";
import IndicatorReportRepository from "../../repository/IndicatorReportRepository";
import EvaluationRepository from "../../repository/EvaluationRepository";
import IndicatorReportAdd from "../IndicatorReport/IndicatorReportAdd";
import IndicatorReportEdit from "../IndicatorReport/IndicatorReportEdit";
import {toast} from "react-toastify";
import {strings} from "../../Localization/Localization";
import IndicatorRepository from "../../repository/IndicatorRepository";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltRight, faLongArrowAltLeft, faTimes, faCheck} from "@fortawesome/free-solid-svg-icons";
import IndicatorReportAddNew from "./IndicatorReportNew/IndicatorReportAddNew";
import IndicatorReportEditNew from "./IndicatorReportNew/IndicatorReportEditNew";


class IndicatorReport extends Component {
    constructor(props) {
        super(props);
        this.state={
            indicatorReport: props.indicatorReport,
            napId: props.napId,
            nap: {},
            activity: props.activity,
            evaluation: {},
            editedIndicatorReport: {}
        }
    }

    async componentWillMount() {

        let tmp;

        await IndicatorReportRepository.getAllByActivity(this.state.activity.id).then(res => {
            tmp = res.data
            tmp["activity"] = this.state.activity;
            tmp["dolz"] = res.data.length;
            this.setState({
                indicatorReports: res.data,
                editedIndicatorReport: tmp
            })
        })
        await NAPRepository.getNAPById(this.props.napId).then( res => {
            this.setState({
                nap: res.data
            })
        })
        await EvaluationRepository.getEvaluationByNapId(this.props.napId).then( res => {
            this.setState({
                evaluation: res.data
            })
        })
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    // There will be no need for Indicator Edit
    //
    //     // onEditIndicator = (entity) => {
    //     //     entity["activity"] = this.props.activityId;
    //     //     return IndicatorRepository.updateIndicator(entity, this.props.indicator.id).then( async res => {
    //     //         toast.success("Uspesna promena na Indikator")
    //     //         await this.sleep(2000);
    //     //         window.location.reload();
    //     //     }).catch( async err => {
    //     //         console.log(err)
    //     //         toast.error("Neuspesna promena na Indikator")
    //     //         await this.sleep(2000);
    //     //         window.location.reload();
    //     //     })
    //     // }

    onAddIndicatorReport = (entity) => {
        entity["activity"] = this.props.activity.id;
        entity["evaluation"] = this.state.evaluation.id;
        return IndicatorReportRepository.createIndicatorReport(entity).then( async res => {
            toast.success(strings.reportAddSuccess)
            await this.sleep(2000);
            window.location.reload();
        }).catch( async err => {
            toast.error(strings.reportAddNoSuccess)
            await this.sleep(2000);
            window.location.reload();
        })
    }

    onEditIndicatorReport = (entity) => {
        entity["activity"] = this.state.activity.id;
        entity["evaluation"] = this.state.evaluation.id;
        return IndicatorReportRepository.updateIndicatorReport(entity, this.state.indicator.id, this.state.evaluation.id).then( async res => {
            toast.success(strings.reportChangeSuccess)
            await this.sleep(2000);
            window.location.reload();
        }).catch( async err => {
            console.log(err)
            toast.error(strings.reportChangeNoSuccess)
            await this.sleep(2000);
            window.location.reload();
        })
    }

    checkForEditableReport = (indicatorReports) => {
        if (indicatorReports !== undefined) {
            for( let i = 0; i < indicatorReports.length; i++ ){
                if ( indicatorReports[i].evaluation.open === true){
                    return true;
                }
            }
        }
        return false;
    }

    getCurrentIndicatorReport = () => {
        if (this.state.indicatorReports !== undefined) {
            for (let i = 0; i < this.state.indicatorReports.length; i++){
                if (this.state.indicatorReports[i].evaluation.open === true){
                    return this.state.indicatorReports[i]
                }
            }
        }
        return null;
    }

    indicatorReportsAndStatus = () => {
        let tmp = this.state.indicatorReports;
        tmp["activity"] = this.state.activity;
        tmp["dolz"] = this.state.indicatorReports.length;
        this.setState({
            editedIndicatorReport: tmp
        })
    }

    updateIndicatorOnEvaluation = (entity) => {
        let tmp = [];
        tmp.push({id: entity.id, counter: entity.counter, finished: entity.finished, status: entity.status})
        IndicatorRepository.updateIndicatorOnEvaluation(tmp[0]).then( async res => {
            toast.success('Успешно додавање на извештај за индикаторот')
            await this.sleep(2000);
            window.location.reload();
        }).catch( async err => {
            toast.error('Неуспешно додавање на извештај за индикаторот')
            await this.sleep(2000);
            window.location.reload();
        })
    }

    render() {
        let statusUnderlineColor = null;
        let statusBackgroundColor = null;
        let checkEditableReport = this.checkForEditableReport(this.state.indicatorReports);
        let getCurrentIndicatorReport = this.getCurrentIndicatorReport();

        // if (this.state.indicator.status.statusMk === "Реализиран") {
        //     statusBackgroundColor = '#D9EAE2';
        //     statusUnderlineColor = '#5BB385';
        // }
        // if (this.state.indicator.status.statusMk === "Во подготовка") {
        //     statusBackgroundColor = '#FEF7E4';
        //     statusUnderlineColor = '#ECC673';
        // }
        // if (this.state.indicator.status.statusMk === "Нереализиран") {
        //     statusBackgroundColor = '#EED8E5';
        //     statusUnderlineColor = '#EB5658';
        // }

        let reportStatusUnderlineColor = null;
        let reportStatusBackgroundColor = null;


        if (this.state.indicatorReport === null) {
            reportStatusBackgroundColor = '#acd9ec';
            reportStatusUnderlineColor = '#0093d4';
        }
        if (this.state.indicatorReport !== null && this.state.indicatorReport.status.statusMk === "Прифатен") {
            reportStatusBackgroundColor = '#D9EAE2';
            reportStatusUnderlineColor = '#5BB385';
        }
        if (this.state.indicatorReport !== null && this.state.indicatorReport.status.statusMk === "Вратен на доработка") {
            reportStatusBackgroundColor = '#FEF7E4';
            reportStatusUnderlineColor = '#ECC673';
        }
        if (this.state.indicatorReport !== null && this.state.indicatorReport.status.statusMk === "Заклучен") {
            reportStatusBackgroundColor = '#EED8E5';
            reportStatusUnderlineColor = '#EB5658';
        }
        if (this.state.indicatorReport !== null && this.state.indicatorReport.status.statusMk === "Поднесен") {
            reportStatusBackgroundColor = '#f3e3c5';
            reportStatusUnderlineColor = '#cb7700';
        }

        // const indicatorValidations = (['nameMk', 'nameAl', 'nameEn', 'status', 'startDate']);
        // const indicatorReportValidations = (['reportMk', 'reportAl'])
        // const indicatorStatusValidation = (['status'])

        return (
            <tr key={this.state.indicatorReport.id} style={{border: "1px solid lightgray"}}>
                <td className="tableData firstData">{this.state.indicatorReport.reportMk}</td>
                {/*<td className="tableData">{this.state.indicatorReport.reportAl}</td>*/}
                <td className="tableData">{this.state.indicatorReport.reportEn}</td>
                <td className="tableData tableStatus">
                    <div style={{fontWeight: "bold", background: reportStatusBackgroundColor, color: reportStatusUnderlineColor,
                        padding: "5px", width: "85%", borderRadius: "15px", border: "2px solid " + reportStatusUnderlineColor}}>
                        {this.props.nap.openForEvaluation === true ?
                            <span>
                                {this.state.indicatorReport.status !== null ?
                                    <span>
                                        {localStorage.getItem("activeLanguage") === 'mk' ? this.state.indicatorReport.status.statusMk : this.state.indicatorReport.status.statusAl}
                                    </span> :
                                    ""
                                }
                            </span> : strings.noOpenEvaluation
                        }
                    </div>
                </td>
                <td className="tableData">
                    {localStorage.getItem("activeLanguage") === 'mk' ? this.state.indicatorReport.evaluation.descriptionMk : this.state.indicatorReport.evaluation.descriptionAl}
                </td>
            </tr>
        )
    }

}

export default IndicatorReport;