import React from 'react';
import Table from 'components/table';
import { useHistory } from 'react-router';

const columns = [
  {
    dataIndex: 'name',
    title: 'Name of the Facility',
    width: '30%'
  },
  {
    dataIndex: 'covidFacilityType',
    title: 'Type'
  },
  {
    dataIndex: 'facilityStatus',
    title: 'Status'
  },
  {
    dataIndex: 'jurisdiction',
    title: 'Jurisdiction'
  },
  {
    dataIndex: 'area',
    title: 'Area'
  }
];

export default function FacilityTable({ loading, data }) {
  const history = useHistory()
  const onRow = (record, rowIndex) => {
    return {
      onClick: event => {
        history.push(`/facility/edit/${record.facilityId}`)
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
