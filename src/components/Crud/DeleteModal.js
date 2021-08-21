import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Aux from '../../hoc/AuxWrapper';
import {strings} from "../../Localization/Localization";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DeleteModal = props => {

    strings.setLanguage(localStorage.getItem("activeLanguage"));

    const [show, setShow] = useState(false);

    const handleDelete = () => {
        props.doDelete().then(() => {
            setShow(false);
        });
    }

    return (
        <Aux>
            <Button className={"btn btn-danger btn-sm " + props.btnClass}
                    onClick={() => setShow(true)}><FontAwesomeIcon icon={faTrashAlt} size="lg" style={{paddingRight:'4px'}} />{props.showText ? strings.remove:null}</Button>
            <Modal contentClassName="delete-modal" show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{strings.remove}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"container"}>
                        {props.prompt}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>{strings.cancel}</Button>
                    <Button className="btn btn-danger" type="submit" onClick={handleDelete}>{strings.remove}</Button>
                </Modal.Footer>
            </Modal>
        </Aux>
    );
}


export default DeleteModal;
