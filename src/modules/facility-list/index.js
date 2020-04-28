/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import { Header, Content } from 'components/layout';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';

import FacilityTable from './facility-table';
import FacilityAPI from 'api/facility';
import FacilityListFilters from './facility-list-filters';

import { Button, notification } from 'antd';

export default function FacilityList(props) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const location = useLocation();
  const filterConfig = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [data, setData] = useState([]);
  const reqRef = useRef();
  const history = useHistory();

  useEffect(() => {
    setPage(0);
  }, [JSON.stringify(filterConfig)]);

  useEffect(() => {
    setLoading(true);
    reqRef.current && reqRef.current.abort();
    const req = FacilityAPI.getFacilityList(page+1, filterConfig);
    reqRef.current = req;
    req
      .then(
        res => {
          console.log(res);
          setData(res.body.data);
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

  const goToFacilityAdd = () => {
    history.push('/facility/add');
  };

  return (
    <>
      <Header fixed>
        <div className='full-height d--f ai--c jc--fe'>
          <Button size='large' onClick={goToFacilityAdd} type='primary'>
            + ADD NEW
          </Button>
        </div>
      </Header>
      <Content>
        <FacilityListFilters />
        <FacilityTable data={data} loading={loading} />
      </Content>
    </>
  );
}
