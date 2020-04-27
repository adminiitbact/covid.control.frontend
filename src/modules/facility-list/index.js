import React, { useRef, useState, useEffect } from 'react';
import { Header, Content } from 'components/layout';
import { useHistory } from 'react-router-dom';

import FacilityList from './facility-list';
import FacilityAPI from 'api/facility';

import { Button, notification } from 'antd';

export default function FacilityAdd(props) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const reqRef = useRef();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    reqRef.current && reqRef.current.abort();
    const req = FacilityAPI.getFacilityList(page);
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
  }, [page]);

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
        {/* <FacilityListFilters /> */}
        <FacilityList data={data} loading={loading} />
      </Content>
    </>
  );
}
