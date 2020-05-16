/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from 'react';
import { Header, Content } from 'components/layout';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import useFacilityListData from 'hooks/use-facility-list-data';

import LinkingIssuesTable from './table';

export default function Profiles(props) {
  const location = useLocation();
  const filterConfig = qs.parse(location.search, { ignoreQueryPrefix: true });
  // eslint-disable-next-line no-unused-vars
  const reqRef = useRef();
  // const history = useHistory();

  const [data, loading, paginationData] = useFacilityListData({
    filterConfig: {
      ...filterConfig,
      hasLinks: false,
      operatingStatus: true
    }
  });

  return (
    <>
      <Header fixed>
        <div className='full-height d--f ai--c jc--fe'></div>
      </Header>
      <Content>
        <LinkingIssuesTable
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
