import React from 'react';
import ProgressBar from '../progress-bar';
import bedImg from '../../../assets/img/bed.png';
import './bed-details.scss';

const Tile = (props) => {
    const imageStyle = { height: '40px', width: '50px', float: 'right', marginBottom: '15px' };
    return (
        <>
            <div className="facilityContainer">
                <div className='facilityTile shadow'>
                    <div className='totalbeds'>
                        <div className='tileLabel'>{props.Lable}</div>
                        <div className='Count'>
                            {props.availableCount} <sub className='subTexttextColor'>Available</sub>
                            <div style={imageStyle}>
                                <img style ={{height:'100%',width:'100%'}} src = {bedImg} alt='bedIcon'></img>
                            </div>
                        </div>
                    </div>
                    <div className='progressBarParent'>
                        <div className='progressCounts'>
                            <div className='LeftCount textColor'>{props.TotalCnt}</div>
                            <div className='RightCount textColor'>  {props.availableTodayCnt} </div>
                        </div>
                        <ProgressBar percent1 ={110} percent2 ={125} percentOf = {200} bgColor = {props.bgColor}></ProgressBar>
                        <div className='tileLabel'>Confirmed</div>
                        <ProgressBar percent1 ={110} percent2 ={125} percentOf = {200} bgColor = {props.bgColor}></ProgressBar>
                        <div className='tileLabel'>Suspected</div>
                        <ProgressBar percent1 ={110} percent2 ={125} percentOf = {200} bgColor = {props.bgColor}></ProgressBar>
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
    const selectedFacility = props.selectedFacility;
    return (
        <>
            <div className='BedContainer'>
                <button className='backButton' onClick={props.BackToFacility}> {'<< '}back</button>
                <div className='facilityTile shadow'>
                    <div className='progressBarParent'>
                        <div className='progressCounts'>
                            <div className='LeftCount textColor'> 2200 </div>
                            <div className='RightCount textColor'> 20000 </div>
                        </div>
                        <ProgressBar percent1={usedBeds} percent2={usedBeds + usedBedsToday} percentOf={totalBeds} bgColor={'#3c2f2f'}></ProgressBar>
                        <div className='progressCounts'>
                            <div className='LeftCount textColor'> Total Covid Beds </div>
                            <div className='RightCount textColor'> Maximum Beds Capacity </div>
                        </div>                        
                    </div>
                </div>
                <Tile Lable={'Total Severe COVID Beds'} availableCount={1750}
                    availableTodayCnt={200} TotalCnt={'110 (+25)'} bgColor={'#d41f1f'}></Tile>
                <Tile Lable={'Total Moderate COVID Beds'} availableCount={1750}
                    availableTodayCnt={200} TotalCnt={'110 (+25)'} bgColor={'#FF9800'}></Tile>
                <Tile Lable={'Total Mild COVID Beds'} availableCount={1750}
                    availableTodayCnt={200} TotalCnt={'110 (+25)'} bgColor={'#FF5722'}></Tile>
            </div>
        </>
    )
}

export default BedDetails;