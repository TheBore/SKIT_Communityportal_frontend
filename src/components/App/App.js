import React, {Component} from "react";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Home from "./../Home/Home";
import {BrowserRouter as Router, Route} from "react-router-dom";
import UserPage from "../../pages/UserPage";
import HostPage from "../../pages/HostPage";
import RecordingPage from "../../pages/RecordingPage";
import Aux from "./../../hoc/AuxWrapper";
import {AUTH_TOKEN} from "../../shared/utility";
import {Redirect} from "react-router-dom";
import {TermApp} from "../TerminalApp/TermApp";
import '../../assets/css/theme/login-6.css'
import ResetPassword from "../ResetPassword/ResetPassword";

class App extends Component {
    render() {

        let routes = (
            <Router>
                <Route path="/login" component={Login}/>
                <Route path="/reset/password" exact component={ResetPassword}/>
                <Redirect to="/login"/>

            </Router>

        );
        let authToken = localStorage.getItem(AUTH_TOKEN);
        if (authToken && authToken !== '') {
            routes = (
                <Router>
                    <Route path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/shell/:sessionId" component={TermApp}/>
                    <Route path="/users" component={UserPage}/>
                    <Route path="/hosts" component={HostPage}/>
                    <Route path="/recordings" component={RecordingPage}/>
                </Router>
            );
        }

        return (
            <Aux>
                {routes}
            </Aux>
        )
    }
}

export default App;
