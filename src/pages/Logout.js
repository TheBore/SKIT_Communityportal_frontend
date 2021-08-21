import React from 'react';
import {Redirect} from 'react-router-dom';

const logout = (props) => {
    let language = localStorage.getItem("activeLanguage");
    localStorage.clear();
    localStorage.setItem("activeLanguage",language);
    return (
        <Redirect to="/"/>
    );
};

export default logout;