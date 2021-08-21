import React from "react";
import style from './InfoPopup.module.css'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

class InfoPopup extends React.Component {
    componentDidMount() {
        setTimeout(this.props.closeInfoDiv, 12000)
    }

    render() {
        return (
            <div className={style.containerInfo} style={{backgroundColor: '#17a2b8'}}>
                <ErrorOutlineIcon className={style.errIcon}/>
                <center><p>{this.props.infoMessage}</p></center>
            </div>
        )
    }
}

export default InfoPopup;