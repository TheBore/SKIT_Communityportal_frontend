import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import {Col, Form, Row} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import {strings} from "../../Localization/Localization";

const TagAdd = (props) => {
    strings.setLanguage(localStorage.getItem("activeLanguage"));


    return (
        <Row>
            <Col>
                <Form onSubmit={props.onSubmit}>
                    <Form.Group controlId="nameMk">
                        <Form.Label><small style={{color: "red"}}>*</small>{strings.nameMk}</Form.Label>
                        <Form.Control
                            type="text"
                            name="tagNameMk"
                            required
                            onChange={props.handleChange}/>
                    </Form.Group>
                    {/*{props.error &&*/}
                    {/*<div*/}
                    {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                    <Form.Group controlId="nameAl">
                        <Form.Label><small style={{color: "red"}}>*</small>{strings.nameAl}</Form.Label>
                        <Form.Control
                            type="text"
                            name="tagNameAl"
                            required
                            onChange={props.handleChange}/>
                    </Form.Group>
                    {/*{props.error &&*/}
                    {/*<div*/}
                    {/*    className="alert alert-danger error-msg">{strings.invalidInput}</div>}*/}
                </Form>
            </Col>
        </Row>
    );
};
export default TagAdd;
