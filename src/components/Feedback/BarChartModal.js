import React from "react";
import {Button, Modal} from "react-bootstrap";
import Aux from '../../hoc/AuxWrapper';
import {strings} from "../../Localization/Localization";

const BarChartModal = props => {

    strings.setLanguage(localStorage.getItem("activeLanguage"));

    let lang = localStorage.getItem('activeLanguage')
    let localizedProp = (item, name) => {
        name = name || 'name';

        if (lang === "mk") {
            return item[name + 'Mk'];
        }
        if (lang === "en") {
            return item[name + 'En'];
        }
        if (lang === "al") {
            return item[name + 'Al'];
        }

    }
    return (
        <Aux>
            <Modal show={props.show} onHide={props.setFalseShow}>
                <Modal.Header closeButton>
                    <Modal.Title>{strings.AnalyseFeedbackModalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"container"}>
                        {props.institutions.map(item=>{
                            return(
                                <div key={item.id}>{localizedProp(item)}</div>
                            )
                        })}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary defaultBtn " onClick={props.setFalseShow}>{strings.cancel}</Button>
                </Modal.Footer>
            </Modal>
        </Aux>
    );
}


export default BarChartModal;
