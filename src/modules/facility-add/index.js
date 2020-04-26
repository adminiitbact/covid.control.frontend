import React, { useRef, useState, useEffect } from 'react';
import { Header, Content } from 'components/layout';

import FacilityAddForm from './facility-add-form';
import FacilityAPI from 'api/facility';

import { Button, notification } from 'antd';

export default function FacilityAdd(props) {
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const reqRef = useRef();

  useEffect(() => {
    return () => {
      reqRef.current && reqRef.current.abort();
    };
  }, []);

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const onSubmit = (values, actions) => {
    setLoading(true);
    reqRef.current && reqRef.current.abort();
    const req = FacilityAPI.create({
      facility: values
    });
    reqRef.current = req;
    req
      .then(res => {
        notification.success({
          message: 'Facility',
          description: 'Facility has been added'
        });
        actions.setSubmitting(false);
        setLoading(false);
      })
      .catch(err => {
        notification.error({
          message: 'Facility',
          description: 'Something went wrong, please try again later'
        });
        actions.setSubmitting(false);
        setLoading(false);
      });
  };

  return (
    <>
      <Header fixed>
        <div className='full-height d--f ai--c jc--fe'>
          <Button
            loading={loading}
            size='large'
            onClick={submitForm}
            type='primary'
          >
            SUBMIT
          </Button>
        </div>
      </Header>
      <Content>
        <FacilityAddForm innerRef={formRef} onSubmit={onSubmit} />
      </Content>
    </>
  );
}
