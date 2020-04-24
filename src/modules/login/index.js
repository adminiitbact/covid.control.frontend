import React from 'react';

import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { Button } from 'antd';

import { loginUser } from './login-action';
import * as Yup from 'yup';

import { Formik, Field } from 'formik';
import { Form, Input } from 'formik-antd';

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
    <div>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form layout='vertical' className='login-form'>
          <Form.Item
            name='email'
            label={
              <span>
                Enter Mobile Number <span className='red'>*</span>
              </span>
            }
          >
            <Input
              name='email'
              placeholder='Enter your mobile number'
              style={{
                width: '300px'
              }}
            />
          </Form.Item>
          <Form.Item
            name='password'
            label={
              <span>
                Enter Mobile Number <span className='red'>*</span>
              </span>
            }
          >
            <Input
              name='password'
              placeholder='Enter your mobile number'
              style={{
                width: '300px'
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
                  Login
                </Button>
              )}
            </Field>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  loginUser
})(Login);
