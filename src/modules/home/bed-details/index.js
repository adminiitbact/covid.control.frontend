import React, { useEffect, useState } from 'react';
import ProgressBar from '../progress-bar';
import bedImg from '../../../assets/img/bed.png';
import FacilityBedAPI from '../../../api/facility';
import './bed-details.scss';

const Tile = (props) => {
    const imageStyle = { height: '40px', width: '50px', float: 'right', marginBottom: '15px' };

    const confirmed = props.stats.filter(x => x.covidStatus.toUpperCase() === 'CONFIRMED');
    const suspected = props.stats.filter(x => x.covidStatus.toUpperCase() === 'SUSPECTED');

    const getTotal = (data) => {
        let total = 0;
        data.map(x => {
            total += (x.numberTotalCovidBeds ?? 0);
        })
        return total;
    }

    const getAvailable = data => {
        let total = 0;
        data.map(x => {
            total += (x.numberAvailableCovidBeds ?? 0);
        })
        return total;
    }
    
    return (
        <>
            <div className="facilityContainer">
                <div className='facilityTile shadow'>
                    <div className='totalbeds'>
                        <div className='tileLabel'>{props.Lable}</div>
                        <div className='Count'>
                            {getAvailable(confirmed) + getAvailable(suspected)} <sub className='subTexttextColor'>Available</sub>
                            <div style={imageStyle}>
                                <img style ={{height:'100%',width:'100%'}} src = {bedImg} alt='bedIcon'></img>
                            </div>
                        </div>
                    </div>
                    <div className='progressBarParent'>
                        <div className='progressCounts'>
                            <div className='LeftCount textColor'>{getTotal(confirmed) + getTotal(suspected) - (getAvailable(confirmed) + getAvailable(suspected))}</div>
                            <div className='RightCount textColor'>  {getTotal(confirmed) + getTotal(suspected)} </div>
                        </div>
                        <ProgressBar 
                            percent1 ={getTotal(confirmed) + getTotal(suspected) - (getAvailable(confirmed) + getAvailable(suspected))} 
                            percent2 ={0} 
                            percentOf = {getTotal(confirmed) + getTotal(suspected)} 
                            bgColor = {props.bgColor}></ProgressBar>
                        <div className='tileLabel'>Confirmed</div>
                        <ProgressBar percent1 ={getTotal(confirmed) - getAvailable(confirmed)} 
                            percent2 ={0} 
                            percentOf = {getTotal(confirmed)} 
                            bgColor = {props.bgColor}></ProgressBar>
                        <div className='tileLabel'>Suspected</div>
                        <ProgressBar percent1 ={getTotal(suspected) - getAvailable(suspected)} 
                            percent2 ={0} 
                            percentOf = {getTotal(suspected)} 
                            bgColor = {props.bgColor}></ProgressBar>
                    </div>
                </div>
            </div>
        </>
    )
}

const BedDetails = (props) => {
    const totalBeds = 20000;
    const usedBeds = 9999;
    const usedBedsToday = 3000;

    const [bedStats, setBedStats] = useState([]);
    const [totalBedCapacity, setTotalBedCapacity] = useState(0);
    const [totalCovidBedCapacity, setTotalCovidBedCapacity] = useState(0);

    useEffect(() => {
        FacilityBedAPI.getBedStats().then(resp => {
            console.log(resp);
            setBedStats(resp.body.data.list);            
        }, error => {
            console.log(error);
        })

        FacilityBedAPI.getBedStatsOverview().then(resp => {
            console.log('use this resp', resp);
            let totalBeds = 0;
            let totalCovidBeds = 0;
            resp.body.data.list.map(x => {
                totalBeds += x.numberTotalBeds;
                totalCovidBeds += x.numberTotalCovidBeds;
            })
            setTotalBedCapacity(totalBeds);
            setTotalCovidBedCapacity(totalCovidBeds);
        }, error => {
            console.log(error)
        });
    }, []);

    return (
        <>
            <div className='BedContainer'>
                <button className='backButton' onClick={props.BackToFacility}> {'<< '}back</button>
                <div className='facilityTile shadow'>
                    <div className='progressBarParent'>
                        <div className='progressCounts'>
                            <div className='LeftCount textColor'> {totalCovidBedCapacity} </div>
                            <div className='RightCount textColor'> {totalBedCapacity} </div>
                        </div>
                        <ProgressBar percent1={totalCovidBedCapacity} percent2={0} percentOf={totalBedCapacity} bgColor={'#3c2f2f'}></ProgressBar>
                        <div className='progressCounts'>
                            <div className='LeftCount textColor'> Total Covid Beds </div>
                            <div className='RightCount textColor'> Maximum Beds Capacity </div>
                        </div>                        
                    </div>
                </div>
                <Tile stats={bedStats.filter(x => x.severity.toUpperCase() === 'SEVERE')} 
                    Lable={'Total Severe COVID Beds'} availableCount={1750}
                    availableTodayCnt={200} TotalCnt={'110 (+25)'} bgColor={'#d41f1f'}></Tile>
                <Tile stats={bedStats.filter(x => x.severity.toUpperCase() === 'MODERATE')} 
                    Lable={'Total Moderate COVID Beds'} availableCount={1750}
                    availableTodayCnt={200} TotalCnt={'110 (+25)'} bgColor={'#FF9800'}></Tile>
                <Tile stats={bedStats.filter(x => x.severity.toUpperCase() === 'MILD')} 
                    Lable={'Total Mild COVID Beds'} availableCount={1750}
                    availableTodayCnt={200} TotalCnt={'110 (+25)'} bgColor={'#FF5722'}></Tile>
            </div>
        </>
    )
}

export default BedDetails;