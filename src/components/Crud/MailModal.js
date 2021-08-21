import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import {Col, Row} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import {strings} from "../../Localization/Localization";

const MailModal = (props) => {
    strings.setLanguage(localStorage.getItem("activeLanguage"));


    return (
        <Row>
            <Col>
                <label className="mb-2">
                    <small style={{color: "red"}}>*</small>
                    {strings.message}:
                </label>
                <form onSubmit={props.onSubmit}>
                    <textarea
                        className="form-control"
                        rows={4}
                        name="message"
                        required
                        onChange={props.handleChange}/>
                </form>
            </Col>
        </Row>
    );
};
export default MailModal;
