import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import ProgressBar from '../progress-bar';
import bedImg from '../../../assets/img/bed.png';

import FacilityAPI from '../../../api/facility';
import PatientAPI from '../../../api/patient';

import './facility-dashboard.scss';

const imageStyle = { height: '40px', width: '50px', float: 'right', marginBottom: '15px' };

const options = {
    chart: { type: 'column' },    
    title: { text: 'Beds Total and Occupied Timeline' },
    xAxis: { categories: ['March', 'Apr', 'May','June','July','Aug','Sept','Oct'] },
    yAxis: {
        allowDecimals: false, min: 0, title: { text: 'Number of Beds' }
    },    
    plotOptions: {
        column: { stacking: 'normal' }
    },    
    series: [   
        { name: 'Total', data: [10,40,50,89,67,30,60], stack: 'male', color: '#a3cced'}, 
        { name: 'Occupied', data: [8,34,45,70,60,20,30], stack: 'male', color: 'rgb(121, 159, 202)' }
    ]
}

const FacilityDashbord = (props) => {
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [facilityList, setFacilityList] = useState([]);
    const [totalPatients, setTotalPatients] = useState(0);
    useEffect(() => {
        FacilityAPI.getFacilityListNew(0, 100).then(resp => {
            setFacilityList(resp.body.data.page.elements);
        }, error => {
            console.log('Error when faetching facility list -> ', error)
        })
    }, []);

    useEffect(() => {
        if(selectedFacility) {
            PatientAPI.getPatientStats(selectedFacility.facilityId).then(resp => {                
                //console.log(resp);
                //console.log(resp.body.data.list[0].number);
                setTotalPatients(resp.body.data.list[0].number);
            }, error => {
                console.log(error);
            })
        }
    }, [selectedFacility])

    const onFacilityChange = value => {
        const filteredFacility = facilityList.find(f => f.facilityId == value);
        setSelectedFacility(filteredFacility);
    }

    const countAvailableBeds = () => {
        let count = 0;
        if(selectedFacility !== null) {
            selectedFacility.availabilityStatusList.map(x => {
                count += x.availableBeds;
            })            
        }
        return count;
    }

    const countOccupiedVents = () => {
        let count = 0;
        if(selectedFacility !== null) {
            selectedFacility.availabilityStatusList.map(x => {
                count += x.ventilatorsOccupied;
            })
        }
        return count;
    }

    const countTotalBeds = severity => {
        let count = 0
        if(selectedFacility != null && selectedFacility.availabilityStatusList) {
            const availabilityInfo = selectedFacility.availabilityStatusList.find(x => x.severity === severity);
            if(availabilityInfo) {
                count = availabilityInfo.totalBeds;
            }
        }
        return count;
    }

    const countAvlblBeds = severity => {
        let count = 0
        if(selectedFacility != null && selectedFacility.availabilityStatusList) {
            const availabilityInfo = selectedFacility.availabilityStatusList.find(x => x.severity === severity);
            if(availabilityInfo) {
                count = availabilityInfo.availableBeds;
            }
        }
        return count;
    }

    return(
        <>
            <div className='dashbordContainer'>
                <select className='facilitySelect shadow' onChange={(ev) => onFacilityChange(ev.target.value)}>
                    <option selected>Filter By Selecting Facilities</option>
                    {
                        facilityList.map(f => <option key={f.facilityId} value={f.facilityId}>{f.name}</option>)
                    }
                </select>
            
            <div className="facilityContainer">
              <div className='facilityTile shadow' onClick = {props.onBedClick}>
                <div className="totalbeds">
                  <div className='tileLabel'>Total COVID Beds</div>
                  <div className='Count'>{countAvailableBeds()} 
                  <sub className='subTexttextColor'>Available</sub>
                  <div style={imageStyle}>
                          <img style ={{height:'100%',width:'100%'}} src = {bedImg} alt='bedIcon'></img>
                      </div>
                  </div>
                </div>
                <div className='progressBarParent'>
                  <div className='progressCounts'>
                <div className='LeftCount textColor'> {(selectedFacility?.facilityAssets?.data?.total_beds ? selectedFacility?.facilityAssets?.data?.total_beds : 0) - countAvailableBeds()} </div>
                    <div className='RightCount textColor'> {selectedFacility?.facilityAssets?.data?.total_beds} </div>

                  </div>
                  <ProgressBar 
                    percent1 ={(selectedFacility?.facilityAssets?.data?.total_beds ? selectedFacility?.facilityAssets?.data?.total_beds : 0) - countAvailableBeds()} 
                    percent2 ={0} 
                    percentOf = {(selectedFacility?.facilityAssets?.data?.total_beds ? selectedFacility?.facilityAssets?.data?.total_beds : 0)} 
                    bgColor = {'#0778f8'}></ProgressBar>
                  <ProgressBar 
                    percent1 ={countTotalBeds('SEVERE') - countAvlblBeds('SEVERE')} 
                    percent2 ={0} 
                    percentOf = {countTotalBeds('SEVERE')} 
                    bgColor = {'#ff2b1f'}></ProgressBar>
                  <ProgressBar 
                    percent1 ={countTotalBeds('MODERATE') - countAvlblBeds('MODERATE')}
                    percent2 ={0} 
                    percentOf = {countTotalBeds('MODERATE')} 
                    bgColor = {'#ff9500'}></ProgressBar>
                  <ProgressBar 
                    percent1 ={countTotalBeds('MILD') - countAvlblBeds('MILD')}
                    percent2 ={0} 
                    percentOf = {countTotalBeds('MILD')}
                    bgColor = {'#ffec00'}></ProgressBar>
                </div>
              </div>
            </div>
            <div className='facilityTile shadow' onClick = {props.onPatientClick}>
              <div className="totalbeds">
                <div className='tileLabel'>Total Ventilators</div>
                <div className='Count'>
                    {(selectedFacility?.facilityAssets?.data?.total_ventilators ? selectedFacility?.facilityAssets?.data?.total_ventilators : 0) - countOccupiedVents()} 
                    <sub className='subTexttextColor'>Available</sub>
                </div>
              </div>
              <div className='progressBarParent'>
                <div className='progressCounts'>
                  <div className='LeftCount textColor'> {countOccupiedVents()} </div>
                  <div className='RightCount textColor'> {selectedFacility?.facilityAssets?.data?.total_ventilators} </div>
                </div>
                <ProgressBar 
                    percent1 ={countOccupiedVents()} 
                    percent2 ={0} 
                    percentOf = {(selectedFacility?.facilityAssets?.data?.total_ventilators ? selectedFacility?.facilityAssets?.data?.total_ventilators : 0)} 
                    bgColor = {'#0778f8'}></ProgressBar>

              </div>

            </div>
           

            <div className='facilityTile shadow ratio'>
              <div className="totalbeds">
                <div className='tileLabel'>Doctors to patient Ratio</div>
                <div className='Count'>1:{totalPatients / (selectedFacility?.facilityMedstaff?.data?.total_doctors ?? 1)} <sub className='subTexttextColor'>Poor</sub></div>
              </div>
            </div>
            <div className='facilityTile shadow ratio' style={{ "marginLeft": "4%" }}>
              <div className="totalbeds">
                <div className='tileLabel'>Nurse to patient Ratio</div>
                <div className='Count'>1:{totalPatients / (selectedFacility?.facilityMedstaff?.data?.nurses ?? 1)} <sub className='subTexttextColor'>Average</sub></div>
              </div>
            </div>
            <div className='facilityTile shadow'>
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
              />
            </div>
          </div>
        </>
    )
}
export default FacilityDashbord;