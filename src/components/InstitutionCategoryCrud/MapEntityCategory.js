import React, {Component} from "react";
import MultiSelect from "react-multi-select-component";
import axios from '../../axios/app';
import {strings} from "../../Localization/Localization";


class MapEntity extends Component {

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
            let activeLang=localStorage.getItem('activeLanguage');
            let options = [];
            if (activeLang === 'mk') {
                response.data.map(group => {
                    options.push({label: group.nameMk, value: group.id})
                })
            } else if (activeLang === 'al') {
                response.data.map(group => {
                    options.push({label: group.nameAl, value: group.id})
                })
            } else {
                response.data.map(group => {
                    options.push({label: group.nameEn, value: group.id})
                })
            }
            if (this.state.entityUrl != null) {
                axios.get(this.state.entityUrl.replace("{id}", this.state.entityId)).then(response => {
                    let selected = [];
                    if (activeLang === 'mk') {
                        response.data.map(group => {
                            selected.push({label: group.nameMk, value: group.id})
                        })
                    } else if (activeLang === 'al') {
                        response.data.map(group => {
                            selected.push({label: group.nameAl, value: group.id})
                        })
                    } else {
                        response.data.map(group => {
                            selected.push({label: group.nameEn, value: group.id})
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
        this.setState({
            selected: selectedValues
        }, () => {
            let selectedGroups = [];
            for (let i = 0; i < selectedValues.length; i++) {
                selectedGroups[i] = {id: selectedValues[i].value}
            }
            this.state.onChange(selectedGroups);
        })
    }

    render() {
        return (
            <div>
                {this.state.selected.length > 0 ?
                    <div>
                        {strings.selectedCategories}:
                        <pre>{this.state.selected.map(group => {
                            return <span>{group.label} </span>
                        })}</pre>
                    </div> : ""
                }
                <MultiSelect
                    key={this.state.entityId}
                    options={this.state.options}
                    value={this.state.selected}
                    onChange={e => this.setSelected(e)}
                    labelledBy={"Select Categories"}
                />
            </div>
        );
    }
}

export default MapEntity;