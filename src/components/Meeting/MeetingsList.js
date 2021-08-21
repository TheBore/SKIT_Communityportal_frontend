import React, {Component} from "react";
import {Link} from "react-router-dom";
import {strings} from "../../Localization/Localization";
import InfoPopup from "../ErrorHandler/InfoPopup";
import "./Meeting.css";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MeetingRepository from "../../repository/MeetingRepository";
import Meeting from "./Meeting";
import {toast} from "react-toastify";

class MeetingsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetings: [],
            userRole: localStorage.getItem('role'),
        }
    }

    componentDidMount() {
        this.fetchData();
        strings.setLanguage(localStorage.getItem("activeLanguage"));
    }

    fetchData = () => {
        let institutionId = localStorage.getItem('institutionId');

        if (this.state.userRole === "ROLE_ADMIN") {

            MeetingRepository.getAllMeetingsForAdmin().then(async res => {
                const newData = res.data;

                for (let i=0; i<newData.length; i++){

                    let numberElements = 0;
                    await MeetingRepository.getNumberOfParticipants(newData[i].meetingId, newData[i].moderatorPw).then(snap => {
                        if(snap.data){
                            numberElements = snap.data;
                        }
                    }).catch(() => {
                        numberElements = 0;
                    });
                    newData[i]["participants"] = numberElements;
                }
                this.setState({
                    meetings: newData
                })
            }).catch(() => {
                toast.error(strings.failedToLoadData)
            })
        }
        else {
            MeetingRepository.getAllMeetingsByInstitutionId(institutionId).then(async res => {
                const newData = res.data;

                for (let i=0; i<newData.length; i++){

                    let numberElements = 0;
                    await MeetingRepository.getNumberOfParticipants(newData[i].meetingId, newData[i].moderatorPw).then(snap => {
                        if(snap.data){
                            numberElements = snap.data;
                        }
                    }).catch(() => {
                        numberElements = 0;
                    });
                    newData[i]["participants"] = numberElements;
                }
                this.setState({
                    meetings: newData
                })
            }).catch(() => {
                toast.error(strings.failedToLoadData)
            })
        }
    }

    handleCloseMeeting = (id) => {
        return MeetingRepository.closeMeetingSession(id).then(async () => {
            toast.success(strings.deleteModal)
            await this.sleep(3000);
            window.location.reload();
            this.fetchData();
        }).catch(err => {
            toast.error(strings.failTryAgain);
            setTimeout(() => {
                window.location = '/meetings'
            }, 3000)
        })
    }

    handleJoinMeeting = (meetingId) => {
        MeetingRepository.getMeetingUrl(meetingId).then(res => {
            window.open(res.data, '_blank');
        }).catch(err => {
            toast.error(strings.failTryAgain);
            setTimeout(() => {
                window.location = '/meetings'
            }, 3000)
        })
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    renderMeetings = meeting => {
        return (
            <div key={meeting.id}>
                <Meeting
                    key={meeting.id}
                    id={meeting.id}
                    name={meeting.name}
                    meetingDate={meeting.meetingDate}
                    meetingId={meeting.meetingId}
                    participants={meeting.participants}
                    handleClose={this.handleCloseMeeting}
                    handleJoin={this.handleJoinMeeting}
                />
            </div>
        )
    }

    render() {
        console.log("m", this.state.meetings)
        if (this.state.meetings.length !== 0) {
            return (
                <div className="mb-5">
                    <div className="row">
                        <div className="col-6">
                            <h2 style={{textAlign: "left", color: "#1C4857"}}
                                className="mt-2">{strings.meetings}</h2>
                        </div>
                        {this.state.userRole === "ROLE_ADMIN" &&
                        <div className="col-6 justify-content-end text-right">
                            <Link to={"/addMeeting"} className="defaultBtnAdd btn mt-4">
                                <FontAwesomeIcon icon={faPlusCircle} size="lg" style={{paddingRight: '4px'}}/>
                                {strings.add}
                            </Link>
                        </div>
                        }
                    </div>
                    {this.state.meetings.sort((a,b) => a.meetingDate > b.meetingDate ? 1 : -1).map(this.renderMeetings)}

                    <hr/>

                    <div className="mt-2 ml-4">
                        <div className="row">
                            <div className="col-md-6" style={{fontSize: "15pt", color: "black"}}>
                                <p style={{fontWeight: "bold"}}>
                                    {strings.important}
                                </p>

                                <ul>
                                    <li>
                                        {strings.description1}
                                    </li>
                                    <li>
                                        {strings.description2}
                                    </li>
                                    <li>
                                        {strings.description3}
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <iframe width="100%" height="150%"
                                        src="https://youtube.com/embed/uYYnryIM0Uw" allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="row">
                        {this.state.userRole === "ROLE_ADMIN" &&
                        <div className="col-12 text-right">
                            <Link to={"/addMeeting"} className="defaultBtnAdd btn mt-4">
                                <FontAwesomeIcon icon={faPlusCircle} size="lg" style={{paddingRight: '4px'}}/>
                                {strings.add}
                            </Link>
                        </div>
                        }
                    </div>
                    <div className="row mt-5">
                        <div className="col-12">
                            <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                                <InfoPopup infoMessage={strings.noMeetings}/>
                            </div>
                        </div>
                    </div>

                </div>

            )
        }

    }

}

export default MeetingsList;