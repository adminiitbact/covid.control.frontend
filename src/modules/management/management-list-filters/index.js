import React from 'react';
import Search from '../../../components/search';

function ManagmentListFilters(props) {

  return (
    <Search onChange={value => props.searchText(value)}></Search>
  );
}

export default ManagmentListFilters;
