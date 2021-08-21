import React, {useState,useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {Col, Form, Row} from "react-bootstrap";
import DatePicker,{ registerLocale } from "react-datepicker";
import mk from "date-fns/locale/mk";
import "react-datepicker/dist/react-datepicker.css";
import {strings} from "../../Localization/Localization";
import Select from "react-select";
import NapAreaTypeRepository from "../../repository/NapAreaTypeRepository";
import AreaOfInterestRepository from "../../repository/AreaOfInterestRepository";

registerLocale("mk", mk);

const AddFeedback = (props) => {
    strings.setLanguage(localStorage.getItem("activeLanguage"));
    const [startDate, setStartDate] = useState(new Date());
    const [activeLanguage, setActiveLanguage] = useState(localStorage.getItem("activeLanguage"));
    const [areasOfInterest, setAreasOfInterest] = useState([])
    const [listAreas, setListAreas] = useState([])

    const getAreas = () => {
        AreaOfInterestRepository.findAllActive().then(res => {
            setAreasOfInterest(res.data);

            res.data.map(item => {
                listAreas.push({value: item.id, label: item.nameMk, name: "areaOfInterestId"})
            })
        })
    }

    useEffect(() => {
        getAreas();
    }, [])


    const updateDueDate = (v) => {
        setStartDate(v);
        props.handleChange({name: 'dueDate', value: v})
    };

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
                <Form onSubmit={props.onSubmit} className="mt-2">
                    <Form.Group controlId="name">
                        <Form.Label>
                            <small style={{color: "red"}}>*</small>{strings.nameFeedback}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            required
                            onChange={props.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>
                            <small style={{color: "red"}}>*</small>{strings.descShortFeedback}
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            type="text"
                            name="description"
                            required
                            onChange={props.handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            <small style={{color: "red"}}>*</small>{strings.dueDate}
                        </Form.Label>
                        <div>
                            {activeLanguage==="mk" &&
                            <DatePicker
                                locale="mk"
                                id="dueDate"
                                selected={startDate}
                                onChange={updateDueDate}
                                className="form-control"
                                dateFormat="dd MMM yyyy"
                                popperPlacement="top-start"
                            />}
                            {activeLanguage==="al" &&
                            <DatePicker
                                id="dueDate"
                                selected={startDate}
                                onChange={updateDueDate}
                                className="form-control"
                                dateFormat="dd MMM yyyy"
                                popperPlacement="top-start"
                            />}
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
                            />
                        </div>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
};
export default AddFeedback;
