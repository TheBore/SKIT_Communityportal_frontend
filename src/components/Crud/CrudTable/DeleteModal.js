import React from 'react';
import {strings} from "../../../Localization/Localization";


const DeleteModal = (props) => {

    let handleFormSubmit = (e) => {
        e.preventDefault();
        props.submit(props.entity);
        e.target.reset();
        props.close();
    };

    let close = (e) => {
        props.close();
    };

    return (
        <div>
            <div id="investDeleteModal" className="modal modal-open modal-backdrop" role="dialog" style={{
                transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                display: props.show ? 'block' : 'none',
                zIndex: 10000
            }}>

                <div className="modal-dialog">
                    <div className="modal-content delete-modal">
                        <form onSubmit={handleFormSubmit}>
                            <div className="modal-header">
                                <h4 className="modal-title" style={{fontWeight: "600"}}>{strings.delAnn}</h4>
                                <button type="button" className="close" data-dismiss="modal" onClick={close}>
                                    <span aria-hidden="true">&times;</span></button>
                            </div>
                            <div className="modal-body">

                                <div className="row">
                                    <div
                                        className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                                        <label className="weight400 text-upper control-label control-label-xl">
                                            {strings.deleteAnnouncement} </label>
                                    </div>

                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-light btn-xl"
                                        data-dismiss="modal"
                                        onClick={close}>Откажи
                                </button>
                                <button type="submit" className="btn btn-danger btn-xl" data-dismiss="modal">Избриши
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default DeleteModal;