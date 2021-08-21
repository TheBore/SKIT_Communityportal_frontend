import React, {useEffect, useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import {strings} from "../../Localization/Localization";
import './css/DesignFeedbackItem.css';

const EditFeedbackItemNew = (props) => {
    strings.setLanguage(localStorage.getItem("activeLanguage"));

    const [generatedOptionsNumber, setGeneratedOptionsNumber] = useState(1);
    const [optionsDisplay, setOptionsDisplay] = useState([])
    const [editFlag, setEditFlag] = useState(true)

    useEffect(() => {
        checkIfEditable();
    })

    const checkIfEditable = async () => {
        if (props.entity["options"] !== undefined && editFlag === true){
            await setGeneratedOptionsNumber(props.entity["options"].length)
            await showNumberOptions(props.entity["options"].length);
            await setEditableOptions();
            setEditFlag(false);
        }
    }

    const setEditableOptions = () => {
        for (let i = 0; i < props.entity["options"].length; i++){
            props.onChange(`option${i}`, props.entity["options"][i])
        }
    }

    const onOptionsChangeHandler = (option) => {
        if(option !== undefined){
            let name = option.target.name;
            let value = option.target.value;

            props.onChange(name, value)
        }
    }

    const showNumberOptions = async (number) => {
        let optionsTmp = []
        for (let i = 0; i < generatedOptionsNumber; i++){
            if (props.entity["options"] !== undefined){
                await onOptionsChangeHandler({target: {name: `option${i}`, value: props.entity["options"][i]}})
            }else {
                await onOptionsChangeHandler({target: {name: `option${i}`, value: ""}})
            }
            optionsTmp.push(
                <div style={{marginBottom: "7px"}} className="mt-2">
                    <input name={`option${i}`}
                           onChange={onOptionsChangeHandler}
                           defaultValue={props.entity[`option${i}`]}
                           style={{width: '100%', border: '1px solid gray', borderRadius: '10px'}}
                           className="form-control"/>
                </div>
            )
        }
        setOptionsDisplay(optionsTmp);
        props.onChange("optionsLength", generatedOptionsNumber);
    }

    const changeNumberOfOptions = async (number) => {
        if(parseInt(number.target.value)){
            await setGeneratedOptionsNumber(parseInt(number.target.value))
        }
    }

    let optionsNumberDisplay = null;

    if (props.entity.type && props.entity.type.indexOf('CHOICE') > 0) {
        optionsNumberDisplay = (<Form.Group controlId="options">
            <Form.Label><span style={{color: "red", fontSize: '18px'}} className="mr-1">*</span>Полиња
            </Form.Label>
            <div className="row">
                <div className="col-2">
                    <input type="number" className="form-control" min="0" value={generatedOptionsNumber}
                           onChange={(e) => changeNumberOfOptions(e)}
                    />
                </div>
                <div className="col-4">
                    <button type="button"
                            className="btn defaultBtn btn-lg ml-2"
                            style={{background: '#daa608', color: 'black'}}
                            onClick={(e) => showNumberOptions(e)}>
                        Генерирај полиња
                    </button>
                </div>
            </div>
        </Form.Group>);
    }
    else {
        optionsNumberDisplay = null;
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
                    {/*<Form.Group controlId="description">*/}
                    {/*    <Form.Label><span style={{color: "red", fontSize: '18px'}}*/}
                    {/*                      className="mr-1">*</span>{strings.descQuestion}</Form.Label>*/}
                    {/*    <Form.Control*/}
                    {/*        as="textarea"*/}
                    {/*        rows={3}*/}
                    {/*        name="description"*/}
                    {/*        required*/}
                    {/*        defaultValue={props.entity.description}*/}
                    {/*        onChange={props.handleChange}/>*/}
                    {/*</Form.Group>*/}
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
                                <option/>
                                <option value="SINGLE_CHOICE">{strings.SINGLE_CHOICE}</option>
                                <option value="MULTIPLE_CHOICE">{strings.MULTIPLE_CHOICE}</option>
                                <option value="NUMERIC_FIELD">{strings.NUMERIC_FIELD}</option>
                                <option value="TEXT_FIELD">{strings.TEXT_FIELD}</option>
                                <option value="ATTACHMENT">{strings.file}</option>
                            </select>
                        </div>
                    </Form.Group>
                    {optionsNumberDisplay}
                    {optionsNumberDisplay !== null && optionsDisplay !== null && optionsDisplay.length > 0 ?
                        <Form.Group controlId="options">
                            <Form.Label className="dev">
                                <span style={{color: "red", fontSize: '18px'}} className="mr-1">
                                    *
                                </span>
                                {strings.options}
                            </Form.Label>

                            <div className="row">
                                <div className="col-8">
                                    {optionsDisplay}
                                </div>
                            </div>

                        </Form.Group> : ""
                    }

                </Form>
            </Col>
        </Row>
    )
}

export default EditFeedbackItemNew;
