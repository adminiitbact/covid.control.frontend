import React from 'react';

import './tabs.scss';

function Tab({ option, isSelected, handleClick }) {
  return (
    <div
      onClick={handleClick}
      className={`d--f ai--c jc--c tab-item ${isSelected ? 'isSelected' : ''}`}
    >
      {option.label}
    </div>
  );
}

export default function Tabs({ options = [], handleClick, selected = null }) {
  return (
    <div className='full-height d--f ai--s tab-list'>
      {options.map(el => {
        const isSelected = el.key === selected;
        return (
          <Tab
            option={el}
            key={el.key}
            isSelected={isSelected}
            handleClick={e => {
              handleClick(el.key, el);
            }}
          />
        );
      })}
    </div>
  );
}
