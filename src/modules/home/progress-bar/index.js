import React from 'react';
import './progress-bar.scss';

const ProgressBar = (props) => {
    const getPercentage = (percent, percentOf)=>{
        return Math.floor(percent / percentOf * 100);
    }  
    return (
        <div className='customProgress' sty>
            <div className='innerProgress' style={{width: getPercentage(props.percent1,props.percentOf) + "%",zIndex:'1',backgroundColor:props.bgColor}}></div>
            <div className='innerProgress1' style={{width: getPercentage(props.percent2,props.percentOf) + "%",backgroundColor:props.bgColor}}></div>
        </div>
    );
}
export default ProgressBar;