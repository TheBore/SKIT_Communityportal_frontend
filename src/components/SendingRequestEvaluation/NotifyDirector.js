import React, {useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {Col, Row} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import {strings} from "../../Localization/Localization";
import InstitutionRepository from "../../repository/InstitutionRepository";

const NotifyDirector = (props) => {
    strings.setLanguage(localStorage.getItem("activeLanguage"));

    let [emails, setEmails] = useState([])
    let [institution, setInstitution] = useState([])


    // const getEmails = () => {
    //     InstitutionRepository.getDirectorEmailsForInstitution(props.entity.sentRequest.receiver.id).then(res => {
    //         setEmails(res.data)
    //     })
    // }

    const getInstitution = () => {
        InstitutionRepository.getInstitutionById(props.entity.sentRequest.receiver.id).then(res => {
            setInstitution(res.data)
            setEmails(res.data.direktorEmail)
        })
    }

    useEffect(() => {
        // getEmails();
        getInstitution();
    }, []);


    // emails = JSON.stringify(emails).replaceAll("[", "").replaceAll("]", "").split(",")
    // emails = emails.join(" , ")
    emails = JSON.stringify(emails).replaceAll("[", "").replaceAll("]", "")
    institution = institution.nameMk;

    return (
        <Row>
            <Col>
                <form onSubmit={props.onSubmit}>
                    <label className="mb-2"><small style={{color: "red"}}>*</small>
                        {strings.institution}
                    </label>
                    <input className="form-control mb-2"
                           name="institution"
                           disabled
                           value={institution ? institution : ""}/>
                    <br/>

                    <label className="mb-2">
                        {strings.direktorEmail}:
                    </label>
                    <input className="form-control mb-2"
                           name="emails"
                           disabled
                           value={(emails !== null && emails !== "null" && emails !== undefined && emails !== "undefined" && emails !== "") ? emails : strings.noEmailAddress}/>
                     <br/>

                    <label className="mb-2"><small style={{color: "red"}}>*</small>
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
export default NotifyDirector;
