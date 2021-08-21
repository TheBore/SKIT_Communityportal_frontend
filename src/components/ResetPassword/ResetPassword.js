import React, {Component} from 'react';
import '../../assets/css/theme/login-6.css'
import Background from '../../assets/images/0-3788_simple-light-blue-background.jpg'
import {NavLink} from "react-router-dom";
import MailService from "../../repository/service/MailService";
import {strings} from "../../Localization/Localization";


class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            msg: "",
        }
    }

    sendRequest = (e) => {
        let email = this.state.email;
        this.setState({
            msg: strings.pleaseWait
        })
        MailService.sendRequest(email).then(resp => {
            alert(strings.resetPassSuccessful);
            this.setState({
                msg: "",
            })
            this.props.history.push("/login");
        }).catch(error => {
            alert(strings.resetPassNotSuccessful);
            this.setState({
                msg: "",
            })
            this.props.history.push("/login");
        });
    };

    updateInput = (e) => {
        e.preventDefault();
        this.setState({
            "email": e.target.value
        });
    };

    goBackToLogin = (path) => {
        this.props.history.push(path);
    };

    render() {
        return (
            <div className="kt-grid kt-grid--ver kt-grid--root kt-page kt-grid-page">
                <div className="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v6 kt-login--signin"
                     id="kt_login">
                    <div
                        className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile">
                        <div
                            className="kt-grid__item  kt-grid__item--order-tablet-and-mobile-2  kt-grid kt-grid--hor kt-login__aside">
                            <div className="kt-login__wrapper">
                                <div className="kt-login__container">
                                    <div className="kt-login__body">
                                        <div className="kt-login__logo">
                                            <a href="https://dksk.mk/" target="_blank" rel="noopener noreferrer">
                                                <img src={require(process.env.REACT_APP_LOGO)}
                                                     className={"img-responsive"} alt=""/>
                                            </a>
                                        </div>
                                        <div className="kt-login__signin">
                                            <div className="kt-login__head">
                                                <h3 className="kt-login__title">{strings.forgottenPassword}</h3>
                                                <div className="kt-login__desc">{strings.enterEmail}
                                                </div>
                                            </div>
                                            <form className="kt-login__form" action="" onSubmit={this.sendRequest}>
                                                <div className="kt-form">
                                                    <div className="form-group">
                                                        <label htmlFor="inp" className="inp">
                                                        <input type="text"
                                                               // placeholder={strings.email}
                                                               name="email" id="kt_email" onChange={this.updateInput}
                                                               autoComplete="off"/>
                                                            <span className="label">{strings.email}</span>
                                                            <span className="focus-bg"></span>
                                                            <h5 style={{color: "#08439D"}}>{this.state.msg}</h5>
                                                        </label>
                                                    </div>
                                                    <div className="kt-login__actions">
                                                        <button id="kt_login_forgot_submit"
                                                                className="btn btn-outline-success btn-brand btn-pill btn-elevate btnSend"
                                                                type="button"
                                                                onClick={this.sendRequest}>{strings.request}
                                                        </button>
                                                        <NavLink id="kt_login_forgot_cancel"
                                                                 className="btn btn-brand btn-outline-danger btn-pill btn-elevate btnClose"
                                                                 to={'/login'}>
                                                            <p className="mt-1">{strings.close}</p></NavLink>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="kt-grid__item kt-grid__item--fluid kt-grid__item--center kt-grid kt-grid--ver kt-login__content"
                            style={{backgroundImage: "url(" + Background + ")"}}>
                            <div className="kt-login__section">
                                <div className="kt-login__block">
                                    <div className="kt-login__desc">
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default ResetPassword;
