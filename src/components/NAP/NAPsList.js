import React, {Component} from "react";
import NAPRepository from "../../repository/NAPRepository";
import './css/NapsList.css'
import CrudModal from "../Crud/CrudModal";
import {toast} from "react-toastify";
import NAPAdd from "./NAPAdd";
import {strings} from "../../Localization/Localization";

class NAPsList extends Component {
    constructor() {
        super();
        this.state = {
            naps: []
        }
    }

    componentDidMount() {
        NAPRepository.getAllNAPsList().then(res => {
            this.setState({
                naps: res.data
            })
        })
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    onAdd = (entity) => {
        return NAPRepository.createNap(entity).then( async res => {
            toast.success(strings.napCreateSuccess);
            await this.sleep(2000);
            window.location.reload();
        }).catch( async err => {
            toast.error(strings.napCreateNoSuccess);
            console.log(err);
            await this.sleep(2000);
            window.location.reload();
        })
    }

    render() {
        const napValidations = (['nameMk', 'descriptionMk',
            'status', 'startDate', 'endDate']);

        let rgbColorCounter = 1;

        return (
            <div className={'row'}>
                <div className={'col-md-2'} style={{padding: 0, marginTop: "8px"}}>
                    {localStorage.getItem('role') !== 'ROLE_EVALUATOR' ?
                        <div>
                            <CrudModal
                                entity={{}}
                                icon={'add'}
                                btnClass={'addNapBtn'}
                                title={strings.addNAP}
                                showText={true}
                                onSubmit={this.onAdd}
                                validations={napValidations}
                                body={NAPAdd}
                            />
                        </div> : ""
                    }
                </div>

                <div className={'col-md-10'} style={{width: "90%"}}>
                    <div id={"napList"} className={"row"}>
                        {this.state.naps.map((item, index) => {
                            let rgbColor;
                            let rgb1 = (38 + rgbColorCounter * (60 / this.state.naps.length) - 10);
                            let rgb2 = (34 + rgbColorCounter * (140 / this.state.naps.length) - 10 );
                            let rgb3 = (94 + rgbColorCounter * (140 / this.state.naps.length) - 10 );
                            rgbColorCounter++;
                            rgbColor = "rgb(" + rgb1 + "," + rgb2 + "," + rgb3 + ")";

                            let statusUnderlineColor = null;
                            let statusBackgroundColor = null;

                            if (item.status.statusMk === "Реализиран") {
                                statusBackgroundColor = '#D9EAE2';
                                statusUnderlineColor = '#5BB385';
                            }
                            if (item.status.statusMk === "Во подготовка") {
                                statusBackgroundColor = '#FEF7E4';
                                statusUnderlineColor = '#ECC673';
                            }
                            if (item.status.statusMk === "Нереализиран") {
                                statusBackgroundColor = '#EED8E5';
                                statusUnderlineColor = '#EB5658';
                            }

                            return (
                                <div
                                    className={"col-md-11 napDiv rounded d-flex justify-content-center align-items-center"}
                                    key={index}>
                                    <div className={"row"}
                                         style={{
                                             color: "black",
                                             border: "1px solid black",
                                             width: "100%",
                                             "border-radius": "100px",
                                             "border-right": "20px solid " + rgbColor
                                         }}>
                                        <div className={"col-md-12 center"} style={{paddingTop: "10px"}}>
                                            {localStorage.getItem("activeLanguage") === 'mk'
                                                ?
                                                <a href={`/nap/${item.id}`} style={{color: "black"}}><h2><b>{item.nameMk}</b></h2></a>
                                                :
                                                <a href={`/nap/${item.id}`} style={{color: "black"}}><h2><b>{item.nameAl}</b></h2></a>
                                            }
                                        </div>
                                        <div className={"col-md-12 center"}>
                                            <h3>{item.startDate} - {item.endDate}</h3>
                                        </div>
                                        <div className={"col-md-12 center"}>

                                            <h3 style={{
                                                textDecoration: "underline solid " + statusUnderlineColor + " 3px",
                                            }}> {localStorage.getItem("activelanguage") === 'mk' ? item.status.statusMk : item.status.statusAl} </h3>
                                        </div>
                                        <div className={"col-md-12 center"} style={{marginBottom: "10px"}}>
                                            <a href={`/nap/${item.id}`}
                                               className={"btn btn-outline-dark"} style={{padding: "0"}}>
                                                <h3 id="moreLink">
                                                    <span>{strings.more}</span>
                                                </h3>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        )
    }
}

export default NAPsList;