import React from 'react';
import { Button, Menu, Dropdown, Checkbox } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import { DownOutlined } from '@ant-design/icons';

function PatientListFilters() {
  const history = useHistory();
  const location = useLocation();
  const filterConfig = qs.parse(location.search, { ignoreQueryPrefix: true });

  function onFilterSelect(type) {
    console.log(type)
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

  const ageMenu = (
    <Menu>
      <Menu.Item key="1">
        <Checkbox onChange={onFilterSelect('0-19')}>0-19</Checkbox>
      </Menu.Item>
      <Menu.Item key="2">
        <Checkbox>20-39</Checkbox>
      </Menu.Item>
      <Menu.Item key="3">
        <Checkbox>40-59</Checkbox>
      </Menu.Item>
      <Menu.Item key="4">
        <Checkbox>60-79</Checkbox>
      </Menu.Item>
      <Menu.Item key="5">
        <Checkbox>80-99</Checkbox>
      </Menu.Item>
    </Menu>
  );

  const servertyMenu = (
    <Menu>
      <Menu.Item key="1">
        <Checkbox>Severe</Checkbox>
      </Menu.Item>
      <Menu.Item key="2">
        <Checkbox>Moderate</Checkbox>
      </Menu.Item>
      <Menu.Item key="3">
        <Checkbox>Mild</Checkbox>
      </Menu.Item>
      <Menu.Item key="4">
        <Checkbox>Asymptotic</Checkbox>
      </Menu.Item>
    </Menu>
  );

  const genderMenu = (
    <Menu>
      <Menu.Item key="1">
        <Checkbox>Male</Checkbox>
      </Menu.Item>
      <Menu.Item key="2">
        <Checkbox>Female</Checkbox>
      </Menu.Item>
      <Menu.Item key="3">
        <Checkbox>Other</Checkbox>
      </Menu.Item>
    </Menu>
  );

  const oxyMenu = (
    <Menu>
      <Menu.Item key="1">
        <Checkbox>Yes</Checkbox>
      </Menu.Item>
      <Menu.Item key="2">
        <Checkbox>No</Checkbox>
      </Menu.Item>
    </Menu>
  );

  const ventMenu = (
    <Menu>
      <Menu.Item key="1">
        <Checkbox>Yes</Checkbox>
      </Menu.Item>
      <Menu.Item key="2">
        <Checkbox>No</Checkbox>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='d--f fd--r mb2'>
      <div className='title mr2 fs--0 fg--0 fb--a'>Filters:</div>
      <div className='d--f fd--r fw--w fs--1 fg--1 fb--a'>
        <div className='select-container mr1 mb1'>
          <Dropdown overlay={ageMenu}>
            <Button style={{ width: '125px', height: '100%', textAlign: 'left' }}>
              Age <DownOutlined style={{ float: 'right' }} />
            </Button>
          </Dropdown>
        </div>
        <div className='select-container mr1 mb1'>
          <Dropdown overlay={servertyMenu}>
            <Button style={{ width: '125px', height: '100%', textAlign: 'left' }}>
              Severity <DownOutlined style={{ float: 'right' }} />
            </Button>
          </Dropdown>
        </div>
        <div className='select-container mr1 mb1'>
          <Dropdown overlay={genderMenu}>
            <Button style={{ width: '125px', height: '100%', textAlign: 'left' }}>
              Gender <DownOutlined style={{ float: 'right' }} />
            </Button>
          </Dropdown>
        </div>
        <div className='select-container mr1 mb1'>
          <Dropdown overlay={oxyMenu}>
            <Button style={{ width: '125px', height: '100%', textAlign: 'left' }}>
              Oxy. <DownOutlined style={{ float: 'right' }} />
            </Button>
          </Dropdown>
        </div>
        <div className='select-container mr1 mb1'>
          <Dropdown overlay={ventMenu}>
            <Button style={{ width: '125px', height: '100%', textAlign: 'left' }}>
              Vent. <DownOutlined style={{ float: 'right' }} />
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default PatientListFilters;