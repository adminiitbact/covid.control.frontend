import React from 'react';
import { Input } from 'antd';

function ManagmentListFilters(props) {
  const { Search } = Input;

  return (
    <Search
      placeholder="Search"
      onSearch={value => props.searchText(value)}
      style={{ width: 350 }}
    />
  );
}

export default ManagmentListFilters;
