import React, { useRef, useState, useEffect } from 'react';
import { Header, Content } from 'components/layout';
// import { useHistory } from 'react-router-dom';

import FacilityList from './facility-list';
import FacilityAPI from 'api/facility';

import { Button, notification, Row } from 'antd';

export default function FacilityLinking(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filterLinkVal, setFilterLinkVal] = useState('');
  const reqRef = useRef();
  // const history = useHistory();

  useEffect(() => {
    setLoading(true);
    reqRef.current && reqRef.current.abort();
    const req = FacilityAPI.getFacilityList();
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
  }, []);

  const filterLink = val => {
    setFilterLinkVal(val);
  };

  // console.log(data);
  const filterData = () => {
    const filteredData = [];
    data.forEach(datum => {
      if (datum.link.includes(filterLinkVal)) {
        filteredData.push(datum);
      }
    });
    return filteredData;
  };
  return (
    <>
      <Header fixed></Header>
      <Content>
        <Row>
          FILTER:
          <Button size='large' onClick={() => filterLink('')} type='primary'>
            All Link Issues
          </Button>
          <Button
            size='large'
            onClick={() => filterLink('No Link')}
            type='primary'
          >
            No Link
          </Button>
          <Button
            size='large'
            onClick={() => filterLink('Link Full')}
            type='primary'
          >
            Link Full
          </Button>
        </Row>
        <FacilityList data={filterData()} loading={loading} />
      </Content>
    </>
  );
}
