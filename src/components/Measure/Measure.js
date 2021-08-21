import React, {Component} from "react";
import MeasureRepository from "../../repository/MeasureRepository";
import ActivityRepository from "../../repository/ActivityRepository";
import Activity from "../Activity/Activity";
import CrudModal from "../Crud/CrudModal";
import MeasureEdit from "./MeasureEdit";
import {toast} from "react-toastify";
import './css/Measure.css'
import ActivityAdd from "../Activity/ActivityAdd"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faThList, faCalendar, faFileAlt} from "@fortawesome/free-solid-svg-icons";
import ActivityView from "../Activity/ActivityView";
import NAPRepository from "../../repository/NAPRepository";
import ProblemRepository from "../../repository/ProblemRepository";
import {strings} from "../../Localization/Localization";

class Measure extends Component {
    constructor(props) {
        let searchParams = new URLSearchParams(props.location.search);
        super(props);
        this.state = {
            measureId: this.props.match.params.id,
            napId: searchParams.get('napId'),
            problemId: searchParams.get('problemId'),
            problem: {},
            measure: {},
            nap: {},
            activities: [],
            showDesc: false,
            status: {}
        }
    }

    componentDidMount() {
        MeasureRepository.getMeasureById(this.state.measureId).then( res => {
            this.setState({
                measure: res.data,
                status: res.data.status
            })
        });
        ActivityRepository.getActivitiesByMeasureId(this.state.measureId).then ( res => {
            this.setState({
                activities: res.data
            })
        });
        NAPRepository.getNAPById(this.state.napId).then( res => {
            this.setState({
                nap: res.data
            })
        });
        ProblemRepository.findProblemById(this.state.problemId).then( res => {
            this.setState({
                problem: res.data
            })
        })
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    onEdit = (entity) => {

        entity["id"]=this.state.measure.id;
        entity["nap"]=0;
        entity["problem"]=0;

        return MeasureRepository.updateMeasure(entity).then( async res => {
            toast.success(strings.measureEditSuccess);
            await this.sleep(2000);
            window.location.reload();
        }).catch( async err => {
            toast.error(strings.measureEditNoSuccess);
            console.log(err);
            await this.sleep(2000);
            window.location.reload();
        })
    }

    onAddActivity = (entity) => {
        entity["measure"] = this.state.measureId;
        console.log("entity", entity)

        return ActivityRepository.createActivity(entity).then( async res => {
            toast.success(strings.activityCreateSuccess);
            await this.sleep(2000);
            window.location.reload();
        }).catch( async err => {
            toast.error(strings.activityCreateNoSuccess);
            console.log(err);
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

    render(){

        const measureValidations = (['nameMk', 'descriptionMk', 'status', 'startDate', 'endDate']);

        const activityValidations = (['nameMk', 'status', 'financialImplications', 'competentInstitution']);

        let statusUnderlineColor = null;

        if (this.state.measure.status !== undefined){
            if (this.state.measure.status.statusMk === "Реализиран") {
                statusUnderlineColor = '#5BB385';
            }
            if (this.state.measure.status.statusMk === "Во подготовка") {
                statusUnderlineColor = '#ECC673';
            }
            if (this.state.measure.status.statusMk === "Нереализиран") {
                statusUnderlineColor = '#EB5658';
            }
        }

        return(
            <div>
                <div className={"row"}>
                    <div className={"col-md-9"}>
                        <nav aria-label="breadcrumb" style={{marginBottom: "15px"}}>
                            <ol className="breadcrumb"
                                style={{background: "none", fontSize: "130%", paddingLeft: 0, paddingBottom: 0, marginBottom: 0}}>
                                <div style={{background: "#67C4EF",borderRadius: "0 20px 20px 0", display: "inherit"}}>
                                    <div style={{color: "black"}}  className="customBreadcrumb">
                                        <FontAwesomeIcon icon={faThList}/>
                                        &nbsp;&nbsp;
                                        <a title="Н.А.П." style={{color: "black"}} href={"/naps"}>{strings.nap}</a>
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
                                         style={{width: "200px", marginLeft: "4px"}}>
                                        <FontAwesomeIcon icon={faFileAlt}/>&nbsp;&nbsp;
                                        {localStorage.getItem("activeLanguage") === 'mk'
                                            ?
                                            <span title={this.state.measure.nameMk} style={{color: "grey"}}>{this.state.measure.nameMk}</span>
                                            :
                                            <span title={this.state.measure.nameAl} style={{color: "grey"}}>{this.state.measure.nameAl}</span>
                                        }

                                    </div>
                                </div>
                            </ol>
                        </nav>

                        <h2 style={{color: "black", fontWeight: "bold", fontSize: "18pt"}}>
                            {this.state.measure.nameMk}
                        </h2>

                        <hr/>

                        <h3 style={{color: "black", fontWeight: "normal", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                            <li>
                                {strings.status}: &nbsp;
                                <span style={{textDecoration: "underline solid " + statusUnderlineColor + " 3px"}}>
                                    {localStorage.getItem("activeLanguage") === 'mk' ? this.state.status.statusMk : this.state.status.statusAl}
                                </span>
                            </li>
                        </h3>

                        <h3 hidden={!this.state.showDesc} style={{color: "black", fontWeight: "normal", paddingTop: "5px", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                            <li>
                                {localStorage.getItem("activeLanguage") === 'mk' ? this.state.measure.descriptionMk : this.state.measure.descriptionAl}
                            </li>
                        </h3>

                    </div>
                    <div className={"col-md-3 text-right"}>
                        {localStorage.getItem('role') !== 'ROLE_EVALUATOR' ?
                            <div>
                                <div key={this.state.measure.id}>
                                    <CrudModal
                                        entity={this.state.measure}
                                        icon={'edit'}
                                        btnClass={'editMeasureBtn'}
                                        title={strings.changeMeasure}
                                        showText={true}
                                        onSubmit={this.onEdit}
                                        validations={measureValidations}
                                        body={MeasureEdit}
                                    />
                                </div>

                                <div>
                                    <CrudModal
                                        entity={{}}
                                        icon={'add'}
                                        btnClass={'addActivityBtn'}
                                        title={strings.addActivity}
                                        showText={true}
                                        onSubmit={this.onAddActivity}
                                        validations={activityValidations}
                                        body={ActivityAdd}
                                    />
                                </div>
                            </div>
                            : ""
                        }

                        <button onClick={this.showDescription} className="btn descriptionBtn">
                            {this.state.showDesc ? "- " : "+ "}{strings.description}
                        </button>
                    </div>

                </div>

                <h2 style={{color: "black", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                    <li>
                        {strings.activities}:
                    </li>
                </h2>

                {this.state.activities.map((item,index) => {
                    return (
                        <div className="col-md-12" key={item.id}>
                            <ActivityView activity={item} nap={this.state.nap} measure={this.state.measure} problem={this.state.problem} key={index}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Measure;