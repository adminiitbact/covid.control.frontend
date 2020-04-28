import React from 'react';

import { Row, Col } from 'antd';
import * as Yup from 'yup';

import { Formik } from 'formik';
import { Form, Input, Select } from 'formik-antd';
import ErrorFocus from 'components/error-focus';

import './facility-add-form.scss';

// const zoneReg = /^[0-9]+$/;
const phoneRegExp = /^[0-9]+$/;
const emailRegExp = /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const mobRegExp = /^[1-9][0-9]{9}$/;

function supportBackendTransform(obj) {
  if (!obj) {
    return null;
  }
  let newFacilitySchema = {};
  if (obj.facilityProfile) {
    newFacilitySchema = Object.assign({}, obj.facilityProfile);
  }
  if (obj.contactDetails) {
    const contactDetails = Object.assign({}, obj.contactDetails);
    contactDetails.contactDetails_name = contactDetails.name;
    contactDetails.contactDetails_email_id = contactDetails.email;
    contactDetails.contactDetails_mobile_number = contactDetails.mobile;
    delete contactDetails.name;
    delete contactDetails.email;
    delete contactDetails.mobile;

    newFacilitySchema = Object.assign(newFacilitySchema, contactDetails);
  }
  return newFacilitySchema;
}

const FacilityFormSchema = Yup.object().shape({
  name: Yup.string().required('Please enter a name for the facility'),
  area: Yup.string().required('Please enter the locality'),
  address: Yup.string().required('Please enter the address'),
  jurisdiction: Yup.string().required('Please select the jurisdiction'),
  // zone_number: Yup.string()
  //   .required('Please enter the zone number')
  //   .matches(zoneReg, 'please enter a valid zone number'),
  facilityStatus: Yup.string().required('Please select the status'),
  governmentHospital: Yup.number().required('Please select the ownsership'),
  agreementStatus: Yup.string().required('Please select the agreement status'),
  // phase_1: Yup.string().required('Please fill the phase number'),
  // phase_2: Yup.string().required('Please fill the phase avaibility'),
  telephone: Yup.string()
    .required('Please enter the phone number')
    .matches(phoneRegExp, 'please enter a valid phone number'),
  email: Yup.string()
    .required('Please enter the email')
    .matches(emailRegExp, 'please enter a valid email address'),
  contactDetails_name: Yup.string().required('Please enter the name'),
  contactDetails_mobile_number: Yup.string()
    .required('Please enter the phone number')
    .matches(mobRegExp, 'please enter a valid mobile number'),
  contactDetails_email_id: Yup.string()
    .required('Please enter the email')
    .matches(emailRegExp, 'please enter a valid email address')
});

function FacilityAddForm({ onSubmit, innerRef, facility }) {
  const onFormSubmit = (values, actions) => {
    const newValues = {};
    newValues.facility = Object.assign({}, values);
    newValues.contactDetails = {
      name: values.contactDetails_name,
      email: values.contactDetails_email_id,
      mobile: values.contactDetails_mobile_number
    };
    delete newValues.contactDetails_name;
    delete newValues.contactDetails_email_id;
    delete newValues.contactDetails_mobile_number;
    onSubmit(newValues, actions);
  };

  return (
    <Formik
      initialValues={
        supportBackendTransform(facility) || {
          name: '',
          area: '',
          address: '',
          jurisdiction: 'pmc',
          // zone_number: '',
          facilityStatus: 'unassigned',
          governmentHospital: undefined,
          agreementStatus: undefined,
          // phase_1: '',
          // phase_2: undefined,
          telephone: '',
          email: '',
          contactDetails_name: '',
          contactDetails_mobile_number: '',
          contactDetails_email_id: ''
        }
      }
      innerRef={innerRef}
      validationSchema={FacilityFormSchema}
      onSubmit={onFormSubmit}
    >
      {props => {
        return (
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
                {/* <Col span={12}>
                  <Form.Item name='zone_number' label='zone_number'>
                    <Input
                      name='zone_number'
                      placeholder=''
                      style={{
                        width: '100%'
                      }}
                    />
                  </Form.Item>
                </Col> */}
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
                  <Form.Item name='facilityStatus' label='Facility Status'>
                    <Select
                      name='facilityStatus'
                      style={{
                        width: '100%'
                      }}
                    >
                      <Select.Option value='covid_only'>
                        COVID Only
                      </Select.Option>
                      <Select.Option value='mixed'>Mixed</Select.Option>
                      <Select.Option value='uc'>
                        Under Consideration(UC)
                      </Select.Option>
                      <Select.Option value='non_covid'>Non-COVID</Select.Option>
                      <Select.Option value='unassigned'>
                        Unassigned
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name='governmentHospital' label='Ownership'>
                    <Select
                      name='governmentHospital'
                      style={{
                        width: '100%'
                      }}
                    >
                      <Select.Option value={1}>Government</Select.Option>
                      <Select.Option value={0}>Private</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name='agreementStatus' label='Agreement Status'>
                <Select
                  name='agreementStatus'
                  placeholder=''
                  style={{
                    width: '100%'
                  }}
                >
                  <Select.Option value='signed'>Signed</Select.Option>
                  <Select.Option value='process_initiated'>
                    Process Initiated
                  </Select.Option>
                  <Select.Option value='process_not_initiated'>
                    Process Not Initiated
                  </Select.Option>
                </Select>
              </Form.Item>

              {/* <Row
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
                      <Select.Option value='unavailable'>
                        Unavailable
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row> */}
            </div>
            <div className='form-section'>
              <div className='section-title'>Organization details</div>
              <Form.Item name='telephone' label='Organisation Telephone Number'>
                <Input
                  name='telephone'
                  placeholder=''
                  style={{
                    width: '100%',
                    maxWidth: '570px'
                  }}
                />
              </Form.Item>
              <Form.Item name='email' label='Organisation Email ID'>
                <Input
                  name='email'
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
              <Form.Item name='contactDetails_name' label='Name'>
                <Input
                  name='contactDetails_name'
                  placeholder='Full name'
                  style={{
                    width: '100%',
                    maxWidth: '570px'
                  }}
                />
              </Form.Item>
              <Form.Item
                name='contactDetails_mobile_number'
                label='Mobile Number'
              >
                <Input
                  name='contactDetails_mobile_number'
                  placeholder=''
                  style={{
                    width: '100%',
                    maxWidth: '570px'
                  }}
                />
              </Form.Item>
              <Form.Item name='contactDetails_email_id' label='Email ID'>
                <Input
                  name='contactDetails_email_id'
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
        );
      }}
    </Formik>
  );
}

export default FacilityAddForm;
