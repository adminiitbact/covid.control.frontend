import React from 'react';

import './facility-name.scss';

export default function FacilityName({ name, area, jurisdiction }) {
  return (
    <div className='facility-name'>
      <div className='name mr1'>{name}</div>
      <div>
        <span>{area} </span>
        {jurisdiction && <span>({jurisdiction})</span>}
      </div>
    </div>
  );
}
