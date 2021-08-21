import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import {strings} from "../../Localization/Localization";

const EditFeedbackItem = (props) => {
    strings.setLanguage(localStorage.getItem("activeLanguage"));

    const showOptions = (options) => {
        if (options && typeof options !== "string") {
            return options.join("\n");
        } else {
            return options;
        }
    }

    let optionsDisplay = null;

    if (props.entity.type && props.entity.type.indexOf('CHOICE') > 0) {
        optionsDisplay = (<Form.Group controlId="options">
            <Form.Label><span style={{color: "red", fontSize: '18px'}} className="mr-1">*</span>{strings.options}
            </Form.Label>
            <div className="row">
                <div className="col-9">
                    <textarea name="options" onChange={props.handleChange} rows={5}
                              value={showOptions(props.entity.options)} style={{width: '100%'}}/>
                </div>
                <div className="col-3">
                    <p style={{color: 'gray'}}>
                        {strings.enterNewEntry}
                    </p>
                </div>
            </div>
        </Form.Group>);
    }

    return (
        <Row>
            <Col sm={12}>
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label><span style={{color: "red", fontSize: '18px'}}
                                          className="mr-1">*</span>{strings.nameQuestion}</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            required
                            defaultValue={props.entity.name}
                            onChange={props.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label><span style={{color: "red", fontSize: '18px'}}
                                          className="mr-1">*</span>{strings.descQuestion}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            required
                            defaultValue={props.entity.description}
                            onChange={props.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="required">
                        <Form.Label>{strings.required}</Form.Label>
                        <input
                            type="checkbox"
                            name="required"
                            className="ml-1"
                            checked={props.entity.required}
                            onChange={e => props.handleChange({name: 'required', value: !props.entity.required})}/>
                        <span className="ml-3" style={{color: 'red'}}>{props.entity.required ? strings.mustAnswer :
                            <div/>}</span>
                    </Form.Group>

                    <Form.Group controlId="type">
                        <Form.Label><span style={{color: "red", fontSize: '18px'}}
                                          className="mr-1">*</span>{strings.type}</Form.Label>
                        <div>
                            <select onChange={props.handleChange} className="form-control custom-select"
                                    value={props.entity.type} required name="type">
                                <option></option>
                                <option value="SINGLE_CHOICE">{strings.SINGLE_CHOICE}</option>
                                <option value="MULTIPLE_CHOICE">{strings.MULTIPLE_CHOICE}</option>
                                <option value="NUMERIC_FIELD">{strings.NUMERIC_FIELD}</option>
                                <option value="TEXT_FIELD">{strings.TEXT_FIELD}</option>
                            </select>
                        </div>
                    </Form.Group>
                    {optionsDisplay}
                </Form>
            </Col>
        </Row>
    )
}

export default EditFeedbackItem;
