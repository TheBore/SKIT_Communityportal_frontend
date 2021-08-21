import React, {Component} from 'react';
import AnnouncementRepository from "../../repository/AnnouncementRepository";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {strings} from "../../Localization/Localization";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AreaOfInterestRepository from "../../repository/AreaOfInterestRepository";
import Select from "react-select";

class AddAnnouncement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            file: null,
            optionsAreas: [],
            areaName: null,
            areaId: null,
            area: {}
        }
    }

    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
        this.getAreasOfInterest();
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

    saveAnnouncement = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.set('title', this.state.title);
        form.set('body', this.state.body);
        form.set('attachment', this.state.file)
        form.set('areaOfInterestId', this.state.areaId)
        if (this.state.title !== "" && this.state.body !== "" && this.state.areaId != null) {
            AnnouncementRepository.addAnnouncement(form).then(res => {
                this.props.history.push("/allannouncements")
                toast.success(strings.successfullyAddedAnnouncement);
            }).catch(err => {
                toast.error(strings.failedToAddAnnouncement);
            });
        }
    };
    handleAttachmentChange = (event) => {
        this.setState({file: event.target.files[0]})
    };

    render() {
        return (
            <div>
                <h1 className="text-center mt-5">{strings.createAnnouncement}</h1>
                <div className="container mt-5">
                    <form onSubmit={this.saveAnnouncement}>

                        <div className="form-group">
                            <label htmlFor="title"><small style={{color: "red"}}>*</small>{strings.title}</label>
                            <textarea
                                rows={3}
                                id="title"
                                className="form-control"
                                onChange={this.handleTitleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="body"><small style={{color: "red"}}>*</small>{strings.body}</label>
                            <textarea
                                className="form-control"
                                rows={5}
                                id="body"
                                onChange={this.handleBodyChange}
                            />
                        </div>

                        <div className="form-group">
                            <label
                                className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.areasOfInterest}</label>
                            <Select
                                placeholder={""}
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
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="attachment">{strings.attachment}</label><input className="form-control"
                                                                                           type="file"
                                                                                           id="attachment"
                                                                                           onChange={this.handleAttachmentChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary defaultBtnAdd mb-5"><FontAwesomeIcon icon={faPlusCircle} size="lg"
                                                                                           style={{paddingRight: '4px'}}/>{strings.add}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddAnnouncement;