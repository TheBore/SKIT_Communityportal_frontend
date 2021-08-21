import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../assets/css/theme/base.css'
import {strings} from "../../Localization/Localization";
import './Nav.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUser, faBars} from "@fortawesome/free-solid-svg-icons";

class Nav extends Component {


    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        this.setState({});
    }

    state = {
        userEmail: localStorage.getItem('username'),
        userRole: localStorage.getItem('role'),
        menuShown: false,
        active: 'Dashboard',
        areas: localStorage.getItem('areas').split(",")
    };


    onSetLanguageToMacedonian = () => {
        strings.setLanguage('mk');

        localStorage.setItem("activeLanguage", "mk")

        this.setState({});
        window.location.reload();
    };

    onSetLanguageToAlbanian = () => {
        strings.setLanguage('al');

        localStorage.setItem("activeLanguage", "al")

        this.setState({});
        window.location.reload();
    };

    onSetLanguageToEnglish = () => {
        strings.setLanguage('en');

        localStorage.setItem("activeLanguage", "en")

        this.setState({});
        window.location.reload();
    };

    collapseSidebar = () => {
        return this.props.openSidebarFunction()
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar navbar-light bg-white">
                    <button type="button" className="navbar-toggler" data-toggle="collapse"
                            data-target="#navbarCollapse1">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse1">

                        <div className="navbar-nav mr-auto" style={{verticalAlign: "middle"}}>
                            <div style={{fontSize: "200%",marginTop: "5px"}}>
                                <button className="btn btn-lg" onClick={this.collapseSidebar}>
                                    <FontAwesomeIcon icon={faBars} color={"black"}/>
                                </button>
                            </div>

                            <div className="ml-3 mt-2">

                            </div>
                        </div>
                        <div className="navbar-nav">

                            <button type="button" className="btn btn-link p-0 text-dark"
                                    onClick={this.onSetLanguageToMacedonian}> MK
                            </button>
                            <div style={{borderLeft: "1.2px solid black", margin: "8px"}}>

                            </div>

                            <button type="button" className="btn btn-link p-0 text-dark"
                                    onClick={this.onSetLanguageToAlbanian}> AL
                            </button>
                            <div style={{borderLeft: "1.2px solid black", margin: "8px"}}>

                            </div>

                       {/*     <button type="button" className="btn btn-link p-0 text-dark"
                                    onClick={this.onSetLanguageToEnglish}> EN &nbsp;
                            </button>*/}

                            <div className="navbar-nav">
                            <span>

                                <div className='dropdown ml-2'>
                                    <button className="btn dropdown-toggle" type="button"
                                            data-toggle="dropdown"
                                            style={{color: "black", background: "pink !important", border: "0"}}>
                                        <FontAwesomeIcon icon={faUser} size="lg" className="mr-2"/>
                                        {this.state.userEmail}
                                    </button>

                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li className='dropdown-header'
                                            style={{fontFamily: 'sans-serif'}}
                                        >{strings.logged}: {localStorage.getItem('email')}
                                        </li>

                                        <ul className="">
                                            <span className="ml-2">
                                                {strings.yourAreas}
                                            </span>
                                            {this.state.areas.map((item,index) => {
                                                return <li key={index}
                                                           className='dropdown-header'
                                                           style={{fontFamily: 'sans-serif'}}>
                                                        &nbsp; - {item}
                                                        </li>
                                            })}
                                        </ul>


                                        <br/>

                                        <li style={{marginLeft:"15px"}}><FontAwesomeIcon icon={faLock} size="lg"/><Link to="/changePassword" style={{marginLeft:"0px",color:"black"}} className='profile-dropdown-link text-center'> {strings.changePassword}</Link></li>
                                        <hr/>
                                        <li style={{marginLeft:"5px"}}><a href="/logout" style={{color:"black"}} className='profile-dropdown-link ml-0 pl-0'> <img className="img-icon ml-0"
                                                                                                                                           src={require(`../../assets/images/dashboard_icons/icons8-sign-out-50.png`)}
                                                                                                                                           alt=""/>{strings.logout}</a></li>
                                    </ul>
                                </div>
                             </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>


        );
    }
}

export default Nav;