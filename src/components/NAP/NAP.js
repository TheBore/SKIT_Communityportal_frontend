import React, {Component} from "react";
import NAPRepository from "../../repository/NAPRepository";
import MeasureRepository from "../../repository/MeasureRepository";
import './css/NAP.css'
import StrategyGoal from "../StrategyGoal/StrategyGoal";
import StrategyGoalRepository from "../../repository/StrategyGoalRepository";
import NapArea from "../NapArea/NapArea";
import NapAreaRepository from "../../repository/NapAreaRepository";
import NAPEdit from "./NAPEdit";
import CrudModal from "../Crud/CrudModal";
import {toast} from "react-toastify";
import MeasureAdd from "../Measure/MeasureAdd";
import EvaluationOpenClose from "../Evaluation/EvaluationOpenClose";
import EvaluationAdd from "../Evaluation/EvaluationAdd";
import EvaluationsOld from "../Evaluation/EvaluationsOld";
import EvaluationRepository from "../../repository/EvaluationRepository";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faThList,
    faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import ProblemRepository from "../../repository/ProblemRepository";
import ProblemAdd from "../Problem/ProblemAdd";
import {strings} from "../../Localization/Localization";

class NAP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            nap: {},
            strategyGoals: [],
            modalBody: null,
            openForEval: [],
            showDesc: false,
            napAreas: [],
            problems: [],
            status: {}
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
         await NAPRepository.getNAPById(this.state.id).then(res => {
            this.setState({
                nap: res.data,
                openForEval: res.data.openForEvaluation,
                status: res.data.status
            })
        });
        await StrategyGoalRepository.getAllStrategyGoalsList().then(res => {
            this.setState({
                strategyGoals: res.data
            })
        });
        await NapAreaRepository.findAllActiveNapAreas().then(res => {
            this.setState({
                napAreas: res.data
            })
        });
        await ProblemRepository.findAllProblemsList().then(res => {
            this.setState({
                problems: res.data
            })
        })
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    onEdit = (entity) => {
        return NAPRepository.updateNap(entity, this.state.nap.id).then( async res => {
            toast.success(strings.napEditSuccess);
            await this.sleep(2000);
            window.location.reload();
        }).catch( async err => {
            toast.error(strings.napEditNoSuccess);
            console.log(err);
            await this.sleep(2000);
            window.location.reload();
        })
    }

    // onAddMeasure = (entity) => {
    //
    //     entity["nap"]=this.state.nap.id;
    //
    //     return MeasureRepository.createMeasure(entity).then( async  res => {
    //         toast.success("Uspesno dodavanje Measure");
    //         this.fetchData();
    //     }).catch( async err => {
    //         toast.error("Neuspesno dodavanje Measure");
    //         console.log(err);
    //         await this.sleep(2000);
    //         window.location.reload();
    //     })
    // }

    onAddProblem = (entity) => {

        entity["nap"]=this.state.nap.id;

        return ProblemRepository.createProblem(entity).then( async  res => {
            toast.success(strings.problemAddSuccess);
            await this.sleep(2000);
            window.location.reload();
        }).catch( async err => {
            toast.error(strings.problemAddNoSuccess);
            console.log(err);
            await this.sleep(2000);
            window.location.reload();
        })
    }

    onAddEvaluation = (entity) => {
        entity["nap"] = this.state.nap.id;

        return EvaluationRepository.createEvaluation(entity).then( async res => {
            this.setState({
                openForEval: true
            })
            toast.success(strings.evaluationAddSuccess)
            await this.sleep(2000);
            window.location.reload()
        }).catch( async err => {
            toast.error(strings.evaluationAddNoSuccess)
            await this.sleep(2000);
            window.location.reload()
        })
    }

    closeForEvaluation = () => {
        let checked = false

        return NAPRepository.openForEvaluation(checked, this.state.nap.id).then( async res => {
            this.setState({
                openForEval: checked
            })
            toast.success(strings.evaluationCloseSuccess)
            await this.sleep(2000);
            window.location.reload()
        }).catch(async err => {
            toast.error(strings.evaluationChangeNoSuccess)
            await this.sleep(2000);
            window.location.reload()
        })
    }

    openOldEvaluation = (entity) => {
        EvaluationRepository.openOldEvaluation(entity["evaluation"]).then( async res => {
            toast.success(strings.evaluationOpenSuccess)
            await this.sleep(2000);
            window.location.reload()
        }).catch( async err => {
            toast.error(strings.evaluationChangeNoSuccess)
            await this.sleep(2000);
            window.location.reload()
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
        const napValidations = (['nameMk', 'descriptionMk',
            'status', 'startDate', 'endDate']);

        const evaluationValidations = (['descriptionMk']);

        const oldEvaluationValidation = (['evaluation']);

        const problemValidations = (['nameMk', 'descriptionMk',
            'napArea', 'strategyGoals'])

        let statusUnderlineColor = null;

        if (this.state.nap.status !== undefined){
            if (this.state.nap.status.statusMk === "Реализиран") {
                statusUnderlineColor = '#5BB385';
            }
            if (this.state.nap.status.statusMk === "Во подготовка") {
                statusUnderlineColor = '#ECC673';
            }
            if (this.state.nap.status.statusMk === "Нереализиран") {
                statusUnderlineColor = '#EB5658';
            }
        }

        return(
            <div>

                <div className={"row"} key={this.state.nap.id}>
                    <div className={"col-md-9"}>

                        <nav aria-label="breadcrumb" style={{marginBottom: "15px"}}>
                            <ol className="breadcrumb"
                                style={{background: "none", fontSize: "130%", paddingLeft: 0, paddingBottom: 0, marginBottom: 0}}>
                                <div style={{background: "#67C4EF",borderRadius: "0 20px 20px 0", display: "inherit"}}>
                                    <div className="customBreadcrumb"
                                         style={{color: "black"}}>
                                        <FontAwesomeIcon icon={faThList}/>
                                        &nbsp;&nbsp;
                                        <a title="Н.А.П." style={{color: "black"}} href={"/naps"}>{strings.nap}</a>
                                    </div>
                                    <div className="customBreadcrumb"
                                         style={{width: "220px", marginLeft: "4px"}}>
                                        <FontAwesomeIcon icon={faCalendarAlt}/>
                                        {localStorage.getItem("activeLanguage") === 'mk'
                                            ?
                                            <span title={this.state.nap.nameMk} style={{color: "grey"}}>&nbsp; {this.state.nap.nameMk}</span>
                                            :
                                            <span title={this.state.nap.nameAl} style={{color: "grey"}}>&nbsp; {this.state.nap.nameAl}</span>
                                        }
                                    </div>
                                </div>
                            </ol>
                        </nav>

                        <h2 style={{color: "black", fontWeight: "bold", fontSize: "18pt"}}>
                            {localStorage.getItem("activeLanguage") === 'mk'
                                ?
                                <span title={this.state.nap.nameMk}>&nbsp; {this.state.nap.nameMk}</span>
                                :
                                <span title={this.state.nap.nameAl}>&nbsp; {this.state.nap.nameAl}</span>
                            }
                        </h2>

                        <hr/>

                        <h3 style={{color: "black", fontWeight: "normal", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}} >
                            <li>
                                {strings.status}: &nbsp;
                                <span style={{textDecoration: "underline solid " + statusUnderlineColor + " 3px"}}>
                                        {localStorage.getItem("activeLanguage") === 'mk'
                                            ?
                                            <span title={this.state.status.statusMk}>{this.state.status.statusMk}</span>
                                            :
                                            <span title={this.state.status.statusAl}>{this.state.status.statusAl}</span>
                                        }
                                </span>
                            </li>
                        </h3>

                        <h3 hidden={!this.state.showDesc} style={{color: "black", fontWeight: "normal", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                            <li>
                                {strings.description}: {localStorage.getItem("activeLanguage") === 'mk'
                                ?
                                <span title={this.state.nap.descriptionMk} style={{color: "grey"}}>&nbsp; {this.state.nap.descriptionMk}</span>
                                :
                                <span title={this.state.nap.descriptionAl} style={{color: "grey"}}>&nbsp; {this.state.nap.descriptionAl}</span>
                            }
                            </li>
                        </h3>

                        <h2 style={{color: "black", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                            <li>
                                {this.state.nap.startDate} - {this.state.nap.endDate}
                            </li>
                        </h2>

                        {localStorage.getItem('role') !== 'ROLE_EVALUATOR' ?
                            <label style={{color: "black"}}>
                                {!this.state.nap.openForEvaluation ?
                                    <CrudModal
                                        entity={this.state.nap}
                                        icon={'search'}
                                        btnClass={'openOldEvalBtn'}
                                        title={strings.oldEvauations}
                                        showText={true}
                                        onSubmit={this.openOldEvaluation}
                                        validations={oldEvaluationValidation}
                                        body={EvaluationsOld}
                                        color={'white'}
                                    /> :
                                    <CrudModal
                                        entity={{}}
                                        icon={'ban'}
                                        btnClass={'closeEvalBtn'}
                                        title={strings.closeEvaluation}
                                        showText={true}
                                        onSubmit={this.closeForEvaluation}
                                        body={EvaluationOpenClose}
                                        color={'white'}
                                        modalType={'close'}
                                        contentClass={'close-modal'}
                                    />}

                                {!this.state.nap.openForEvaluation ?
                                    <CrudModal
                                        entity={{}}
                                        icon={'add'}
                                        btnClass={'addNewEvalBtn'}
                                        title={strings.newEvaluation}
                                        showText={true}
                                        onSubmit={this.onAddEvaluation}
                                        validations={evaluationValidations}
                                        body={EvaluationAdd}
                                    />
                                    : ""}
                            </label>
                            : ""
                        }

                        <br/>

                        <h2 style={{color: "black", fontSize: "16pt", marginLeft: navigator.userAgent.indexOf("Firefox") !== -1 ? '25px' : ''}}>
                            <li>
                                {strings.napAreas}:
                            </li>
                        </h2>

                    </div>

                    <div className={"col-md-3 text-right"}>
                        {localStorage.getItem('role') !== 'ROLE_EVALUATOR' ?
                            <div>
                                <div>
                                    <CrudModal
                                        entity={this.state.nap}
                                        icon={'edit'}
                                        btnClass={'editNapBtn'}
                                        title={strings.editNAP}
                                        showText={true}
                                        onSubmit={this.onEdit}
                                        validations={napValidations}
                                        body={NAPEdit}
                                    />
                                </div>

                                <div>
                                    <CrudModal
                                        entity={{}}
                                        icon={'add'}
                                        btnClass={'addMeasureBtn'}
                                        title={strings.addProblem}
                                        showText={true}
                                        onSubmit={this.onAddProblem}
                                        validations={problemValidations}
                                        body={ProblemAdd}
                                    />
                                </div>
                            </div>
                            : ""
                        }

                        <button onClick={this.showDescription} className={"btn descriptionBtn"}>
                            {this.state.showDesc ? "- " : "+ "}{strings.description}
                        </button>

                    </div>
                </div>

                {this.state.napAreas.map((item,index) => {
                    return (
                        <NapArea key={index} napArea={item} problems={this.fetchNapAreaProblems(item.id)} napId={this.state.nap.id}/>
                    )
                })}
            </div>
        )
    }

    fetchNapAreaProblems = (id) => {
        return this.state.problems.filter(problem => problem.napArea.id === id && problem.nap.id === this.state.nap.id)
    }
}

export default NAP;