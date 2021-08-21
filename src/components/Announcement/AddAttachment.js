import React, {Component} from 'react';
import {toast} from "react-toastify";
import './css/AddAttachment.css';
import 'react-toastify/dist/ReactToastify.css';
import AnnouncementAttachmentRepository from "../../repository/AnnouncementAttachmentRepository";
import AttachmentRepository from "../../repository/AttachmentRepository";
import {strings} from "../../Localization/Localization";
import DeleteModal from "../Crud/DeleteModal";
import {SERVER_ADDRESS, SERVER_NAME} from "../../shared/server-address";

class AddAttachment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            attachments: null
        }
    }

    componentDidMount() {
        this.getAttachments();
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
    }

    getAttachments = () => {
        let annId = this.props.match.params.id;
        AnnouncementAttachmentRepository.getAttachments(annId).then(res => {
            this.setState({attachments: res.data})
        }).catch(() => {
            toast.error(strings.failedToLoadAttachments)
        })
    };

    uploadFile = () => {
        let announcementId = this.props.match.params.id;
        const form = new FormData();
        form.append("announcementId", announcementId);
        form.append("attachment", this.state.file);

        AnnouncementAttachmentRepository.addAttachment(form).then(r => {
            toast.success(strings.successfullyUploadedFile);
            this.getAttachments();
        }).catch(() => {
            toast.error(strings.failedToUploadFile)
        });
    };
    downloadFile = (id) => {
        AttachmentRepository.downloadAttachment(id).then(
            toast.success(strings.successfullDownloadedFile)
        ).catch(() => {
            toast.error(strings.failedToDownloadAttachment)
        })
    }

    removeAttachment = (attachmentId, index) => {
        let announcementId = this.props.match.params.id;
        let array = [...this.state.attachments];
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({attachments: array})
        }
        return AnnouncementAttachmentRepository.removeAttachment(announcementId, attachmentId).then(toast.success(strings.deleteAttachedDocument))
            .catch(err => toast.error(err))

    }

    onChangeHandler = (event) => {
        this.setState({file: event.target.files[0]})
    };
     fileSize = size => {
        let i = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    };
    render() {
        if (this.state.attachments === null) {
            return <div></div>
        } else {
            return (
                <div className="container">
                    <h2 style={{textAlign: "left", color: "#1C4857"}} className="mt-4 mb-5">{strings.attachment}</h2>
                    <div className="row mt-4">
                        <div className="offset-md-3 col-md-6">
                            <div className="form-group files">
                                <label>{strings.uploadYourFile}</label>
                                <input type="file" name="file" onChange={this.onChangeHandler}
                                       className="form-control"/>
                            </div>
                            <button type="button" className="btn btn-info defaultBtn"
                                    onClick={this.uploadFile}>{strings.upload}</button>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <table className="table-hover newTable mt-4" style={{width: '100%'}}>
                            <thead className="tableHead">
                            <tr>
                                <th className="tableHeading firstHeading" style={{width: '28%'}}>{strings.name}</th>
                                <th className="tableHeading" style={{width: '35%'}}>{strings.mimeType}</th>
                                <th className="tableHeading" style={{width: '25%'}}>{strings.size}</th>
                                <th className="tableHeading lastHeading" style={{width: '12%'}}>{strings.actions}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.attachments.map((item, index) => {
                                    let size = this.fileSize(item.size)
                                    return (<tr key={item.id} style={{border: "1px solid lightgray"}}>
                                        <td className="tableData"><a style={{color: "blue"}}
                                                                     href={SERVER_ADDRESS + "/rest/attachment/download/" + item.id}
                                                                     target="_blank"
                                                                     rel="noopener noreferrer">{item.name}</a></td>
                                        <td className="tableData">{item.mimeType}</td>
                                        <td className="tableData">{size}</td>
                                        <td className="tableData">
                                            <DeleteModal btnClass={"defaultBtn"}
                                                         prompt={strings.removeAttachmentPrompt}
                                                         showText={true}
                                                         doDelete={() => this.removeAttachment(item.id, index)}/>
                                        </td>
                                    </tr>)
                                })
                            }
                            <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                                <td style={{borderRadius: "0 0 0 15px"}}/>
                                <td/>
                                <td/>
                                <td style={{borderRadius: "0 0 15px 0"}}/>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }
}

export default AddAttachment;