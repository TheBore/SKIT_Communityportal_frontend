import React, {Component} from "react";
import FeedbackItemRepository from './../../repository/FeedbackItemRepository';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ButtonGroup, ButtonToolbar} from "react-bootstrap";
import ReactPaginate from 'react-paginate'
import CrudModal from "../Crud/CrudModal";
import DeleteModal from "../Crud/DeleteModal";
import EditFeedbackItem from "./EditFeedbackItem";
import {strings} from "../../Localization/Localization";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faEye, faShare} from "@fortawesome/free-solid-svg-icons";
import EditFeedbackItemNew from "./EditFeedbackItemNew";


class DesignFeedbackItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedbackitems: [],
            pageCount: 1
        }
    }

    componentDidMount() {
        this.fetchData();
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
    }

    sortFeedbackItems = () => {
        this.state.feedbackitems.sort((a, b) => (a.dateCreated > b.dateCreated) ? 1 : -1)
    }

    render() {
        {
            this.sortFeedbackItems();
        }

        return (
            <div>
                <h2 style={{textAlign: "left", color: "#1C4857"}} className="mt-4">{strings.designFeedbackItem}</h2>
                <div style={{display:"flex"}}  className="mt-5">

                <CrudModal
                    entity={{}}
                    icon="add"
                    showText={true}
                    btnClass="defaultBtnAdd btn btn-primary mb-2"
                    title={"Додади прашање"}
                    onSubmit={this.onAddFeedbackItem}
                    body={EditFeedbackItemNew}/>

                    <ButtonToolbar style={{marginLeft: "auto"}}>
                        <Link to={"/feedbacks"}
                              className="defaultBtn btn btn-dark mb-2 btn btn-dark mr-1"><FontAwesomeIcon icon={faArrowLeft}
                                                                                               size="lg"
                                                                                               style={{paddingRight: '4px'}}/>{strings.goBack}
                        </Link>
                        <Link to={"/previewfeedback/" + this.props.match.params.id}
                              className="defaultBtn btn btn-default mb-2 btn btn-default mr-1"
                              style={{backgroundColor: "#ff8b3d"}}><FontAwesomeIcon icon={faEye} size="lg"
                                                                                    style={{paddingRight: '4px'}}/>{strings.preview}
                        </Link>
                        <Link to={"/publishfeedback/" + this.props.match.params.id}
                              className="defaultBtn btn btn-info mb-2 btn btn-info mr-1"><FontAwesomeIcon icon={faShare} size="lg"
                                                                                               style={{paddingRight: '4px'}}/>{strings.publish}
                        </Link>
                    </ButtonToolbar>
                </div>
                <table className="table-hover newTable mt-2" style={{width: '100%'}}>
                    <thead className="tableHead">
                    <tr>
                        <th className="tableHeading firstHeading" style={{width: '30%'}}>{strings.nameQuestion}</th>
                        {/*<th className="tableHeading" style={{width: '21%'}}>{strings.descQuestion}</th>*/}
                        <th className="tableHeading" style={{width: '20%'}}>{strings.type}</th>
                        <th className="tableHeading" style={{width: '15%'}}>{strings.dateCreated}</th>
                        <th className="tableHeading" style={{width: '15%'}}>{strings.dateUpdated}</th>
                        <th className="tableHeading lastHeading text-center"
                            style={{width: '20%'}}>{strings.actions}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.feedbackitems.map(this.renderElements)}
                    <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                        <td style={{borderRadius: "0 0 0 15px"}}/>
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

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    fetchData = (selectedPage = 0) => {
        let feedbackId = this.props.match.params.id;
        FeedbackItemRepository.getFeedbackItemPage(feedbackId, selectedPage).then(res => {
            this.setState({
                feedbackitems: res.data.content,
                pageCount: res.data.totalPages
            })
        }).catch(() => toast.error(strings.failedToLoadData));
    }

    handlePageClick = data => {
        this.fetchData(data.selected);
    }

    renderElements = (item) => {
        return (<tr key={item.id} style={{border: "1px solid lightgray"}}>
            <td className="tableData firstData">{item.name}</td>
            {/*<td className="tableData">{item.description}</td>*/}
            <td className="tableData">{item.type} {item.required ? '(required)' : ''}</td>
            <td className="tableData">{item.dateCreated}</td>
            <td className="tableData">{item.dateUpdated}</td>
            <td className="tableData"><ButtonGroup>
                <CrudModal entity={item}
                           icon="edit"
                           btnClass="defaultBtnEdit btn btn-success btn-sm ml-3"
                           title={strings.edit}
                           onSubmit={this.onEditFeedbackItem}
                           body={EditFeedbackItemNew}
                           showText={true}/>
                <DeleteModal btnClass={"defaultBtn btn ml-3"}
                             showText={strings.remove}
                             title="delete"
                             prompt={strings.deleteFeedbackQuestion}
                             doDelete={() => this.deleteFeedbackItem(item.id)}/>
            </ButtonGroup></td>
        </tr>)
    }

    onAddFeedbackItem = (entity) => {
        let feedbackId = this.props.match.params.id;
        const obj = {}
        obj.name = entity.name
        obj.description = entity.description;
        obj.required = entity.required;
        obj.type = entity.type;
        obj.options = []
        // if (entity.options) {
        //     let data = entity.options;
        //     obj.options = data.split('\n');
        // }
        let i = 0;
        for(var e in entity){
            if(e === `option${i}`){
                obj.options.push(entity[`option${i}`])
                i++;
            }
        }
        return FeedbackItemRepository.addFeedbackItem(feedbackId, obj).then( async () => {
            toast.success(strings.successfullyAddedFeedbackItem)
            await this.sleep(2000);
            window.location.reload();
        }).catch( async () => {
            toast.error(strings.failedToAddFeedbackItem);
            await this.sleep(2000);
            window.location.reload();
        });
    }

    onEditFeedbackItem = (entity) => {
        debugger
        if (typeof entity.options !== undefined) {
            entity.options = []
            for(let i = 0; i < entity["optionsLength"]; ++i){
                if(entity[`option${i}`]){
                    entity.options.push(entity[`option${i}`])
                }
            }
        }
        if(entity.type === "NUMERIC_FIELD" || entity.type === "TEXT_FIELD" || entity.type === "ATTACHMENT"){
            entity.options = []
        }
        return FeedbackItemRepository.updateFeedbackItem(entity).then( async () => {
            toast.success(strings.successfullyEditedFeedbackItem);
            await this.sleep(2000);
            window.location.reload();
        }).catch( async () => {
            toast.error(strings.failedToEditFeedbackItem);
            await this.sleep(2000);
            window.location.reload();
        })
    }

    deleteFeedbackItem = (id) => {
        return FeedbackItemRepository.deleteFeedbackItem(id).then(() => {
            toast.success(strings.successfullyDeletedFeedbackItem);
            this.fetchData();
        }).catch(() => {
            toast.error(strings.failedToDeleteFeedbackItem);
        })
    }

}

export default DesignFeedbackItem;

