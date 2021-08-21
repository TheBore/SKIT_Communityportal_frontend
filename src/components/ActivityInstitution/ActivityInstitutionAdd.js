import {strings} from "../../Localization/Localization";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import ActivityInstitutionRepository from "../../repository/ActivityInstitutionRepository";
import InstitutionRepository from "../../repository/InstitutionRepository";

const ActivityInstitutionAdd = (props) => {

    const [listInstitutions, getListInstitutions] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState(null);

    const onChangeHandler = (e) => {
        props.onChange(e.target.name, e.target.value);
    };

    const getInstitutions = () => {
        InstitutionRepository.getAllInstitutions().then(res => {
            res.data.map(item => {
                listInstitutions.push({value: item.id, label: item.nameMk, name: "institution"})
            })
        })
    }

    const onSelectedInstitutionChangeHandler = (institution) => {
        if(institution !== null && institution.type !== "blur"){
            props.onChange(institution.name, institution.value)
            setSelectedInstitution(institution.value)
        }
        else{
            if (institution === null || selectedInstitution === null) {
                props.onChange("institution", null)
                setSelectedInstitution(null);
            }
        }
    }

    useEffect(() => {
        getInstitutions();
    }, [])

    return(
        <div className="col-12">
            <div className="row">
                <div className="col-12 mt-2">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameMk}</label>
                    <input
                        required={true}
                        name={"nameMk"}
                        type={"text"}
                        placeholder={""}
                        className="form-control"
                        onChange={(e) => onChangeHandler(e)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-3">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameAl}</label>
                    <input
                        required={true}
                        name={"nameAl"}
                        type={"text"}
                        placeholder={""}
                        className="form-control"
                        onChange={(e) => onChangeHandler(e)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-4">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">
                        <small style={{color: "red"}}>*</small>
                        {strings.competentInstitution}
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
                        options={listInstitutions}
                        onBlur={onSelectedInstitutionChangeHandler}
                        onChange={onSelectedInstitutionChangeHandler}
                        name={"institution"}
                    />
                </div>
            </div>
        </div>
    )
}
export default ActivityInstitutionAdd;