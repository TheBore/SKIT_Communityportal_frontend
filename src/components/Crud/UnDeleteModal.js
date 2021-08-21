import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Aux from '../../hoc/AuxWrapper';
import {strings} from "../../Localization/Localization";
import {faShare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const UnDeleteModal = props => {

    strings.setLanguage(localStorage.getItem("activeLanguage"));

    const [show, setShow] = useState(false);

    const handleDelete = () => {
        props.doDelete().then(() => {
            setShow(false);
        });
    }

    return (
        <Aux>
            <Button className={"btn btn-success " + props.btnClass}
                    onClick={() => setShow(true)}><FontAwesomeIcon icon={faShare} size="lg"
                                                                   style={{paddingRight: '4px'}}/>{props.showText ? strings.publish : null}
            </Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{strings.shareAgain}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"container"}>
                        {props.prompt}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>{strings.cancel}</Button>
                    <Button className="btn btn-success" type="submit"
                            onClick={handleDelete}>{strings.shareAgain}</Button>
                </Modal.Footer>
            </Modal>
        </Aux>
    );
}


export default UnDeleteModal;
