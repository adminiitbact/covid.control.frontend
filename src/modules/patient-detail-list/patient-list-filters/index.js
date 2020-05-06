import React from 'react';
import { Select } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';

function PatientListFilters() {
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
        {/* <div className='select-container mr1 mb1'>
          <Dropdown overlay={ageMenu}>
            <Button style={{ width: '125px', height: '100%', textAlign: 'left' }}>
              Age <DownOutlined style={{ float: 'right' }} />
            </Button>
          </Dropdown>
        </div> */}
        <div className='select-container mr1 mb1'>
          <Select
            style={{ width: '125px', height: '100%' }}
            allowClear
            placeholder='Severity'
            value={filterConfig.severity}
            onChange={onFilterSelect('severity')}
          >
            <Select.Option value='SEVERE'>Severe</Select.Option>
            <Select.Option value='MODERATE'>Moderate</Select.Option>
            <Select.Option value='MILD'>Mild</Select.Option>
            <Select.Option value='ASYMPTOMATIC'>Asymptomatic</Select.Option>
          </Select>
        </div>
        <div className='select-container mr1 mb1'>
          <Select
            style={{ width: '125px', height: '100%' }}
            allowClear
            placeholder='gender'
            value={filterConfig.gender}
            onChange={onFilterSelect('gender')}
          >
            <Select.Option value='male'>Male</Select.Option>
            <Select.Option value='female'>Female</Select.Option>
            <Select.Option value='other'>Other</Select.Option>
          </Select>
        </div>
        {/* <div className='select-container mr1 mb1'>
          <Select
            mode='multiple'
            style={{ width: '125px', height: '100%' }}
            allowClear
            placeholder='oxy.'
            value={filterConfig.oxy}
            onChange={onFilterSelect('oxy')}
          >
          </Select>
        </div> */}
        {/* <div className='select-container mr1 mb1'>
          <Dropdown overlay={ventMenu}>
            <Button
              style={{ width: '125px', height: '100%', textAlign: 'left' }}
            >
              Vent. <DownOutlined style={{ float: 'right' }} />
            </Button>
          </Dropdown>
        </div> */}
      </div>
    </div>
  );
}

export default PatientListFilters;
