import React, {Component} from "react";
import BarChart from 'react-bar-chart';
import './css/AnalyseFeedback.css'
import FeedbackRepository from "../../repository/FeedbackRepository";
import BarChartModal from "./BarChartModal";
import InfoPopup from "../ErrorHandler/InfoPopup";
import {strings} from "../../Localization/Localization";
import {faFileExport, faFilePdf, faUniversity} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FeedbackItemRepository from "../../repository/FeedbackItemRepository";
import {SERVER_ADDRESS} from "../../shared/server-address";


const margin = {top: 20, right: 20, bottom: 30, left: 40};


class AnalyseFeedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 500,
            data: [],
            textData: [],
            answers: [],
            show: false,
            count: 0,
            showUsersModal: false,
            institutions: [],
            feedbackName:'',
            analyseFeedbackItem:null,
            attachments: []
        }
    }

    componentDidMount() {
        this.getFeedbackStatistics();
    }

    getFeedbackStatistics = () => {
        let id = this.props.match.params.id;
        let data = []
        FeedbackRepository.getFeedbackStatistics(id)
            .then( async res => {
                this.setState({
                    count: Object.keys(res.data.items).length,
                    feedbackName:res.data.feedback.name
                })
                for (let feedbackItemId in res.data.items) {
                    if (res.data.items.hasOwnProperty(feedbackItemId)) {
                        const feedbackItem = res.data.items[feedbackItemId];
                        let answerFrequency = feedbackItem.answerFrequency;
                        let feedbackItemName = feedbackItem.item.name;
                        let answerType = feedbackItem.item.type;
                        let feedItemId = feedbackItem.item.id;
                        let graphData = [];

                        for (let answerValue in answerFrequency) {
                            let items = []
                            await FeedbackItemRepository.getAttachmentsForFeedbackItem(feedItemId).then(res => {
                                items = res.data
                            })
                            if (answerFrequency.hasOwnProperty(answerValue)) {
                                graphData.push({
                                    text: answerValue,
                                    value: answerFrequency[answerValue],
                                    type: answerType,
                                    name: feedbackItemName,
                                    feeditemid: feedItemId,
                                    items: items
                                });
                            }
                        }
                        data.push(graphData);
                        this.setState({data: data});
                    }
                }
            }).catch(err => console.log(err))

    }

    handleBar = (element) => {
        FeedbackRepository.getFeedbackStatisticsAnswersUsers(element.feeditemid, element.text).then(res => {

            this.setState({
                show: true,
                institutions: res.data
            })
        })
    }

    setFalseShow = () => {
        this.setState({show: false});
    }


    visualizeData = (item, index) => {
        let answerType;
        let feedbackItemName;

        for (let k = 0; k < item.length; k++) {
            answerType = item[k]["type"];
            feedbackItemName = item[k]['name'];
        }
        if (answerType === "SINGLE_CHOICE" || answerType === "MULTIPLE_CHOICE") {
            return <div className="container" key={index}>

                <div className="row mt-3 mb-3">
                    <div className="col-12" id="box">
                        <h5 style={{textAlign: "left", color: "#1C4857"}}
                            className="mt-4 ml-3">{feedbackItemName}</h5>

                        <BarChart label='Quantity' width={500} height={300}
                                  margin={margin} data={item}
                                  onBarClick={this.handleBar}/></div>
                </div>
            </div>
        } else if(answerType === "ATTACHMENT"){

            return             <div className="container" key={index}>
                <h5 style={{textAlign: "left", color: "#1C4857"}}
                    className="mt-4 ml-3">{feedbackItemName}</h5>

                <div className="row">
                    <div className="col-12" style={{minHeight:"70px"}}>

                        <div style={{height:"100%",overflowY:"auto"}}>
                            <ul className="list-group">

                                {item.map((d, id) => {
                                    console.log(d)
                                    return(
                                        <li
                                            className={"list-group-item "}
                                            key={id}
                                        >

                                            {d.items.map(file => {
                                                return (
                                                    d.text === file.attachment.name &&
                                                    <a
                                                        style={{color: "blue", marginBottom: "auto", marginTop: 'auto', verticalAlign: 'sub'}}
                                                        href={SERVER_ADDRESS + "/rest/attachment/download/" + file.attachment.id}>
                                                        <FontAwesomeIcon icon={faFilePdf}
                                                                         color="red"
                                                                         size="lg"
                                                                         style={{paddingRight: '4px'}}/>
                                                        {file.attachment.name} &nbsp; &nbsp;
                                                    </a>)

                                            })}

                                            <div style={{display:"flex",float:"right"}}>
                                                <button className="btn btn-danger btn-sm ml-1 defaultBtn "
                                                        onClick={()=>this.handleBar(d)} ><FontAwesomeIcon icon={faUniversity} style={{paddingRight: '2px'}}/>{strings.institutions}</button>

                                            </div>
                                        </li>
                                    )})}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        }
        else {
            return             <div className="container" key={index}>
                <h5 style={{textAlign: "left", color: "#1C4857"}}
                    className="mt-4 ml-3">{feedbackItemName}</h5>

                <div className="row">
                    <div className="col-12" style={{minHeight:"70px"}}>

                        <div style={{height:"100%",overflowY:"auto"}}>
                            <ul className="list-group">
                                {item.map((d, id) => {
                                    return(
                                        <li
                                            className={"list-group-item "}
                                            key={id}
                                        >
                                            {d.text.slice(0,200)+"..."}
                                            <div style={{display:"flex",float:"right"}}>
                                                <button className="btn btn-danger btn-sm ml-1 defaultBtn "
                                                        onClick={()=>this.handleBar(d)} ><FontAwesomeIcon icon={faUniversity} style={{paddingRight: '2px'}}/>{strings.institutions}</button>

                                            </div>
                                        </li>
                                    )})}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        }
    }

    render() {
        if (this.state.count !== 0 && this.state.count === this.state.data.length) {
            let feedbackId=this.props.match.params.id;
            return (
                <div>
                    <div className="centerDiv" ref='root'>
                        <div className="centerDiv">
                            <div className="row">
                                <div className="col-12">
                                    <h2 style={{textAlign: "center", color: "#1C4857"}}
                                        className="mt-4 ml-3">{this.state.feedbackName}</h2>
                                </div>
                                <BarChartModal setFalseShow={this.setFalseShow} show={this.state.show}
                                               institutions={this.state.institutions}/>
                                {this.state.data.map(this.visualizeData)}

                            </div>
                        </div>
                    </div>

                    <div className={"container"}>
                        <a href={SERVER_ADDRESS + "/rest/feedback/analyse/"+feedbackId+"/export"}
                           target="_blank" rel="noopener noreferrer" style={{color:"white",backgroundColor:"#3792cb",float:"right"}}
                           className={"btn btn-round mb-5 mt-5 defaultBtn"}><FontAwesomeIcon icon={faFileExport} size="lg"
                                                                                  style={{paddingRight: '4px'}}/>{strings.export}</a>

                    </div>
                </div>
            )
        } else {
            return (

                <div style={{display:'flex',alignItems:'center', height:'100%'}}>
                    <InfoPopup infoMessage={strings.NoneAnsweredFeedback} />
                </div>
            )
        }
    }
}

export default AnalyseFeedback;
