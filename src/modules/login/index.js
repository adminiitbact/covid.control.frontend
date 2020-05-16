import React from 'react';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { loginUser } from './login-action';
import * as Yup from 'yup';

import { Formik, Field } from 'formik';
import { Form, Input } from 'formik-antd';
import loginImg from 'assets/img/login.png';
import Logo from 'components/logo';
import './login.scss';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email'),
  password: Yup.string().required('Please provide a valid password')
});

function Login(props) {
  const history = useHistory();

  const handleSubmit = (values, actions) => {
    const { email, password } = values;
    props.loginUser(
      email,
      password,
      user => {
        actions.setSubmitting(false);
        history.push('/');
      },
      err => {
        actions.setSubmitting(false);
      }
    );
  };

  return (
    <>
      <div class='loginPageForm'>
        <div class='loginOverlay'></div>
        <div class='loginControls'>
        <div className='message'>
            <div>Manage.   Control.   Save. </div>           
          </div>
        <div className=' pb-3 welcome'>Welcome!</div>
        <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            <Form layout='vertical' className='login-form'>
              <Form.Item name='email'>
                <Input
                  name='email'
                  placeholder='Email'
                 
                />
              </Form.Item>
              <Form.Item name='password'>
                <Input.Password
                  name='password'
                  placeholder='Password'
                 
                />
              </Form.Item>
              <div className='action-items'>
                <Field>
                  {({ form: { isSubmitting, isValid } }) => (
                    <Button
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      type='primary'
                      block
                      htmlType='submit'
                    >
                      LOGIN
                    </Button>
                  )}
                </Field>
              </div>
            </Form>
          </Formik>
        </div>
      

      </div>
      
      <div className='d--f fd--r ai--s full-height'>
      <div className='d--f fd--c jc--sb fg--1 fs--1 fb--a left pl4 pb4'>
        <Logo size='large' />
        <div className='img'>
          <img src={loginImg} alt='login art' />
          <div className='message'>
            <div>Manage .</div>
            <div className='py1'>Control .</div>
            <div>Save .</div>
          </div>
        </div>
      </div>
      <div className='d--f ai--c jc--c px3 right'>
        <div>
          <div className='pb4 welcome'>Welcome!</div>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            <Form layout='vertical' className='login-form'>
              <Form.Item name='email'>
                <Input
                  name='email'
                  placeholder='Email'
                  style={{
                    width: '460px'
                  }}
                />
              </Form.Item>
              <Form.Item name='password'>
                <Input.Password
                  name='password'
                  placeholder='Password'
                  style={{
                    width: '460px'
                  }}
                />
              </Form.Item>
              <div className='action-items'>
                <Field>
                  {({ form: { isSubmitting, isValid } }) => (
                    <Button
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      type='primary'
                      block
                      htmlType='submit'
                    >
                      LOGIN
                    </Button>
                  )}
                </Field>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
    </>
    
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  loginUser
})(Login);
