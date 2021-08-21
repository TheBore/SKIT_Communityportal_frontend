import React, {useEffect, useState} from "react";
import {strings} from "../../Localization/Localization";
import AnnualReportRepository from "../../repository/AnnualReportRepository"
import "./css/AnnualReportSignedFileUploadModal.css"
import {faFilePdf, faFileSignature} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";
import {SERVER_ADDRESS} from "../../shared/server-address";


const AnnualReportSignedFileUploadModal = (props) => {
console.log(props.reportSignedDocInfo);
    const [signedFile,setSignedFile] = useState(null);
    const [signedFileName,setSignedFileName] = useState(strings.uploadYourFile);
    const [downloadedSignedFileVisible,setDownloadedSignedFileVisible] = useState(false);

    useEffect(() => {
        haveSignedFileUploaded()
    }, []);

    const signedFileUploadChangeHandler = e =>{
        setSignedFile(e.target.files[0])
        setSignedFileName(e.target.files[0].name)
    }

    const haveSignedFileUploaded = () => {
        if (props.reportSignedDocInfo) {
            setDownloadedSignedFileVisible(true)
        }
    }

    // const reloadPage = () =>{
    //     window.location.reload()
    // }

    const uploadSignedFile = () => {

        if (signedFile !== null) {
            const form = new FormData();
            form.append("publicYearReportId", props.reportID);
            form.append("attachment", signedFile);

            AnnualReportRepository.uploadSignedFile(form).then(r => {
                toast.success(strings.successfullyUploadedFile)
               // window.setTimeout(reloadPage, 3000);

            }).catch(() => {
                toast.error(strings.failedToUploadFile)
            })
        }else{
            toast.warn(strings.noFileAdded)
        }
    }

    // const clearUploadField = () =>{
    //   document.getElementById("signedFileUploadInput").target.value(null)
    // }

    return (
        <div>

            {!downloadedSignedFileVisible && <button type="button" className="btn btn-success uploadSignedFileBtn" data-toggle="modal" data-target="#annualReportSignedFileUploadModal">
                <FontAwesomeIcon icon={faFileSignature} size="lg" className="mr-1"/>
                {strings.upload}
            </button>}

            {downloadedSignedFileVisible && <button type="button" className="btn btn-danger uploadSignedFileBtnRed" data-toggle="modal" data-target="#annualReportSignedFileUploadModal">
                <FontAwesomeIcon icon={faFileSignature} size="lg" className="mr-1"/>
                {strings.download}
            </button>}

            <div className="modal fade" id="annualReportSignedFileUploadModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{strings.uploadYourFile}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="row custom-file mt-3 mb-3">
                                <input onChange={signedFileUploadChangeHandler} type="file" className="custom-file-input" id="signedFileUploadInput" name="signedFileUploadInput"/>
                                    <label className="custom-file-label" htmlFor="customFile">{signedFileName}</label>
                            </div>

                            {downloadedSignedFileVisible && <div className="row">
                                <div className="col-12 text-left">
                                    <a style={{color:"red"}} href={SERVER_ADDRESS + "/rest/attachment/download/" + props.reportSignedDocInfo.id}
                                                         target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faFilePdf} color="red" size="lg" style={{paddingRight:'4px'}} />
                                        {props.reportSignedDocInfo.name}
                                    </a>
                                </div>
                            </div>}

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">{strings.close}</button>
                            <button onClick={uploadSignedFile} type="button" className="btn btn-primary">{strings.upload}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AnnualReportSignedFileUploadModal;
