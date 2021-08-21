import React, {Component} from 'react';
import AnnouncementRepository from "../../repository/AnnouncementRepository";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {strings} from "../../Localization/Localization";
import AreaOfInterestRepository from "../../repository/AreaOfInterestRepository";
import Select from "react-select";

class EditAnnouncement extends Component {

    constructor(props) {

        super(props);
        this.state = {
            id: this.props.match.params.id,
            title: '',
            body: '',
            optionsAreas: [],
            areaName: null,
            areaId: null,
            area: {}
        }
    }

    componentDidMount() {
        this.fetchData()
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});

    }

    fetchData = () => {
        AnnouncementRepository.getAnnouncementById(this.state.id).then(res => {
            this.setState({
                title: res.data.title,
                body: res.data.body,
                areaName: res.data.areaOfInterest.nameMk,
                areaId: res.data.areaOfInterest.id,
                area: res.data.areaOfInterest,
            })
        }).catch(err => toast.error(strings.failedToLoadData));

        this.getAreasOfInterest();
    }

    onSelectedAreaChangeHandler = (areaOfInterest) => {
        if (areaOfInterest !== null) {
            this.setState({
                areaName: areaOfInterest.label,
                areaId: areaOfInterest.value,
                area: areaOfInterest
            })
        } else {
            this.setState({
                areaName: null,
                areaId: null
            })
        }
    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    };


    handleBodyChange = (event) => {
        this.setState({body: event.target.value})
    };

    getAreasOfInterest = () => {
        AreaOfInterestRepository.findAllActive().then((res) => {
            let optionsAreas = [];
            for (let i = 0; i < res.data.length; i++) {
                optionsAreas.push({
                    'value': res.data[i].id,
                    'label': res.data[i].nameMk,
                })
            }
            this.setState({
                optionsAreas: optionsAreas
            })
        }).catch(err => toast.error(strings.failedToLoadData));
    }

    updateAnnouncement = (e) => {
        e.preventDefault();
        let announcement = {
            id: this.state.id,
            title : this.state.title,
            body : this.state.body,
            areaOfInterestId: this.state.areaId,
        }
        AnnouncementRepository.updateAnnouncement(announcement).then(res => {
            toast.success(strings.editAnnouncementSuccessful);
            this.props.history.push("/allannouncements")
        }).catch(err => {
            toast.error(strings.editAnnouncementFailed);
        });
    }


    render() {
        return (
            <div>
                <h1 className="text-center mt-5">{strings.editAnnouncement}</h1>
                <div className="container mt-5">
                    <form onSubmit={this.updateAnnouncement}>
                        <div className="form-group">
                            <label htmlFor="title">{strings.title}</label>
                            <textarea className="form-control"
                                      rows={3}
                                      id="title"
                                      onChange={this.handleTitleChange}
                                      defaultValue={this.state.title}
                            />

                        </div>
                        <div className="form-group">
                            <label htmlFor="body">{strings.body}</label>
                            <textarea className="form-control"
                                      rows={5}
                                      id="body"
                                      onChange={this.handleBodyChange}
                                      defaultValue={this.state.body}
                            />
                        </div>

                        <div className="form-group">
                            <label
                                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.areasOfInterest}</label>
                            <Select
                                placeholder={this.state.areaName ? this.state.areaName : " "}
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={true}
                                isRtl={false}
                                isSearchable={true}
                                options={this.state.optionsAreas}
                                onChange={this.onSelectedAreaChangeHandler}
                                name="areaOfInterestId"
                                value={this.state.areaId}
                                defaultValue={{
                                    value: this.state.areaId,
                                    label: this.state.areaName,
                                }}
                            />
                        </div>
                        <button type="submit" className="btn btn-info defaultBtnEdit">{strings.edit}</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditAnnouncement;