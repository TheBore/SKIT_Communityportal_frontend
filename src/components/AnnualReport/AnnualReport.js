import React, {Component} from "react";
import {strings} from "../../Localization/Localization";
import AnnualReportRepository from "../../repository/AnnualReportRepository";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import {
    faFileAlt, faFileExcel, faFilePdf, faFileSignature,
    faHourglassStart,
    faPlusCircle,
    faUniversity,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AnnualReportTableRow from "./AnnualReportTableRow";
import AddNewAnnualReport from "./AddNewAnnualReport";


import "./css/AnnualReport.css";
import {SERVER_ADDRESS} from "../../shared/server-address";

class AnnualReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedYear:moment().format('YYYY'),
            reports:[],
            showAddModal:false
        }
    }

    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
        this.fetchData();
    }

    fetchData=()=> {
        if(localStorage.getItem("role") === "ROLE_ADMIN") {
            AnnualReportRepository.getAllByYear(this.state.selectedYear).then(res => {
                this.setState({
                    reports: res.data,
                })
            })
        }else {
            AnnualReportRepository.getByYearAndInstitution(localStorage.getItem('institutionId'),this.state.selectedYear)
                .then(res=>{
                    this.setState({
                        reports: res.data,
                    })
                })
        }
    }

     async handleDateChange(e) {
         await this.setState({
             selectedYear: moment(e._d).format('YYYY')
         })
          await this.fetchData();
    }

    showAddModal=()=>{
        this.setState({
            showAddModal: true
        })
    }

    closeAddModal=()=>{
        this.setState({
            showAddModal: false
        })
    }

    render() {

            return (
                <div className="container">

                    <div className="row mt-3">
                        <div className="col-12">
                            <button onClick={this.showAddModal} type="button" className="btn rounded-pill btn-primary" data-toggle="modal" data-target=".AddNewAnnualReportModal">
                                <FontAwesomeIcon icon={faPlusCircle} size="lg" style={{paddingRight: '4px'}}/>
                                {strings.add}
                            </button>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-6 YearPickerCol">
                            <Datetime
                                dateFormat="YYYY"
                                timeFormat={false}
                                value={this.state.selectedYear}
                                onChange={(e)=>this.handleDateChange(e)}
                            />
                        </div>
                        <div className="col-6 text-right" >
                            <h2 className="currentYearHeading">{this.state.selectedYear}</h2>
                        </div>
                    </div>

                    <div className="row mt-3 annualReportTableHeaderDiv">
                        <div className="col">
                            <FontAwesomeIcon icon={faUniversity} size="lg" className="mr-1"/>
                            {strings.institutionName}
                        </div>
                        <div className="col">
                            <FontAwesomeIcon icon={faUser} size="lg" className="mr-1"/>
                            {strings.submitter}
                        </div>
                        <div className="col">
                            <FontAwesomeIcon icon={faHourglassStart} size="lg" className="mr-1"/>
                            {strings.status}
                        </div>
                        <div className="col">
                            <FontAwesomeIcon icon={faFileAlt} size="lg" className="mr-1"/>
                            {strings.form}
                        </div>
                        <div className="col"></div>
                        <div className="col">
                            <FontAwesomeIcon icon={faFilePdf} size="lg" className="mr-1"/>
                            {strings.file}
                        </div>
                        <div className="col">
                            <FontAwesomeIcon icon={faFileSignature} size="lg" className="mr-1"/>
                            {strings.signedDocument}
                        </div>
                    </div>

                    <AnnualReportTableRow reports={this.state.reports} fetchData={this.fetchData}/>

                    <div className="row mt-3">
                        <div className="col-12 text-right">
                            {/*<а href={`http://localhost:9091/rest/yearlyreport/exportToXlsx`} className="btn btn-dark" style={{cursor:"pointer"}}>*/}
                            {/*    <FontAwesomeIcon icon={faFileExcel} size="lg" className="mr-2"/>*/}
                            {/*     Извештај*/}
                            {/*</а>*/}
                            <a href={`${SERVER_ADDRESS}/rest/yearlyreport/exportToXlsx`} className="btn btn-dark" style={{cursor:"pointer"}}> <FontAwesomeIcon icon={faFileExcel} size="lg" className="mr-2"/>{strings.report}</a>
                        </div>
                    </div>

                    {this.state.showAddModal  && <AddNewAnnualReport closeAddModal={this.closeAddModal}/>}

                </div>
            )


    }

}

export default AnnualReport;
