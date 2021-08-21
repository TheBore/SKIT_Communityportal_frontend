import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/css/theme/base.css'
import {BrowserRouter} from "react-router-dom";
import Aux from './hoc/AuxWrapper';
import {ToastContainer} from "react-toastify";

ReactDOM.render(
    <Aux>
        <ToastContainer/>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Aux>,
    document.getElementById('root')


);
