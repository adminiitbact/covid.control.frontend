import React from 'react';

export default function OperationalStatus({ operational, height = 12 }) {
  const style = {
    display: 'inline-block',
    width: `${height}px`,
    height: `${height}px`,
    borderRadius: '50%',
    backgroundColor: '#c7c7cc'
  };
  if (operational) {
    style.backgroundColor = '#4cd964';
  }
  return <div style={style} />;
}
