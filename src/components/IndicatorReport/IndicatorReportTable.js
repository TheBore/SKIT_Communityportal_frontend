import React, {Component} from "react";
import IndicatorRepository from "../../repository/IndicatorRepository";
import ActivityRepository from "../../repository/ActivityRepository";
import NAPRepository from "../../repository/NAPRepository";
import MeasureRepository from "../../repository/MeasureRepository";
import EvaluationRepository from "../../repository/EvaluationRepository";
import CrudModal from "../Crud/CrudModal";
import "../Activity/css/Activity.css";
import {toast} from "react-toastify";
import IndicatorAdd from "../Indicator/IndicatorAdd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faCalendarAlt, faThList, faClipboard, faFileAlt} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';
import Indicator from "../Indicator/Indicator";
import ProblemRepository from "../../repository/ProblemRepository";
import ActivityEdit from "../Activity/ActivityEdit";
import IndicatorReportRepository from "../../repository/IndicatorReportRepository";
import IndicatorReport from "./IndicatorReport";
import IndicatorReportEditNew from "./IndicatorReportNew/IndicatorReportEditNew";
import IndicatorReportAddNew from "./IndicatorReportNew/IndicatorReportAddNew";
import {strings} from "../../Localization/Localization";

class IndicatorReportTable extends Component {
    constructor(props) {
        let searchParams = new URLSearchParams(props.location.search);
        super(props);
        this.state = {
            activityId: this.props.match.params.id,
            activity: {},
            indicatorReports: [],
            napId: searchParams.get('napId'),
            measureId: searchParams.get('measureId'),
            problemId: searchParams.get('problemId'),
            problem: {},
            nap: {},
            measure: {},
            showDesc: false,
            pageCount: 0,
            currentIndicatorId: {},
            evaluation: {},
            status: {}
        }
    }

    componentDidMount() {
        NAPRepository.getNAPById(this.state.napId).then( res => {
            this.setState({
                nap: res.data
            })
        })
        MeasureRepository.getMeasureById(this.state.measureId).then( res => {
            this.setState({
                measure: res.data
            })
        })
        ActivityRepository.getActivityById(this.state.activityId).then( res => {
            this.setState({
                activity: res.data,
                status: res.data.status
            })
        })
        EvaluationRepository.getEvaluationByNapId(this.state.napId).then ( res => {
            this.setState({
                evaluation: res.data
            })
        })
        ProblemRepository.findProblemById(this.state.problemId).then( res => {
            this.setState({
                problem: res.data
            })
        })

        this.fetchIndicatorReports();
    }

    handlePageClick = async data => {
        await this.fetchIndicatorReports(data.selected);
    };

    fetchIndicatorReports = (selectedPage = 0) => {
        IndicatorReportRepository.getAllIndicatorReportsPageByActivityId(this.state.activityId, selectedPage).then( res => {
            this.setState({
                indicatorReports: res.data.content,
                pageCount: res.data.totalPages
            })
        })
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    onEditActivity = (entity) => {
        entity["measure"] = null;
        return ActivityRepository.updateActivity(entity, this.state.activity.id).then( async res => {
            toast.success(strings.editActivitySuccess);
            await this.sleep(2000);
            window.location.reload();
        }).catch( async err => {
            toast.error(strings.editActivityNoSuccess);
            console.log(err);
            await this.sleep(2000);
            window.location.reload();
        })
    }

    onAddIndicatorReport = (entity) => {
        entity["activity"] = this.state.activity.id;
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
        entity["status"] = null;
        entity["activity"] = this.state.activity.id;
        entity["evaluation"] = this.state.evaluation.id;
        return IndicatorReportRepository.updateIndicatorReport(entity, this.state.activity.id, this.state.evaluation.id).then( async res => {
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

    showDescription = () => {
        if (this.state.showDesc === true)
        {
            this.setState({
                showDesc: false
            })
        }
        else {
            this.setState({
                showDesc: true
            })
        }
    }

    checkForEditableReport = (indicatorReports) => {
        for( let i = 0; i < indicatorReports.length; i++ ){
            if ( indicatorReports[i].evaluation.open === true){
                return true;
            }
        }
        return false;
    }

    getCurrentIndicatorReport = () => {
        for (let i = 0; i < this.state.indicatorReports.length; i++){
            if (this.state.indicatorReports[i].evaluation.open === true){
                return this.state.indicatorReports[i]
            }
        }
        return null;
    }


    render() {
        let checkEditableReport = this.checkForEditableReport(this.state.indicatorReports);
        let getCurrentIndicatorReport = this.getCurrentIndicatorReport();

        const activityValidations = (['nameMk', 'status', 'financialImplications', 'competentInstitution']);

        let statusUnderlineColor = null;

        if (this.state.activity.status !== undefined){
            if (this.state.activity.status.statusMk === "Реализиран") {
                statusUnderlineColor = '#5BB385';
            }
            if (this.state.activity.status.statusMk === "Во подготовка") {
                statusUnderlineColor = '#ECC673';
            }
            if (this.state.activity.status.statusMk === "Нереализиран") {
                statusUnderlineColor = '#EB5658';
            }
        }

        if(this.state.activity !== null){
            return(
                <div className="container-fluid">
                    <div className="row">
                        <div className={"col-md-9"}>
                            <nav aria-label="breadcrumb" style={{marginBottom: "15px"}}>
                                <ol className="breadcrumb"
                                    style={{background: "none", fontSize: "130%", paddingLeft: 0, paddingBottom: 0, marginBottom: 0}}>
                                    <div style={{background: "#67C4EF",borderRadius: "0 20px 20px 0", display: "inherit"}}>
                                        <div style={{color: "black"}}  className="customBreadcrumb">
                                            <FontAwesomeIcon icon={faThList}/>
                                            &nbsp;&nbsp;
                                            <a title={strings.nap} style={{color: "black"}} href={"/naps"}>{strings.nap}</a>
                                        </div>
                                        <div className="customBreadcrumb"
                                             style={{color: "black", width: "200px", marginLeft: "4px"}}>
                                            <FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp;
                                            {localStorage.getItem("activeLanguage") === 'mk'
                                            ?
                                                <a title={this.state.nap.nameMk} style={{color: "black"}} href={`/nap/${this.state.nap.id}`}>{this.state.nap.nameMk}</a>
                                            :
                                                <a title={this.state.nap.nameAl} style={{color: "black"}} href={`/nap/${this.state.nap.id}`}>{this.state.nap.nameAl}</a>
                                            }
                                        </div>
                                        <div className="customBreadcrumb"
                                             style={{color: "black", width: "200px", marginLeft: "4px"}}>
                                            <FontAwesomeIcon icon={faCalendar}/>&nbsp;&nbsp;
                                            {localStorage.getItem("activeLanguage") === 'mk'
                                            ?
                                                <a title={this.state.problem.nameMk} style={{color: "black"}} href={`/problem/${this.state.problem.id}?napId=${this.state.nap.id}`}>{this.state.problem.nameMk}</a>
                                            :
                                                <a title={this.state.problem.nameAl} style={{color: "black"}} href={`/problem/${this.state.problem.id}?napId=${this.state.nap.id}`}>{this.state.problem.nameAl}</a>
                                            }

                                        </div>
                                        <div className="customBreadcrumb"
                                             style={{color: "black",width: "200px", marginLeft: "4px"}}>
                                            <FontAwesomeIcon icon={faClipboard}/>&nbsp;&nbsp;
                                            {localStorage.getItem("activeLanguage") === 'mk'
                                            ?
                                                <a title={this.state.measure.nameMk} style={{color: "black"}} href={`/measure/${this.state.measure.id}?napId=${this.state.nap.id}&problemId=${this.state.problem.id}`}>{this.state.measure.nameMk}</a>
                                            :
                                                <a title={this.state.measure.nameAl} style={{color: "black"}} href={`/measure/${this.state.measure.id}?napId=${this.state.nap.id}&problemId=${this.state.problem.id}`}>{this.state.measure.nameAl}</a>
                                            }

                                        </div>
                                        <div className="customBreadcrumb"
                                             style={{width: "200px", marginLeft: "4px"}}>
                                            <FontAwesomeIcon icon={faFileAlt}/>&nbsp;&nbsp;
                                            {localStorage.getItem("activeLanguage") === 'mk'
                                            ?
                                                <span title={this.state.activity.nameMk} style={{color: "grey"}}>{this.state.activity.nameMk}</span>
                                            :
                                                <span title={this.state.activity.nameAl} style={{color: "grey"}}>{this.state.activity.nameAl}</span>
                                            }

                                        </div>
                                    </div>
                                </ol>
                            </nav>

                            <h2 style={{color: "black", fontWeight: "bold", fontSize: "18pt"}}>
                                {localStorage.getItem("activeLanguage") === 'mk'
                                ?
                                    this.state.activity.nameMk
                                :
                                    this.state.activity.nameAl
                                }
                            </h2>

                            <hr/>

                            <h3 style={{color: "black", fontWeight: "normal", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                                <li>
                                    {strings.status}: &nbsp;
                                    <span style={{textDecoration: "underline solid " + statusUnderlineColor + " 3px"}}>
                                           {localStorage.getItem("activeLanguage") === 'mk'
                                               ?
                                               this.state.status.statusMk
                                               :
                                               this.state.status.statusAl
                                           }
                                </span>
                                </li>
                            </h3>


                            <h3 hidden={!this.state.showDesc} style={{color: "black", fontWeight: "normal", paddingTop: "5px", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                                <li>
                                    {localStorage.getItem("activeLanguage") === 'mk' ? this.state.activity.descriptionMk : this.state.activity.descriptionAl}
                                </li>
                            </h3>

                            <h2 style={{color: "black", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                                <li>
                                    {strings.deadlineForRealization}: &nbsp;
                                    {this.state.activity.activityDateType !== "NOTDEFINED" ? (this.state.activity.activityDateType === "FIRSTHALF" ? "прва половина" : "втора половина") : " "} {this.state.activity.yearDate ? " - " + this.state.activity.yearDate : ""}{this.state.activity.continuously ? ", континуирано" : ""}
                                </li>
                            </h2>

                            <h2 style={{color: "black", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                                <li>
                                    {strings.competentInstitution}:
                                </li>
                                {localStorage.getItem("activeLanguage") === 'mk'
                                ?
                                    <p style={{fontSize: "14pt", fontWeight: "bold"}}>
                                        &nbsp; &nbsp; &nbsp; &nbsp; - {this.state.activity.competentInstitution ? this.state.activity.competentInstitution.nameMk : ""}
                                    </p>
                                :
                                    <p style={{fontSize: "14pt", fontWeight: "bold"}}>
                                        &nbsp; &nbsp; &nbsp; &nbsp; - {this.state.activity.competentInstitution ? this.state.activity.competentInstitution.nameAl : ""}
                                    </p>
                                }

                            </h2>

                            <h2 style={{color: "black", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                                <li>
                                    {strings.includedInstitutions}:
                                </li>
                                {this.state.activity.activityInstitutions !== undefined ? this.state.activity.activityInstitutions.map((item,index) => {
                                    return(
                                        localStorage.getItem("activeLanguage") === 'mk'
                                        ?
                                             <p style={{fontSize: "14pt"}} key={index}>
                                                &nbsp; &nbsp; &nbsp; - {item.nameMk}
                                             </p>
                                        :
                                            <p style={{fontSize: "14pt"}} key={index}>
                                                &nbsp; &nbsp; &nbsp; - {item.nameAl}
                                            </p>
                                    )
                                }) : ""}
                            </h2>

                            <h2 style={{color: "black", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                                <li>
                                    {strings.theActivity}&nbsp;
                                    <span style={{textDecoration: "underline solid black 2px"}}>
                                    {this.state.activity.financialImplications ? strings.has : strings.hasNot}
                                </span>
                                    &nbsp;{strings.financialImplications}
                                </li>
                            </h2>


                            {this.state.evaluation.open && getCurrentIndicatorReport ?
                                <div>
                                    <h2 style={{color: "black", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                                        <li>
                                            {strings.evaluationPlan}: {this.state.evaluation.descriptionMk} &nbsp;
                                            {this.state.nap.openForEvaluation ?
                                                <span className="badge badge-pill badge-danger">{strings.opened}</span> :
                                                <span className="badge badge-pill badge-primary">{strings.closed}</span>}
                                        </li>
                                    </h2>
                                    <h2 style={{color: "black", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                                        <li>
                                            {strings.currentReport}:
                                        </li>
                                    </h2>

                                    <div className="row" style={{color: "black", fontSize: "12pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                                        <div className="col-md-4">
                                            Мк
                                            <div
                                                style={{background: "white",
                                                        border: "1px solid black",
                                                        borderRadius: "5px",
                                                        padding: "5px",
                                                        fontSize: "10pt"}}>
                                                {getCurrentIndicatorReport.reportMk}
                                            </div>
                                        </div>
                                        {/*<div className="col-md-4">*/}
                                        {/*    Al*/}
                                        {/*    <div*/}
                                        {/*        style={{background: "white",*/}
                                        {/*            border: "1px solid black",*/}
                                        {/*            borderRadius: "5px",*/}
                                        {/*            padding: "5px",*/}
                                        {/*            fontSize: "10pt"}}>*/}
                                        {/*        {getCurrentIndicatorReport.reportAl}*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        <div className="col-md-4">
                                            {strings.comm}
                                            <div
                                                style={{background: "#e5e5e5",
                                                    border: "1px solid black",
                                                    borderRadius: "5px",
                                                    padding: "5px",
                                                    fontSize: "10pt"}}>
                                                {getCurrentIndicatorReport.reportEn ? getCurrentIndicatorReport.reportEn : strings.noComment}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                : ""
                            }

                            {this.state.evaluation.open && !getCurrentIndicatorReport ?
                                <div>
                                    <h2 style={{color: "black", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                                        <li>
                                            {strings.evaluationPlan}: {this.state.evaluation.descriptionMk} &nbsp;
                                            {this.state.nap.openForEvaluation ?
                                                <span className="badge badge-pill badge-danger">{strings.opened}</span> :
                                                <span className="badge badge-pill badge-primary">{strings.closed}</span>}
                                        </li>
                                    </h2>
                                </div>
                                : ""}
                            <br/>

                            <h2 style={{color: "black", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                                <li>
                                    {strings.otherReports}:
                                </li>
                            </h2>

                        </div>

                        <div className="col-md-3 text-right" style={{marginTop: "3.8rem"}}>
                            {localStorage.getItem('role') !== 'ROLE_USER' ?
                                <div>
                                    {localStorage.getItem('role') !== 'ROLE_EVALUATOR' ?
                                        <div key={this.state.activity.id}>
                                            <CrudModal
                                                entity={this.state.activity}
                                                icon={'edit'}
                                                btnClass={'editActivityBtn'}
                                                title={strings.editActivity}
                                                showText={true}
                                                onSubmit={this.onEditActivity}
                                                validations={activityValidations}
                                                body={ActivityEdit}
                                            />
                                        </div>
                                        : ""
                                    }

                                    <div>
                                        {(localStorage.getItem('role') === 'ROLE_ADMIN' ||
                                            (localStorage.getItem('role') === 'ROLE_EVALUATOR' &&
                                                this.state.activity.competentInstitution !== undefined &&
                                                localStorage.getItem('institutionId') === this.state.activity.competentInstitution.institution.id.toString())) &&
                                        this.state.evaluation.open && checkEditableReport ?
                                            <CrudModal
                                                entity={getCurrentIndicatorReport}
                                                icon={'edit'}
                                                btnClass={'indicatorReportEditBtn'}
                                                title={strings.editReport}
                                                showText={true}
                                                onSubmit={this.onEditIndicatorReport}
                                                body={IndicatorReportEditNew}
                                            />
                                            : ""
                                        }

                                        {this.state.evaluation.open && !checkEditableReport ?
                                            <CrudModal
                                                entity={this.state.activity}
                                                icon={'add'}
                                                btnClass={'indicatorReportAddBtn'}
                                                title={strings.addReport}
                                                showText={true}
                                                onSubmit={this.onAddIndicatorReport}
                                                body={IndicatorReportAddNew}
                                            />
                                            : ""
                                        }
                                    </div>
                                </div>
                                : ""
                            }

                            {/*<button onClick={this.showDescription} className="btn descriptionBtn">*/}
                            {/*    {this.state.showDesc ? "- " : "+ "}Опис*/}
                            {/*</button>*/}

                        </div>
                        <table className="table-hover newTable mt-2" style={{width: "100%", marginLeft: "13px"}}>
                            <thead className="tableHead">
                            <tr>
                                <th className="tableHeading firstHeading" style={{width: "20%"}}>{strings.nameOfReportMk}</th>
                                {/*<th className="tableHeading" style={{width: "20%"}}>{strings.nameOfReportAl}</th>*/}
                                <th className="tableHeading" style={{width: "20%"}}>{strings.comm}</th>
                                <th className="tableHeading" style={{width: "20%"}}>{strings.reportStatus}</th>
                                <th className="tableHeading lastHeading" style={{width: "20%"}}>{strings.evaluation}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.indicatorReports.map((item,index) => {
                                return(
                                    <IndicatorReport
                                        activity={this.state.activity}
                                        indicatorReport={item}
                                        nap={this.state.nap}
                                        key={item.id}/>
                                )
                            })}
                            <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                                <td style={{borderRadius: "0 0 0 15px"}}/>
                                <td/>
                                <td/>
                                <td style={{borderRadius: "0 0 15px 0"}}/>
                            </tr>
                            </tbody>

                        </table>

                        < ReactPaginate
                            previousLabel={"<<"}
                            nextLabel={">>"}
                            breakLabel={'...'}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            containerClassName={'pagination'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
            )
        }
        else
            return null;
    }
}

export default IndicatorReportTable;