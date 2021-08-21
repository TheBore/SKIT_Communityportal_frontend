import React, {Component} from "react";
import {strings} from "../../Localization/Localization";
import "./Meeting.css";
import moment from "moment";
import DeleteMeeting from "./DeleteMeeting";
import * as PropTypes from "prop-types";
import {faUsers} from "@fortawesome/free-solid-svg-icons";

class FontAwesomeIcon extends Component {
    render() {
        return null;
    }
}

FontAwesomeIcon.propTypes = {
    icon: PropTypes.any,
    size: PropTypes.string,
    className: PropTypes.string
};

class Meeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: localStorage.getItem('role'),
        }
    }

    componentDidMount() {
        this.fetchData();
        strings.setLanguage(localStorage.getItem("activeLanguage"));
    }

    fetchData = () => {
    }

    handleCloseInParent = () => {
        return this.props.handleClose(this.props.id)
    }

    handleJoinInParent = () => {
        this.props.handleJoin(this.props.meetingId)
    }

    render() {
        return (
            <div className="row mt-3">
                <div className="container-fluid">
                    <div className="col-12 meetings">
                        <div className="row w-100">
                            <div className="col-6 mb-2 meetingTitleCol">
                                <h3>{this.props.name}</h3>
                            </div>
                            <div className="col-6 mb-2 text-right">
                                <button className="btn meetingButton mb-2"
                                        onClick={this.handleJoinInParent}>
                                    {strings.meetingDetails}
                                </button>
                                {this.state.userRole === "ROLE_ADMIN" &&
                                <DeleteMeeting
                                             showText={true}
                                             prompt={strings.deleteMeetingQuestion}
                                             doDelete={this.handleCloseInParent}/>
                                }
                            </div>
                        </div>
                        <div className="row meetingRowFooter">
                            <div className="col-12 mt-1 meetingColFooter">
                                <h6 className="meetingFooterText meetingFooterRightText">
                                    {strings.date + ":   "}
                                    <b>{moment(this.props.meetingDate).local().format('DD-MM-YYYY')}</b>
                                </h6>
                                <h6 className="meetingFooterText meetingFooterRightText ml-4">
                                    <FontAwesomeIcon icon={faUsers} size="lg" className="mr-2"/>{strings.numOfParticipants + ": "} <b>{this.props.participants}</b>
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Meeting;