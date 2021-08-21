import React, {Component} from "react";
import {strings} from "../../Localization/Localization";
import AnnualReportRepository from "../../repository/AnnualReportRepository";
import "./css/AddNewAnnualReport.css"
import Datetime from "react-datetime";
import {toast} from "react-toastify";


class EditAnnualReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status:this.props.data.status,
            isFormDisabled:false,
            podatociSluzbLice: this.props.data.report.podatociSluzbLice,
            brPrimeniBaranja: this.props.data.report.brPrimeniBaranja,
            brPozitivnoOdgBaranja: this.props.data.report.brPozitivnoOdgBaranja,
            odbieniIOtfrleniZalbi: this.props.data.report.odbieniIOtfrleniZalbi,
            brNeodogovoreniBaranja: this.props.data.report.brNeodogovoreniBaranja,
            vlozeniZalbi: this.props.data.report.vlozeniZalbi,
            brUsvoeniZalbi: this.props.data.report.brUsvoeniZalbi,
            brPreinaceniOdluki: this.props.data.report.brPreinaceniOdluki,
            odbieniZalbi: this.props.data.report.odbieniZalbi,
            otfrelniZalbi: this.props.data.report.otfrelniZalbi,
            pyrId: this.props.data.id,
            year:this.props.data.year,
        }
    }

    componentDidMount() {
        this.isFormDisabled();
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
        console.log(this.props.data)
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    EditAnnualReport = (e) =>{
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
        form.append("pyrId",this.state.pyrId)

        return AnnualReportRepository.updateAnnualReport(form).then(res =>{
            // this.props.history.push("/")
            toast.success(strings.succChanged);
        }).catch(() =>{
            toast.error(strings.failTryAgain)
        })
    }

    isFormDisabled = () => {
        if (this.props.data.status === "SUBMITTED"){
            this.setState({
                isFormDisabled: true
            })
        }
    }

    render() {

        return (
            <div className="modal fade show d-block bd-example-modal-lg EditAnnualReportModal" tabIndex="-1" role="dialog"
                 aria-labelledby="myLargeModalLabel" aria-hidden="true" show="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">

                            {this.state.status !== "SUBMITTED" && <h5 className="modal-title">{strings.edit}</h5>}
                            {this.state.status === "SUBMITTED" && <h5 className="modal-title">{strings.review}</h5>}

                            <button onClick={this.props.closeEditModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            {this.state.status !== "SUBMITTED" && <label htmlFor="EditAnnualReportSelectYear">
                                {strings.selectYear}
                            </label>}
                            <Datetime
                                id="EditAnnualReportSelectYear"
                                dateFormat="YYYY"
                                timeFormat={false}
                                value={this.state.year.toString()}
                                inputProps={{disabled: true}}
                            />

                            <form onSubmit={this.EditAnnualReport} >
                                <fieldset disabled={this.state.isFormDisabled}>
                                    <div className="form-group mt-3">
                                        <label htmlFor="podatociSluzbLice">
                                            {strings.podatociSluzbLice}
                                        </label>
                                        <textarea value={this.state.podatociSluzbLice} onChange={this.handleFormChange} className="form-control" id="podatociSluzbLice" rows="3" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="brPrimeniBaranja">
                                            {strings.brPrimeniBaranja}
                                        </label>
                                        <input value={this.state.brPrimeniBaranja} onChange={this.handleFormChange} type="number" className="form-control" id="brPrimeniBaranja" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="brPozitivnoOdgBaranja">
                                            {strings.brPozitivnoOdgBaranja}
                                        </label>
                                        <input value={this.state.brPozitivnoOdgBaranja} onChange={this.handleFormChange} type="number" className="form-control" id="brPozitivnoOdgBaranja" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="odbieniIOtfrleniZalbi">
                                            {strings.odbieniIOtfrleniZalbi}
                                        </label>
                                        <textarea value={this.state.odbieniIOtfrleniZalbi} onChange={this.handleFormChange} className="form-control" id="odbieniIOtfrleniZalbi" rows="3" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="brNeodogovoreniBaranja">
                                            {strings.brNeodogovoreniBaranja}
                                        </label>
                                        <input value={this.state.brNeodogovoreniBaranja} onChange={this.handleFormChange} type="number" className="form-control" id="brNeodogovoreniBaranja" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="vlozeniZalbi">
                                            {strings.vlozeniZalbi}                                        </label>
                                        <textarea value={this.state.vlozeniZalbi} onChange={this.handleFormChange} className="form-control" id="vlozeniZalbi" rows="3" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="brUsvoeniZalbi">
                                            {strings.brUsvoeniZalbi}
                                        </label>
                                        <input value={this.state.brUsvoeniZalbi} onChange={this.handleFormChange} type="number" className="form-control" id="brUsvoeniZalbi" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="brPreinaceniOdluki">
                                            {strings.brPreinaceniOdluki}
                                        </label>
                                        <input value={this.state.brPreinaceniOdluki} onChange={this.handleFormChange} type="number" className="form-control" id="brPreinaceniOdluki" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="odbieniZalbi">
                                            {strings.odbieniZalbi}
                                        </label>
                                        <textarea value={this.state.odbieniZalbi} onChange={this.handleFormChange} className="form-control" id="odbieniZalbi" rows="3" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="otfrelniZalbi">
                                            {strings.otfrelniZalbi}
                                        </label>
                                        <textarea value={this.state.otfrelniZalbi} onChange={this.handleFormChange} className="form-control" id="otfrelniZalbi" rows="3" required />
                                    </div>

                                    <div className="modal-footer">
                                        {this.state.status !== "SUBMITTED" && <button type="submit" className="btn btn-info">{strings.edit}</button>}
                                        {/*<button type="submit" className="btn btn-danger">Поднеси</button>*/}
                                        {/*<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>*/}
                                    </div>
                                </fieldset>
                            </form>
                        </div>



                    </div>
                </div>
            </div>
        )
    }

}

export default EditAnnualReport;
