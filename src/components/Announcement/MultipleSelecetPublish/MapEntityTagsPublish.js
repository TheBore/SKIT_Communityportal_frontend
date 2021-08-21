import React, {Component} from "react";
import axios from '../../../axios/app';
import {strings} from "../../../Localization/Localization";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";


class MapEntityTagsPublish extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selected: [],
            groupsUrl: props.groupsUrl,
            onChange: props.onChange,
            entityUrl: props.entityUrl,
            entityId: props.entityId
        };
    }

    clearState() {
        this.setState({
            options: [],
            selected: [],
            groupsUrl: this.state.groupsUrl,
            onChange: this.state.onChange,
            entityUrl: this.state.entityUrl,
            entityId: this.state.entityId
        })
    }

    fetchData() {
        axios.get(this.state.groupsUrl).then(response => {
            let activeLang = localStorage.getItem('activeLanguage');

            let options = [];
            if (activeLang === 'mk') {
                response.data.map(group => {
                    options.push({label: group.tagNameMk, value: group.id})
                })
            } else {
                response.data.map(group => {
                    options.push({label: group.tagNameAl, value: group.id})
                })
            }

            if (this.state.entityUrl != null) {
                axios.get(this.state.entityUrl.replace("{id}", this.state.entityId)).then(response => {
                    let selected = [];
                    if (activeLang === 'mk') {
                        response.data.map(group => {
                            selected.push({label: group.tagNameMk, value: group.id})
                        })
                    } else {
                        response.data.map(group => {
                            selected.push({label: group.tagNameAl, value: group.id})
                        })
                    }
                    this.setState({
                        selected: selected
                    })
                })
            }
            this.setState({
                options: options
            })
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.entityId !== this.state.entityId) {
            this.setState({
                entityId: prevProps.entityId
            }, () => {
                this.fetchData();
            })
        }
    }

    setSelected(selectedValues) {
        if (selectedValues != null) {
            this.setState({
                selected: selectedValues
            }, () => {
                let selectedGroups = [];
                for (let i = 0; i < selectedValues.length; i++) {
                    selectedGroups[i] = selectedValues[i].value;
                }
                this.state.onChange(selectedGroups);
            })
        } else {
            this.setState({
                selected: []
            }, () => {
                let selectedGroups = [];
                this.state.onChange(selectedGroups);
            })
        }
    }

    checkboxHandler = () => {
        let checkedCheckBox = document.getElementById("MapEntityTagsPublishCheckbox").checked;

        if (checkedCheckBox) {
            this.setState({
                selected: this.state.options
            }, () => {
                let selectedGroups = [];
                this.state.options.map(option => selectedGroups.push(option.value))
                this.state.onChange(selectedGroups);
            })
        } else {
            this.setState({
                selected: []
            })
        }
    }

    render() {
        const animatedComponents = makeAnimated();
        return (
            <div>
                {/*{this.state.selected.length > 0 ?*/}
                {/*    <div>*/}
                {/*        {strings.selectedTags}:*/}
                {/*        <pre>{this.state.selected.map(group => {*/}
                {/*            return <span>{group.label} </span>*/}
                {/*        })}</pre>*/}
                {/*    </div> : ""*/}
                {/*}*/}
                {/*<MultiSelect*/}
                {/*    key={this.state.entityId}*/}
                {/*    options={this.state.options}*/}
                {/*    value={this.state.selected}*/}
                {/*    onChange={e => this.setSelected(e)}*/}
                {/*    labelledBy={strings.publishToTags}*/}
                {/*/>*/}
                <Select
                    key={this.state.entityId}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isSearchable={true}
                    placeholder={strings.searchForTags}
                    // defaultValue={[colourOptions[4], colourOptions[5]]}
                    isMulti
                    options={this.state.options}
                    value={this.state.selected}
                    onChange={e => this.setSelected(e)}
                    labelledBy={strings.publishToTags}

                />
                <div>
                    <div className="form-check mt-2">
                        <input onChange={this.checkboxHandler} type="checkbox" value="" className="form-check-input"
                               id="MapEntityTagsPublishCheckbox"></input>
                        <label className="form-check-label" htmlFor="exampleCheck1" style={{color: "darkred"}}>Select
                            all</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default MapEntityTagsPublish;