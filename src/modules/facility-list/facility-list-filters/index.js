import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Select } from 'antd';
import qs from 'qs';
import { covidFacilityTypes } from 'app-constants';
import { connect } from 'react-redux';

import './facility-list-filters.scss';

function FacilityListFiltes({ areaList, loadingAreaList }) {
  const history = useHistory();
  const location = useLocation();
  const filterConfig = qs.parse(location.search, { ignoreQueryPrefix: true });

  function onFilterSelect(type) {
    return value => {
      history.push({
        pathname: location.pathname,
        search: qs.stringify(
          Object.assign({}, filterConfig, {
            [type]: value
          })
        )
      });
    };
  }

  return (
    <div className='d--f fd--r mb2'>
      <div className='title mr2 fs--0 fg--0 fb--a'>Filters:</div>
      <div className='d--f fd--r fw--w fs--1 fg--1 fb--a'>
        <div className='select-container mr1 mb1'>
          <Select
            mode='multiple'
            style={{ width: '125px', height: '100%' }}
            allowClear
            placeholder='Type'
            value={filterConfig.covidFacilityType}
            onChange={onFilterSelect('covidFacilityType')}
          >
            {covidFacilityTypes.map(el => (
              <Select.Option value={el.key}>{el.label}</Select.Option>
            ))}
          </Select>
        </div>
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
        <div className='select-container mr1 mb1'>
          <Select
            showSearch
            allowClear
            mode='multiple'
            placeholder='Area'
            value={filterConfig.areas}
            style={{ width: '150px', height: '100%' }}
            loading={loadingAreaList}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={onFilterSelect('areas')}
          >
            {areaList.map(el => (
              <Select.Option key={el.area} value={el.area}>
                {el.area}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}

export default connect(state => ({
  areaList: state.get('dashboardBase').get('areaList'),
  loadingAreaList: state.get('dashboardBase').get('loadingAreaList')
}))(FacilityListFiltes);
