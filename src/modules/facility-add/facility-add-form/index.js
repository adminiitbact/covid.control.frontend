import React from 'react';

import { Row, Col } from 'antd';
import * as Yup from 'yup';

import { Formik } from 'formik';
import { Form, Input, Select } from 'formik-antd';
import ErrorFocus from 'components/error-focus';

import './facility-add-form.scss';

const zoneReg = /^[0-9]+$/;
const phoneRegExp = /^[0-9]+$/;
const emailRegExp = /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const mobRegExp = /^[1-9][0-9]{9}$/;

const FacilityFormSchema = Yup.object().shape({
  name: Yup.string().required('Please enter a name for the facility'),
  area: Yup.string().required('Please enter the locality'),
  address: Yup.string().required('Please enter the address'),
  jurisdiction: Yup.string(),
  zone_number: Yup.string()
    .required('Please enter the zone number')
    .matches(zoneReg, 'please enter a valid zone number'),
  facility_status: Yup.string().required('Please select the status'),
  ownership: Yup.string().required('Please select the ownsership'),
  phase_1: Yup.string().required('Please fill the phase number'),
  phase_2: Yup.string().required('Please fill the phase avaibility'),
  organisation_telephone_number: Yup.string()
    .required('Please enter the phone number')
    .matches(phoneRegExp, 'please enter a valid phone number'),
  organisation_email_id: Yup.string()
    .required('Please enter the email')
    .matches(emailRegExp, 'please enter a valid email address'),
  contact_name: Yup.string().required('Please enter a name for the contact'),
  pre_name: Yup.string().required('Please select'),
  f_name: Yup.string().required('Please enter the first name'),
  l_name: Yup.string().required('Please enter the last name'),
  mobile_number: Yup.string()
    .required('Please enter the phone number')
    .matches(mobRegExp, 'please enter a valid mobile number'),
  email_id: Yup.string()
    .required('Please enter the email')
    .matches(emailRegExp, 'please enter a valid email address')
});

function FacilityAddForm(props) {
  const handleSubmit = (values, actions) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        area: '',
        address: '',
        jurisdiction: 'pmc',
        zone_number: '',
        facility_status: 'unassigned',
        ownership: undefined,
        phase_1: '',
        phase_2: undefined,
        organisation_telephone_number: '',
        organisation_email_id: '',
        pre_name: undefined,
        f_name: '',
        l_name: '',
        mobile_number: '',
        email_id: ''
      }}
      innerRef={props.innerRef}
      validationSchema={FacilityFormSchema}
      onSubmit={handleSubmit}
    >
      <Form layout='vertical' className='facility-form'>
        <div className='form-section'>
          <div className='section-title'>Basic details</div>
          <Form.Item name='name' label='Name of the Facility'>
            <Input
              name='name'
              placeholder=''
              style={{
                width: '100%',
                maxWidth: '570px'
              }}
            />
          </Form.Item>
          <Form.Item name='area' label='Area/Locality'>
            <Input
              name='area'
              placeholder=''
              style={{
                width: '100%',
                maxWidth: '570px'
              }}
            />
          </Form.Item>
          <Form.Item name='address' label='Address'>
            <Input.TextArea
              name='address'
              placeholder=''
              style={{
                width: '100%',
                maxWidth: '570px'
              }}
            />
          </Form.Item>
          <Row
            gutter={16}
            style={{
              width: '100%',
              maxWidth: '586px'
            }}
          >
            <Col span={12}>
              <Form.Item name='jurisdiction' label='Jurisdiction'>
                <Select
                  name='jurisdiction'
                  placeholder=''
                  style={{
                    width: '100%'
                  }}
                >
                  <Select.Option value='pmc'>PMC</Select.Option>
                  <Select.Option value='pcmc'>PCMC</Select.Option>
                  <Select.Option value='dho'>DHO</Select.Option>
                  <Select.Option value='cs'>CS</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='zone_number' label='zone_number'>
                <Input
                  name='zone_number'
                  placeholder=''
                  style={{
                    width: '100%'
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className='form-section'>
          <div className='section-title'>Facility Details</div>
          <Row
            gutter={16}
            style={{
              width: '100%',
              maxWidth: '586px'
            }}
          >
            <Col span={12}>
              <Form.Item name='facility_status' label='Facility Status'>
                <Select
                  name='facility_status'
                  style={{
                    width: '100%'
                  }}
                >
                  <Select.Option value='covid_only'>COVID Only</Select.Option>
                  <Select.Option value='mixed'>Mixed</Select.Option>
                  <Select.Option value='uc'>
                    Under Consideration(UC)
                  </Select.Option>
                  <Select.Option value='non_covid'>Non-COVID</Select.Option>
                  <Select.Option value='unassigned'>Unassigned</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='ownership' label='Ownership'>
                <Select
                  name='ownership'
                  style={{
                    width: '100%'
                  }}
                >
                  <Select.Option value='Government'>Government</Select.Option>
                  <Select.Option value='Private'>Private</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{
              width: '100%',
              maxWidth: '586px'
            }}
          >
            <Col span={12}>
              <Form.Item name='phase_1' label='Phase'>
                <Input
                  name='phase_1'
                  placeholder=''
                  style={{
                    width: '100%'
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='phase_2' label=' '>
                <Select
                  name='phase_2'
                  style={{
                    width: '100%'
                  }}
                >
                  <Select.Option value='available'>Available</Select.Option>
                  <Select.Option value='unavailable'>Unavailable</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className='form-section'>
          <div className='section-title'>Organization details</div>
          <Form.Item
            name='organisation_telephone_number'
            label='Organisation Telephone Number'
          >
            <Input
              name='organisation_telephone_number'
              placeholder=''
              style={{
                width: '100%',
                maxWidth: '570px'
              }}
            />
          </Form.Item>
          <Form.Item name='organisation_email_id' label='Organisation Email ID'>
            <Input
              name='organisation_email_id'
              placeholder=''
              style={{
                width: '100%',
                maxWidth: '570px'
              }}
            />
          </Form.Item>
        </div>
        <div className='form-section'>
          <div className='section-title'>Contact Person Details</div>
          <Row
            gutter={16}
            style={{
              width: '100%',
              maxWidth: '650px'
            }}
          >
            <Col span={4}>
              <Form.Item name='pre_name' label='Name'>
                <Select
                  name='pre_name'
                  style={{
                    width: '100%'
                  }}
                >
                  <Select.Option value='mr'>Mr.</Select.Option>
                  <Select.Option value='mrs'>Mrs.</Select.Option>
                  <Select.Option value='dr'>Dr.</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name='f_name' label=' '>
                <Input
                  name='f_name'
                  placeholder='First name'
                  style={{
                    width: '100%'
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name='l_name' label=' '>
                <Input
                  name='l_name'
                  placeholder='Last name'
                  style={{
                    width: '100%'
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name='mobile_number' label='Mobile Number'>
            <Input
              name='mobile_number'
              placeholder=''
              style={{
                width: '100%',
                maxWidth: '570px'
              }}
            />
          </Form.Item>
          <Form.Item name='email_id' label='Email ID'>
            <Input
              name='email_id'
              placeholder=''
              style={{
                width: '100%',
                maxWidth: '570px'
              }}
            />
          </Form.Item>
        </div>
        <ErrorFocus />
      </Form>
    </Formik>
  );
}

export default FacilityAddForm;
