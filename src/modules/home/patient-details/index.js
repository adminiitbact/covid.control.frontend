import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import PatientAPI from '../../../api/patient';
import './patient-details.scss';

const ageChartXaxisData = ['0 - 17','18 - 44','45 - 64','65 - 75', '75+'];
const genderChartXaxisData = ['Male','Female','Others'];

const ageDataList  = [{
    name: 'Mid',
    data: [49, 71, 106, 129, 144],
    color:'#FFC107'

}, {
    name: 'Moderate',
    data: [83, 78, 98, 93, 106],
    color:'#FF9800'

}, {
    name: 'Severe',
    data: [48, 38, 39.3, 41, 47],
    color:'#F44336'

}];

const GenderDataList  = [{
    name: 'Mid',
    data: [49, 71, 106],
    color:'#FFC107'

}, {
    name: 'Moderate',
    data: [83, 78, 98],
    color:'#FF9800'

}, {
    name: 'Severe',
    data: [48, 38, 39],
    color:'#F44336'

}];

const CovidPatientChart = (props) => {
    const options = {
        chart: { type: 'column' },
        title: { text: 'Total COVID Pateints' },
        xAxis: { categories: ['March', 'April', 'May', 'June', 'July'] },
        yAxis: { 
            min: 0, title: { text: 'Number of Patients' }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: { stacking: 'percent' }
        },
        series: [
            { name: 'Active COVID', data: [5, 3, 4, 7, 2], color:'blue' }, 
            { name: 'Deceased', data: [2, 2, 3, 2, 1], color:'black' }, 
            { name: ' Recovered', data: [3, 4, 4, 2, 5], color:'green' }
        ]
    }
    return (
        <>
            <div>
                <div className='facilityTile shadow'>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
            </div>
        </>
    )
}

const SeverityChart = (props) => {
    const options = {
      chart: { type: 'column' },
      title: { text: props.title },
      subtitle: { text: '' },
      xAxis: { categories:props.categories, crosshair: true },
      yAxis: { 
          min: 0, title: { text: ' ' }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: { pointPadding: 0.2, borderWidth: 0 }
      },
      series: props.data 
    }
    return (
        <div>
            <div className='facilityTile shadow'>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>
    )
}

const PatientDetails = (props) => {    
    const [ageData, setAgeData] = useState([]);
    const [genderData, setGenderData] = useState([]);

    const getColor = severity => {
        switch(severity) {
            case 'SEVERE':
                return '#F44336';
            case 'MODERATE':
                return '#FF9800';
            case 'MILD':
                return '#FFC107';    
        }
    }

    useEffect(() => {
        const req1 = PatientAPI.getPatientAgeStats();
        const req2 = PatientAPI.getPatientGenderStats();
        req1.then(resp => {            
            const ageStats = resp.body.map(x => {
                return {
                    name: x.severity,
                    data: [x.countLT18, x.count18TO44, x.count45TO64, x.count65TO74, x.countGT74],
                    color: getColor(x.severity)
                }
            });
            setAgeData(ageStats);
        }, error => {
            console.log(error);
        });
        req2.then(resp => {

        }, error => {
            console.log(error);
        });
    }, []);

    const ageDataList  = [{
        name: 'Mid',
        data: [49, 71, 106, 129, 144],
        color:'#FFC107'
    
    }, {
        name: 'Moderate',
        data: [83, 78, 98, 93, 106],
        color:'#FF9800'
    
    }, {
        name: 'Severe',
        data: [48, 38, 39.3, 41, 47],
        color:'#F44336'
    
    }];    

    return (
        <div className='patientFlowpage'>
            <div>
                <button className='backButton' onClick={props.BackToFacility}> {'<< '}back</button>
            </div>
     
            <CovidPatientChart></CovidPatientChart>
            <SeverityChart title = 'Age & Severity' categories = {ageChartXaxisData} data = {ageDataList}></SeverityChart>
            <SeverityChart title = 'Gender & Severity' categories = {genderChartXaxisData}  data = {GenderDataList}>></SeverityChart>
        </div>
    )
}

export default PatientDetails;