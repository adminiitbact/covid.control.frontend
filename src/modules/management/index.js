import React, { useState } from 'react';
import { Header, Content } from 'components/layout';
import { useLocation } from 'react-router-dom';
import './management.scss';

import ManagementTable from './management-table';
import ManagmentListFilters from './management-list-filters';
import qs from 'qs';
//import ManagementAPI from '../../api/facility';
//import ManagementAPI from 'api/management';
import useFacilityListData from 'hooks/use-facility-list-data';

export default function Management() {
  //const [loading, setLoading] = useState(false);
  //const [hasNext, setHasNext] = useState(true);
  //const [searchVal, setSearchVal] = useState();
  //const [page, setPage] = useState(1);
  const location = useLocation();
  const [filterConfig, setFilterConfig] = useState(qs.parse(location.search, { ignoreQueryPrefix: true }));
  //const [data, setData] = useState([]);
  //const reqRef = useRef();
  //const { Option } = Select;
  console.log('filter config', filterConfig);

  const [data, loading, paginationData] = useFacilityListData({
    filterConfig
  });  

  const searchTable = (value) => {
    setFilterConfig({'name': value});
  }

  return (
    <div>
      <Header fixed>
        <div className='full-height d--f ai--c' style={{ width: '40%' }}>
          
        <ManagmentListFilters searchText={searchTable}/>
        </div>
      </Header>
      <Content>
        {/* <div className='table-view-dropdown'>
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
    </Select></label></div> */}
        <ManagementTable 
          data={data} 
          loading={loading}
          current={paginationData.offset}
          hasNext={paginationData.hasNext}
          hasPrev={paginationData.offset > 0}
          handleNextClick={paginationData.handleNextClick}
          handlePrevClick={paginationData.handlePrevClick}
          limit={paginationData.limit}
          total={paginationData.total}
        />
      </Content>
    </div>
  );
}
