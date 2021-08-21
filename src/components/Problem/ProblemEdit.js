import React, {useEffect, useState} from "react";
import Select from "react-select";
import NapAreaRepository from "../../repository/NapAreaRepository";
import StrategyGoalRepository from "../../repository/StrategyGoalRepository";
import {strings} from "../../Localization/Localization";

const ProblemEdit = (props) => {

    const [listNapAreas, setListNapAreas] = useState([])

    const [listStrategyGoals, setListStrategyGoals] = useState([])
    const [selectedStrategyGoal, setSelectedStrategyGoal] = useState([]);
    const [chosenStrategyGoals, setChosenStrategyGoals] = useState([]);

    const [selectedNapArea, setSelectedNapArea] = useState(null)

    const [validation] = useState([])

    const getNapAreas = () => {
        NapAreaRepository.findAllActiveNapAreas().then(res => {
            res.data.map(item => {
                listNapAreas.push({value: item.id, label: localStorage.getItem("activeLanguage") === 'mk' ? item.nameMk : item.nameAl, name: "napArea"})
            })
        })
    }

    const getStrategyGoals = () => {
        StrategyGoalRepository.getAllStrategyGoalsList().then( res => {
            res.data.map(item => {
                listStrategyGoals.push({value: item.id, label: localStorage.getItem("activeLanguage") === 'mk' ? item.nameMk : item.nameAl, name:"strategyGoal"})
            })
        })
    }

    const onChangeHandler = (e) => {
        const target = e.target;

        const value = target.value;
        const name = target.name;
        console.log("value", value);
        console.log("name", name);

        if(validation[name] !== undefined){
            validation[name].error = value === null || value === '';
        }

        props.onChange(name, value);
    };

    const onSelectedNapAreaChangeHandler = (napArea) => {
        if(napArea !== null && napArea.type !== "blur"){
            props.onChange(napArea.name, napArea.value)
            validation["napArea"].error = false;
            setSelectedNapArea(napArea.value)
        }
        else{
            if (napArea === null || selectedNapArea === null) {
                props.onChange("napArea", null)
                validation["napArea"].error = true;
                setSelectedNapArea(null);
            }
        }
    }

    const handleStrategyGoalChange = (strategyGoals) => {
        if(strategyGoals != null){
            props.onChange("strategyGoals", Array.isArray(strategyGoals) ? strategyGoals.map(x => x.value) : [])
            validation["strategyGoals"].error = false;
        }
        else{
            props.onChange("strategyGoals", null);
            validation["strategyGoals"].error = true;
        }
        setSelectedStrategyGoal(Array.isArray(strategyGoals) ? strategyGoals.map(x => x.value) : []);
    }

    const setValidationErrors = () => {
        validation["nameMk"]=({error: false, name: 'nameMk', message: strings.fillProblemNameMk})
        validation["descriptionMk"]=({error: false, name: 'descriptionMk', message: strings.descMk})
        validation["napArea"]=({error: false, name: 'napArea', message: strings.fillNapArea})
        validation["strategyGoals"]=({error: false, name: 'strategyGoal', message: strings.atLeastOneStrategyGoal})
    }

    let getSelectedStrategyGoals =  () => {
        props.entity.strategyGoals.map( (item) => {
            chosenStrategyGoals.push({value: item.id, label: item.nameMk, name: "strategyGoal"})
        })
    }

    useEffect(() => {
        getNapAreas();
        getStrategyGoals();
        getSelectedStrategyGoals();
        setValidationErrors();
        onSelectedNapAreaChangeHandler({
            value: props.entity.napArea.id,
            label: props.entity.napArea.nameMk,
            name: "napArea"
        });
        chosenStrategyGoals.map(item => {
            handleStrategyGoalChange(item);
        })
    }, []);

    return(
        <div className="container">
            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.problemNameMk}
                </label>
                <input
                    required={true}
                    defaultValue={props.entity.nameMk ? props.entity.nameMk : ""}
                    placeholder={""}
                    name={"nameMk"}
                    type={"text"}
                    onBlur={(e) => onChangeHandler(e)}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control mb-3"
                />
                <small style={{color: "red"}}>{validation["nameMk"] && validation["nameMk"].error && validation["nameMk"].message}</small>
            </div>

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    {strings.problemNameAl}
                </label>

                <input
                    placeholder={""}
                    defaultValue={props.entity.nameAl ? props.entity.nameAl : ""}
                    name={"nameAl"}
                    type={"text"}
                    onBlur={(e) => onChangeHandler(e)}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control mb-3"
                />
            </div>

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.descriptionOfProblemMk}
                </label>

                <textarea
                    placeholder={""}
                    defaultValue={props.entity.descriptionMk ? props.entity.descriptionMk : ""}
                    name={"descriptionMk"}
                    rows={6}
                    onBlur={(e) => onChangeHandler(e)}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control mb-3"
                />
                <small style={{color: "red"}}>{validation["descriptionMk"] && validation["descriptionMk"].error && validation["descriptionMk"].message}</small>
            </div>

            <div className="col-12">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    {strings.descriptionOfProblemAl}
                </label>

                <textarea
                    placeholder={""}
                    defaultValue={props.entity.descriptionAl ? props.entity.descriptionAl : ""}
                    name={"descriptionAl"}
                    rows={6}
                    onBlur={(e) => onChangeHandler(e)}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control mb-3"
                />
            </div>

            <div className="col-12 mt-4">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.napArea}
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
                    options={listNapAreas}
                    onBlur={onSelectedNapAreaChangeHandler}
                    onChange={onSelectedNapAreaChangeHandler}
                    name={"napArea"}
                    defaultValue={props.entity.napArea !== null && props.entity.napArea !== undefined ? {
                        value: props.entity.napArea.id,
                        label: props.entity.napArea.nameMk,
                        name: "napArea"
                    } : ""}
                />
                <small style={{color: "red"}}>{validation["napArea"] && validation["napArea"].error && validation["napArea"].message}</small>
            </div>

            <div className="col-12 mt-4">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">
                    <small style={{color: "red"}}>*</small>
                    {strings.strategyGoals}
                </label>

                {chosenStrategyGoals.length > 0 ?
                    <Select
                        placeholder={""}
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isMulti={true}
                        isSearchable={true}
                        defaultValue={chosenStrategyGoals}
                        options={listStrategyGoals}
                        onChange={handleStrategyGoalChange}
                        name={"strategyGoals"}
                    />
                    : ""
                }

                <small style={{color: "red"}}>{validation["strategyGoals"] && validation["strategyGoals"].error && validation["strategyGoals"].message}</small>
            </div>
        </div>
    )
}

export default ProblemEdit;