import React, {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import Aux from '../../hoc/AuxWrapper';
import {strings} from "../../Localization/Localization";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle, faEdit, faLink, faFilePdf, faEnvelope, faSearchPlus, faBan} from "@fortawesome/free-solid-svg-icons";
import "./CrudModal.css"

class CrudModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            entity: {},
            errorMsg: false,
            flag: false,
        }
    }

    handleChange = (e) => {


        const target = e.target || e;
        let update = this.state.entity;
        update[target.name] = target.value;
        this.setState({entity: update});
    }


    componentDidMount() {
        this.setState({
            entity: {...this.props.entity}
        });
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
    }


    handleNullChange = (e) => {
        if (e === null) {
            let update = this.state.entity;
            update["parentCategory"] = null;
            this.setState({entity: update});
        }
    }

    handlePdfChange = (e, file) => {
        const target = e.target || e;
        let update = this.state.entity;
        update[target.name] = file;
        this.setState({entity: update});
    }
    escalateFunction = (name, value) => {
        let update = this.state.entity;
        update[name] = value;
        this.setState({entity: update});
    }


    show = () => {
        this.setState({
            show: true
        });
    }


    close = () => {
        if (this.state.flag) {
            this.setState({
                show: false,
                entity: {}
            });
        }
        else{
            this.setState({
                show: false,
                entity: {...this.props.entity}
            });
        }
        // window.location.reload()
    }

    handleSubmit = (e) => {
        // e.preventDefault();
        // Object.keys(this.state.entity).length === 0 ? this.setState({errorMsg: true}) : this.setState({errorMsg: false});
        // if (this.state.errorMsg === true) {
        //     this.props.onSubmit(this.state.entity).then(() => {
        //         this.close();
        //     });
        // }

        if ( this.props.validations !== undefined ){
            for (let i = 0 ; i < this.props.validations.length; ++i){
                if (this.state.entity[this.props.validations[i]] &&
                    this.state.entity[this.props.validations[i]] !== ''){
                    console.log(this.state.entity[this.props.validations[i]]);
                }
                else {
                    if(this.state.entity[this.props.validations[i]] === undefined ||
                        this.state.entity[this.props.validations[i]] === null ||
                        this.state.entity[this.props.validations[i]] === ""){
                        return;
                    }
                    if(this.props.validations[i] !== "financialImplications" &&
                        this.state.entity[this.props.validations[i]] === false){
                        return;
                    }
                }
            }
        }

        this.props.onSubmit(this.state.entity).then(async () => {
            this.setState({
                entity: {},
                flag: true,
            })
            await this.sleep(2500);
            window.location.reload()
            this.close();
        });

        //window.location.reload();
    }

    onEntityChangeHandler(field, value) {
        let newEntity = this.state.entity;
        newEntity[field] = value;
        this.setState({
            entityToBeEdited: newEntity
        });
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    render() {
        const Body = this.props.body;
        return (
            <Aux>
                <Button className={"btn " + this.props.btnClass}
                        onClick={this.show}>
                    {this.props.icon === "edit" ?
                        <FontAwesomeIcon icon={faEdit} size="lg" style={{paddingRight: '4px'}}/> : null}
                    {this.props.icon === "add" ?
                        <FontAwesomeIcon icon={faPlusCircle} size="lg" style={{paddingRight: '4px'}}/> : null}
                    {this.props.icon === "link" ?
                        <FontAwesomeIcon icon={faLink} size="lg" style={{paddingRight: '4px'}}/> : null}
                    {this.props.icon === "pdf" ? <FontAwesomeIcon icon={faFilePdf} color={"white"} size="lg"
                                                                  style={{paddingRight: '4px'}}/> : null}
                    {this.props.icon === "mail" ? <FontAwesomeIcon icon={faEnvelope} color={"white"} size="lg"
                                                                   style={{paddingRight: '4px'}}/> : null}
                    {this.props.icon === "search" ? <FontAwesomeIcon icon={faSearchPlus} color={this.props.color} size="lg"
                                                                   style={{paddingRight: '4px'}}/> : null}
                    {this.props.icon === "ban" ? <FontAwesomeIcon icon={faBan} color={this.props.color} size="lg"
                                                                     style={{paddingRight: '4px'}}/> : null}
                    <span style={{color: this.props.color}}>{this.props.showText ? this.props.title : null}</span></Button>
                <Modal contentClassName={this.props.contentClass} show={this.state.show} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Body entity={this.state.entity}
                                  handleChange={this.props.title !== strings.uploadPDF ? this.handleChange : this.handlePdfChange}
                                  handleNullChange={this.handleNullChange}
                                  onSubmit={this.handleSubmit}
                                  escalateFunction={this.escalateFunction}
                                  onChange={(field, value) => this.onEntityChangeHandler(field, value)}
                                // error={this.state.errorMsg}/>
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.close}>{strings.close}</Button>
                        {(!this.props.notSubmittable && this.props.modalType !== "close") ?
                            <Button className="btn btn-primary" type="submit" onClick={this.handleSubmit}>
                                {strings.submit}
                            </Button> : ""}
                        {(!this.props.notSubmittable && this.props.modalType === "close") ?
                            <Button className="btn btn-danger" type="submit" onClick={this.handleSubmit}>
                                {strings.submit}
                            </Button> : ""}
                    </Modal.Footer>
                </Modal>
            </Aux>
        )
    }
}

export default CrudModal;
