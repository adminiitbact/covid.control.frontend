import React from 'react';

import { Row, Col, Skeleton } from 'antd';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Form, Input, Select } from 'formik-antd';
import ErrorFocus from 'components/error-focus';
import { covidFacilityTypes } from 'app-constants';
import './facility-add-form.scss';

// const zoneReg = /^[0-9]+$/;
const phoneRegExp = /^[0-9]+$/;
const emailRegExp = /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const mobRegExp = /^[1-9][0-9]{9}$/;

const defaultFacilityObj = {
  name: '',
  area: '',
  address: '',
  covidFacilityType: undefined,
  jurisdiction: 'pmc',
  // zone_number: '',
  facilityStatus: 'unassigned',
  governmentHospital: undefined,
  agreementStatus: undefined,
  // phase_1: '',
  // phase_2: undefined,
  telephone: '',
  email: '',
  primary_contact_person_name: '',
  primary_contact_person_mobile: '',
  primary_contact_person_email: ''
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
  area: Yup.string().required('Please enter the locality'),
  address: Yup.string().required('Please enter the address'),
  covidFacilityType: Yup.string().required('Please select the facility type'),
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
  primary_contact_person_name: Yup.string().required('Please enter the name'),
  primary_contact_person_mobile: Yup.string()
    .required('Please enter the phone number')
    .matches(mobRegExp, 'please enter a valid mobile number'),
  primary_contact_person_email: Yup.string()
    .required('Please enter the email')
    .matches(emailRegExp, 'please enter a valid email address')
});

function FacilityAddForm({
  onSubmit,
  innerRef,
  facility,
  loading,
  areaList,
  loadingAreaList
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
              <Form.Item name='covidFacilityType' label='Facility Type'>
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
              {props.values.governmentHospital === 0 && (
                <Form.Item name='agreementStatus' label='Agreement Status'>
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
              <Form.Item name='primary_contact_person_name' label='Name'>
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
                label='Mobile Number'
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
              <Form.Item name='primary_contact_person_email' label='Email ID'>
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
