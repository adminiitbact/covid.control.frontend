import React from 'react';

import { Row, Col, Skeleton } from 'antd';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Form, Input, Select, Switch } from 'formik-antd';
import ErrorFocus from 'components/error-focus';
import { covidFacilityTypes } from 'app-constants';

import './facility-add-form.scss';

// const zoneReg = /^[0-9]+$/;
const phoneRegExp = /^[0-9]+$/;
const emailRegExp = /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const mobRegExp = /^[1-9][0-9]{9}$/;

const defaultFacilityObj = {
  name: '',
  area: null,
  address: '',
  covidFacilityType: null,
  jurisdiction: 'PMC',
  // zone_number: '',
  facilityStatus: null,
  governmentHospital: null,
  agreementStatus: null,
  // phase_1: '',
  // phase_2: undefined,
  telephone: '',
  email: '',
  primary_contact_person_name: '',
  primary_contact_person_mobile: '',
  primary_contact_person_email: '',
  operatingStatus: false
};

function supportBackendTransform(obj) {
  if (!obj) {
    return null;
  }
  let newFacilitySchema = {};
  if (obj.facilityProfile) {
    newFacilitySchema = Object.assign({}, obj.facilityProfile);
  }
  if (obj.facilityProfile && obj.facilityProfile.facilityContact) {
    const contactDetails = Object.assign(
      {},
      obj.facilityProfile.facilityContact.data || {
        primary_contact_person_name: '',
        primary_contact_person_mobile: '',
        primary_contact_person_email: ''
      }
    );
    delete newFacilitySchema.facilityContact;
    newFacilitySchema = Object.assign(newFacilitySchema, contactDetails);
  }
  return Object.assign({}, defaultFacilityObj, newFacilitySchema);
}

const FacilityFormSchema = Yup.object().shape({
  name: Yup.string().required('Please enter a name for the facility'),
  area: Yup.string().required('Please select the locality').nullable(),
  address: Yup.string().required('Please enter the address'),
  covidFacilityType: Yup.string().when(['operatingStatus'], {
    is: operatingStatus => operatingStatus,
    then: Yup.string().required('Please select the facility type').nullable(),
    otherwise: Yup.string().nullable()
  }),
  jurisdiction: Yup.string()
    .required('Please select the jurisdiction')
    .nullable(),
  // zone_number: Yup.string()
  //   .required('Please enter the zone number')
  //   .matches(zoneReg, 'Please enter a valid zone number'),
  facilityStatus: Yup.string().when(['operatingStatus'], {
    is: operatingStatus => operatingStatus,
    then: Yup.string().required('Please select the status').nullable(),
    otherwise: Yup.string().nullable()
  }),
  governmentHospital: Yup.number()
    .required('Please select the ownsership')
    .nullable(),
  agreementStatus: Yup.string().when(['governmentHospital'], {
    is: governmentHospital => !governmentHospital,
    then: Yup.string()
      .required('Please select the agreement status')
      .nullable(),
    otherwise: Yup.string().nullable()
  }),
  // phase_1: Yup.string().required('Please fill the phase number'),
  // phase_2: Yup.string().required('Please fill the phase avaibility'),
  telephone: Yup.string()
    .required('Please enter the phone number')
    .matches(phoneRegExp, 'Please enter a valid phone number'),
  email: Yup.string()
    .required('Please enter the email')
    .matches(emailRegExp, 'Please enter a valid email address'),
  primary_contact_person_name: Yup.string().required('Please enter the name'),
  primary_contact_person_mobile: Yup.string()
    .required('Please enter the phone number')
    .matches(mobRegExp, 'Please enter a valid mobile number'),
  primary_contact_person_email: Yup.string()
    .required('Please enter the email')
    .matches(emailRegExp, 'Please enter a valid email address'),
  operatingStatus: Yup.boolean().required()
});

function FormItemLabel({ label, isRequired }) {
  return (
    <>
      <span>{label}</span>
      {isRequired && <span className='required'>*</span>}
    </>
  );
}

function FacilityAddForm({
  onSubmit,
  innerRef,
  facility,
  loading,
  areaList,
  loadingAreaList,
  formStateCallBack
}) {
  const onFormSubmit = (values, actions) => {
    const newValues = {};
    newValues.facilityProfile = Object.assign({}, values);
    newValues.facilityProfile.facilityContact = {
      data: {
        primary_contact_person_name: values.primary_contact_person_name,
        primary_contact_person_email: values.primary_contact_person_email,
        primary_contact_person_mobile: values.primary_contact_person_mobile
      }
    };
    delete newValues.facilityProfile.primary_contact_person_name;
    delete newValues.facilityProfile.primary_contact_person_email;
    delete newValues.facilityProfile.primary_contact_person_mobile;
    onSubmit(newValues, actions);
  };

  const initVals = facility
    ? supportBackendTransform(facility)
    : defaultFacilityObj;

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Formik
      initialValues={initVals}
      innerRef={innerRef}
      validationSchema={FacilityFormSchema}
      onSubmit={onFormSubmit}
    >
      {props => {
        console.log(props);
        formStateCallBack &&
          formStateCallBack({
            isValid: props.isValid,
            dirty: props.dirty
          });
        return (
          <Form layout='vertical' className='facility-form'>
            <div className='required-field'>Required *</div>
            <div className='form-section'>
              <div className='section-title'>Basic details</div>
              <Form.Item
                name='name'
                label={
                  <FormItemLabel label='Name of the Facility' isRequired />
                }
              >
                <Input
                  name='name'
                  placeholder=''
                  style={{
                    width: '100%',
                    maxWidth: '570px'
                  }}
                />
              </Form.Item>
              <Form.Item
                name='area'
                label={<FormItemLabel label='Area / Locality' isRequired />}
              >
                <Select
                  showSearch
                  name='area'
                  placeholder='Area'
                  style={{
                    width: '100%',
                    maxWidth: '570px'
                  }}
                  loading={loadingAreaList}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {areaList.map(el => (
                    <Select.Option key={el.area} value={el.area}>
                      {el.area}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name='address'
                label={<FormItemLabel label='Address' isRequired />}
              >
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
                  <Form.Item
                    name='jurisdiction'
                    label={<FormItemLabel label='Jurisdiction' isRequired />}
                  >
                    <Select
                      name='jurisdiction'
                      placeholder=''
                      style={{
                        width: '100%'
                      }}
                    >
                      <Select.Option value='PMC'>PMC</Select.Option>
                      <Select.Option value='PCMC'>PCMC</Select.Option>
                      <Select.Option value='DHO'>DHO</Select.Option>
                      <Select.Option value='CS'>CS</Select.Option>
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
              <Form.Item
                name='governmentHospital'
                label={<FormItemLabel label='Ownership' isRequired />}
              >
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
              {props.values.governmentHospital === 0 && (
                <Form.Item
                  name='agreementStatus'
                  label={<FormItemLabel label='Agreement Status' isRequired />}
                >
                  <Select
                    name='agreementStatus'
                    placeholder=''
                    style={{
                      width: '100%',
                      maxWidth: '570px'
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
              )}
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
              <Form.Item
                name='telephone'
                label={
                  <FormItemLabel
                    label='Organisation Telephone Number'
                    isRequired
                  />
                }
              >
                <Input
                  name='telephone'
                  placeholder=''
                  style={{
                    width: '100%',
                    maxWidth: '570px'
                  }}
                />
              </Form.Item>
              <Form.Item
                name='email'
                label={
                  <FormItemLabel label='Organisation Email ID' isRequired />
                }
              >
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
              <Form.Item
                name='primary_contact_person_name'
                label={<FormItemLabel label='Name' isRequired />}
              >
                <Input
                  name='primary_contact_person_name'
                  placeholder='Full name'
                  style={{
                    width: '100%',
                    maxWidth: '570px'
                  }}
                />
              </Form.Item>
              <Form.Item
                name='primary_contact_person_mobile'
                label={<FormItemLabel label='Mobile Number' isRequired />}
              >
                <Input
                  name='primary_contact_person_mobile'
                  placeholder=''
                  style={{
                    width: '100%',
                    maxWidth: '570px'
                  }}
                />
              </Form.Item>
              <Form.Item
                name='primary_contact_person_email'
                label={<FormItemLabel label='Email ID' isRequired />}
              >
                <Input
                  name='primary_contact_person_email'
                  placeholder=''
                  style={{
                    width: '100%',
                    maxWidth: '570px'
                  }}
                />
              </Form.Item>
            </div>
            <div className='form-section'>
              <div className='section-title'>Operational Details</div>
              <Form.Item
                name='operatingStatus'
                label={<FormItemLabel label='Operational Status' />}
              >
                <Switch name='operatingStatus' />
              </Form.Item>
              {props.values.operatingStatus && (
                <>
                  <Form.Item
                    name='covidFacilityType'
                    label={<FormItemLabel label='Facility Type' isRequired />}
                  >
                    <Select
                      name='covidFacilityType'
                      placeholder=''
                      style={{
                        width: '100%',
                        maxWidth: '570px'
                      }}
                    >
                      {covidFacilityTypes.map(el => (
                        <Select.Option value={el.key}>{el.label}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name='facilityStatus'
                    label={<FormItemLabel label='Facility Status' isRequired />}
                  >
                    <Select
                      name='facilityStatus'
                      style={{
                        width: '100%'
                      }}
                    >
                      <Select.Option value='COVID Only'>
                        COVID Only
                      </Select.Option>
                      <Select.Option value='Mixed'>Mixed</Select.Option>
                      <Select.Option value='Under Consideration(UC)'>
                        Under Consideration(UC)
                      </Select.Option>
                      <Select.Option value='Non-COVID'>Non-COVID</Select.Option>
                      <Select.Option value='Unassigned'>
                        Unassigned
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </>
              )}
            </div>
            <ErrorFocus />
          </Form>
        );
      }}
    </Formik>
  );
}

export default connect(state => ({
  areaList: state.get('dashboardBase').get('areaList'),
  loadingAreaList: state.get('dashboardBase').get('loadingAreaList')
}))(FacilityAddForm);
