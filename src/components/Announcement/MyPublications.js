import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AnnouncementPublicationRepository from "../../repository/AnnouncementPublicationRepository";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './css/MyPublications.css'
import ReactPaginate from "react-paginate";
import {strings} from "../../Localization/Localization";
import InfoPopup from "../ErrorHandler/InfoPopup";

const MyPublications = (props) => {
    strings.setLanguage(localStorage.getItem("activeLanguage"));

    const [announcements, setAnnouncements] = useState([]);
    const [newAnnouncements, setNewAnnouncements] = useState([]);

    const [pageCount, setPageCount] = useState(1);

    let areas = localStorage.getItem('areas').split(",")

    async function fetchData(selectedPage = 0) {

        let institutionId = localStorage.getItem('institutionId');
        institutionId = parseInt(institutionId);
        AnnouncementPublicationRepository.getAnnPubPaged(institutionId, selectedPage).then(res => {

            let contentData = res.data.content;
            for(let i=0; i<contentData.length;i++){
                for(let j=0; j<areas.length; j++){
                    if(contentData[i].announcementPublication.announcement.areaOfInterest.nameMk === areas[j]){
                        newAnnouncements.push(contentData[i])
                    }
                }
            }
            setAnnouncements(res.data.content)
            setPageCount(res.data.totalPages)
        }).catch(err => {
            toast.error(strings.failedToLoadAnnouncementPub);
            props.history.push("/logout");
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    function handlePageClick(data) {
        fetchData(data.selected);
    };

    console.log(newAnnouncements)
    console.log(areas)

    if (newAnnouncements.length !== 0)
    return (

        <div className="container-fluid">
            <h2 style={{textAlign: "left", color: "#1C4857"}} className="mt-3">{strings.mypublications}</h2>

            <div className="row">
                {newAnnouncements.map((item, key) => {
                    let dateRead = item.announcementPublication.readAt;

                    if (key % 2 === 0)
                        return (
                            <div className="container-fluid publicationDivContainer">
                                <div className="row announcementTitleRow">
                                    <div className="col-12">
                                        <h2 className="announcementTitle">
                                            <a style={{color: "black"}} href={"/myannouncements/" + item.announcementPublication.id + "?ann=" + item.announcementPublication.announcement.id}>
                                                {item.announcementPublication.announcement.title}
                                            </a>
                                        </h2>
                                    </div>
                                </div>
                                <div className="row announcementBodyRow">
                                    <div className="col-12">
                                        <p className="announcementBody pl-3">{item.announcementPublication.announcement.body}</p>
                                        <a style={{display: "inline-block"}}>
                                            <Link
                                                to={"/myannouncements/" + item.announcementPublication.id + "?ann=" + item.announcementPublication.announcement.id}
                                                className="announcementLinkButton">{strings.more}</Link>
                                        </a>
                                    </div>
                                </div>
                                <div className="row announcementFooterRow">
                                    <div className="col-12 announcementFooterCol">
                                        {item.announcementPublication.read &&
                                        <span className="badge badge-pill badge-warning badgeText" data-toggle="tooltip"
                                              data-placement="bottom" title={dateRead}>{strings.read}</span>}
                                        {!item.announcementPublication.read && <span
                                            className="badge badge-pill badge-danger badgeText">{strings.NotReaded}</span>}
                                        {/*<h6 style={{float: 'right', color: '#343a40'}}>*/}
                                        {/*    <FontAwesomeIcon icon={faComments} size="lg" style={{paddingRight: '4px'}}/>*/}
                                        {/*    {item.numberOfComments}*/}
                                        {/*</h6>*/}

                                    </div>
                                </div>
                            </div>
                        )
                    else
                        return (
                            <div className="container-fluid publicationDivContainerDark">
                                <div className="row announcementTitleRow">
                                    <div className="col-12">
                                        <h2 className="announcementTitle">
                                            <a style={{color: "black"}} href={"/myannouncements/" + item.announcementPublication.id + "?ann=" + item.announcementPublication.announcement.id}>
                                                {item.announcementPublication.announcement.title}
                                            </a>
                                        </h2>
                                    </div>
                                </div>
                                <div className="row announcementBodyRow">
                                    <div className="col-12">
                                        <p className="announcementBody pl-3">{item.announcementPublication.announcement.body}</p>
                                        <a style={{display: "inline-block"}}>
                                            <Link
                                                to={"/myannouncements/" + item.announcementPublication.id + "?ann=" + item.announcementPublication.announcement.id}
                                                className="announcementLinkButton">{strings.more}</Link>
                                        </a>
                                    </div>
                                </div>
                                <div className="row announcementFooterRow">
                                    <div className="col-12 announcementFooterCol">
                                        {item.announcementPublication.read &&
                                        <span className="badge badge-pill badge-warning badgeText" data-toggle="tooltip"
                                              data-placement="bottom" title={dateRead}>{strings.read}</span>}
                                        {!item.announcementPublication.read && <span
                                            className="badge badge-pill badge-danger badgeText">{strings.NotReaded}</span>}
                                        {/*<h6 style={{float: 'right', color: '#343a40'}}>*/}
                                        {/*    <FontAwesomeIcon icon={faComments} size="lg" style={{paddingRight: '4px'}}/>*/}
                                        {/*    {item.numberOfComments}*/}
                                        {/*</h6>*/}
                                    </div>
                                </div>
                            </div>
                        )

                })
                }
            </div>

            <div className="row">
                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
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
    else return (
        <div style={{display:'flex',alignItems:'center', height:'100%'}}>
            <InfoPopup infoMessage={strings.publishedAnnouncements} />
        </div>
    )
};
export default MyPublications;