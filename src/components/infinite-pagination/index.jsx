import React from 'react';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';

import './infinite-pagination.scss';

export default function InfinitePagination({
  current,
  hasNext,
  hasPrev,
  handleNextClick,
  handlePrevClick
}) {
  return (
    <div className='d--if ai--c'>
      <div
        className={`nav-box mr2 ${!hasPrev && 'disabled'}`}
        onClick={hasPrev ? handlePrevClick : () => {}}
      >
        <CaretLeftOutlined />
      </div>
      <div className='text'>{current}</div>
      <div
        className={`nav-box ml2 ${!hasNext && 'disabled'}`}
        onClick={hasNext ? handleNextClick : () => {}}
      >
        <CaretRightOutlined />
      </div>
    </div>
  );
}
