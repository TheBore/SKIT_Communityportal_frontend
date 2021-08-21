import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Aux from '../../hoc/AuxWrapper';
import {strings} from "../../Localization/Localization";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Css/Activation.css'
import {toast} from "react-toastify";


const Activation = props => {

    const [show, setShow] = useState(false);

    const handleActivation = () => {
        props.handleActivationUser().then(() => {
            setShow(false);
            toast.success(strings.activatedUser);
        }).catch(() => {
            toast.error(strings.deactivatedUser);
        })
    }

    return (
        <Aux>
            <Button className={"btn btn-outline-success btn-sm ml-2 userActivationButton"}
                    onClick={() => setShow(true)}><FontAwesomeIcon icon={faCheck} size="lg"
                                                                   style={{paddingRight: '4px'}}/>{strings.activate}</Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{strings.activateUser}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"container"}>
                        {props.prompt}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>{strings.cancel}</Button>
                    <Button className="btn btn-success" type="submit" onClick={handleActivation}>{strings.activate}</Button>
                </Modal.Footer>
            </Modal>
        </Aux>
    );
}


export default Activation;
