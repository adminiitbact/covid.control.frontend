import React from 'react';
import { Table as AntDTable } from 'antd';

import './table.scss';

export default function Table({ stripped, ...rest }) {
  const rowClassNameFn = (record, index) => {
    let classname = '';
    if (rest.onRow) {
      classname = 'clickable';
    }
    if (rest.rowClassName) {
      classname = `${rest.rowClassName(record, index)}`;
    }
    if (index % 2 === 0) {
      classname = classname + ' even';
    } else {
      classname = classname + ' odd';
    }
    return classname;
  };

  return (
    <AntDTable {...rest} rowClassName={stripped ? rowClassNameFn : () => {}} />
  );
}
