import React, {Component} from 'react';
import axios from "../../axios/app";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {strings} from "../../Localization/Localization";

class ChangePassword extends Component {

    state = {
        invalidPass:null,
        psmatch: null,
        password:"",
        newpassword:"",
        repeatPassword:""
    };
    handlePassword=(e)=>{
      this.setState({password:e.target.value})
    };
    handleNewPassword=(e)=>{
        this.setState({newpassword:e.target.value})
    };
    handleRepeatPassword=(e)=>{
        this.setState({repeatPassword:e.target.value})
    };
    changePassword = () => {
        if (this.state.newpassword === this.state.repeatPassword) {
            const form = new FormData();
            form.append('oldpassword',this.state.password);
            form.append('newpassword',this.state.newpassword);
            form.append('repeatPassword', this.state.repeatPassword);
            axios.post('/rest/user/changePassword', form).then(response => {
                toast.success(strings.successfullyChangedPassword)
                this.props.history.push("/");
            }).catch(err => {
                this.setState({invalidPass:err.response.data})
                toast.error(strings.failedToChangePassword)
            });
        } else {
            this.setState({
                psmatch: "Passwords don't match"
            });
            document.getElementById('password').value = "";
            document.getElementById('changepassword').value = "";
            document.getElementById('repeatpassword').value = "";
        }
    };

    render() {
        return (
            <div>
                <h2 className="mt-5 mb-5 text-center">{strings.changePassword}</h2>
                <div className="container mt-10" style={{width: "700px"}}>
                    <div className='row'>
                        <div className="col-sm-2 col-lg-2 col-md-2 mr-2">
                            <label htmlFor="password">{strings.password}: </label>
                        </div>
                        <div className="col-sm-9 col-md-9 col-lg-9 mb-4">
                            <input name="password" id="password" type="password"
                                   className="form-control" onChange={(e)=>this.handlePassword(e)} required/>
                        </div>
                    </div>
                        <div className='row'>
                            <div className="col-sm-2 col-lg-2 col-md-2 mr-2">
                                <label htmlFor="changepassword">{strings.newPassword}: </label>
                            </div>
                            <div className="col-sm-9 col-md-9 col-lg-9 mb-4">
                                <input name="changepassword" id="changepassword" type="password"
                                       className="form-control" onChange={(e)=>this.handleNewPassword(e)} required/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-sm-2 col-lg-2 col-md-2 mr-2">
                                <label htmlFor="repeatpassword">{strings.repeatPassword}: </label>
                            </div>
                            <div className="col-sm-9 col-md-9 col-lg-9 mb-4">
                                <input name="repeatpassword" id="repeatpassword" type="password"
                                       className="form-control" onChange={(e)=>this.handleRepeatPassword(e)} required/>
                            </div>
                            {this.state.psmatch == null ? null : <div style={{width: "700px"}} className="text-center alert alert-danger error-msg">{this.state.psmatch}</div>}
                            {this.state.invalidPass == null ? null : <div style={{width: "700px"}} className="text-center alert alert-danger error-msg">{this.state.invalidPass}</div>}
                        </div>
                        <div className="row">
                            <div>
                                <button className="btn btn-dark" style={{zIndex: "100"}} type="submit"
                                        onClick={this.changePassword}>{strings.change}
                                </button>
                            </div>
                            <div className="col-lg-11 col-md-11 col-sm-11"/>
                        </div>
                </div>

            </div>
        );
    }

}

export default ChangePassword