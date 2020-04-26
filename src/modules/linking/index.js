import React, { useRef, useState, useEffect } from 'react';
import { Header, Content } from 'components/layout';
import { useHistory } from 'react-router-dom';

import FacilityAPI from 'api/facility';

import { notification } from 'antd';

export default function FacilityAdd(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const reqRef = useRef();
  const history = useHistory();

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

  // console.log(data);

  return (
    <>
      <Header fixed></Header>
      <Content>Linking</Content>
    </>
  );
}
