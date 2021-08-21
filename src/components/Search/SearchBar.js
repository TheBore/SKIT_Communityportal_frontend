import React, {Component} from 'react';
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {strings} from "../../Localization/Localization";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: null,
        }
    }

    handleSearchBar = (e) => {
        this.setState({
            keyword: e.target.value
        });
        this.props.handleSearch(e.target.value);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <InputGroup className="mb-3">
                            <FormControl
                                value={this.state.keyword}
                                name="keyword"
                                disabled={false}
                                placeholder={strings.search}
                                onChange={this.handleSearchBar}
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                            />

                        </InputGroup>
                    </div>
                </div>

            </div>
        );
    }
}

export default SearchBar;