import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Aux from '../../hoc/AuxWrapper';
import {strings} from "../../Localization/Localization";

const DeleteMeeting = props => {

    strings.setLanguage(localStorage.getItem("activeLanguage"));

    const [show, setShow] = useState(false);

    const handleDelete = () => {
        props.doDelete().then(() => {
            setShow(false);
        });
    }

    return (
        <Aux>
            <Button className={"btn btn-danger closeButton mb-2 ml-2 " + props.btnClass}
                    onClick={() => setShow(true)}>
                {props.showText ? strings.closeMeeting : null}
            </Button>
            <Modal contentClassName="delete-modal"
                   show={show}
                   onHide={() => setShow(false)}>

                <Modal.Header closeButton>
                    <Modal.Title>
                        {strings.closeMeeting}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className={"container"}>
                        {props.prompt}
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary"
                            onClick={() => setShow(false)}>
                        {strings.cancel}
                    </Button>
                    <Button className="btn btn-danger"
                            type="submit"
                            onClick={handleDelete}>
                        {strings.close}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Aux>
    );
}


export default DeleteMeeting;
