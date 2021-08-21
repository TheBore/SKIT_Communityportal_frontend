import React,{Component} from 'react';
import './modal.css'
import {strings} from "../../../Localization/Localization";

class EditModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUser:this.props.entityName==='User'?true:false,
            isModerator:this.props.entityName==='Moderator'?true:false,
            isAdmin:this.props.entityName==='Admin'?true:false,
            isTag:this.props.entityName==='Tag'?true:false,
            isInstitution:this.props.entityName==='Institution'?true:false
        }
    }

    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.submit();
        e.target.reset();
        this.props.close();
    };

    close = (e) => {
        e.target.form.reset();
        this.props.close();
    };

    render() {
        const EditModalBody = this.props.editModal;
        return (

            <div>
                <div id="investEditModal" className="modal modal-open modal-backdrop" role="dialog" style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    display: this.props.show ? 'block' : 'none'
                }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={this.handleFormSubmit} id="edit-modal">
                                <div className="modal-header">
                                    <h4 className="modal-title">
                                        {this.state.isUser && strings.editUser}
                                        {this.state.isModerator && strings.editModerator}
                                        {this.state.isAdmin && strings.editAdmin}
                                        {this.state.isTag && strings.editTag}
                                        {this.state.isInstitution && strings.editInstitution}
                                    </h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.props.close}>
                                        <span aria-hidden="true">&times;</span></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                    <div id={"editModal"}/>
                                    <EditModalBody entityName={this.props.entityName} entity={this.props.entity || {}}
                                               onChange={(field, value) => this.props.onEntityChangeHandler(field, value)}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                     <div className="col-xs-4 col-md-offset-4">
                                            <button form="edit-modal" type="submit" className="btn btn-success btn-block btn-xl" data-dismiss="modal">{strings.submit}
                                            </button>
                                        </div>
                                        <div className="col-xs-4 col-md-offset-4">
                                            <button type="button" className="btn btn-primary btn-block btn-xl"
                                                    data-dismiss="modal"
                                                    onClick={this.props.close}>{strings.close}
                                            </button>
                                        </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default EditModal;