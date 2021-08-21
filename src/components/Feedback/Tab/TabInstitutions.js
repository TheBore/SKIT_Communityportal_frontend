import React, {Component} from "react";
import Select from "react-select";
import InstitutionRepository from "../../../repository/InstitutionRepository";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faPlusCircle, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import FeedbackPublicationRepository from "../../../repository/FeedbackPublicationRepository";
import {toast} from "react-toastify";
import {strings} from "../../../Localization/Localization";
import AnnouncementPublicationRepository from "../../../repository/AnnouncementPublicationRepository";
import SendRequestForEvaluationRepository from "../../../repository/SendRequestForEvaluationRepository";
import MeetingRepository from "../../../repository/MeetingRepository";
import moment from "moment";

class TabInstitutions extends Component{

    constructor(props) {
        super(props);
        this.state={
            institutionsList: [],
            selectedInstitutions: [],
            isWaitingToPublish: false,
            isAllSelected: false
        }
    }

    componentWillMount() {
        this.fillInstitutionsList();
    }

    fillInstitutionsList = () => {
        InstitutionRepository.getAllInstitutions().then(res => {
            let tmp = []
            for (let i = 0; i < res.data.length; i++){
                tmp.push({value: res.data[i].id, label: res.data[i].nameMk, name: "institution"})
            }
            this.setState({
                institutionsList: tmp
            })
        })
    }

    handleChange = (institutions) => {
        if(institutions){
            let tmp = []
            for (let i = 0; i < institutions.length; i++){
                tmp.push(institutions[i].value)
            }
            tmp = tmp.toString();
            InstitutionRepository.allInstitutionsByParentRecursively(tmp).then(async res => {
                let dataTmp = []
                for (let i = 0; i < res.data.length; i++){
                    dataTmp.push({value: res.data[i].id, label: res.data[i].nameMk, name: "institution"})
                }
                await this.setState({
                    selectedInstitutions: dataTmp
                })
            })
        } else {
            this.setState({
                selectedInstitutions: []
            })
        }
    }

    handleCheckboxInputChange = () => {
        if (this.state.isAllSelected === true){
            this.setState({
                isAllSelected: false,
                selectedInstitutions: []
            })
        } else {
            this.setState({
                isAllSelected: true,
                selectedInstitutions: this.state.institutionsList
            })
        }
    }

    removeInstitution = (institutionId) => {
        let tmp = [];
        for (let i = 0; i < this.state.selectedInstitutions.length; i++){
            if ( this.state.selectedInstitutions[i].value !== institutionId)
                tmp.push(this.state.selectedInstitutions[i])
        }
        this.setState({
            selectedInstitutions: tmp
        })
    }

    publishToInstitutions = () => {
        if (this.state.selectedInstitutions.length !== 0) {

            if (this.props.feedbackId !== undefined && this.props.feedbackId !== null){
                this.setState({
                    isWaitingToPublish: true
                })
                let feedbackId = this.props.feedbackId;
                let instTmp = [];
                for (let i = 0; i < this.state.selectedInstitutions.length; i++){
                    instTmp.push(this.state.selectedInstitutions[i].value)
                }
                instTmp = instTmp.toString();
                FeedbackPublicationRepository.publishFeedbackToInstitutions(feedbackId, instTmp).then(() => {
                    toast.success(strings.successfullyPublishedFeedback)
                    this.setState({
                        isWaitingToPublish: false
                    })
                    setTimeout(() => {
                        window.location = '/publishfeedback/' + feedbackId
                    }, 2000)
                }).catch(err => {
                    toast.error(strings.failedToPublishFeedback)
                    this.setState({
                        isWaitingToPublish: false
                    })
                    setTimeout(() => {
                        window.location = '/publishfeedback/' + feedbackId
                    }, 2000)
                });
            }

            else if (this.props.announcementId !== undefined && this.props.announcementId !== null) {
                this.setState({
                    isWaitingToPublish: true
                })
                let announcementId = this.props.announcementId;
                let instTmp = [];
                for (let i = 0; i < this.state.selectedInstitutions.length; i++){
                    instTmp.push(this.state.selectedInstitutions[i].value)
                }
                instTmp = instTmp.toString();

                AnnouncementPublicationRepository.publishToInstitutions(announcementId, instTmp).then(() => {
                    toast.success(strings.successfullyPublishedAnnouncement)
                    this.props.history.push("/publications/"+announcementId);
                    this.setState({
                        isWaitingToPublish:false
                    })
                }).catch(() => {
                    toast.error(strings.failedToPublishAnnouncement)
                    this.setState({
                        isWaitingToPublish:false
                    })
                });
            }

            else if(this.props.meeting === "Meeting"){
                this.setState({
                    isWaitingToPublish: true
                })

                let instTmp = [];
                for (let i = 0; i < this.state.selectedInstitutions.length; i++){
                    instTmp.push(this.state.selectedInstitutions[i].value)
                }
                instTmp = instTmp.toString();

                let name = this.props.name;
                let date = moment(this.props.startDate).format("MM/DD/YYYY")

                MeetingRepository.createMeeting(instTmp, name, date).then(() => {
                    toast.success(strings.succAdded);
                    this.setState({
                        isWaitingToPublish:false
                    });

                    setTimeout(() => {
                        window.location = '/meetings'
                    }, 3000)
                }).catch(err => {
                    toast.error(strings.failTryAgain);
                    this.setState({
                        isWaitingToPublish:false
                    });

                    setTimeout(() => {
                        window.location = '/addMeeting'
                    }, 3000)
                })
            }

            else{
                this.setState({
                    isWaitingToPublish: true
                })

                let title = this.props.title;
                let body = this.props.body;
                let instTmp = [];
                for (let i = 0; i < this.state.selectedInstitutions.length; i++){
                    instTmp.push(this.state.selectedInstitutions[i].value)
                }
                instTmp = instTmp.toString();

                SendRequestForEvaluationRepository.sendRequestForEvaluation(instTmp, title, body).then(res => {
                    toast.success(strings.successRequest)
                    this.setState({
                        isWaitingToPublish: false,
                    })
                    setTimeout(() => {
                        window.location = '/sendRequest';
                    }, 3000)
                }).catch(err => {
                    toast.error(strings.resetPassNotSuccessful)
                    this.setState({
                        isWaitingToPublish: false
                    })
                    setTimeout(() => {
                        window.location = '/sendRequest';
                    }, 3000)
                })
            }

        }
    }

    render() {
        return(<div>
            {!this.state.isWaitingToPublish &&
                <div style={{background: "#DFF6FF", marginLeft: "20px", padding: "30px"}}>
                    <div className="row">
                        <div className="col-md-4">
                            {this.state.institutionsList ?
                                <Select
                                    placeholder={""}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={true}
                                    isRtl={false}
                                    isMulti={true}
                                    isSearchable={true}
                                    options={this.state.institutionsList}
                                    onChange={e => this.handleChange(e)}
                                    name={"institutions"}
                                /> : ""
                            }
                            {this.state.institutionsList ?
                                <div style={{color: "black", marginTop: "5px"}}>
                                    <input
                                        name="isAllSelected"
                                        type="checkbox"
                                        checked={this.state.isAllSelected}
                                        onChange={this.handleCheckboxInputChange}
                                    />
                                    <span style={{marginTop: "-2px"}}> {strings.selectAll}</span>
                                </div>
                                : ""
                            }
                        </div>
                        <div className="col-md-4">

                        </div>
                        {this.props.meeting === "Meeting"
                                ?
                            <div className="col-md-4 text-right">
                                <button className="defaultBtn btn btn-info" onClick={() => this.publishToInstitutions()}>
                                    <FontAwesomeIcon icon={faPlusCircle}/>
                                    &nbsp;{strings.save}
                                </button>
                            </div>
                            :
                            <div className="col-md-4 text-right">
                                <button className="defaultBtn btn btn-info" onClick={() => this.publishToInstitutions()}>
                                    <FontAwesomeIcon icon={faPaperPlane}/>
                                    &nbsp;{strings.publish}
                                </button>
                            </div>
                        }

                    </div>
                    <div className="row">
                        <table className="table-hover newTable mt-2" style={{width: "100%", marginLeft: "13px"}}>
                            <thead className="tableHead">
                            <tr>
                                <th className="tableHeading firstHeading" style={{width: '80%'}}>{strings.name}</th>
                                <th className="tableHeading lastHeading" style={{width: '20%'}}/>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.selectedInstitutions && this.state.selectedInstitutions.map((item,index) => {
                                return(
                                    <tr key={item.id} style={{border: "1px solid lightgray"}}>
                                        <td className="tableData firstData">
                                            {item.label}
                                        </td>
                                        <td>
                                            <button className="defaultBtn btn-sm btn-danger"
                                                    onClick={() => this.removeInstitution(item.value)}>
                                                <FontAwesomeIcon icon={faTrashAlt}/>
                                                &nbsp;{strings.removeFromList}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                                <td style={{borderRadius: "0 0 0 15px"}}/>
                                <td style={{borderRadius: "0 0 15px 0"}}/>
                            </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            }
            {this.state.isWaitingToPublish &&
            <div className="container-fluid loadingContainer">
                <div className="spinner-grow text-secondary" style={{height: "50px", width: "50px"}}
                     role="status">
                    <span className="sr-only">{strings.loading}...</span>
                </div>
                <div className="spinner-grow text-secondary" style={{height: "50px", width: "50px"}}
                     role="status">
                    <span className="sr-only">{strings.loading}...</span>
                </div>
                <div className="spinner-grow text-secondary" style={{height: "50px", width: "50px"}}
                     role="status">
                    <span className="sr-only">{strings.loading}...</span>
                </div>
            </div>
            }
        </div>

        )
    }
}

export default TabInstitutions;