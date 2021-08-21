import React, {Component} from 'react';
import './modal.css'
import {strings} from "../../../Localization/Localization";

class AddModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:this.props.entityName,
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
        const AddModalBody = this.props.addModal;

        return (

            <div>
                <div id="investAddModal" className="modal modal-open modal-backdrop" role="dialog" style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    display: this.props.show ? 'block' : 'none'
                }}>
                    <div className="modal-dialog">
                        <div className="modal-content" >
                            <form onSubmit={this.handleFormSubmit} id="add-modal" autoComplete="disabled">
                                <div className="modal-header">
                                    <h4 className="modal-title">
                                        {this.state.isUser && strings.addUser}
                                        {this.state.isModerator && strings.addModerator}
                                        {this.state.isAdmin && strings.addAdmin}
                                        {this.state.isTag && strings.addTag}
                                        {this.state.isInstitution && strings.addInstitution}

                                    </h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.props.close}>
                                        <span aria-hidden="true">&times;</span></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                    <div id={"addModal"}/>
                                    <AddModalBody entityName={this.props.entityName} entity={this.props.entity || {}}
                                                  onChange={(field, value) => this.props.onEntityAddHandler(field, value)}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="col-xs-4 col-md-offset-4">
                                        <button type="button" className="btn btn-secondary btn-block btn-xl"
                                                data-dismiss="modal"
                                                onClick={this.props.close}>{strings.close}
                                        </button>
                                    </div>
                                    <div className="col-xs-4 col-md-offset-4">
                                        <button form="add-modal" type="submit"
                                                className="btn btn-primary btn-block btn-xl"
                                                data-dismiss="modal">{strings.submit}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default AddModal;