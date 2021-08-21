import React, {Component} from 'react';
import {strings} from "../../Localization/Localization";
import DatePicker from "react-datepicker";
import TabInstitutions from "../Feedback/Tab/TabInstitutions";
import TabTags from "../Feedback/Tab/TabTags";
import TabCategories from "../Feedback/Tab/TabCategories";

class AddMeeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            institutionIds: [],
            isWaitingToPublish: false,
            selectedTabInstitutions: true,
            selectedTabTags: false,
            selectedTabCategories: false,
            institutions: [],
            tags: [],
            categories: [],
            name: "",
            startDate: new Date(),
            meeting: "Meeting",
        }
    }

    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
        this.changeTabToPublish("institutions")
    }

    changeTabToPublish = (name) => {
        if(name === "institutions"){
            this.setState({
                selectedTabInstitutions: true,
                selectedTabTags: false,
                selectedTabCategories: false
            })
        } else if(name === "tags"){
            this.setState({
                selectedTabInstitutions: false,
                selectedTabTags: true,
                selectedTabCategories: false
            })
        } else if(name === "categories"){
            this.setState({
                selectedTabInstitutions: false,
                selectedTabTags: false,
                selectedTabCategories: true
            })
        }
    }

    onNameHandleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleDateChange = (date) => {
        this.setState({
            startDate: date
        })
    };

    render() {
        return (
            <div className="mt-5">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">
                            {strings.addNewMeeting}
                        </h2>

                        <div style={{
                            border: '1px solid lightgray',
                            borderRadius: '25px',
                            padding: '20px 10px 10px 10px'}} className="mt-5">

                            <div className="col-12">
                                <label
                                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.name}</label>
                                <input
                                    placeholder={strings.meetingPlaceholder}
                                    name={"name"}
                                    type={"text"}
                                    onChange={this.onNameHandleChange}
                                    className="form-control"
                                    style={{borderRadius: '15px'}}
                                />
                            </div>

                            <div className="col-12 mt-4">
                                <label
                                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.date}</label>
                                <br/>
                                <DatePicker
                                    id="dueDate"
                                    selected={this.state.startDate}
                                    onChange={this.handleDateChange}
                                    style={{border: '1px solid white', borderRadius: '10px'}}
                                    className="form-control"
                                    dateFormat={"dd.MM.yyyy"}
                                    popperPlacement="top-start"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" style={{color: "black", marginTop: "50px"}}>
                    <div className="col-md-9">
                        <button className="tabButton" onClick={() => this.changeTabToPublish('institutions')}
                                style={{backgroundColor: this.state.selectedTabInstitutions ? "#DFF6FF" : "#BCDFEF",
                                    padding: "20px", margin: "0px 20px 0px 20px", border: 0,
                                    textDecoration: this.state.selectedTabInstitutions ? "underline" : ""}}>
                            <h6 style={{display: "inline", fontWeight: "600"}}>
                                {strings.sendToInstitutions}:
                            </h6>
                        </button>

                        <button className="tabButton" onClick={() => this.changeTabToPublish('tags')}
                                style={{backgroundColor: this.state.selectedTabTags ? "#DFF6FF" : "#BCDFEF",
                                    padding: "20px", margin: "0px 20px 0px 20px", border: 0,
                                    textDecoration: this.state.selectedTabTags ? "underline" : ""}}>
                            <h6 style={{display: "inline", fontWeight: "600"}}>
                                {strings.sendToTags}:
                            </h6>
                        </button>

                        <button className="tabButton" onClick={() => this.changeTabToPublish('categories')}
                                style={{backgroundColor: this.state.selectedTabCategories ? "#DFF6FF" : "#BCDFEF",
                                    padding: "20px", margin: "0px 20px 0px 20px", border: 0,
                                    textDecoration: this.state.selectedTabCategories ? "underline" : ""}}>
                            <h6 style={{display: "inline", fontWeight: "600"}}>
                                {strings.sendToCategories}:
                            </h6>
                        </button>
                    </div>

                </div>

                {this.state.selectedTabInstitutions ?
                    <TabInstitutions meeting={this.state.meeting} name={this.state.name} startDate={this.state.startDate}/>
                    : ""
                }
                {this.state.selectedTabTags ?
                    <TabTags meeting={this.state.meeting} name={this.state.name} startDate={this.state.startDate}/>
                    : ""
                }
                {this.state.selectedTabCategories ?
                    <TabCategories meeting={this.state.meeting} name={this.state.name} startDate={this.state.startDate}/>
                    : ""
                }


            </div>
        );
    }
}

export default AddMeeting;