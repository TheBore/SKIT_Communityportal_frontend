import React, {useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import {strings} from "../../Localization/Localization";
import InstitutionCategoryRepository from "../../repository/InstitutionCategoryRepository";
import {toast} from "react-toastify";
import Select from 'react-select';

const AddInstitutionCategorie = (props) => {
    strings.setLanguage(localStorage.getItem("activeLanguage"));
    const [categories, setCategories] = useState([]);
    const [listCategories, setListCategories] = useState([]);

    const getCategories = async () => {
        InstitutionCategoryRepository.getAllInstitutionCategoryList().then(res => {
            setCategories(res.data)
            res.data.map(item => {
                listCategories.push({value : item.id,label : item.nameMk,name : "parentCategory"})
            })
        }).catch(err => toast.error(strings.failedToLoadData));
    }

    useEffect(() => {
        getCategories()
    }, []);


    const onCategoryPickerChangeHandler = (e) => {
        if (e !== null){
            props.handleChange(e);
        }else{
            props.handleNullChange(e);
        }
    };

    return (
        <div style={{minHeight:"400px"}}>
            <div className="col mb-3">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                    style={{color: "red"}}>*</small>{strings.nameMk}</label>

                <input
                    required
                    name={"nameMk"}
                    className="form-control"
                    onChange={props.handleChange}
                />

                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>
            <div
                className="col mb-3">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                    style={{color: "red"}}>*</small>{strings.nameAl}</label>

                <input
                    required
                    name={"nameAl"}
                    className="form-control"
                    onChange={props.handleChange}
                />
                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>
            <div className="col mb-3">
{/*                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10"><small
                    style={{color: "red"}}>*</small>{strings.nameEn}</label>

                <input
                    required
                    name={"nameEn"}
                    className="form-control"
                    onChange={props.handleChange}
                />*/}

                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
            </div>
            <div
                className="col mb-3">
                <label
                    className="weight400 text-upper control-label control-label-xl margin-top-10">Родител на
                    категорија</label>

                <Select
                    placeholder={strings.parentCategory}
                    className="basic-single"
                    classNamePrefix="select"
                    // defaultValue={colourOptions[0]}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    options={listCategories}
                    onChange={onCategoryPickerChangeHandler}
                    name={"parentCategory"}

                />
                {/*{props.error &&*/}
                {/*<div*/}
                {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}

            </div>

        </div>
    );
};
export default AddInstitutionCategorie;
