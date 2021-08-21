import React, {Component} from 'react';
import {strings} from "../../Localization/Localization";
import Select from "react-select";
import InstitutionRepository from "../../repository/InstitutionRepository";
import ActivityView from "./ActivityView";
import ActivityRepository from "../../repository/ActivityRepository";
import {Spinner} from "react-bootstrap";

class MyActivities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            institutions: [],
            selectedInstitution: {},
            activities: [],
            userRole: localStorage.getItem('role'),
            isLoading: false,
        }
    }

    componentDidMount() {
        this.fetchData();
        this.checkUserRole();
    }

    fetchData = () => {
        InstitutionRepository.allActiveInstitutions().then( res => {
            let tmp = []
            res.data.forEach(snapshot => {
                tmp  = tmp.concat({value: snapshot.id, label: snapshot.nameMk, name: "institution"});
            })
            this.setState({
                institutions: tmp
            })
        })
    }

    checkUserRole = () => {
        if (this.state.userRole === "ROLE_EVALUATOR")
        {
            InstitutionRepository.getInstitutionById(localStorage.getItem('institutionId')).then(res => {
                this.handleIncludedInstitutionsChange({
                    value: res.data.id,
                    label: res.data.nameMk,
                    name: "institution",
                })
            })
        }
    }

    handleIncludedInstitutionsChange = (institution) => {
        this.setState({
            isLoading: true,
        })
        ActivityRepository.getAllActivitiesByInstitution(institution.value).then(res => {
            this.setState({
                selectedInstitution: institution,
                activities: res.data,
                isLoading: false,
            })
        })
    }

    render() {

        let activities = this.state.activities.map((activity,index) => {
            return (
                <ActivityView activity={activity} key={index}/>
            )
        })

        return (
            <div className="container-fluid">

                    <h2 style={{textAlign: "left", color: "#1C4857"}} className="mt-3">
                        {this.state.userRole === "ROLE_ADMIN" || this.state.userRole === "ROLE_MODERATOR"
                            ? strings.activities
                            : strings.myActivities
                        }
                    </h2>

                <div className="row">

                    {this.state.userRole === "ROLE_ADMIN" || this.state.userRole === "ROLE_MODERATOR" ?
                        <div className="col-md-6 mt-4">
                            <label style={{fontSize: "12pt"}}>
                                {strings.institution}:
                            </label>

                            <div className="row">
                                <div className="col-md-10">
                                    <Select
                                        placeholder={strings.institution + "..."}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={true}
                                        isRtl={false}
                                        isSearchable={true}
                                        options={this.state.institutions}
                                        onChange={this.handleIncludedInstitutionsChange}
                                        name={"institution"}
                                    />
                                </div>
                                <div className="col">
                                    {
                                        this.state.isLoading ?
                                        <Spinner animation="border" />
                                        : ""
                                    }
                                </div>
                            </div>
                        </div>
                    : ""}

                    <div className="col-md-6"/>
                </div>

                <br/>

                {activities}

            </div>
        );
    }
}

export default MyActivities;