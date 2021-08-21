import React, {Component} from "react";
import PublicDocumentTypeRepository from "../../repository/PublicDocumentTypeRepository";
import PublicDocumentsRegistryRepository from "../../repository/PublicDocumentsRegistryRepository";
import InstitutionRepository from "../../repository/InstitutionRepository";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt, faFilePdf} from "@fortawesome/free-solid-svg-icons";
import {strings} from "../../Localization/Localization";
import {ButtonToolbar} from "react-bootstrap";
import CrudModal from "../Crud/CrudModal";
import AddLink from "./AddLink";
import {toast} from "react-toastify";
import AddPdf from "./AddPdf";
import {SERVER_ADDRESS} from "../../shared/server-address";

class PublicDocument extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allYears: [],//site godini
            year: new Date().getFullYear(), // selektirana godina
            publicDocTypes: [], // site tipovi na javni dokumenti
            document: null, // javen dokument
            typeForPubDoc: null, // selektiran tip na javen dokument
            role: localStorage.getItem('role'), // ulogata na najaveniot korisnik
            selectedInstitution: localStorage.getItem('institutionId') !== "-1" ? localStorage.getItem('institutionId') : null,//prikaz za odbranta institucija
            allInstitutions: [], // site institucii,
            active: "", // klasa za aktiven div
            hasDoc:true
        }
    }

    componentDidMount() {
        this.getAllYears();
        this.getAllInstitutions();
        this.getAllPublicDocumentTypes();

    }

    render() {

        return (
            <div className="container">
                <h2 style={{textAlign: "left", color: "#1C4857"}}
                    className="mt-4 mb-4">{strings.PublicDocumentsRegistry}</h2>

                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 mt-3">
                        <label>{strings.selectYear}</label><select name="year" value={this.state.year}
                                                                   onChange={this.yearChangeHandler}
                                                                   className="form-control custom-select">
                        {this.state.allYears.map((year, index) => {
                            return (<option value={year} key={index}>{year}</option>)
                        })}
                    </select>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 mt-3"></div>
                    <div className="col-lg-5 col-md-5 col-sm-5 mt-3">
                        {this.state.role === "ROLE_ADMIN" ? <div style={{marginLeft: "auto"}}>
                            <label>{strings.institution}</label>
                            <select name="institutions" className="form-control custom-select"
                                    onChange={this.institutionChangeHandler}>
                                <option>{strings.pleaseChooseInstitution}</option>

                                {this.state.allInstitutions.map((institution) => {
                                    return (<option
                                        value={institution.id}
                                        key={institution.id}>{localStorage.getItem('activeLanguage') === 'mk' ? institution.nameMk : institution.nameAl}</option>)
                                })}
                            </select>
                        </div> : null}</div>
                </div>

                <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-5 mt-5">

                        <div style={{maxHeight: "350px", overflowY: "auto"}}>
                            <ul className="list-group">
                                {this.state.publicDocTypes &&
                                this.state.publicDocTypes.map((type, index) => {
                                    let name = type.name
                                    return (
                                        <li
                                            className={
                                                "list-group-item " +
                                                (name === this.state.active ? "active" : "")
                                            }
                                            key={index}
                                        >
                                            {name.slice(0, 40) + "..."}
                                            <div style={{display: "flex", float: "right"}}>
                                                {this.state.selectedInstitution !== null ?
                                                    this.state.hasDoc===true&&name===this.state.active?
                                                        <button className="btn btn-sm ml-1 "
                                                            style={{"backgroundColor": "green", "color": "white"}}
                                                            onClick={() => this.getPubDoc(type)}><FontAwesomeIcon
                                                        icon={faExternalLinkAlt}
                                                        style={{paddingRight: '2px'}}/>{strings.open}</button>:<button className="btn btn-sm ml-1 "
                                                                                                                       style={{"backgroundColor": "red", "color": "white"}}
                                                                                                                       onClick={() => this.getPubDoc(type)}><FontAwesomeIcon
                                                            icon={faExternalLinkAlt}
                                                            style={{paddingRight: '2px'}}/>{strings.open}</button>:
                                                    <button className="btn btn-sm ml-1 "
                                                            style={{"backgroundColor": "#ffe200", "color": "white"}}
                                                            disabled={true}><FontAwesomeIcon
                                                        icon={faExternalLinkAlt}
                                                        style={{paddingRight: '2px'}}/>{strings.open}</button>}

                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 mt-5">
                        {this.state.document && (
                            <div className="list-group">
                                <div className="list-group-item">
                                    <div style={{wordWrap: "break-word", fontSize: "15px"}}>
                                        {strings.publicDocType + ": " + this.state.document.type.name}
                                    </div>
                                    <div className={"mb-3 mt-3"}><b
                                        style={{fontSize: "15px"}}>{strings.Url + ": "}</b>{this.state.document.url !== null ? this.state.document.url : strings.noUrl}
                                    </div>
                                    <div><b
                                        style={{fontSize: "15px"}}>PDF: </b>{this.state.document.attachment !== null ?
                                        <a style={{color: "blue", marginBottom: "4px"}}
                                           href={SERVER_ADDRESS +  "/rest/attachment/download/" + this.state.document.attachment.id}
                                           target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFilePdf}
                                                                                                      color="red"
                                                                                                      size="lg"
                                                                                                      style={{paddingRight: '4px'}}/>{this.state.document.attachment.name}
                                        </a> : strings.noPDF}</div>
                                    <ButtonToolbar className="mt-3">
                                        <CrudModal entity={this.state.document}
                                                   icon="link"
                                                   btnClass="btn-dark btn-sm mr-2"
                                                   title={strings.Url}
                                                   onSubmit={this.onAddLink}
                                                   body={AddLink}
                                                   showText={true}/>
                                        <CrudModal entity={this.state.document}
                                                   icon="pdf"
                                                   btnClass="btn-info btn-sm"
                                                   title={strings.uploadPDF}
                                                   onSubmit={this.onAddPdf}
                                                   body={AddPdf}
                                                   showText={true}/>

                                    </ButtonToolbar>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    onAddLink = (entity) => {
        let document = {
            year: this.state.year,
            type: entity.type,
            url: entity.url,
            attachment: entity.attachment
        };
        this.setState({document: document})
        const form = new FormData()
        form.append("year", this.state.year);
        form.append("type", entity.type.id)
        form.append("url", entity.url)
        if (this.state.role === 'ROLE_ADMIN') {
            form.append('institutionId', this.state.selectedInstitution)
        } else {
            form.append('institutionId', localStorage.getItem('institutionId'))
        }
        return PublicDocumentsRegistryRepository.savePublicDocForYear(form)
            .then(() => {
                toast.success(strings.successfullyAddedLink)
                this.getPubDoc(entity.type);
            })
            .catch(() => {
                toast.error(strings.failedToAddLink)
            })
    }
    onAddPdf = (entity) => {
        const form = new FormData()
        form.append("year", this.state.year);
        form.append("type", entity.type.id)
        form.append("url", this.state.document.url)
        form.append("attachment", entity.attachment)
        if (this.state.role === 'ROLE_ADMIN') {
            form.append('institutionId', this.state.selectedInstitution)
        } else {
            form.append('institutionId', localStorage.getItem('institutionId'))
        }
        return PublicDocumentsRegistryRepository.savePublicDocForYear(form)
            .then(() => {
                toast.success(strings.successfullyAddedPdf)
                this.getPubDoc(entity.type);
            })
            .catch(() => {
                toast.error(strings.failedToAddPdf)
            })
    }
    getPubDoc = (type) => {
        let year = this.state.year;
        let typeId = type.id;
        let institutionId;
        if (this.state.role === "ROLE_ADMIN") {
            institutionId = this.state.selectedInstitution;
        } else {
            institutionId = localStorage.getItem('institutionId');
        }
        PublicDocumentsRegistryRepository.getSingleDoc(year, institutionId, typeId).then(res => {
            debugger
            if (res.data !== "") {
                this.setState({
                    document: res.data,
                    active: type.name,
                    hasDoc:true
                })
            } else {
                let document = {}
                document.type = type;
                document.url = null;
                document.attachment = null;
                this.setState({
                    document: document,
                    active: type.name,
                    hasDoc:false
                })
            }
        }).catch(err => {
            console.log(err);
        });

    }

    institutionChangeHandler = (e) => {
        this.setState({selectedInstitution: e.target.value})
    }
    yearChangeHandler = (e) => {
        this.setState({year: e.target.value})
    }

    getAllInstitutions = () => {
        InstitutionRepository.allActiveInstitutions().then(res => {
            this.setState({allInstitutions: res.data})
        })
    }

    getAllYears = () => {
        PublicDocumentsRegistryRepository.getAllYear().then(res => {
            const allYears = res.data;
            const currentYear = this.state.year;
            if (allYears.indexOf(currentYear) < 0) {
                allYears.push(currentYear);
            }
            if (allYears.indexOf(currentYear + 1) < 0) {
                allYears.push(currentYear + 1);
            }
            if (allYears.indexOf(currentYear - 1) < 0) {
                allYears.push(currentYear - 1);
            }
            allYears.sort();
            this.setState({allYears: allYears})
        }).catch(err => console.log(err.message))
    }

    getAllPublicDocumentTypes = () => {
        PublicDocumentTypeRepository.getAllTypes().then(res => {
            this.setState({publicDocTypes: res.data})
        }).catch(err => {
            console.log(err)
        })
    }


}

export default PublicDocument
