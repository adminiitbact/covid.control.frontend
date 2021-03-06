import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import PatientAPI from '../../../api/patient';
import './patient-details.scss';

const ageChartXaxisData = ['0 - 17','18 - 44','45 - 64','65 - 75', '75+'];
const genderChartXaxisData = ['Male','Female','Others'];

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

const DonoughtChart = (props) => {
    const options = {
        chart: { type: 'pie' },
        title: { text: 'Preexisting Conditions' },
        subtitle: { text: '450 patients' },      
        accessibility: {
            announceNewData: { enabled: true },
            point: { valueSuffix: '%' }
        },      
        plotOptions: {
            series: {
                dataLabels: { enabled: true, format: '{point.name}: {point.y:.1f}%' }
            }
        },      
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },      
        series: [
            {
                name: "Patients",
                colorByPoint: true,
                data: [
                    { name: "Kidney Disease", y: 10 },
                    { name: "Severe Obesity", y: 10.57 },
                    { name: "Diabetes", y:20 },
                    { name: "Moderate or Severe Asthama", y: 10 },
                    { name: "Chronic Lung Disease", y: 10 },
                    { name: "Chronic Liver Disease", y: 20 },
                    { name: "Hypertension", y: 10 },
                    { name: "Immunino Compromised", y:10 }
                ]
            }
        ]
      };

      return (
        <div>
            <div className='facilityTile shadow'>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>
    )      
}

const CustomChart = (props) => {
    const options = [
        { name:"Kidney Disease", values:[30,30,60] },
        { name:"Severe Obesity", values:[30,60,30] },
        { name:"Diabetes", values:[60,30,30] }
      ];

    return (
        <div className='facilityTile shadow'>
            <div className='f5-head'>Preexisting Conditions and Severity</div>            
            <div className="f5-content">
                {
                    options.map(x => <div className="f5-row">
                        <div className="f5-g-name">{x.name}</div>
                        <div className="f5-graph">
                            <div className="f5-severe" style={{width:x.values[0]+'%'}}> </div>
                            <div className="f5-moderate" style={{width:x.values[1]+'%'}}> </div>
                            <div className="f5-mild" style={{width:x.values[2]+'%'}}> </div>
                        </div>
                    </div>)
                }
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
            default:
                return '';
        }
    }

    useEffect(() => {
        const getGenderObj = (severity, data) => {
            const cases = data.filter(x => x.severity.toUpperCase() === severity);
            return {
                name: severity, 
                data: [
                    cases.filter(f => f.gender.toUpperCase() === 'MALE').length,
                    cases.filter(f => f.gender.toUpperCase() === 'FEMALE').length,
                    cases.filter(f => f.gender.toUpperCase() !== 'FEMALE' && f.gender.toUpperCase() !== 'MALE').length
                ],
                color: getColor(severity)
            };
        }

        const req1 = PatientAPI.getPatientAgeStats();
        const req2 = PatientAPI.getPatientGenderStats();
        req1.then(resp => {                        
            const ageStats = resp.body.data.list.map(x => {
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
            console.log(resp);
            const genderStats = [
                getGenderObj('MILD', resp.body.data.list),
                getGenderObj('MODERATE', resp.body.data.list),
                getGenderObj('SEVERE', resp.body.data.list)
            ]; 
            setGenderData(genderStats);
        }, error => {
            console.log(error);
        });
    }, []);

    return (
        <div className='patientFlowpage'>
            <div>
                <button className='backButton' onClick={props.BackToFacility}> {'<< '}back</button>
            </div>
     
            <CovidPatientChart></CovidPatientChart>
            <SeverityChart title = 'Age & Severity' categories = {ageChartXaxisData} data = {ageData}></SeverityChart>
            <SeverityChart title = 'Gender & Severity' categories = {genderChartXaxisData}  data = {genderData}></SeverityChart>
            <DonoughtChart></DonoughtChart>
            <CustomChart></CustomChart>
        </div>
    )
}

export default PatientDetails;