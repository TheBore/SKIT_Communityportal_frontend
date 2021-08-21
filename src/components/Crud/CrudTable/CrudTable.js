import React, {Component} from 'react';
import CrudService from '../../../repository/service/CrudService';
import Aux from '../../../hoc/AuxWrapper';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link, NavLink} from 'react-router-dom';
import Moment from 'react-moment';
import AddModal from "./AddModal";
import '../../../assets/css/theme/base.css'
import './CrudTable.css'
import {strings} from "../../../Localization/Localization";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faEdit,
    faFile,
    faFileUpload,
    faPlusCircle,
    faShare,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import AnnouncementRepository from "../../../repository/AnnouncementRepository";

class CrudTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            mappings: [],
            page: 1,
            pageSize: 10,
            totalPages: 0,
            maxPageListSize: 5,
            filter: this.props.filter,
            pageList: [],
            showDeleteModal: false,
            showEditModal: false,
            showAddModal: false,
            entityToBeDeleted: {},
            entityToBeEdited: {},
            entityToBeAdded: {},
            isUser: this.props.entityName === 'User' ? true : false,
            isModerator: this.props.entityName === 'Moderator' ? true : false,
            isAdmin: this.props.entityName === 'Admin' ? true : false,
            isTag: this.props.entityName === 'Tag' ? true : false,
            isInstitution: this.props.entityName === 'Institution' ? true : false,
            loggedRole: ""
        };

    }

    componentDidMount() {
        this.fetchData();
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
        this.setState({loggedRole: localStorage.getItem('role')})
    }

    componentDidUpdate(prevProp) {
        if (prevProp.filter !== this.props.filter) {
            this.fetchData();
        }
    }

    generatePageList() {
        if (this.state.pageList.length === 0) {
            let initialPageList = [];
            for (let i = 1; i <= Math.min(this.state.totalPages, this.state.maxPageListSize); i++) {
                initialPageList.push(i);
            }
            this.setState({
                pageList: initialPageList
            })
        }
    }

    fetchData() {
        CrudService.fetch(this.props.url, {}, this.state.page - 1, this.state.pageSize, this.props.filter)
            .then(async response => {

                let data = response.data.content

                if(this.props.userTable === undefined) {
                    console.log(response)
                    for(let i = 0; i < response.data.content.length; i++){
                        await  AnnouncementRepository.getNumberOfAnnouncementPublishes(response.data.content[i].id).then(snap => {
                            data[i]["num"] = snap.data;
                        })
                    }
                }

                console.log(data)

                this.setState({
                    data: data,
                    totalPages: response.data.totalPages
                }, () => {
                    this.generatePageList();
                })
            }).catch(error => {
            alert(strings.error);
        })
    }

    toggleDeleteModal() {
        this.setState((prevState) => ({
            showDeleteModal: !prevState.showDeleteModal
        }));
    }

    toggleEditModal() {
        this.setState((prevState) => ({
            showEditModal: !prevState.showEditModal
        }));
    }

    toggleAddModal() {
        this.setState((prevState) => ({
            showAddModal: !prevState.showAddModal
        }));
    }

    deleteTableHandler(entity) {
        this.setState({
            entityToBeDeleted: entity
        }, () => {
            this.toggleDeleteModal();
        })
    }

    editTableHandler(entity) {
        this.setState({
            entityToBeEdited: entity
        }, () => {
            this.toggleEditModal();
        })
    }

    addTableHandler(entity) {
        this.setState({
            entityToBeAdded: entity
        }, () => {
            this.toggleAddModal();
        })
    }

    deleteModalHandler(entity) {
        CrudService.delete(this.props.url, {id: entity.id})
            .then(response => {
                toast.success(strings.deleteModal);
                this.fetchData();
            }).catch(error => {
            alert(strings.error);
        });
    }

    editModalHandler() {
        let data = this.props.beforeSave(this.state.entityToBeEdited);
        if (data.dateUpdated !== null && data.dateUpdated !== undefined)
            data.dateUpdated = data.dateCreated;
        CrudService.edit(this.props.url, data)
            .then(response => {
                toast.success(strings.editModal);
                this.fetchData()
            }).catch(error => {
            alert(error.response.data);

        });
    }

    addModalHandler(entity) {
        CrudService.save(this.props.url, this.state.entityToBeAdded)
            .then(response => {
                toast.success(strings.addModal);
                this.fetchData()
            }).catch(error => {
            alert(error.response.data);
        });
        return null;
    }


    onEntityChangeHandler(field, value) {
        let newEntity = JSON.parse(JSON.stringify(this.state.entityToBeEdited));
        newEntity[field] = value;
        this.setState({
            entityToBeEdited: newEntity
        });
    }

    onEntityAddHandler(field, value) {
        let newEntity = JSON.parse(JSON.stringify(this.state.entityToBeAdded));
        newEntity[field] = value;
        this.setState({
            entityToBeAdded: newEntity
        });
    }

    nextPage() {
        if (this.state.page < this.state.totalPages) {
            this.setState((prevState) => ({
                page: prevState.page + 1
            }), () => {
                if (this.state.page > this.state.pageList[this.state.pageList.length - 1]) {
                    let newPageList = [...this.state.pageList];
                    newPageList.push(this.state.page);
                    newPageList.shift();
                    this.setState({
                        pageList: newPageList
                    })
                }
                this.fetchData();
            });
        }
    }

    previousPage() {
        if (this.state.page > 1) {
            this.setState((prevState) => ({
                page: prevState.page - 1
            }), () => {
                if (this.state.page < this.state.pageList[0]) {
                    let newPageList = [...this.state.pageList];
                    newPageList.unshift(this.state.page);
                    newPageList.pop();
                    this.setState({
                        pageList: newPageList
                    })
                }
                this.fetchData();
            });
        }
    }

    setPage(page) {
        this.setState({
            page: page
        }, () => {
            this.fetchData();
        });

    }

    onEdit = (entity) => {
        return CrudService.edit("/rest/institution", entity).then(() => {
            toast.success(strings.successfullyEditInstitution);
            this.fetchData();
        }).catch(() => {
            toast.error(strings.failEditInstitution)
        })
    }

    generateColumn(col, row) {
        switch (col.type) {
            case 'simpleLink':
                return <NavLink
                    to={col.url}> {row[col.paramValue]} </NavLink>;
            case 'link':
                return <NavLink
                    to={col.url + `/${row[col.paramLink]}`}> {row[col.paramValue]} </NavLink>;
            case 'image':
                return <img className="img-thumbnail tableThumbnail img-responsive" src={row[col.id]} alt="no pic"/>;
            case 'switch':
                return <div>{row[col.id] && <span>True</span>} {!row[col.id] && <span>False</span>}</div>;
            case 'date':
                return <div>{!row[col.id] && "/"}
                    {row[col.id] && <Moment format={row[col.datePattern]}>{row[col.id]}</Moment>}</div>;
            case 'currency':
                return <span> {row[col.id] ? col.symbol + row[col.id] : col.symbol + '0'} </span>;
            case 'percent':
                return <span> {Math.round(row[col.id] * 100) / 100} </span>;
            case 'translation':
                return <span> {col.translate(row[col.id])} </span>;
            case 'button':
                return <NavLink className={"defaultBtn btn btn-preview btn-sm"}
                                to={col.url + `/${row[col.paramLink]}`}> {col.buttonLabel} </NavLink>;
            case 'actionButton':
                return <button className={"defaultBtn btn btn-preview btn-sm"}
                               onClick={() => col.onClick(row)}>{col.buttonLabel} </button>;
            case undefined:
                return <span className={col.className ? col.className : ''}>  {String(row[col.id])} </span>;

        }

        return (row[col.id]);
    }


    render() {
        let loggedEmail = localStorage.getItem('email');

        let tfooters = [];

        for(let i=0 ; i < this.props.numCols; i++){
            if(i === 0){
                tfooters.push(<td style={{borderRadius: "0 0 0 15px"}}/>);
            }
            else if(i === this.props.numCols - 1){
                tfooters.push(<td style={{borderRadius: "0 0 15px 0"}}/>);
            }
            else {
                tfooters.push(<td/>)
            }
        }

        return (
            <Aux>
                <DeleteModal show={this.state.showDeleteModal}
                             close={(e) => this.toggleDeleteModal(e)}
                             submit={(entity) => this.deleteModalHandler(entity)}
                             entity={this.state.entityToBeDeleted}/>

                <EditModal show={this.state.showEditModal}
                           entityName={this.props.entityName}
                           close={(e) => this.toggleEditModal(e)}
                           submit={() => this.editModalHandler()}
                           deleteTableHandler={(entity) => this.deleteTableHandler(entity)}
                           entity={this.state.entityToBeEdited}
                           onEntityChangeHandler={(field, value) => this.onEntityChangeHandler(field, value)}
                           editModal={this.props.editModalComp}/>

                <AddModal show={this.state.showAddModal}
                          entityName={this.props.entityName}
                          close={(e) => this.toggleAddModal(e)}
                          submit={() => this.addModalHandler()}
                          deleteTableHandler={(entity) => this.deleteTableHandler(entity)}
                          entity={this.state.entityToBeAdded}
                          onEntityAddHandler={(field, value) => this.onEntityAddHandler(field, value)}
                          addModal={this.props.addModalComp}/>

                    <div className="">
                        <div className="row">
                            {this.props.userTable === undefined ?
                                <div className="col-6">
                                    <h2 style={{textAlign: "left", color: "#1C4857"}} className="mt-4 ml-1">{strings.allannouncements}</h2>
                                </div>
                                :
                                <div className="col-6">
                                    <h2 style={{textAlign: "left", color: "#1C4857"}} className="mt-4 ml-1">{strings.usersPersons}</h2>
                                </div>
                            }

                            <div className="col-6 justify-content-end text-right mt-4 mb-2">
                                    {this.props.showPublish ?
                                        <Link to="/sendRequest" className="defaultBtn btn btn-primary mr-2"><FontAwesomeIcon
                                            icon={faPlusCircle} size="lg" style={{paddingRight: '4px'}}/>Испрати барање
                                        </Link> :
                                        <div/>}

                                    {this.props.showPublish ?
                                    <Link to="/addannouncement" className="defaultBtnAdd btn btn-primary"><FontAwesomeIcon
                                        icon={faPlusCircle} size="lg" style={{paddingRight: '4px'}}/>{strings.addAnnouncement}
                                    </Link> :
                                    <div/>
                                    }
                                    {this.props.showButton ?
                                        <span>
                                        <button className="defaultBtnAdd btn btn-primary add_button"
                                                data-toggle="modal" data-target="#modalMy"
                                                onClick={() => this.addTableHandler(this.state.entityToBeAdded)}>
                                            <FontAwesomeIcon icon={faPlusCircle} size="lg"
                                                             style={{paddingRight: '4px'}}/>
                                            {this.state.isUser && strings.addUser}
                                            {this.state.isModerator && strings.addModerator}
                                            {this.state.isAdmin && strings.addAdmin}
                                            {this.state.isTag && strings.addTag}
                                            {this.state.isInstitution && strings.addInstitution}


                                        </button></span> : <div/>}
                                    &nbsp;


                                    <div className="kt-portlet__head-actions" />

                                </div>
                            </div>
                        </div>
                            <table className="table-hover newTable mt-2"
                                   id="kt_table_1" style={{width: '100%'}}>
                                {!this.props.nothead ?
                                    <thead className="tableHead">

                                    {this.props.columns.map((column, index) => {
                                        if (column.visible === undefined || column.visible === true) {
                                            return (
                                                <th className={index === 0
                                                                    ? 'tableHeading firstHeading'
                                                                    : [ column.label === 'Опции' ? 'tableHeading lastHeading' : 'tableHeading' ]}
                                                    key={index} style={{
                                                    color: 'black',
                                                    fontSize: '15px',
                                                    width: '14%'
                                                }}> {column.label} </th>
                                            )
                                        }
                                    })
                                    }
                                    {(this.props.roles) &&
                                    <th className="tableHeading" style={{
                                        color: 'black',
                                        fontSize: '15px',
                                        width: '16%'
                                    }}> {strings.roles}</th>
                                    }
                                    {(this.props.showPublish) &&
                                    <th className="tableHeading lastHeading text-center" style={{
                                        color: 'black',
                                        fontSize: '15px',
                                        width: '44%'
                                    }}> {strings.actions}</th>
                                    }

                                    </thead> : null}

                                <tbody>
                                {this.state.data.map((row, id) => (
                                    <tr key={id} style={{border: "1px solid lightgray"}}>
                                        {
                                            this.props.columns.map((col, index) => {
                                                if (col.visible === undefined || col.visible === true) {
                                                    return (
                                                        <td className="tableData" key={index} align={index !== null ? '' : ''}>
                                                            {
                                                                <div style={{
                                                                    wordWrap: "break-word",
                                                                    width: "100px"
                                                                }}>{this.generateColumn(col, row)}</div>
                                                            }</td>)
                                                }
                                            })
                                        }
                                        {(this.props.roles) &&
                                        (<td>
                                            <div className="form-group">
                                                <div className="form-check">
                                                    <label className="kt-checkbox">
                                                        {row.role !== null && row.role === "ROLE_ADMIN" &&
                                                        <input type="checkbox" checked readOnly={true}/>}
                                                        {strings.admin}
                                                        <span/>
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <label className="kt-checkbox">
                                                        {row.role !== null && row.role === "ROLE_INSTITUTIONAL_MODERATOR" &&
                                                        <input type="checkbox" checked readOnly={true}/>}
                                                        {strings.responsiblePerson}
                                                        <span/>
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <label className="kt-checkbox">
                                                        {row.role !== null && row.role === "ROLE_EVALUATOR" &&
                                                        <input type="checkbox" checked readOnly={true}/>}
                                                        {strings.evaluator}
                                                        <span/>
                                                    </label>
                                                </div>

                                            </div>
                                        </td>)
                                        }
                                        {(this.props.canEdit && this.props.url === "/rest/tag") &&
                                        (<td>
                                            <button className="defaultBtnEdit btn btn-success btn-sm" data-toggle="modal"
                                                    data-target="#modal"
                                                    onClick={() => this.editTableHandler(row)}><FontAwesomeIcon
                                                icon={faEdit} size="lg" style={{paddingRight: '4px'}}/>{strings.edit}
                                            </button>
                                        </td>)
                                        }

                                        {(this.props.showPublish && this.state.loggedRole === 'ROLE_ADMIN') &&
                                        (<td className="tableData"><Link to={"/publish/" + row.id}
                                                               className="defaultBtn btn btn-info btn-sm"><FontAwesomeIcon
                                            icon={faShare} size="lg" style={{paddingRight: '4px'}}/>{strings.publish}
                                        </Link>
                                            <Link to={"/publications/" + row.id}
                                                  className="defaultBtn btn btn-success ml-2 btn-sm"><FontAwesomeIcon icon={faFile}
                                                                                                        size="lg"
                                                                                                        style={{paddingRight: '4px'}}/>{strings.publication}
                                            </Link>
                                            <Link to={"/addattachment/" + row.id}
                                                  className="defaultBtn btn btn-primary ml-2 btn-sm"><FontAwesomeIcon
                                                icon={faFileUpload} size="lg"
                                                style={{paddingRight: '4px'}}/>{strings.attachment}</Link>
                                            <Link to={"/EditAnnouncement/" + row.id}
                                                  className="defaultBtnEdit btn btn-info ml-2 btn-sm"><FontAwesomeIcon icon={faEdit}
                                                                                                        size="lg"
                                                                                                        style={{paddingRight: '4px'}}/>{strings.edit}
                                            </Link>
                                            <button className="defaultBtn btn btn-danger btn-sm ml-2" data-toggle="modal"
                                                    data-target="#modal"
                                                    onClick={() => this.deleteTableHandler(row)}><FontAwesomeIcon
                                                icon={faTrashAlt} size="lg"
                                                style={{paddingRight: '4px'}}/> {strings.delete}
                                            </button>
                                        </td>)
                                        }
                                        {(this.props.showPublish && (this.state.loggedRole === 'ROLE_USER' || this.state.loggedRole === 'ROLE_INSTITUTIONAL_MODERATOR')) &&
                                        (<td colSpan={3}>
                                            {row.user.email === loggedEmail ?
                                                <Link to={"/publish/" + row.id}
                                                      className="defaultBtn btn btn-info btn-sm"><FontAwesomeIcon icon={faShare}
                                                                                                          size="lg"
                                                                                                          style={{paddingRight: '4px'}}/>{strings.publish}
                                                </Link> : null}
                                            <Link to={"/publications/" + row.id}
                                                  className="defaultBtn btn-dark ml-2 btn-sm"><FontAwesomeIcon icon={faFile}
                                                                                                        size="lg"
                                                                                                        style={{paddingRight: '4px'}}/>{strings.publication}
                                            </Link>
                                            <Link to={"/addattachment/" + row.id}
                                                  className="defaultBtn btn-primary ml-2 btn-sm"><FontAwesomeIcon
                                                icon={faFileUpload} size="lg"
                                                style={{paddingRight: '4px'}}/>{strings.attachment}</Link>
                                            {row.user.email === loggedEmail ?
                                                <Link to={"/EditAnnouncement/" + row.id}
                                                      className="defaultBtnEdit btn btn-info ml-2 btn-sm"><FontAwesomeIcon
                                                    icon={faEdit} size="lg"
                                                    style={{paddingRight: '4px'}}/>{strings.edit}</Link> : null}
                                            {row.user.email === loggedEmail ?
                                                <button className="defaultBtn btn btn-danger btn-sm ml-2" data-toggle="modal"
                                                        data-target="#modal"
                                                        onClick={() => this.deleteTableHandler(row)}><FontAwesomeIcon
                                                    icon={faTrashAlt} size="lg"
                                                    style={{paddingRight: '4px'}}/> {strings.delete}
                                                </button> : null}
                                        </td>)
                                        }
                                    </tr>
                                ))}
                                <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                                    {tfooters}
                                </tr>
                                </tbody>
                            </table>

                        <div className="text-center">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item" onClick={() =>
                                        this.previousPage()
                                    }>
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">&#60;&#60;</span>
                                        </a>
                                    </li>
                                    {
                                        this.state.pageList.map((item, index) => {
                                            return (
                                                <li className="page-item" onClick={() => this.setPage(item)}
                                                    key={index}>
                                                    <a key={index} href="#"
                                                       className={item === this.state.page ? 'page-link active activePage' : 'page-link'}>{item}</a>
                                                </li>
                                            );
                                        })
                                    }

                                    <li className="page-item" onClick={() => this.nextPage()}>
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&#62;&#62;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
            </Aux>


        );
    }
}

export default CrudTable;