import React from 'react';
import Table from 'components/table';

const columns = [
  {
    dataIndex: 'name',
    title: 'Name of the Facility',
    width: '30%'
  },
  {
    dataIndex: 'type',
    title: 'Type'
  },
  {
    dataIndex: 'status',
    title: 'Status'
  },
  {
    dataIndex: 'jurisdiction',
    title: 'Jurisdiction'
  },
  {
    dataIndex: 'area',
    title: 'Area'
  },
  {
    dataIndex: 'link',
    title: 'Link'
  }
];

export default function FacilityList({ loading, data }) {
  const onRow = (record, rowIndex) => {
    return {
      onClick: event => {
        console.log('click', record);
      }
    };
  };

  return (
    <Table
      stripped
      loading={loading}
      onRow={onRow}
      columns={columns}
      dataSource={data}
    />
  );
}
