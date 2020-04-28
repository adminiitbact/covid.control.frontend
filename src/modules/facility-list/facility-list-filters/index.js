import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Select } from 'antd';
import qs from 'qs';

import './facility-list-filters.scss';

export default function FacilityListFiltes() {
  const history = useHistory();
  const location = useLocation();
  const filterConfig = qs.parse(location.search, { ignoreQueryPrefix: true });

  function onFilterSelect(type) {
    return value => {
      console.log(
        qs.stringify(
          Object.assign(filterConfig, {
            [type]: value
          })
        )
      );
      history.push({
        pathname: location.pathname,
        search: qs.stringify(filterConfig, {
          [type]: value
        })
      });
    };
  }

  return (
    <div className='d--f fd--r mb2'>
      <div className='title mr2 fs--0 fg--0 fb--a'>Filters:</div>
      <div className='d--f fd--r fw--w fs--1 fg--1 fb--a'>
        {/* <div className='select-container mr1 mb1'>
          <Select
            mode='multiple'
            style={{ width: '125px', height: '100%' }}
            allowClear
            placeholder='Type'
            value={filterConfig.covidFacilityType}
            onChange={onFilterSelect('covidFacilityType')}
          >
            <Select.Option value='DCH'>DCH</Select.Option>
            <Select.Option value='DCHC'>DCHC</Select.Option>
            <Select.Option value='CCC'>CCC</Select.Option>
            <Select.Option value='-'>-</Select.Option>
          </Select>
        </div> */}
        <div className='select-container mr1 mb1'>
          <Select
            mode='multiple'
            style={{ width: '150px' }}
            allowClear
            placeholder='Status'
            value={filterConfig.facilityStatus}
            onChange={onFilterSelect('facilityStatus')}
          >
            <Select.Option value='covid_only'>COVID Only</Select.Option>
            <Select.Option value='mixed'>Mixed</Select.Option>
            <Select.Option value='uc'>Under Consideration(UC)</Select.Option>
            <Select.Option value='non_covid'>Non-COVID</Select.Option>
            <Select.Option value='unassigned'>Unassigned</Select.Option>
          </Select>
        </div>
        <div className='select-container mr1 mb1'>
          <Select
            mode='multiple'
            style={{ width: '150px', height: '100%' }}
            allowClear
            placeholder='jurisdiction'
            value={filterConfig.jurisdictions}
            onChange={onFilterSelect('jurisdictions')}
          >
            <Select.Option value='pmc'>PMC</Select.Option>
            <Select.Option value='pcmc'>PCMC</Select.Option>
            <Select.Option value='dho'>DHO</Select.Option>
            <Select.Option value='cs'>CS</Select.Option>
          </Select>
        </div>
      </div>
    </div>
  );
}
