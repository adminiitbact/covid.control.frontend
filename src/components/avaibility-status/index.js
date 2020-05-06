import React from 'react';

import './avaibility-status.scss';

export default function AvailabilityStatus({
  label,
  occupied,
  total,
  available
}) {
  return (
    <div className='d--f availibility-status mt2'>
      <span className='mr1'>{label}</span>
      <div className='d--f fw--n mr1 bold'>
        <span>{occupied}</span>/<span>{total}</span>
      </div>
      <div className='green'>({available})</div>
    </div>
  );
}
