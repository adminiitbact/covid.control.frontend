import React, { useRef } from 'react';
import { Header, Content } from 'components/layout';

import FacilityAddForm from './facility-add-form';

import { Button } from 'antd';

export default function FacilityAdd(props) {
  const formRef = useRef();

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <>
      <Header fixed>
        <div className='full-height d--f ai--c jc--fe'>
          <Button size='large' onClick={submitForm} type='primary'>SUBMIT</Button>
        </div>
      </Header>
      <Content>
        <FacilityAddForm innerRef={formRef} />
      </Content>
    </>
  );
}
