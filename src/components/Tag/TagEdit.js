import React from "react";
import {strings} from "../../Localization/Localization";
import {Col, Form, Row} from "react-bootstrap";

const TagEdit = (props) => {
    strings.setLanguage(localStorage.getItem("activeLanguage"));

    return (
        <Row>
            <Col sm={6}>
                <Form onSubmit={props.onSubmit}>
                    <Form.Group controlId="nameMk">
                        <Form.Label>{strings.nameMk}</Form.Label>
                        <Form.Control
                            type="text"
                            name="nameMk"
                            required
                            value={props.entity.nameMk}
                            onChange={props.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="nameAl">
                        <Form.Label>{strings.nameAl}</Form.Label>
                        <Form.Control
                            type="text"
                            name="nameAl"
                            required
                            value={props.entity.nameAl}
                            onChange={props.handleChange}/>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
};
export default TagEdit;
