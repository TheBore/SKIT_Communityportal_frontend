import React, {useEffect, useState} from "react";
import NapAreaTypeRepository from "../../repository/NapAreaTypeRepository";
import {strings} from "../../Localization/Localization";
import Select from "react-select";

const NapAreaEdit = (props) => {

    const [napAreas, setNapAreas] = useState([])
    const [listNapAreas, setListNapAreas] = useState([])

    const getNapAreas = () => {
        NapAreaTypeRepository.findAllActiveAreaTypes().then(res => {
            setNapAreas(res.data);

            res.data.map(item => {
                listNapAreas.push({value: item.id, label: localStorage.getItem("activeLanguage") === 'mk' ? item.nameMk : item.nameAl, name: "napAreaTypeId"})
            })
        })
    }

    useEffect(() => {
        getNapAreas();
    }, [])

    const onChangeHandler = (e) => {
        props.onChange(e.target.name, e.target.value);
    };

    const onSelectedAreaTypeChangeHandler = (areaType) => {
        if (areaType !== null) {
            props.onChange(areaType.name, areaType.value)
        } else {
            props.onChange("napAreaTypeId", null)
        }
    }

    return(

        <div className="col-12">
            <div className="row">
                <div className="col-12 mt-2">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameMk}</label>
                    <input
                        defaultValue={props.entity.nameMk ? props.entity.nameMk : ""}
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
                        defaultValue={props.entity.nameAl ? props.entity.nameAl : ""}
                        name={"nameAl"}
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
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.message}</label>
                    <input
                        defaultValue={props.entity.code ? props.entity.code : ""}
                        name={"code"}
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
                        className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                        style={{color: "red"}}>*</small>{strings.areaTypes}</label>

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
                        onChange={onSelectedAreaTypeChangeHandler}
                        name={"napAreaTypeId"}
                        defaultValue={props.entity.napAreaType !== null && props.entity.napAreaType !== undefined ? {
                            value: props.entity.napAreaType.id,
                            label: props.entity.napAreaType.nameMk,
                            name: "napAreaTypeId"
                        } : ""}
                    />

                </div>
            </div>

            <div className="row">
                <div className="col-12 mt-3">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.descMk}</label>
                    <textarea
                        defaultValue={props.entity.descriptionMk ? props.entity.descriptionMk : ""}
                        name={"descriptionMk"}
                        rows={3}
                        placeholder={""}
                        className="form-control"
                        onChange={(e) => onChangeHandler(e)}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-12 mt-3">
                    <label
                        className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.descAl}</label>
                    <textarea
                        defaultValue={props.entity.descriptionAl ? props.entity.descriptionAl : ""}
                        name={"descriptionAl"}
                        rows={3}
                        placeholder={""}
                        className="form-control"
                        onChange={(e) => onChangeHandler(e)}
                    />
                </div>
            </div>

        </div>
    )
}

export default NapAreaEdit;