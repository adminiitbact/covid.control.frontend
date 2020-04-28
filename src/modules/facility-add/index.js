import React, { useRef, useState, useEffect } from 'react';
import { Header, Content } from 'components/layout';
import { useParams } from 'react-router-dom';
import FacilityAddForm from './facility-add-form';
import FacilityAPI from 'api/facility';

import { Button, notification } from 'antd';

export default function FacilityAdd(props) {
  const [loading, setLoading] = useState(false);
  const [facilityObj, setFacilityObj] = useState();
  const params = useParams();
  const isEdit = params && params.facilityId;
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
    let req;
    if (isEdit) {
      req = FacilityAPI.patch(params.facilityId, values);
    } else {
      req = FacilityAPI.create(values);
    }
    reqRef.current = req;
    req
      .then(res => {
        notification.success({
          message: 'Facility',
          description: isEdit
            ? 'Facility has been saved'
            : 'Facility has been added'
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

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      reqRef.current && reqRef.current.abort();
      const req = FacilityAPI.get(params.facilityId);
      reqRef.current = req;
      req
        .then(res => {
          console.log(res.body);
          setFacilityObj(res.body);
          setLoading(false);
        })
        .catch(err => {
          notification.error({
            message: 'Facility',
            description: 'Something went wrong, please try again later'
          });
          setLoading(false);
        });
    }
  }, [isEdit, params.facilityId]);

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
        <FacilityAddForm
          innerRef={formRef}
          onSubmit={onSubmit}
          facility={facilityObj}
        />
      </Content>
    </>
  );
}
