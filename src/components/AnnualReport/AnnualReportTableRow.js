import React, {Component} from "react";
import {strings} from "../../Localization/Localization";
import InfoPopup from "../ErrorHandler/InfoPopup";
import "./css/AnnualReportTableRow.css"
import {faCheck, faFilePdf, faPencilAlt, faSpinner, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EditAnnualReport from "./EditAnnualReport";
import AnnualReportRepository from "../../repository/AnnualReportRepository";
import AnnualReportSignedFileUploadModal from "./AnnualReaportSignedFileUploadModal"
import {toast} from "react-toastify";
import {SERVER_ADDRESS} from "../../shared/server-address";

class AnnualReportTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            propsData:{},
            editModalVisible:false,
            activeLanguage:localStorage.getItem("activeLanguage"),
            isWaiting:false // loading bar
        }
    }

    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
    }

    openEditModal = (rowData) => {
        this.setState({
            propsData: rowData,
            editModalVisible:true
        })
    }

    closeEditModal = () => {
        this.setState({
            editModalVisible:false
        })
    }

    submitAnnualReport = (pyrId) => {
        this.setState({
            isWaiting:true
        })
        AnnualReportRepository.submitAnnualReport(pyrId.id).then(res =>{
            this.props.fetchData();
            this.setState({
                isWaiting: false
            })
        }).catch(() =>{
            toast.error(strings.failedToSubmitReport)
        })
    }


    render() {
        if (this.props.reports.length!==0){
            return (
                <div id="AnnualReportTableBody">

                    {!this.state.isWaiting && this.props.reports.map((annualReportDataRow,index)=>{
                        let status
                        if(annualReportDataRow.status === "SUBMITTED"){
                            status = <p className="annualReportStatusSubmitted">
                                <FontAwesomeIcon icon={faCheck} size="lg" className="mr-1"/>
                                {strings.submitted}
                            </p>
                        }else{
                            status = <p className="annualReportStatusInProgress">
                                <FontAwesomeIcon icon={faSpinner} size="lg" className="mr-1"/>
                                {strings.inProgress}
                            </p>
                        }

                        if (index % 2 === 0) {
                            return (
                                <div className="row mt-3 annualReportTableBodyDivEven" key={index}>
                                    <div className="col">
                                        {this.state.activeLanguage === "mk" && annualReportDataRow.institution.nameMk}
                                        {this.state.activeLanguage === "al" && annualReportDataRow.institution.nameAl}
                                    </div>
                                    <div className="col">
                                        {annualReportDataRow.report.podatociSluzbLice}
                                    </div>
                                    <div className="col">
                                        {status}
                                    </div>
                                    <div onClick={() => this.openEditModal(annualReportDataRow)} className="col AnnualReportTableRowCheck" type="button" data-toggle="modal" data-target=".EditAnnualReportModal">
                                        <FontAwesomeIcon icon={faPencilAlt} className="mr-1"/>
                                        {strings.review}
                                    </div>
                                    {annualReportDataRow.status === "SAVED" &&  <div onClick={() => this.submitAnnualReport(annualReportDataRow)} className="col AnnualReportTableRowSubmit" type="button" data-toggle="modal" data-target=".EditAnnualReportModal">
                                        <FontAwesomeIcon icon={faThumbsUp} className="mr-1"/>
                                        {strings.submit}
                                    </div>}
                                    {annualReportDataRow.status === "SUBMITTED" && <div className="col">&nbsp;</div>}
                                    <div className="col AnnualReportTableRowFile">
                                        {annualReportDataRow.status === "SUBMITTED" &&
                                        <a href={`${SERVER_ADDRESS}/rest/attachment/download/` + annualReportDataRow.doc.id}
                                           target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faFilePdf} size="lg" className="mr-1"/>
                                            {strings.print}
                                        </a>
                                        }
                                    </div>
                                    {annualReportDataRow.status === "SAVED" && <div className="col">&nbsp;</div>}
                                    {annualReportDataRow.status === "SUBMITTED" && <div className="col">
                                        <AnnualReportSignedFileUploadModal reportID={annualReportDataRow.id} reportSignedDocInfo={annualReportDataRow.signedDoc} />
                                    </div>}
                                </div>
                            )
                        } else {
                            return (

                                    <div className="row mt-3 annualReportTableBodyDivOdd" key={index}>
                                        <div className="col" style={{wordWrap: "break-word"}}>
                                            {this.state.activeLanguage === "mk" && annualReportDataRow.institution.nameMk}
                                            {this.state.activeLanguage === "al" && annualReportDataRow.institution.nameAl}
                                        </div>
                                        <div className="col" style={{wordWrap: "break-word"}}>
                                            {annualReportDataRow.report.podatociSluzbLice}
                                        </div>
                                        <div className="col">
                                            {status}
                                        </div>
                                        <div onClick={() => this.openEditModal(annualReportDataRow)}
                                             className="col AnnualReportTableRowCheck" type="button" data-toggle="modal"
                                             data-target=".EditAnnualReportModal">
                                            <FontAwesomeIcon icon={faPencilAlt} className="mr-1"/>
                                            {strings.review}
                                        </div>
                                        {annualReportDataRow.status === "SAVED" &&  <div onClick={() => this.submitAnnualReport(annualReportDataRow)} className="col AnnualReportTableRowSubmit" type="button" data-toggle="modal" data-target=".EditAnnualReportModal">
                                            <FontAwesomeIcon icon={faThumbsUp} className="mr-1"/>
                                            {strings.submit}
                                        </div>}
                                        {annualReportDataRow.status === "SUBMITTED" && <div className="col">&nbsp;</div>}
                                        <div className="col AnnualReportTableRowFile">
                                            {annualReportDataRow.status === "SUBMITTED" &&
                                            <a href={`${SERVER_ADDRESS}/rest/attachment/download/` + annualReportDataRow.doc.id}
                                               target="_blank" rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faFilePdf} size="lg" className="mr-1"/>
                                                {strings.print}
                                            </a>
                                            }
                                        </div>
                                        {annualReportDataRow.status === "SAVED" && <div className="col">&nbsp;</div>}
                                        {annualReportDataRow.status === "SUBMITTED" && <div className="col">
                                            <AnnualReportSignedFileUploadModal reportID={annualReportDataRow.id} reportSignedDocInfo={annualReportDataRow.signedDoc} />
                                        </div>}


                                    </div>


                            )
                        }
                    })}

                    { this.state.editModalVisible && <EditAnnualReport data={this.state.propsData} closeEditModal={this.closeEditModal}/> }
                    {this.state.isWaiting && <div className="container-fluid loadingContainer">
                        <div className="spinner-grow text-secondary" style={{height:"50px", width:"50px"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-secondary" style={{height:"50px", width:"50px"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-secondary" style={{height:"50px", width:"50px"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>}
                </div>

            )
        } else {
            return (
                <div className="mt-5" style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                    <InfoPopup class infoMessage={strings.noAnnualReportsFoundForThisYear}/>
                </div>
            )
        }


    }

}

export default AnnualReportTableRow;
