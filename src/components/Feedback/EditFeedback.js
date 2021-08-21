import React, {useEffect, useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import {strings} from "../../Localization/Localization";
import AreaOfInterestRepository from "../../repository/AreaOfInterestRepository";
import Select from "react-select";
import DatePicker from "react-datepicker";

const EditFeedback = (props) => {

    strings.setLanguage(localStorage.getItem("activeLanguage"));
    const [areasOfInterest, setAreasOfInterest] = useState([])
    const [listAreas, setListAreas] = useState([])
    const [startDate, setStartDate] = useState(null);


    const getAreas = () => {
        AreaOfInterestRepository.findAllActive().then(res => {
            setAreasOfInterest(res.data);

            res.data.map(item => {
                listAreas.push({value: item.id, label: item.nameMk, name: "areaOfInterestId"})
            })
        })
    }

    const setDate = () => {
        let date = props.entity.dueDate;
        setStartDate(new Date(date));
    }

    const updateDueDate = (v) => {
        setStartDate(v);
        props.handleChange({name: 'dueDate', value: v})
    };


    useEffect(() => {
        getAreas();
        setDate();
    }, [])

    const onSelectedAreaChangeHandler = (area) => {
        if (area !== null) {
            props.onChange(area.name, area.value)
        } else {
            props.onChange("areaOfInterestId", null)
        }
    }

    return (
        <Row>
            <Col>
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>{strings.name}</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            required
                            defaultValue={props.entity.name}
                            onChange={props.handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>{strings.description}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            type="text"
                            name="description"
                            required
                            defaultValue={props.entity.description}
                            onChange={props.handleChange}
                        />
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>
                            <small style={{color: "red"}}>*</small>{strings.dueDate}
                        </Form.Label>
                        <div>
                            <DatePicker
                                locale="mk"
                                id="dueDate"
                                selected={startDate}
                                onChange={updateDueDate}
                                className="form-control"
                                dateFormat="dd MMM yyyy"
                                popperPlacement="top-start"
                            />
                        </div>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            <small style={{color: "red"}}>*</small>{strings.areasOfInterest}
                        </Form.Label>
                        <div>
                            <Select
                                placeholder={""}
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={true}
                                isRtl={false}
                                isSearchable={true}
                                options={listAreas}
                                onChange={onSelectedAreaChangeHandler}
                                name={"areaOfInterestId"}
                                defaultValue={props.entity.areaOfInterest !== null && props.entity.areaOfInterest !== undefined ? {
                                    value: props.entity.areaOfInterest.id,
                                    label: props.entity.areaOfInterest.nameMk,
                                    name: "areaOfInterestId"
                                } : ""}
                            />
                        </div>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    )
}

export default EditFeedback;
