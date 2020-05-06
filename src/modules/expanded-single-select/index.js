import React from 'react';
import './expanded-single-select.scss';

export default class ExpandedSingleSelect extends React.Component {
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