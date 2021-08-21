import React, {useState, useEffect} from "react";
import {strings} from "../../Localization/Localization";
import InstitutionCategoryRepository from "../../repository/InstitutionCategoryRepository";
import {toast} from "react-toastify";
import Select from 'react-select';


const EditInstitutionCategory = (props) => {

    strings.setLanguage(localStorage.getItem("activeLanguage"));
    const [headings, setHeadings] = useState([]);
    const [categories, setCategories] = useState([]);
    const [listCategories, setListCategories] = useState([]);

    const getCategories = async () => {
        InstitutionCategoryRepository.getAllInstitutionCategoryList().then(res => {
            setCategories(res.data)
            res.data.map(item => {
                console.log(item)
                listCategories.push({value: item.id, label: item.nameMk, name: "parentCategory"})
            })
        }).catch(err => toast.error(strings.failedToLoadData));
    }

    useEffect(() => {
        getCategories()
    }, []);


    const onCategoryPickerChangeHandler = (e) => {
        if (e !== null) {
            props.handleChange(e);
        } else {
            props.handleNullChange(e);
        }
    };


    return (
        <div style={{minHeight: "400px"}}>
            <div
                className="col mb-3">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameMk}</label>

                <input
                    required
                    name={"nameMk"}
                    value={props.entity.nameMk}
                    className="form-control"
                    onChange={props.handleChange}
                />
            </div>
            <div
                className="col mb-3">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameAl}</label>

                <input
                    required
                    name={"nameAl"}
                    value={props.entity.nameAl}
                    className="form-control"
                    onChange={props.handleChange}
                />
            </div>
            <div
                className="col mb-3">
{/*                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">{strings.nameEn}</label>

                <input
                    required
                    name={"nameEn"}
                    value={props.entity.nameEn}
                    className="form-control"
                    onChange={props.handleChange}
                />*/}
            </div>
            <div className="col mb-3">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">Родител на
                    категорија</label>

                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    options={listCategories}
                    onChange={onCategoryPickerChangeHandler}
                    name={"parentCategory"}
                    defaultValue={props.entity.parentCategory !== null && props.entity.parentCategory !== undefined && props.entity.parentCategory !== "undefined" ? {
                        value: props.entity.parentCategory.id,
                        label: props.entity.parentCategory.nameMk,
                        name: "parentCategory"
                    } : ""}

                />


            </div>

        </div>
    )
}

export default EditInstitutionCategory;
