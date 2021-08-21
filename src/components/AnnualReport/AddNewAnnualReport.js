import React, {Component} from "react";
import {strings} from "../../Localization/Localization";
import AnnualReportRepository from "../../repository/AnnualReportRepository";
import "./css/AddNewAnnualReport.css"
import Datetime from "react-datetime";
import moment from "moment";
import {toast} from "react-toastify";
import ErrorPopup from "../ErrorHandler/ErrorPopup";


class AddNewAnnualReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMsgVisible:false,
            podatociSluzbLice: "",
            brPrimeniBaranja: 0,
            brPozitivnoOdgBaranja: 0,
            odbieniIOtfrleniZalbi: "",
            brNeodogovoreniBaranja: 0,
            vlozeniZalbi: "",
            brUsvoeniZalbi: 0,
            brPreinaceniOdluki: 0,
            odbieniZalbi: "",
            otfrelniZalbi: "",
            institutionId: localStorage.getItem("institutionId"),
            selectedYear:moment().format('YYYY'),
        }
    }

    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
    }

    async handleDateChange(e) {
        await this.setState({
            selectedYear: moment(e._d).format('YYYY')
        })
    }

    handleFormChange = (e) => {
        this.setState({
        [e.target.id]: e.target.value
        })
    }

    saveNewAnnualReport = (e) =>{
        e.preventDefault();
        const form = new FormData()
        form.append("podatociSluzbLice",this.state.podatociSluzbLice)
        form.append("brPrimeniBaranja",this.state.brPrimeniBaranja)
        form.append("brPozitivnoOdgBaranja",this.state.brPozitivnoOdgBaranja)
        form.append("odbieniIOtfrleniZalbi",this.state.odbieniIOtfrleniZalbi)
        form.append("brNeodogovoreniBaranja",this.state.brNeodogovoreniBaranja)
        form.append("vlozeniZalbi",this.state.vlozeniZalbi)
        form.append("brUsvoeniZalbi",this.state.brUsvoeniZalbi)
        form.append("brPreinaceniOdluki",this.state.brPreinaceniOdluki)
        form.append("odbieniZalbi",this.state.odbieniZalbi)
        form.append("otfrelniZalbi",this.state.otfrelniZalbi)
        form.append("institutionId",this.state.institutionId)
        form.append("year",this.state.selectedYear)

       return AnnualReportRepository.saveByYear(form).then(res =>{
            toast.success(strings.succAdded);
           setTimeout(this.props.closeAddModal, 5000)

       }).catch(err => {
           if (err.response.data === "Report exists") {
               this.setState({errorMsgVisible: true})
           } else {
               toast.error(strings.failTryAgain)
           }
       })
    }

    closeErrorDiv = () => {
        this.setState({errorMsgVisible: false})
    }
    render() {

        return (
            <div className="modal fade show d-block bd-example-modal-lg AddNewAnnualReportModal" tabIndex="-1" role="dialog"
                 aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">{strings.add}</h5>
                            <button onClick={this.props.closeAddModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <label htmlFor="AddNewAnnualReportSelectYear">
                                {strings.selectYear}:
                            </label>
                            <Datetime
                                id="AddNewAnnualReportSelectYear"
                                dateFormat="YYYY"
                                timeFormat={false}
                                value={this.state.selectedYear}
                                onChange={(e)=>this.handleDateChange(e)}
                            />

                            <form onSubmit={this.saveNewAnnualReport}>
                                <div className="form-group mt-3">
                                    <label htmlFor="podatociSluzbLice">
                                        {strings.podatociSluzbLice}
                                    </label>
                                    <textarea onChange={this.handleFormChange} className="form-control" id="podatociSluzbLice" rows="3" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="brPrimeniBaranja">
                                        {strings.brPrimeniBaranja}
                                    </label>
                                    <input onChange={this.handleFormChange} type="number" className="form-control" id="brPrimeniBaranja" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="brPozitivnoOdgBaranja">
                                        {strings.brPozitivnoOdgBaranja}
                                    </label>
                                    <input onChange={this.handleFormChange} type="number" className="form-control" id="brPozitivnoOdgBaranja" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="odbieniIOtfrleniZalbi">
                                        {strings.odbieniIOtfrleniZalbi}
                                    </label>
                                    <textarea onChange={this.handleFormChange} className="form-control" id="odbieniIOtfrleniZalbi" rows="3" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="brNeodogovoreniBaranja">
                                        {strings.brNeodogovoreniBaranja}
                                    </label>
                                    <input onChange={this.handleFormChange} type="number" className="form-control" id="brNeodogovoreniBaranja" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="vlozeniZalbi">
                                        {strings.vlozeniZalbi}
                                    </label>
                                    <textarea onChange={this.handleFormChange} className="form-control" id="vlozeniZalbi" rows="3" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="brUsvoeniZalbi">
                                        {strings.brUsvoeniZalbi}
                                    </label>
                                    <input onChange={this.handleFormChange} type="number" className="form-control" id="brUsvoeniZalbi" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="brPreinaceniOdluki">
                                        {strings.brPreinaceniOdluki}
                                    </label>
                                    <input onChange={this.handleFormChange} type="number" className="form-control" id="brPreinaceniOdluki" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="odbieniZalbi">
                                        {strings.odbieniZalbi}
                                    </label>
                                    <textarea onChange={this.handleFormChange} className="form-control" id="odbieniZalbi" rows="3" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="otfrelniZalbi">
                                        {strings.otfrelniZalbi}
                                    </label>
                                    <textarea onChange={this.handleFormChange} className="form-control" id="otfrelniZalbi" rows="3" required />
                                </div>
                                {this.state.errorMsgVisible && <ErrorPopup style={"mb-2"}
                                                                           errorMessage={strings.reportExists}
                                                                           closeErrDiv={this.closeErrorDiv}/>}

                                <div className="modal-footer">
                                    {!this.state.errorMsgVisible && <button type="submit" className="btn btn-info">{strings.save}</button>}
                                    {/*<button type="submit" className="btn btn-danger">Поднеси</button>*/}
                                    {/*<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>*/}

                                </div>

                            </form>
                        </div>



                    </div>
                </div>
            </div>
        )
    }

}

export default AddNewAnnualReport;
