/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Header, Content } from 'components/layout';
import { useLocation, Link, useHistory } from 'react-router-dom';

import qs from 'qs';
import useFacilityListData from 'hooks/use-facility-list-data';

import Search from 'components/search';

import { Button } from 'antd';
import ProfilesTable from './profiles-table';
import ProfileListFilters from './profile-list-filters';

export default function Profiles(props) {
  const location = useLocation();
  const filterConfig = qs.parse(location.search, { ignoreQueryPrefix: true });
  const history = useHistory();

  const [data, loading, paginationData] = useFacilityListData({
    filterConfig: {
      ...filterConfig,
      operatingStatus: true
    }
  });

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
            <Link to='/facility/profiles/linking-issues'>
              <Button type='danger'>Linking Issues</Button>
            </Link>
          </div>
        </div>
      </Header>
      <Content>
        <ProfileListFilters />
        <ProfilesTable
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
