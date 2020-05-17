import React, { useRef, useState, useEffect } from 'react';
import { Header, Content } from 'components/layout';
import { useLocation } from 'react-router-dom';
import { Select } from 'antd';
import { notification } from 'antd';
import './management.scss';

import ManagementTable from './management-table';
import ManagmentListFilters from './management-list-filters';
import qs from 'qs';
import ManagementAPI from '../../api/facility';
//import ManagementAPI from 'api/management';

export default function Management() {
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [searchVal, setSearchVal] = useState();
  const [page, setPage] = useState(1);
  const location = useLocation();
  const filterConfig = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [data, setData] = useState([]);
  const reqRef = useRef();
  const { Option } = Select;

  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[JSON.stringify(filterConfig)]);

  useEffect(() => {
    setLoading(true);
    reqRef.current && reqRef.current.abort();
    const req = ManagementAPI.getFacilityListNew(0, 500, filterConfig);
    reqRef.current = req;
    req
      .then(
        res => {
          if (
            (res.body.data.page.elements && res.body.data.page.elements.length > 0) ||
            page === 1
          ) {
            setData(res.body.data.page.elements);
          } else {
            setHasNext(false);
          }
          setLoading(false);
        },
        err => {
          setData([]);
          setLoading(false);
        }
      )
      .catch(err => {
        console.log('Mandar -- '+err);
        notification.error({
          message: 'Facility list',
          description: 'Something went wrong, please try again later'
        });
        setData([]);
        setLoading(false);
      });
    return () => {
      reqRef.current && reqRef.current.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, JSON.stringify(filterConfig)]);

  const handleNextClick = () => {
    setPage(page + 1);
  };

  const handlePrevClick = () => {
    setPage(page - 1);
  };

  const searchTable = (value) => {
    setSearchVal(value);
  }

  return (
    <div>
      <Header fixed>
        <div className='full-height d--f ai--c' style={{ width: '40%' }}>
          {/* <Input size="large" placeholder="Search Name & ID" prefix={<SearchOutlined />} /> */}
          
        <ManagmentListFilters searchText={searchTable}/>
        </div>
      </Header>
      <Content>
        <div className='table-view-dropdown'>
      <label>
  <span>TABLE VIEW </span>
      <Select defaultValue="overview" style={{ width: 200 }}>
      <Option value="overview">Overview</Option>
      <Option value="covidBeds">COVID Beds Overview</Option>
      <Option value="mildCases">Beds for Mild Cases</Option>
      <Option value="moderateCases">Beds for Moderate Cases</Option>
      <Option value="severeCases">Beds for Severe Cases</Option>
      <Option value="hr">Human Resources</Option>
      <Option value="crtFacilities">Critical Facilities</Option>
      <Option value="prepChecklist">Preparedness Checklist</Option>
      <Option value="medSupplies">Medical Supplies</Option>
    </Select></label></div>
        <ManagementTable 
          data={data} 
          pagination={{ position: ['topCenter'] }}
          loading={loading}
          current={page}
          hasNext={hasNext}
          hasPrev={page > 1}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          searchVal={searchVal}
        />
      </Content>
    </div>
  );
}
