import React, {Component} from "react";
import CrudModal from "../Crud/CrudModal";
import NAPRepository from "../../repository/NAPRepository";
import IndicatorReportRepository from "../../repository/IndicatorReportRepository";
import EvaluationRepository from "../../repository/EvaluationRepository";
import IndicatorReportAdd from "../IndicatorReport/IndicatorReportAdd";
import IndicatorReportEdit from "../IndicatorReport/IndicatorReportEdit";
import {toast} from "react-toastify";
import {strings} from "../../Localization/Localization";
import IndicatorUpdate from "./IndicatorUpdate";
import IndicatorRepository from "../../repository/IndicatorRepository";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltRight, faLongArrowAltLeft, faTimes, faCheck} from "@fortawesome/free-solid-svg-icons";


class Indicator extends Component {
    constructor(props) {
        super(props);
        this.state={
            indicator: props.indicator,
            indicatorReports: [],
            napId: props.napId,
            nap: {},
            evaluation: {},
            editedIndicatorReport: {},
        }
    }

    async componentDidMount() {

        let tmp;

        await IndicatorReportRepository.getAllByActivity(this.props.activity.id).then(res => {
            tmp = res.data
            tmp["indicator"] = this.state.indicator;
            tmp["dolz"] = res.data.length;
            this.setState({
                indicatorReports: res.data,
                editedIndicatorReport: tmp
            })
        })
        await NAPRepository.getNAPById(this.props.nap.id).then( res => {
            this.setState({
                nap: res.data
            })
        })
        await EvaluationRepository.getEvaluationByNapId(this.props.nap.id).then( res => {
            this.setState({
                evaluation: res.data
            })
        })
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    updateIndicatorOnEvaluation = (entity) => {
        let tmp = [];
        tmp.push({id: entity.id, counter: entity.counter, finished: entity.finished, status: entity.status})
        IndicatorRepository.updateIndicatorOnEvaluation(tmp[0]).then( async res => {
            toast.success(strings.addReportForIndicatorSuccess)
            await this.sleep(2000);
            window.location.reload();
        }).catch( async err => {
            toast.error(strings.addReportForIndicatorNoSuccess)
            await this.sleep(2000);
            window.location.reload();
        })
    }

    render() {
        let statusUnderlineColor = null;
        let statusBackgroundColor = null;

        if (this.state.indicator.status.statusMk === "Реализиран") {
            statusBackgroundColor = '#D9EAE2';
            statusUnderlineColor = '#5BB385';
        }
        if (this.state.indicator.status.statusMk === "Во подготовка") {
            statusBackgroundColor = '#FEF7E4';
            statusUnderlineColor = '#ECC673';
        }
        if (this.state.indicator.status.statusMk === "Нереализиран") {
            statusBackgroundColor = '#EED8E5';
            statusUnderlineColor = '#EB5658';
        }

        //const indicatorValidations = (['nameMk', 'nameAl', 'nameEn', 'status', 'startDate']);

        const indicatorReportValidations = (['reportMk', 'reportAl'])

        const indicatorStatusValidation = (['status'])

        return (
            <tr key={this.state.indicator.id} style={{border: "1px solid lightgray"}}>
                <td className="tableData firstData">{this.state.indicator.nameMk}</td>
                <td className="tableData">{this.state.indicator.startDate}</td>
                {localStorage.getItem("activeLanguage") === 'mk'
                ?
                    <td className="tableData">{this.state.indicator.institution ? this.state.indicator.institution.nameMk : ""}</td>
                :
                    <td className="tableData">{this.state.indicator.institution ? this.state.indicator.institution.nameAl : ""}</td>
                }
                <td className="tableData">{this.state.indicator.indicatorType}</td>
                <td className="tableData" style={{textAlign: "center"}}>{this.state.indicator.finished !== null
                    ? (this.state.indicator.finished
                        ? <FontAwesomeIcon icon={faCheck} style={{color: "green"}} size={'2x'}/>
                        : <FontAwesomeIcon icon={faTimes} style={{color: "red"}} size={'2x'}/>)
                    : <FontAwesomeIcon icon={faLongArrowAltRight} size={'2x'}/>}
                </td>
                <td className="tableData" style={{textAlign: "center"}}>
                    {this.state.indicator.counter
                        ? this.state.indicator.counter
                        : <FontAwesomeIcon icon={faLongArrowAltLeft} size={'2x'}/>}
                </td>
                <td className="tableData tableStatus">
                    <div style={{fontWeight: "bold", background: statusBackgroundColor, color: statusUnderlineColor,
                        padding: "5px", width: "85%", borderRadius: "15px", border: "2px solid " + statusUnderlineColor}}>
                        {localStorage.getItem("activeLanguage") === 'mk' ? this.state.indicator.status.statusMk : this.state.indicator.status.statusAl}
                    </div>
                </td>
                <td className="tableData">
                    {localStorage.getItem('role') === 'ROLE_ADMIN'
                    || (localStorage.getItem('role') === 'ROLE_EVALUATOR' &&
                        localStorage.getItem('institutionId') === this.props.activity.competentInstitution.institution.id.toString())
                    ?
                            <div style={{display: "inline"}} key={this.state.indicator.id}>
                                {this.props.nap.openForEvaluation === true ?
                                    <CrudModal
                                        entity={this.state.indicator}
                                        icon={'add'}
                                        btnClass={'indicatorReports'}
                                        title={strings.report}
                                        showText={true}
                                        onSubmit={this.updateIndicatorOnEvaluation}
                                        body={IndicatorUpdate}
                                    />
                                    : <i>{strings.noOpenEvaluation}</i>}
                            </div>

                    : ""}
                </td>

                {/*<td className="tableData tableStatus">*/}
                {/*    <div style={{fontWeight: "bold", background: reportStatusBackgroundColor, color: reportStatusUnderlineColor,*/}
                {/*        padding: "5px", width: "85%", borderRadius: "15px", border: "2px solid " + reportStatusUnderlineColor}}>*/}
                {/*        {this.state.evaluation.open === true ?*/}
                {/*            <span>*/}
                {/*                {getCurrentIndicatorReport !== null ?*/}
                {/*                    <span>*/}
                {/*                        {localStorage.getItem("activeLanguage") === 'mk' ? getCurrentIndicatorReport.status.statusMk : getCurrentIndicatorReport.status.statusAl}*/}
                {/*                    </span> :*/}
                {/*                    strings.noReports*/}
                {/*                }*/}
                {/*            </span> : strings.noOpenEvaluation*/}
                {/*        }*/}
                {/*    </div>*/}
                {/*</td>*/}
            </tr>
        )
    }

}

export default Indicator;