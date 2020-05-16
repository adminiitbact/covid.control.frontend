/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Header, Content } from 'components/layout';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import { Button } from 'antd';

import Search from 'components/search';
import useFacilityListData from 'hooks/use-facility-list-data';

import FacilityTable from './facility-table';
import FacilityListFilters from './facility-list-filters';

export default function FacilityList(props) {
  const location = useLocation();
  const filterConfig = qs.parse(location.search, { ignoreQueryPrefix: true });

  const [data, loading, paginationData] = useFacilityListData({
    filterConfig
  });

  const history = useHistory();

  const goToFacilityAdd = () => {
    history.push('/facility/add');
  };

  const handleSearch = value => {
    history.push({
      pathname: location.pathname,
      search: qs.stringify(
        Object.assign({}, filterConfig, {
          name: value
        })
      )
    });
  };
  
  return (
    <>
      <Header fixed>
        <div className='full-height d--f ai--c'>
          <Search
            style={{
              width: '300px'
            }}
            value={filterConfig.name}
            onChange={handleSearch}
          />
          <div className='ml-auto'>
            <Button size='large' onClick={goToFacilityAdd} type='primary'>
              + ADD NEW
            </Button>
          </div>
        </div>
      </Header>
      <Content>
        <FacilityListFilters />
        <FacilityTable
          data={data}
          loading={loading}
          current={paginationData.offset}
          limit={paginationData.limit}
          total={paginationData.total}
          hasNext={paginationData.hasNext}
          hasPrev={paginationData.offset > 0}
          handleNextClick={paginationData.handleNextClick}
          handlePrevClick={paginationData.handlePrevClick}
        />
      </Content>
    </>
  );
}
