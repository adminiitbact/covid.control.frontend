import React, { useRef, useState, useEffect } from 'react';
import { Header, Content } from 'components/layout';
import { useParams } from 'react-router-dom';
import FacilityAddForm from './facility-add-form';
import FacilityAPI from 'api/facility';

import { Button, notification } from 'antd';

export default function FacilityAdd(props) {
  const params = useParams();
  const isEdit = params && params.facilityId;
  const [loading, setLoading] = useState(false);
  const [facilityObj, setFacilityObj] = useState();
  const [facilityLoading, setFacilityLoading] = useState(isEdit);

  const formRef = useRef();
  const reqRef = useRef();

  useEffect(() => {
    return () => {
      reqRef.current && reqRef.current.abort();
    };
  }, []);

  useEffect(() => {
    if (isEdit) {
      setFacilityLoading(true);
      reqRef.current && reqRef.current.abort();
      const req = FacilityAPI.get(params.facilityId);
      reqRef.current = req;
      req
        .then(res => {
          setFacilityObj(res.body.data);
          setFacilityLoading(false);
        })
        .catch(err => {
          notification.error({
            message: 'Facility',
            description: 'Something went wrong, please try again later'
          });
          setFacilityLoading(false);
        });
    }
  }, [isEdit, params.facilityId]);

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
          loading={facilityLoading}
        />
      </Content>
    </>
  );
}
