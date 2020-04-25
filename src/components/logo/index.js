import React from 'react';

import './logo.scss';

export default ({ size }) => {
  return (
    <div className={`logo ${size}`}>
      <span className='main'>COVID</span>
      <span>.Control</span>
    </div>
  );
};
