import React, {Component} from 'react';
import '../../assets/css/theme/login-6.css';
import './Login.css';
import AuthenticationService from "../../repository/service/AuthenticationService";
import {AUTH_TOKEN} from "../../shared/utility";
import Background from '../../assets/images/0-3788_simple-light-blue-background.jpg'
import  {Link,NavLink,Redirect} from "react-router-dom";
import axios from "../../axios/app";
import ErrorPopup from "../ErrorHandler/ErrorPopup";
import {strings} from "../../Localization/Localization";
import {SERVER_ADDRESS} from "../../shared/server-address";


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginError: null,
            role: "",
            errorMsgVisible: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem("activeLanguage") != null) {
            strings.setLanguage(localStorage.getItem("activeLanguage"));
            this.setState({});
        } else {
            localStorage.setItem("activeLanguage", "mk");
            strings.setLanguage(localStorage.getItem("activeLanguage"));
            this.setState({});
        }
    }

    fetchRole() {
        axios.get("/rest/user/userDetails").then((data) => {
            console.log("data", data)
            let newAreasList = [];
            localStorage.setItem('username', data.data[0]);
            localStorage.setItem('role', data.data[1]);
            localStorage.setItem('institutionId', data.data[2]);
            localStorage.setItem('email', data.data[3])
            for (let i=4; i < data.data.length; i++){
                newAreasList.push(data.data[i])
            }
            localStorage.setItem('areas', newAreasList)
            this.props.history.push('/');
        });
    };

    loginHandler(e) {
        e.preventDefault();
        AuthenticationService.loginUser({
            email: this.state.username,
            password: this.state.password
        }).then(response => {
            localStorage.setItem(AUTH_TOKEN, response.data);
            this.clearErrorMessage();
            this.fetchRole();
        }).catch(error => {
            this.setErrorMessage(error.response);
            this.setState({errorMsgVisible: true})
        });
    }

    closeErrorDiv = () => {
        this.setState({errorMsgVisible: false})
    }

    usernameChangeHandler(e) {
        this.setState({
            username: e.target.value
        });
    }

    passwordChangeHandler(e) {
        this.setState({
            password: e.target.value
        });
    }

    clearErrorMessage() {
        this.setState({
            loginError: null
        });
    }

    setErrorMessage(statusCode) {
        if (statusCode.status === 403) {
            this.setState({
                loginError: 'Email or password are incorrect'
            });
        } else {
            this.setState({
                loginError: 'Server temporarily unavailable'
            });
        }
    }

    onSetLanguageToMacedonian = () => {
        strings.setLanguage('mk');

        localStorage.setItem("activeLanguage", "mk")

        this.setState({});
    };

    onSetLanguageToAlbanian = () => {
        strings.setLanguage('al');

        localStorage.setItem("activeLanguage", "al")

        this.setState({});
    };

    onSetLanguageToEnglish = () => {
        strings.setLanguage('en');

        localStorage.setItem("activeLanguage", "en")

        this.setState({});
    };

    render() {

        if (localStorage.getItem('username') !== null){
            return <Redirect to='/'  />
        }
        else {
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
                                                    <h6 className="portalTitle">{strings[process.env.REACT_APP_TITLE]}</h6>
                                                    <br/>
                                                    <h6 className="portalTitle">{strings[process.env.REACT_APP_SUBTITLE]}</h6>
                                                    <br/><br/><br/>
                                                    <h3 className="kt-login__title" style={{color: "black"}}>{strings.login}</h3>
                                                </div>
                                                <div className="kt-login__form">
                                                    <form className="kt-form" onSubmit={(e) => this.loginHandler(e)}>
                                                        <div className="form-group">
                                                            <label htmlFor="inp" className="inp">
                                                                <input type="text"
                                                                       id="email"
                                                                       // placeholder={strings.email}
                                                                       onChange={(e) => this.usernameChangeHandler(e)}
                                                                       name="email" autoComplete="off"/>
                                                                    <span className="label">{strings.email}</span>
                                                                    <span className="focus-bg"></span>
                                                            </label>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="inp" className="inp">
                                                                <input type="password"
                                                                       id="password"
                                                                       onChange={(e) => this.passwordChangeHandler(e)}
                                                                       // placeholder={strings.password}
                                                                       name="password"/>
                                                                <span className="label">{strings.password}</span>
                                                                <span className="focus-bg"></span>
                                                            </label>
                                                        </div>
                                                        <div className="kt-login__extra">
                                                            <label className="kt-checkbox">
                                                                <input type="checkbox"
                                                                       name="remember"/> {strings.rememberme}
                                                                <span></span>
                                                            </label>
                                                            <NavLink to={'/reset/password'}><span
                                                                id="kt_login_forgot">{strings.forgotpassword}</span></NavLink>

                                                        </div>
                                                        <div className="kt-login__actions">
                                                            <button type="submit" id="kt_login_signin_submit"
                                                                    className="btnLogin btn btn-brand btn-pill btn-elevate">{strings.loginButton}
                                                            </button>
                                                        </div>
                                                    </form>
                                                    <div className="d-flex justify-content-center">
                                                        <button type="button" style={{color: "#595d6e"}}
                                                                className="btn btn-link p-0"
                                                                onClick={this.onSetLanguageToMacedonian}>MK |
                                                        </button>
                                                        <button type="button" style={{color: "#595d6e"}}
                                                                className="btn btn-link p-0 ml-1"
                                                                onClick={this.onSetLanguageToAlbanian}>AL
                                                        </button>
                                                       {/* <button type="button" style={{color: "#595d6e"}}
                                                                className="btn btn-link p-0"
                                                                onClick={this.onSetLanguageToEnglish}>EN
                                                        </button>*/}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.state.errorMsgVisible && <ErrorPopup errorMessage={strings.invalidEmailOrPassword}
                                                                           closeErrDiv={this.closeErrorDiv}/>}
                            </div>
                            <div
                                className="kt-grid__item kt-grid__item--fluid kt-grid__item--center kt-grid kt-grid--ver kt-login__content"
                                style={{backgroundImage: "url(" + Background + ")"}}>
                                <div className="kt-login__section">
                                    <div className="kt-login__block">
                                        <div className="kt-login__desc">
                                            <div className="registrationTextDiv">
                                                <h4 className="redText">{strings.mision}</h4>
                                                <p className="registrationText">
                                                    {strings.misionText}
                                                </p>
                                                <br/>
                                                <h4 className="redText">{strings.vision}</h4>
                                                <p className="registrationText">
                                                    {strings.visionText}
                                                </p>
                                            <br/>
                                            <a className="faqLink" href="/FAQ">{strings.faq}</a>
                                            </div>

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
}

export default Login;
