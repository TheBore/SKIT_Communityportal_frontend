import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Aux from '../../hoc/AuxWrapper';
import {strings} from "../../Localization/Localization";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Css/Deactivation.css';


const Deactivation = props => {

    const [show, setShow] = useState(false);

    const handleDeactivation = () => {
        props.handleDeleteUser().then(() => {
            setShow(false);
        });
    }

    return (
        <Aux>
            <Button className={"defaultBtn btn btn-danger btn-sm"}
                    onClick={() => setShow(true)}><FontAwesomeIcon icon={faTrash} size="lg"
                                                                   style={{paddingRight: '4px'}}/>{strings.justDelete}
            </Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{strings.deleteUser}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"container"}>
                        {props.prompt}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>{strings.cancel}</Button>
                    <Button className="btn btn-danger" type="submit"
                            onClick={handleDeactivation}>{strings.justDelete}</Button>
                </Modal.Footer>
            </Modal>
        </Aux>
    );
}


export default Deactivation;
