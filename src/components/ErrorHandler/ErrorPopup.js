import React from "react";
import style from './ErrorPopup.module.css'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

class ErrorPopup extends React.Component {
    componentDidMount() {
        setTimeout(this.props.closeErrDiv, 6000)
    }

    render() {
        return (
            <div className={style.container+" "+ this.props.style}>
                <ErrorOutlineIcon className={style.errIcon}/>
                <center><p>{this.props.errorMessage}</p></center>
            </div>
        )
    }
}

export default ErrorPopup;