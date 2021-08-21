import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import {Col, Row} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import {strings} from "../../Localization/Localization";

const EditPublicDocumentType = (props) => {
    strings.setLanguage(localStorage.getItem("activeLanguage"));


    return (
        <Row>
            <Col>
                <label className="mb-2">{strings.publicDocType}:</label>

                <form onSubmit={props.onSubmit}>

                        <textarea
                            className="mb-5"
                            style={{height: "10em", width: "430px"}}
                            name="name"
                            required
                            value={props.entity.name}
                            onChange={props.handleChange}/>
                </form>
            </Col>
        </Row>
    );
};
export default EditPublicDocumentType;