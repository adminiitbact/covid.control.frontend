/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import { Header, Content } from 'components/layout';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import FacilityAPI from 'api/facility';

import { notification } from 'antd';
import ProfilesTable from './profiles-table';

export default function Profiles(props) {
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const filterConfig = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const reqRef = useRef();
  // const history = useHistory();

  useEffect(() => {
    setPage(1);
  }, [JSON.stringify(filterConfig)]);

  useEffect(() => {
    setLoading(true);
    reqRef.current && reqRef.current.abort();
    const req = FacilityAPI.getFacilityList(page, {
      ...filterConfig,
      operatingStatus: true
    });
    reqRef.current = req;
    req
      .then(
        res => {
          if (
            (res.body.data.list && res.body.data.list.length > 0) ||
            page === 1
          ) {
            setData(res.body.data.list);
          } else {
            setPage(page - 1);
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
  }, [page, JSON.stringify(filterConfig)]);

  const handleNextClick = () => {
    setPage(page + 1);
  };

  const handlePrevClick = () => {
    setPage(page - 1);
  };

  return (
    <>
      <Header fixed>
        <div className='full-height d--f ai--c jc--fe'></div>
      </Header>
      <Content>
        <ProfilesTable
          data={data}
          loading={loading}
          current={page}
          hasNext={hasNext}
          hasPrev={page > 1}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </Content>
    </>
  );
}
