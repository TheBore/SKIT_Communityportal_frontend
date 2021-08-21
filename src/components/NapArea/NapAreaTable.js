import React, {Component} from 'react';
import NapAreaRepository from "../../repository/NapAreaRepository";
import {toast} from "react-toastify";
import {strings} from "../../Localization/Localization";
import CrudModal from "../Crud/CrudModal";
import ReactPaginate from "react-paginate";
import DeleteModal from "../Crud/DeleteModal";
import NapAreaEdit from "./NapAreaEdit";
import NapAreaAdd from "./NapAreaAdd";
import SearchBar from "../Search/SearchBar";

class NapAreaTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            napAreas: [],
            pageCount: 1,
            activeLanguage: localStorage.getItem("activeLanguage"),
            isAdmin: localStorage.getItem('role') === "ROLE_ADMIN",
            keyword: null,
            selectedData: 0,
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = (keyword, selectedPage = 0) => {
        NapAreaRepository.getAllNapAreaPaged(keyword, selectedPage).then(res => {
            this.setState({
                napAreas: res.data.content,
                pageCount: res.data.totalPages,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    handleSearchData = (keyword) => {
        this.setState({
            keyword: keyword
        })

        if (keyword === "") {
            this.fetchData(keyword, this.state.selectedData)
        } else {
            this.fetchData(keyword, 0);
        }
    }

    addNapArea = (entity) => {
        return NapAreaRepository.createNapArea(entity).then(res => {
            toast.success(strings.succAdded);
            this.fetchData();
        }).catch(err => {
            toast.error(strings.failTryAgain);
        })
    }

    editNapArea = (entity) => {
        return NapAreaRepository.updateNapArea(entity).then(async res => {
            toast.success(strings.succChanged);
            await this.sleep(3000);
            window.location.reload();
            this.fetchData();
        }).catch(err => {
            toast.error(strings.failTryAgain);
        })
    }

    deleteNapArea = (napAreaId) => {
        return NapAreaRepository.deleteNapArea(napAreaId).then(res => {
            toast.success(strings.deleteModal);
            this.fetchData();
        }).catch(err => {
            if (err.message === "Request failed with status code 405") {
                toast.error(strings.noDeleteNapArea)
            }
        })
    }

    handlePageClick = async data => {
        await this.setState({
            selectedData: data.selected
        })
        this.fetchData(this.state.keyword, this.state.selectedData);
    };

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    render() {
        return (
            <div className="col-12">
                <div className="row">
                    <div className="col-6">
                        <h2 style={{textAlign: "left", color: "#1C4857"}}
                            className="mt-4 mb-3">{strings.napAreas}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <SearchBar handleSearch={this.handleSearchData}/>
                    </div>
                    <div className="col-9 justify-content-end text-right">
                        <CrudModal
                            entity={{}}
                            icon="add"
                            btnClass="defaultBtnAdd btn-primary mt-4"
                            title={strings.addNapArea}
                            showText={true}
                            onSubmit={this.addNapArea}
                            body={NapAreaAdd}
                        />
                    </div>
                </div>

                <table className="table-hover newTable mt-2" style={{width: '100%'}}>
                    <thead className="tableHead">
                    <th className="tableHeading firstHeading" style={{width: '10%'}}> {strings.nameMk}</th>
                    <th className="tableHeading" style={{width: '10%'}}> {strings.nameAl}</th>
                    <th className="tableHeading" style={{width: '10%'}}> {strings.code}</th>
                    <th className="tableHeading" style={{width: '10%'}}> {strings.areaTypes}</th>
                    <th className="tableHeading" style={{width: '10%'}}> {strings.descMk}</th>
                    <th className="tableHeading" style={{width: '10%'}}> {strings.descAl}</th>
                    <th className="tableHeading" style={{width: '10%'}}> {strings.options}</th>
                    <th className="tableHeading lastHeading" style={{width: '11%'}}> {strings.delete}</th>

                    </thead>
                    <tbody>
                    {this.state.napAreas.map(this.renderNapAreas)}
                    </tbody>
                    <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                        <td style={{borderRadius: "0 0 0 15px"}}/>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td style={{borderRadius: "0 0 15px 0"}}/>
                    </tr>
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
        );
    }

    renderNapAreas = (napArea) => {
        return (
            <tr key={napArea.id} style={{border: "1px solid lightgray"}}>
                <td className="tableData">{napArea.nameMk}</td>
                <td className="tableData">{napArea.nameAl}</td>
                <td className="tableData">{napArea.code}</td>
                <td className="tableData">{napArea.napAreaType ? napArea.napAreaType.nameMk : ""}</td>
                <td className="tableData">{napArea.descriptionMk}</td>
                <td className="tableData">{napArea.descriptionAl}</td>
                <td className="tableData">
                    <CrudModal entity={napArea}
                               icon="edit"
                               btnClass="defaultBtnEdit btn-success btn-sm"
                               title={strings.edit}
                               showText={true}
                               onSubmit={this.editNapArea}
                               body={NapAreaEdit}
                    />
                </td>
                <td className="tableData">
                    <DeleteModal btnClass={"defaultBtn ml-1"}
                                 prompt={strings.napAreaDeleteQuestion}
                                 showText={true}
                                 doDelete={() => this.deleteNapArea(napArea.id)}
                    />
                </td>
            </tr>
        )
    }
}

export default NapAreaTable;