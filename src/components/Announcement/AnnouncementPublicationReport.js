import React, {Component} from "react";
import {strings} from "../../Localization/Localization";
import AnnouncementPublicationRepository from "../../repository/AnnouncementPublicationRepository";
import ReactPaginate from "react-paginate";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import './css/AnnouncementPublicationReport.css'

class AnnouncementPublicationReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            annPubUser: [],
            pageCount: 1,
            searchCriteria: "",
            searchValue: ""
        }
    }

    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
        this.fetchData();
    }

    handlePageClick = data => {
        if (this.state.searchCriteria === "title") {
            this.fetchDataByAnnouncement(data.selected)
        } else if (this.state.searchCriteria === "user") {
            this.fetchDataByUser(data.selected);
        } else {
            this.fetchData(data.selected);
        }
    };
    fetchData = (selectedPage = 0) => {
        AnnouncementPublicationRepository.report(selectedPage).then(res => {
            this.setState({
                annPubUser: res.data.content,
                pageCount: res.data.totalPages,
                searchCriteria: "",
                searchValue: ""
            }, () => {
                document.getElementById("searchby").value = "-1";
            })
        }).catch(err => {
            console.log(err)
        })
    }
    fetchDataBySearch = () => {
        if (this.state.searchCriteria === "title" && this.state.searchValue !== "") {
            this.fetchDataByAnnouncement()
        } else if (this.state.searchCriteria === "user" && this.state.searchValue !== "") {
            this.fetchDataByUser();
        } else return;
    }
    changeSearchCriteriaHandler = (e) => {
        this.setState({
            searchCriteria: e.target.value,
            searchValue: ""
        });

    }
    changeSearchValueHandler = (e) => {
        this.setState({searchValue: e.target.value});
    }
    fetchDataByAnnouncement = (selectedPage = 0) => {
        AnnouncementPublicationRepository.reportByTitle(this.state.searchValue, selectedPage).then(res => {
            this.setState({
                annPubUser: res.data.content,
                pageCount: res.data.totalPages
            })
        }).catch(err => {
            console.log(err)
        })
    }
    fetchDataByUser = (selectedPage = 0) => {
        let user;
        if(this.state.searchValue.includes(" ")){
            user = this.state.searchValue.split(" ");
        }
        else{
            let value = this.state.searchValue + '&nbsp' + this.state.searchValue;
            user = value.split("&nbsp");
        }
        AnnouncementPublicationRepository.reportByUser(user[0], user[1], selectedPage).then(res => {
            this.setState({
                annPubUser: res.data.content,
                pageCount: res.data.totalPages
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <h2 style={{textAlign: "left", color: "#1C4857"}} className="mb-4 mt-4">{strings.readAnnouncements}</h2>
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-lg-3 col-md-3 col-sm-3"}>
                        <select className={"form-control custom-select"} id="searchby"
                                onChange={this.changeSearchCriteriaHandler}>
                            <option value={"-1"}>{strings.searchby}</option>
                            <option value={"title"}>{strings.titleofann}</option>
                            <option value={"user"}>{strings.firstlastname}</option>
                        </select>
                    </div>

                    <div className={"col-lg-5 col-md-5 col-sm-5"}>
                        {this.state.searchCriteria === "-1" || this.state.searchCriteria === "" ?
                            <InputGroup className="mb-3">
                                <FormControl
                                    value={this.state.searchValue}
                                    disabled={true}
                                    onChange={this.changeSearchValueHandler}
                                    aria-label="Search"
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text id="basic-addon2">
                                        <Button className={"btn btn-sm"} onClick={this.fetchDataBySearch}
                                                variant="outline-secondary"
                                                disabled={true}
                                        ><i className="fa fa-search"
                                            aria-hidden="true"/></Button>
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup> :
                            <InputGroup className="mb-3">
                                <FormControl
                                    value={this.state.searchValue}
                                    placeholder={this.state.searchCriteria === "title" ? strings.egann : strings.egflname}
                                    onChange={this.changeSearchValueHandler}
                                    aria-label="Search"
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text id="basic-addon2">
                                        <Button className={"btn btn-sm btn-light"}
                                                id={"buttonWhiteColor"}
                                                onClick={this.fetchDataBySearch}>
                                            <i className="fa fa-search mr-1"
                                               aria-hidden="true"
                                               onClick={this.fetchDataBySearch}
                                            />{strings.search}
                                        </Button>
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        }
                    </div>
                    <div className={"col-lg-2 col-md-2 col-sm-2"}>
                        <Button className={"defaultBtn btn-lg btn-info ml-3"}
                                onClick={() => this.fetchData(0)}><FontAwesomeIcon icon={faSearch}
                                                                                   style={{paddingRight: '4px'}}/>{strings.all}
                        </Button>
                    </div>
                </div>
                <table className="table-hover newTable mt-2" style={{width: "100%"}}>
                    <thead className="tableHead">
                    <th className="tableHeading firstHeading" style={{width: '35%'}}>{strings.title}</th>
                    <th className="tableHeading " style={{width: '25%'}}>{strings.firstName}</th>
                    <th className="tableHeading " style={{width: '25%'}}>{strings.lastName}</th>
                    <th className="tableHeading lastHeading" style={{width: '15%'}}>{strings.readAt}</th>
                    </thead>
                    <tbody>
                    {this.state.annPubUser.map((item, index) => {
                        return (<tr key={index} style={{border: "1px solid lightgray"}}>
                            <td className="tableData">{item.title}</td>
                            <td className="tableData">{item.firstName}</td>
                            <td className="tableData">{item.lastName}</td>
                            <td className="tableData">{item.readAt}</td>
                        </tr>)
                    })}
                    <tr style={{width: "100%", height: "5px", background: "#67C4EF"}}>
                        <td style={{borderRadius: "0 0 0 15px"}}/>
                        <td/>
                        <td/>
                        <td style={{borderRadius: "0 0 15px 0"}}/>
                    </tr>
                    </tbody>
                </table>
                <div>
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
            </div>
        )
    }

}

export default AnnouncementPublicationReport;
