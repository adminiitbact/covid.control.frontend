import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Header, Content } from 'components/layout';
import { Formik } from 'formik';
import { Form, Select } from 'formik-antd';
import { Row, Col, DatePicker, Button } from 'antd';

import ReportAPI from 'api/report';

const { RangePicker } = DatePicker;

function Reports(props) {    
    const [dates, setDates] = useState([null, null]);
    const download = (formProps) => {
        const req = ReportAPI.post({reportName: formProps.reporttype, jurisdiction: formProps.jurisdiction, startDate: dates[0], endDate: dates[1]});
        req.then(resp => {
            const filename = resp.headers['filename'];
            const blob = new Blob([resp.text], { type: 'txt/csv' });
            let url = window.URL.createObjectURL(blob);
            let link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        err => {
            console.log(err);
        })
    }

    return (
    <>
        <Header>Reports</Header>
        <Content style={{ padding: 10 }}>
            <h1>Generate New Report</h1>
            <Formik initialValues={{reporttype: '', jurisdiction: '', date: []}}
                 onSubmit={ formProps => download(formProps) }>
                <Form layout='vertical'>
                    <Row>
                        <Col span={8}>                    
                            <Form.Item name='reporttype' label='SELECT REPORT TYPE'>
                                <Select showSearch name='reporttype' placeholder='Report Type'>
                                    <Select.Option value='SUM_ISOLATION_TOTAL_PATIENT'>Sum Isolation Total Patients Hospital Wise</Select.Option>
                                    <Select.Option value='Positive Patients Line List'>Positive Patients Line List</Select.Option>
                                    <Select.Option value='DAILY_PATIENT_DISCHARGE_LIST'>Daily Patient Discharge List</Select.Option>
                                    <Select.Option value='DAILY_PATIENT_DEATH_LIST'>Daily Patient Death List</Select.Option>
                                    <Select.Option value='COVID Facilities Details'>COVID Facilities Details</Select.Option>
                                    <Select.Option value='COVID_FACILITIES_SUMMARY'>COVID Facilities Summary</Select.Option>
                                </Select>
                            </Form.Item>                        
                        </Col>
                        <Col span={8} offset={2}>
                            <Form.Item name="jurisdiction" label='SELECT JURISDICTION'>
                                <Select name="jurisdiction" placeholder="Jurisdiction">
                                    <Select.Option value='pmc'>PMC</Select.Option>
                                    <Select.Option value='pcmc'>PCMC</Select.Option>
                                    <Select.Option value='dho'>DHO</Select.Option>
                                    <Select.Option value='cs'>CS</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item name="date" label="SELECT DATE RANGE">
                                <RangePicker name='date' onCalendarChange={value => setDates(value)}></RangePicker>
                            </Form.Item>                            
                        </Col>                        
                    </Row>
                    <Row>
                        <Col>
                            <Button htmlType='submit'>DOWNLOAD</Button>
                        </Col>
                    </Row>
                </Form>                
            </Formik>
        </Content>        
    </>);
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, { })(Reports);