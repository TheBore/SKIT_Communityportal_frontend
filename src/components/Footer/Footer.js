import React, {Component} from "react";


class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {year: new Date().getFullYear()}
    }

    render() {
        return (
            <footer className="page-footer" style={{background: "white"}}>

                <div className="footer-copyright text-center py-3" style={{color: "black"}}>© 2021 Copyright&nbsp;
                    <a target="_blank" rel="noopener noreferrer" href="https://www.dksk.mk/"
                       style={{color: "black"}}><strong></strong></a>
                </div>

            </footer>
        );
    }

}

export default Footer;