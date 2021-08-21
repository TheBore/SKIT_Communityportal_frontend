import React, {useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {Col, Row} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import {strings} from "../../Localization/Localization";
import Select from 'react-select';
import InstitutionRepository from "../../repository/InstitutionRepository";
import {toast} from "react-toastify";

const EscalateModal = (props) => {
    strings.setLanguage(localStorage.getItem("activeLanguage"));

    const [institution, setInstitution] = useState({direktorEmail:""});
    const [listInstitutions, setListInstitutions] = useState([]);

    const getInstitutions = async () => {
        InstitutionRepository.allActiveInstitutions().then(res => {
            res.data.map(item => {
                listInstitutions.push({value: item.id, label: item.nameMk})
            })
        }).catch(err => toast.error(strings.failedToLoadData));
    }
    const onInstitutionChangeHandler = (e) =>{
        if(e !== null) {
            InstitutionRepository.getInstitutionById(e.value).then(r => {
                setInstitution(r.data)
                props.escalateFunction("direktorEmail", r.data.direktorEmail)
            }).catch(err => console.log(err))
        }
        else{
            setInstitution({direktorEmail:""})
            props.escalateFunction("direktorEmail","")
        }
    }

    useEffect(() => {
        getInstitutions();
    }, []);
    return (
        <Row>
            <Col>
                <form onSubmit={props.onSubmit}>
                    <label className="mb-2"><small style={{color: "red"}}>*</small>{strings.institution}</label>
                    <Select
                        placeholder={strings.searchForInstitution}
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isSearchable={true}
                        options={listInstitutions}
                        onChange={onInstitutionChangeHandler}
                    />
                    <br/>

                    <label className="mb-2">
                        {strings.direktorEmail}:
                    </label>
                    <input className="form-control mb-2"
                           disabled
                           placeholder={institution.direktorEmail ? institution.direktorEmail : ""}
                           value={institution.direktorEmail}/>
                     <br/>

                    <label className="mb-2">
                        <small style={{color: "red"}}>*</small>
                        {strings.message}:
                    </label>
                    <textarea
                        className="form-control"
                        rows={3}
                        name="message"
                        required
                        onChange={props.handleChange}/>
                </form>
            </Col>
        </Row>
    );
};
export default EscalateModal;
