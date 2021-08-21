import React, {Component} from "react";
import "./css/NapArea.css"
import {strings} from "../../Localization/Localization";

class NapArea extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.problems !== null && this.props.problems.length !== 0){
            return(
                <div>
                    <div id="accordion">
                        <div className="card">
                            <div className="card-header" id={"heading" + this.props.napArea.id}
                                 style={{background: "#DFF6FF"}}>
                                <h5 className="mb-0">
                                    <button className="btn btn-link btn-lg" data-toggle="collapse"
                                            data-target={"#collapse" + this.props.napArea.id}
                                            aria-expanded="false" aria-controls={"collapse" + this.props.napArea.id}
                                            style={{color: "#6C757D", fontWeight: "550", paddingLeft: "0"}}>
                                        {localStorage.getItem("activeLanguage") === 'mk'
                                            ?
                                            <p style={{color: "darkblue", textAlign: "left"}}>
                                            <span style={{fontWeight: "500"}}>
                                                {this.props.napArea.napAreaType.nameMk}: &nbsp;
                                            </span>
                                                {this.props.napArea.nameMk}
                                            </p>
                                            :
                                            <p style={{color: "darkblue", textAlign: "left"}}>
                                            <span style={{fontWeight: "500"}}>
                                                {this.props.napArea.napAreaType.nameAl}: &nbsp;
                                            </span>
                                                {this.props.napArea.nameAl}
                                            </p>
                                        }

                                        <p style={{color: "darkblue", textAlign: "left"}}>
                                            <span style={{fontWeight: "500"}}>
                                                {strings.numberOfProblems}: &nbsp;
                                            </span>
                                            {this.props.problems.length}
                                        </p>
                                    </button>
                                </h5>
                            </div>
                            {this.props.problems.map((item,index) => {
                                return (
                                    <div id={"collapse" + this.props.napArea.id} className="collapse"
                                         aria-labelledby={"heading" + this.props.napArea.id}
                                         data-parent="#accordion" key={index}>
                                        <div className="card-body customCardBody">
                                            {localStorage.getItem("activeLanguage") === 'mk'
                                                ?
                                                <a className={"btn btn-link"} href={"/problem/" + item.id + `?napId=${this.props.napId}`}
                                                   style={{color: "darkblue", paddingLeft: 0}}>
                                                    <h3 style={{fontSize: "14pt", textAlign: "left"}}>{item.nameMk}&gt;&gt;</h3>
                                                </a>
                                                :
                                                <a className={"btn btn-link"} href={"/problem/" + item.id + `?napId=${this.props.napId}`}
                                                   style={{color: "darkblue", paddingLeft: 0}}>
                                                    <h3 style={{fontSize: "14pt", textAlign: "left"}}>{item.nameAl}&gt;&gt;</h3>
                                                </a>
                                            }

                                            <p style={{color: "black", fontSize: "12pt"}}>
                                                {strings.strategyGoals}:
                                            </p>
                                            {item.strategyGoals.map((item2, index2) => {
                                                return(
                                                    <p style={{color: "black", fontSize: "12pt"}}>
                                                        - {localStorage.getItem("activeLanguage") === 'mk' ? item2.nameMk : item2.nameAl}
                                                    </p>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        }
        else
            return null;
    }
}

export default NapArea;