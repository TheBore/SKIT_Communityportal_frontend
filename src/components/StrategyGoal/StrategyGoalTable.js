import React, {Component} from 'react';
import StrategyGoalRepository from "../../repository/StrategyGoalRepository";
import {toast} from "react-toastify";
import {strings} from "../../Localization/Localization";
import CrudModal from "../Crud/CrudModal";
import ReactPaginate from "react-paginate";
import DeleteModal from "../Crud/DeleteModal";
import StrategyGoalAdd from "./StrategyGoalAdd";
import StrategyGoalEdit from "./StrategyGoalEdit";
import SearchBar from "../Search/SearchBar";

class StrategyGoalTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allStrategyGoals: [],
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
        StrategyGoalRepository.getAllStrategyGoalsPaged(keyword, selectedPage).then(res => {
            this.setState({
                allStrategyGoals: res.data.content,
                pageCount: res.data.totalPages
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

    createStrategyGoal = (entity) => {
        return StrategyGoalRepository.createStrategyGoal(entity).then(res => {
            toast.success(strings.succAdded);
            this.fetchData();
        }).catch(err => {
            toast.error(strings.failTryAgain);
        })
    }

    updateStrategyGoal = (entity) => {
        return StrategyGoalRepository.updateStrategyGoal(entity).then(async res => {
            toast.success(strings.succChanged);
            await this.sleep(3000);
            window.location.reload();
            this.fetchData();
        }).catch(err => {
            toast.error(strings.failTryAgain);
        })
    }

    deleteStrategyGoal = (strategyGoalId) => {
        return StrategyGoalRepository.deleteStrategyGoal(strategyGoalId).then(res => {
            toast.success(strings.deleteModal);
            this.fetchData();
        }).catch(err => {
            toast.error(strings.failTryAgain)
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
                            className="mt-4 mb-3">{strings.strategyGoals}</h2>
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
                            title={strings.addGoal}
                            showText={true}
                            onSubmit={this.createStrategyGoal}
                            body={StrategyGoalAdd}
                        />
                    </div>
                </div>

                <table className="table-hover newTable mt-2" style={{width: '100%'}}>
                    <thead className="tableHead">
                    <th className="tableHeading firstHeading" style={{width: '27%'}}> {strings.nameMk}</th>
                    <th className="tableHeading" style={{width: '27%'}}> {strings.nameAl}</th>
                    {/*<th className="tableHeading" style={{width: '15%'}}> {strings.descMk}</th>*/}
                    {/*<th className="tableHeading" style={{width: '15%'}}> {strings.descAl}</th>*/}
                    <th className="tableHeading" style={{width: '10%'}}> {strings.options}</th>
                    <th className="tableHeading lastHeading" style={{width: '11%'}}> {strings.delete}</th>

                    </thead>
                    <tbody>
                    {this.state.allStrategyGoals.map(this.renderStrategyGoals)}
                    </tbody>
                    <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                        <td style={{borderRadius: "0 0 0 15px"}}/>
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

    renderStrategyGoals = (strategyGoal) => {
        return (
            <tr key={strategyGoal.id} style={{border: "1px solid lightgray"}}>
                <td className="tableData">{strategyGoal.nameMk}</td>
                <td className="tableData">{strategyGoal.nameAl}</td>
                {/*<td className="tableData">{strategyGoal.descriptionMk}</td>*/}
                {/*<td className="tableData">{strategyGoal.descriptionAl}</td>*/}
                <td className="tableData">
                    <CrudModal entity={strategyGoal}
                               icon="edit"
                               btnClass="defaultBtnEdit btn-success btn-sm"
                               title={strings.edit}
                               showText={true}
                               onSubmit={this.updateStrategyGoal}
                               body={StrategyGoalEdit}
                    />
                </td>
                <td className="tableData">
                    <DeleteModal btnClass={"defaultBtn ml-1"}
                                 prompt={strings.strategyGoalDeleteQuestion}
                                 showText={true}
                                 doDelete={() => this.deleteStrategyGoal(strategyGoal.id)}
                    />
                </td>
            </tr>
        )
    }
}

export default StrategyGoalTable;