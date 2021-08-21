import React, {Component} from "react";
import {Button, ButtonToolbar} from "react-bootstrap";
import FeedbackRepository from "../../repository/FeedbackRepository";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EditFeedback from "./EditFeedback";
import moment from "moment";
import ReactPaginate from 'react-paginate';
import CrudModal from "../Crud/CrudModal";
import AddFeedback from "./AddFeedback";
import DeleteModal from "../Crud/DeleteModal";
import {strings} from "../../Localization/Localization";
import {faChartBar, faEdit, faPalette, faShare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './css/FeedbackCrudTable.css'

class FeedbackCrudTable extends Component {

    state = {
        feedbacks: [],
        pageCount: 1,
        userRole: localStorage.getItem('role')
    }

    componentDidMount() {
        this.fetchData();
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
    }

    render() {
        return (

            <div>
                <div className="row">
                    <div className="col-6">
                        <h2 style={{textAlign: "left", color: "#1C4857"}} className="mt-4 mb-4">{strings.feedbacks}</h2>
                    </div>
                    <div className="col-6 justify-content-end text-right">
                        <CrudModal entity={{}}
                                   icon="add"
                                   showText={true}
                                   btnClass="defaultBtnAdd btn-primary mt-4 mb-2"
                                   title={strings.addFeedback}
                                   onSubmit={this.onAdd}
                                   body={AddFeedback}/>

                    </div>
                </div>


                <table className="table-hover newTable mt-2" style={{width: "100%"}}>
                    <thead className="tableHead">
                        <th className="tableHeading firstHeading" style={{width: '10%'}}>{strings.creator}</th>
                        <th className="tableHeading" style={{width: '16%'}}>{strings.institution}</th>
                        <th className="tableHeading" style={{width: '16%'}}>{strings.nameFeedback}</th>
                        <th className="tableHeading" style={{width: '16%'}}>{strings.descShortFeedback}</th>
                        <th className="tableHeading" style={{width: '7%'}}>{strings.dueDate}</th>
                        <th className="tableHeading" style={{width: '8%'}}>{strings.numOfPublishes}</th>
                        <th className="tableHeading lastHeading text-center" style={{width: '35%'}}>{strings.actions}</th>
                    </thead>
                    <tbody>
                    {this.state.userRole === "ROLE_ADMIN" ? this.state.feedbacks.map(this.renderFeedbackItemAdmin) : this.state.feedbacks.map(this.renderFeedbackItemUser)}
                    <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                        <td style={{borderRadius: "0 0 0 15px"}}/>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td style={{borderRadius: "0 0 15px 0"}}/>
                    </tr>
                    </tbody>
                </table>


                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={'...'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
            </div>
        )
    }


    fetchData =  (selectedPage = 0) => {
        FeedbackRepository.getFeedbackPage(selectedPage).then(async res => {

            const newData = res.data.content;

            for(let i=0; i<newData.length; i++){
                await FeedbackRepository.getNumberOfFeedbackPublishes(newData[i].id).then(snap => {
                    newData[i]["num"]=snap.data
                })
            }

            this.setState({
                feedbacks: newData,
                pageCount: res.data.totalPages
            })
        }).catch(err => {
            console.log(err)
        })
    }

    handlePageClick = data => {
        this.fetchData(data.selected);
    };


    onAdd = (entity) => {
        const form = new FormData();
        console.log("en", entity)
        form.append('name', entity.name);
        form.append('description', entity.description);
        // const dueDate = entity.dueDate || new Date();
        form.append('dueDate', moment(entity.dueDate).format("MM/DD/YYYY"));
        form.append('areaOfInterestId', entity.areaOfInterestId)
        if (entity.name !== "" && entity.description !== "" && entity.areaOfInterestId !== "") {
            return FeedbackRepository.addFeedback(form).then(res => {
                toast.success(strings.successfullyAddedFeedback)
                this.props.history.push("/desingfeedback/" + res.data.id);
            }).catch(err => {
                toast.error(strings.failTryAgain)
            });
        }
    }

    onEdit = (entity) => {
        return FeedbackRepository.editFeedback(entity).then(res => {
            toast.success(strings.feedbackSuccessfullyEdited)
            this.fetchData();
        }).catch(err => {
            toast.error(strings.failTryAgain)
        });
    }

    deleteFeedback = (id) => {
        return FeedbackRepository.deleteFeedback(id).then(() => {
            this.fetchData();
            toast.success(strings.successfullyDeletedFeedback)
        }).catch(() => {
            toast.error(strings.failedToDeleteFeedback)
        });
    }

    renderFeedbackItemUser = feedback => {
        return (<tr key={feedback.id} style={{border: "1px solid lightgray"}}>
            <td className="tableData firstData">{feedback.creator.firstName + " " + feedback.creator.lastName}</td>
            {feedback.creator.institution !== null ?
                <td className="tableData">{localStorage.getItem("activeLanguage") === "mk" ? feedback.creator.institution.nameMk : feedback.creator.institution.nameAl}</td> :
                <td className="tableData">{strings.noInstitution} </td>}
            <td className="tableData">{feedback.name}</td>
            <td className="tableData">
                <div style={{wordWrap: "break-word"}}>{feedback.description}</div>
            </td>
            <td className="tableData">{moment(feedback.dueDate).local().format('DD-MM-YYYY')}</td>
            <td className="tableData" style={{textAlign: "center", fontWeight: "bold"}}>{feedback.num}</td>
            <td className="tableData">
                {localStorage.getItem('email') === feedback.creator.email ? <ButtonToolbar>
                    {feedback.isPublished === true ?
                        <Button className="defaultBtn btn btn-success btn-sm" disabled={true}>
                            <FontAwesomeIcon icon={faEdit} size="lg" style={{paddingRight: '4px'}}/>
                        </Button>

                        :
                        <CrudModal entity={feedback}
                                   icon="edit"
                                   btnClass="defaultBtnEdit btn-success btn-sm noTextBtn"
                                   title={""}
                                   showText={true}
                                   onSubmit={this.onEdit}
                                   body={EditFeedback}/>}

                    {feedback.isPublished === true ?
                        <button disabled={true} className="defaultBtn btn btn-sm ml-1"
                                style={{"backgroundColor": "#f0ad4e "}}><FontAwesomeIcon icon={faPalette} size="lg"
                                                                                         style={{paddingRight: '4px'}}/>{strings.questions}
                        </button>
                        : <Link to={"/desingfeedback/" + feedback.id} className="defaultBtn btn btn-sm ml-1"
                                style={{"backgroundColor": "#f0ad4e "}}><FontAwesomeIcon icon={faPalette} size="lg"
                                                                                         style={{paddingRight: '4px'}}/>{strings.questions}
                        </Link>}
                    <Link to={"/publishfeedback/" + feedback.id}
                          className="defaultBtn btn btn-info btn-sm ml-1"><FontAwesomeIcon icon={faShare} size="lg"
                                                                                style={{paddingRight: '4px'}}/>{strings.publish}
                    </Link>
                    <Link to={"/analyse/" + feedback.id}
                          className="defaultBtn btn btn-dark btn-sm ml-1"><FontAwesomeIcon icon={faChartBar} size="lg"
                                                                                style={{paddingRight: '4px'}}/>{strings.analyse}
                    </Link>
                </ButtonToolbar> : null}

            </td>
        </tr>);
    }


    renderFeedbackItemAdmin = feedback => {
        return (<tr key={feedback.id} style={{border: "1px solid lightgray"}}>
            <td className="tableData firstData">{feedback.creator.firstName + " " + feedback.creator.lastName}</td>
            {feedback.creator.institution !== null ?
                <td className="tableData">{localStorage.getItem("activeLanguage") === "mk" ? feedback.creator.institution.nameMk : feedback.creator.institution.nameAl}</td> :
                <td className="tableData">{strings.noInstitution} </td>}

            <td className="tableData">{feedback.name}</td>
            <td className="tableData">
                <div className="descriptionSpace" title={feedback.description}>
                    {feedback.description}
                </div>
            </td>
            <td className="tableData">{moment(feedback.dueDate).local().format('DD-MM-YYYY')}</td>
            <td className="tableData" style={{textAlign: "center", fontWeight: "bold"}}>{feedback.num}</td>
            <td className="tableData">
                <ButtonToolbar>
                    <CrudModal entity={feedback}
                               icon="edit"
                               btnClass="defaultBtnEdit btn-success btn-sm noTextBtn"
                               title={""}
                               showText={true}
                               onSubmit={this.onEdit}
                               body={EditFeedback}/>

                    <DeleteModal btnClass={"defaultBtn ml-1 noTextBtn"}
                                 showText={false}
                                 title={{}}
                                 prompt={strings.sureForDeletingFeedback}
                                 doDelete={() => this.deleteFeedback(feedback.id)}/>
                    <Link to={"/desingfeedback/" + feedback.id} className="defaultBtn btn btn-sm btn-success ml-1"
                          style={{"backgroundColor": "darkcyan", color: 'white'}}><FontAwesomeIcon icon={faPalette} size="lg"
                                                                                   style={{paddingRight: '4px', color: 'white'}}/>{strings.questions}
                    </Link>
                    <Link to={"/publishfeedback/" + feedback.id}
                          className="defaultBtn btn btn-info btn-sm ml-1"><FontAwesomeIcon icon={faShare} size="lg"
                                                                                style={{paddingRight: '4px'}}/>{strings.publish}
                    </Link>
                    <Link to={"/analyse/" + feedback.id}
                          className="defaultBtn btn btn-primary btn-sm ml-1"><FontAwesomeIcon icon={faChartBar} size="lg"
                                                                                style={{paddingRight: '4px'}}/>{strings.analyse}
                    </Link>
                </ButtonToolbar>

            </td>
        </tr>);
    }

}

export default FeedbackCrudTable;
