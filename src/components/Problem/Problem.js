import React, {Component} from "react";
import MeasureRepository from "../../repository/MeasureRepository";
import CrudModal from "../Crud/CrudModal";
import MeasureEdit from "../Measure/MeasureEdit";
import MeasureAdd from "../Measure/MeasureAdd";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faThList, faCalendar} from "@fortawesome/free-solid-svg-icons";
import ProblemRepository from "../../repository/ProblemRepository";
import NAPRepository from "../../repository/NAPRepository";
import ProblemEdit from "./ProblemEdit";
import MeasureView from "../Measure/css/MeasureView";
import {strings} from "../../Localization/Localization";

class Problem extends Component {
    constructor(props) {
        let searchParams = new URLSearchParams(props.location.search);
        super(props);
        this.state = {
            problemId: this.props.match.params.id,
            problem: {},
            napId: searchParams.get('napId'),
            nap: {},
            measures: [],
            showDesc: false,
            strategyGoals: []
        }
    }

    componentDidMount() {
        ProblemRepository.findProblemById(this.state.problemId).then ( res => {
            this.setState({
                problem: res.data,
                strategyGoals: res.data.strategyGoals
            })
        });
        MeasureRepository.getMeasuresByProblemId(this.state.problemId).then( res => {
            this.setState({
                measures: res.data
            })
        });
        NAPRepository.getNAPById(this.state.napId).then ( res => {
            this.setState({
                nap: res.data
            })
        })
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    onEditProblem = (entity) => {

        entity["id"]=this.state.problem.id;
        entity["nap"]=this.state.nap.id;

        return ProblemRepository.updateProblem(entity).then( async res => {
            toast.success(strings.problemChangeSuccess);
            await this.sleep(2000);
            window.location.reload();
        }).catch( async err => {
            toast.error(strings.problemChangeNoSuccess);
            console.log(err);
            await this.sleep(2000);
            window.location.reload();
        })
    }

    onAddMeasure = (entity) => {

        entity["nap"]=this.state.nap.id;
        entity["problem"]=this.state.problem.id;

        return MeasureRepository.createMeasure(entity).then( async  res => {
            toast.success(strings.measureAddSuccess);
            await this.sleep(2000);
            window.location.reload();
        }).catch( async err => {
            toast.error(strings.measureAddNoSuccess);
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

        const problemValidations = (['nameMk', 'descriptionMk',
            'napArea', 'strategyGoals'])

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
                                         style={{width: "200px", marginLeft: "4px"}}>
                                        <FontAwesomeIcon icon={faCalendar}/>&nbsp;&nbsp;
                                        {localStorage.getItem("activeLanguage") === 'mk'
                                            ?
                                            <span title={this.state.problem.nameMk} style={{color: "grey"}}>{this.state.problem.nameMk}</span>
                                            :
                                            <span title={this.state.problem.nameAl} style={{color: "grey"}}>{this.state.problem.nameAl}</span>
                                        }
                                    </div>
                                </div>
                            </ol>
                        </nav>

                        <h2 style={{color: "black", fontWeight: "bold", fontSize: "18pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                            {localStorage.getItem("activeLanguage") === 'mk' ? this.state.problem.nameMk : this.state.problem.nameAl}
                        </h2>

                        <hr/>

                        <h3 hidden={!this.state.showDesc} style={{color: "black", fontWeight: "normal", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                            <li>
                                {localStorage.getItem("activeLanguage") === 'mk' ? this.state.problem.descriptionMk : this.state.problem.descriptionAl}
                            </li>
                        </h3>

                        <h2 style={{color: "black", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                            <li>
                                {strings.strategyGoals}:
                            </li>
                            {this.state.strategyGoals.map((item,index) => {
                                return(
                                    <p style={{fontSize: "14pt"}} key={item.id}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        - {localStorage.getItem("activeLanguage") === 'mk' ? item.nameMk : item.nameAl}
                                    </p>
                                )
                            })}
                        </h2>

                    </div>
                    <div className={"col-md-3 text-right"}>
                        {localStorage.getItem('role') !== 'ROLE_EVALUATOR' ?
                            <div>
                                <div key={this.state.problem.id}>
                                    <CrudModal
                                        entity={this.state.problem}
                                        icon={'edit'}
                                        btnClass={'editMeasureBtn'}
                                        title={strings.changeProblem}
                                        showText={true}
                                        onSubmit={this.onEditProblem}
                                        validations={problemValidations}
                                        body={ProblemEdit}
                                    />
                                </div>

                                <div>
                                    <CrudModal
                                        entity={{}}
                                        icon={'add'}
                                        btnClass={'addMeasureBtn'}
                                        title={strings.addMeasure}
                                        showText={true}
                                        onSubmit={this.onAddMeasure}
                                        validations={measureValidations}
                                        body={MeasureAdd}
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
                        Мерки:
                    </li>
                </h2>

                {this.state.measures.map((item,index) => {
                    return (
                        <div className="col-md-12" key={item.id}>
                            <MeasureView nap={this.state.nap} measure={item} problemId={this.state.problem.id}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Problem;