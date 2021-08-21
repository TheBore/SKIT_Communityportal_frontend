import React, {Component} from "react";
import {Button, ButtonToolbar, FormControl, InputGroup} from "react-bootstrap";
import InstitutionCategoryRepository from "../../repository/InstitutionCategoryRepository";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EditInstitutionCategory from "./EditInstitutionCategory";
import ReactPaginate from 'react-paginate';
import CrudModal from "../Crud/CrudModal";
import AddInstitutionCategory from "./AddInstitutionCategory";
import {strings} from "../../Localization/Localization";
import "./css/InstitutionCategoryCrudTable.css"
import DeleteModal from "../Crud/DeleteModal";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faListAlt
} from "@fortawesome/free-solid-svg-icons";

class InstitutionCategoriesCrudTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            keyword: "",
            institutionCategories: [],
            pageCount: 1
        }

    }

    handleSearchByName = (e) => {
        this.setState({
            keyword: e.target.value
        }, () => {
            this.fetchData()
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-6">
                        <h2 style={{textAlign: "left", color: "#1C4857"}}
                            className="mt-3 mb-3">{strings.institutionCategory}</h2>
                    </div>
                    <div className="col-6 justify-content-end text-right">
                        <CrudModal entity={{}}
                                   icon="add"
                                   btnClass="defaultBtnAdd btn-primary mt-4"
                                   title={strings.addCategory}
                                   showText={true}
                                   onSubmit={this.onAdd}
                                   body={AddInstitutionCategory}/>
                        <br/>
                        <a className="btn defaultBtn" href={"/institutioncategory/reorder"}
                           style={{background: "#50A5E4", marginTop: "10px", color: "white"}}>
                            <FontAwesomeIcon icon={faListAlt}/>
                            &nbsp;{strings.changeOrder}
                        </a>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        {/*<input className="form-control-sm mb-2 mt-5 searchInstitutionsCategoryInputStyle"*/}
                        {/*       placeholder={strings.search}*/}
                        {/*       style={{width: "80%"}}*/}
                        {/*       onChange={this.handleSearchByName}*/}
                        {/*/>*/}
                        <InputGroup className="mb-3">
                            <FormControl
                                value={this.state.searchValue}
                                disabled={false}
                                placeholder={strings.search}
                                onChange={this.handleSearchByName}
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">
                                    <Button className={"btn btn-sm"} onClick={this.fetchDataBySearch}
                                            variant="outline-secondary"
                                            disabled={true}
                                    >
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </Button>
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>


                </div>

                <table className="table-hover newTable mt-3" style={{width: "100%"}}>
                    <thead className="tableHead">
                    <tr>
                        <th className="tableHeading firstHeading" style={{width: '33%'}}>{strings.name}</th>
                        <th className="tableHeading" style={{width: '33%'}}>{strings.parentCategory}</th>
                        <th className="tableHeading" style={{width: '14%'}}>{strings.dateCreated}</th>
                        {/*<th className="tableHeading">{strings.dateUpdated}</th>*/}
                        <th className="tableHeading" style={{width: '10%'}}>{strings.actions}</th>
                        <th className="tableHeading lastHeading" style={{width: '10%'}}>{strings.delete}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.institutionCategories.map(this.renderCategory)}
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


    fetchData = (selectedPage = 0) => {
        InstitutionCategoryRepository.getAllInstitutionCategory(this.state.keyword, selectedPage).then(res => {
            this.setState({
                institutionCategories: res.data.content,
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
        if (entity.nameMk !== "") {
            return InstitutionCategoryRepository.AddInstitutionCategory(entity).then(res => {
                toast.success(strings.categoryInstAdded)
                this.fetchData();
            }).catch(err => {
                toast.error(strings.error)
            });
        }
    }

    onEdit = (entity) => {
        if(entity.parentCategory === null){
            entity["parentCategory"] = null
        }
        else if(entity.parentCategory.id > 0){
            entity["parentCategory"] = entity.parentCategory.id
        }
        else{
            entity["parentCategory"] = entity.parentCategory
        }


        return InstitutionCategoryRepository.editInstitutionCategory(entity).then(res => {
            toast.success(strings.categoryInstEdit)
            this.fetchData();
        }).catch((error) => {
            toast.error(strings.error)
        });
    }

    deleteInstitutionCategory = (id) => {
        return InstitutionCategoryRepository.deleteInstitutionCategory(id).then(() => {
            toast.success(strings.categoryInstDelete)
            this.fetchData();
        }).catch(() => {
            toast.error(strings.categoryInstNotDelete)
        });
    };


    renderCategory = institutionCategories => {
        let lang = localStorage.getItem('activeLanguage')
        return (<tr key={institutionCategories.id} style={{border: "1px solid lightgray"}}>
            {lang === 'mk' ? <td className="tableData" style={{wordWrap: "break-word"}}>{institutionCategories.nameMk}</td> : ""}
            {lang === 'al' ? <td className="tableData" style={{wordWrap: "break-word"}}>{institutionCategories.nameAl}</td> : ""}
            {lang === 'en' ? <td className="tableData" style={{wordWrap: "break-word"}}>{institutionCategories.nameEn}</td> : ""}

            {lang === 'mk' ?
                <td className="tableData" style={{wordWrap: "break-word"}}>{institutionCategories.parentCategory !== null ? institutionCategories.parentCategory.nameMk : strings.noParentCategory}</td> : ""}
            {lang === 'al' ?
                <td className="tableData" style={{wordWrap: "break-word"}}>{institutionCategories.parentCategory !== null ? institutionCategories.parentCategory.nameAl : strings.noParentCategory}</td> : ""}
            {lang === 'en' ?
                <td className="tableData" style={{wordWrap: "break-word"}}>{institutionCategories.parentCategory !== null ? institutionCategories.parentCategory.nameEn : strings.noParentCategory}</td> : ""}
            <td className="tableData">{institutionCategories.dateCreated}</td>
            {/*<td className="tableData">{institutionCategories.dateUpdated}</td>*/}
            <td className="tableData">
                <ButtonToolbar>
                    <CrudModal entity={institutionCategories}
                               icon="edit"
                               btnClass="defaultBtnEdit btn-success btn-sm"
                               title={strings.edit}
                               showText={true}
                               onSubmit={this.onEdit}
                               body={EditInstitutionCategory}
                    />
                </ButtonToolbar>
            </td>
            <td className="tableData">
                <DeleteModal btnClass={"defaultBtn ml-1"}
                             prompt={strings.deleteCatQuestion}
                             showText={true}
                             doDelete={() => this.deleteInstitutionCategory(institutionCategories.id)}
                />
            </td>
        </tr>);
    }

}

export default InstitutionCategoriesCrudTable;
