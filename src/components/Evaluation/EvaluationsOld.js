import React, {useEffect, useState} from "react";
import Select from "react-select";
import EvaluationRepository from "../../repository/EvaluationRepository";
import {strings} from "../../Localization/Localization";

const EvaluationsOld = (props) => {

    const [validation] = useState([])

    const [evaluations, setEvaluations] = useState([])
    const [selectedEvaluation, setSelectedEvaluation] = useState(null)

    const getEvaluations = () => {
        EvaluationRepository.getAllEvaluations(props.entity.id).then(res => {
            res.data.map(item => {
                evaluations.push({value: item.id, label: item.descriptionMk, name: "evaluation"})
            })
        })
    }

    const onSelectedEvaluationChangeHandler = (evaluation) => {
        if(evaluation !== null && evaluation.type !== "blur"){
            props.onChange(evaluation.name, evaluation.value)
            validation["evaluation"].error = false;
            setSelectedEvaluation(evaluation.value)
        }
        else{
            if (evaluation === null || selectedEvaluation === null) {
                props.onChange("evaluation", null)
                validation["evaluation"].error = true;
                setSelectedEvaluation(null);
            }
        }
    }

    const onChangeHandler = (e) => {
        const target = e.target;

        const value = target.value;
        const name = target.name;
        console.log("value", value);
        console.log("name", name);

        validation[name].error = value === null || value === '';

        props.onChange(name, value);
    };

    const setValidationErrors = () => {
        validation["evaluation"]=({error: false, name: 'evaluation', message: strings.pleaseChooseEvaluation})
    }

    useEffect(() => {
        setValidationErrors();
        getEvaluations();
    }, []);

    return(
        <div className="container">
            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.evaluation}:
                </label>
                <Select
                    placeholder={""}
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    options={evaluations}
                    onBlur={onSelectedEvaluationChangeHandler}
                    onChange={onSelectedEvaluationChangeHandler}
                    name={"evaluation"}
                />
                <small style={{color: "red"}}>{validation["evaluation"] && validation["evaluation"].error && validation["evaluation"].message}</small>
            </div>
        </div>
    )

}
export default EvaluationsOld;