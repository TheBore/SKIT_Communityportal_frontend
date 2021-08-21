import React, {Component} from "react";

class StrategyGoal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.measures !== null && this.props.measures.length !== 0){
            return(
                <div>
                    <div id="accordion">
                        <div className="card">
                            <div className="card-header" id={"heading" + this.props.strategyGoal.id}
                                 style={{background: "#DFF6FF"}}>
                                <h5 className="mb-0">
                                    <button className="btn btn-link btn-lg" data-toggle="collapse"
                                            data-target={"#collapse" + this.props.strategyGoal.id}
                                            aria-expanded="false" aria-controls={"collapse" + this.props.strategyGoal.id}
                                            style={{color: "#6C757D", fontWeight: "550", paddingLeft: "0"}}>
                                        <span style={{color: "darkblue"}}>{localStorage.getItem("activeLanguage") === 'mk' ? this.props.strategyGoal.nameMk : this.props.strategyGoal.nameAl} </span>
                                    </button>
                                </h5>
                            </div>
                            {this.props.measures.map((item,index) => {
                                return (
                                        <div id={"collapse" + this.props.strategyGoal.id} className="collapse"
                                             aria-labelledby={"heading" + this.props.strategyGoal.id}
                                             data-parent="#accordion" key={index}>
                                            <div className="card-body">
                                                <a className={"btn btn-link"} href={"/measure/" + item.id}
                                                   style={{color: "darkblue", paddingLeft: 0}}><h3>{localStorage.getItem("activeLanguage") === 'mk' ? item.nameMk : item.nameAl}</h3></a>
                                                <p>{item.descriptionMk}</p>
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

export default StrategyGoal;