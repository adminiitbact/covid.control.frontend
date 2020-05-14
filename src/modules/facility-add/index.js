import React, { useRef, useState, useEffect } from 'react';
import { Header, Content } from 'components/layout';
import FacilityAddForm from './facility-add-form';
import FacilityAPI from 'api/facility';

import { Button, notification } from 'antd';

export default function FacilityAdd(props) {
  const [loading, setLoading] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
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
    const req = FacilityAPI.create(values);
    reqRef.current = req;
    req
      .then(res => {
        notification.success({
          message: 'Facility',
          description: 'Facility has been added'
        });
        actions.setSubmitting(false);
        setLoading(false);
        actions.resetForm();
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

  const formStateCallBack = opts => {
    if (opts.isValid && opts.dirty) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  };

  console.log(isValidForm);

  return (
    <>
      <Header fixed>
        <div className='full-height d--f ai--c'>
          <div className='heading'>Add New Facility</div>
          <div className='ml-auto'>
            <Button
              loading={loading}
              size='large'
              onClick={submitForm}
              // disabled={}
              type='primary'
              className={!isValidForm ? 'disabled' : ''}
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </Header>
      <Content>
        <FacilityAddForm
          innerRef={formRef}
          onSubmit={onSubmit}
          formStateCallBack={formStateCallBack}
        />
      </Content>
    </>
  );
}
