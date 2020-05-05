import React from 'react';
import ExpandedSingleSelect from '../expanded-single-select'

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