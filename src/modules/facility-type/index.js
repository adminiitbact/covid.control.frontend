import React from 'react';
import './facility-type.scss';

class ExpandedSingleSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: this.props.options,
            selected: this.props.selected,
        }
        console.log(this.state.selected)
    }

    onHandleSelect = (value) => {
        console.log('value is : ', value)
        this.setState(state =>
            state.selected = value
        )
        console.log('selected : ', this.state.selected)
    }

    render() {
        const sel = this.state.selected;
        return (
            <div className="d--f mb2">
                {this.state.options.map(o => (
                    <div>{sel.key === o.key ?
                        <div className="type-item selected" key={o.key} onClick={() => this.onHandleSelect(o)}><h3>{o.label}</h3></div> :
                        <div className="type-item" key={o.key} onClick={() => this.onHandleSelect(o)}><h3>{o.label}</h3></div>}
                    </div>
                ))}
            </div>
        )
    }
}

export default class facilityType extends React.Component {
    state = {
        options: [
            {
                key: 'ccc',
                label: 'CCC'
            },
            {
                key: 'dchc',
                label: 'DCHC'
            },
            {
                key: 'dch',
                label: 'DCH'
            },
            {
                key: 'unassigned',
                label: 'Unassigned'
            }
        ],
        selected: {
            key: 'ccc',
            label: 'CCC'
        }
    }

    render() {
        return (
            <ExpandedSingleSelect
                options={this.state.options}
                selected={this.state.selected}
            />
        )
    }
}