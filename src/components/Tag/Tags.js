import React, {Component} from "react";
import {strings} from "../../Localization/Localization";
import CrudModal from "../Crud/CrudModal";
import {toast} from "react-toastify";
import {faUniversity} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TagRepository from "../../repository/TagRepository";
import TagAdd from "./TagAdd";
import TagEdit from "./TagEdit";
import CrudService from "../../repository/service/CrudService";
import './css/tag.css';
import DeleteModal from "../Crud/DeleteModal";

class Tags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tag: null,
            active: ""
        }
    }

    componentDidMount() {
        this.getTags();
    }

    getTags = () => {
        TagRepository.getTags().then(res => {
            if (res.data.length > 0){
                this.setPubDoc(res.data[0])
            }
            this.setState({
                data: res.data
            })
        }).catch(err => console.log(err))
    }

    setPubDoc = (tag) => {
        if (this.state.tag === null){
            this.setState({
                tag: tag,
                active: tag.nameMk
            })
        }else {
            if (this.state.tag.id === tag.id){
                this.setState({
                    tag: null,
                    active: ""
                })
            }else{
                this.setState({
                    tag: tag,
                    active: tag.nameMk
                })
            }
        }
    }

    AddTag = (entity) => {
        if (entity.tagNameMk !== undefined && entity.tagNameMk !== "") {
            return CrudService.save("/rest/tag", entity).then(() => {
                toast.success(strings.successfullyAddedTag)
                this.getTags();
            }).catch(() => {
                toast.error(strings.failedToAddTag)
            })
        }
    }
    EditTag = (entity) => {
        return CrudService.edit("/rest/tag", entity).then(() => {
            toast.success(strings.successfullyEditedTag)
            this.getTags();
        }).catch(() => {
            toast.error(strings.failedToEditTag)
        })
    }

    deleteTag = (id) => {
        return TagRepository.deleteTag(id).then(() => {
            toast.success(strings.successfullyDeletedTag)
            this.getTags();
            this.setState({tag: null})
        }).catch(() => {
            toast.error(strings.tagNotDeleted)
        });
    };

    render() {
        return (
            <div className="col-12">
                <div className="row mt-3">
                    <div className="col-3 mb-5">
                        <h2 style={{textAlign: "left", color: "#1C4857"}} className="mt-2 mb-1">{strings.tags}</h2>
                    </div>
                    <div className="col-4 justify-content-end text-right">
                        <CrudModal entity={{}}
                                   icon="add"
                                   showText={true}
                                   btnClass="btn-primary defaultBtnAdd mt-2"
                                   title={strings.addTag}
                                   onSubmit={this.AddTag}
                                   body={TagAdd}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-7">

                        <div style={{height: "100%"}}>
                            <table className="table-hover newTable mt-2 " style={{width: "100%"}}>
                                <thead className="tableHead">
                                <tr>
                                    <th className="tableHeading firstHeading">{strings.name}</th>
                                    <th className="tableHeading lastHeading">{strings.actions}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.data &&
                                this.state.data.map((tag, index) => {
                                    let nameMk = tag.nameMk;
                                    let nameAl = tag.nameAl;
                                    return (
                                        <tr key={tag.id} style={{border: "1px solid lightgray", background: ((nameMk || nameAl) === this.state.active ? "lightgray" : "")}}>
                                            <td className="tableData">
                                                {nameMk.length > 40 || nameAl.length > 40 ? localStorage.getItem('activeLanguage') === 'mk' ? nameMk.slice(0, 40) + "..." : nameAl.slice(0, 40) + "..." : localStorage.getItem('activeLanguage') === 'mk' ? nameMk : nameAl}
                                            </td>
                                            <td className="tableData">
                                                <CrudModal entity={tag}
                                                           icon="edit"
                                                           btnClass="btn-success btn-sm defaultBtnEdit"
                                                           title={strings.edit}
                                                           showText={true}
                                                           onSubmit={this.EditTag}
                                                           body={TagEdit}/>
                                                <button className="btn btn-primary btn-sm ml-2 defaultBtn"
                                                        onClick={() => this.setPubDoc(tag)}><FontAwesomeIcon
                                                    icon={faUniversity}
                                                    style={{paddingRight: '2px'}}/>{strings.institutions}
                                                </button>
                                                <DeleteModal btnClass={"ml-2 defaultBtn"}
                                                             prompt={strings.questionDeleteTag}
                                                             showText={true}
                                                             doDelete={() => this.deleteTag(tag.id)}
                                                />
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
                    {this.state.tag ?
                    <div className="col-5 mt-2" style={{color: "black"}}>
                        <div key={this.state.tag.id} className={"list-group float-left-animation"}>
                                <div className="list-group-item" style={{borderRadius: "15px", marginRight: "-10px"}}>
                                    <div style={{wordWrap: "break-word", marginBottom: "10px", fontSize: '20px', textAlign: "center"}}>
                                        <span style={{borderBottom: "3px solid #EABF32", borderRadius: "7px"}}>
                                            {localStorage.getItem('activeLanguage') === 'mk' ? this.state.tag.nameMk : this.state.tag.nameAl}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className={"mb-2"}>
                                            {this.state.tag.institutions.length > 0 ? (strings.tagInstitutions + ": ") : "Не постојат институции поврзани со оваа ознака"}
                                        </h3>
                                        <div>
                                            <ul className="institutionsList">{this.state.tag.institutions.map(institution => {
                                                return (
                                                    <li className="ml-4" style={{fontSize: '17px', fontWeight: 'bold'}}
                                                        key={institution.id}>{localStorage.getItem('activeLanguage') === 'mk' ? institution.nameMk : institution.nameAl}</li>)
                                            })}</ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    : ""}
                </div>

            </div>
        )
    }
}

export default Tags;

