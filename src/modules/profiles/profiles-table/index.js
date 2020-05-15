import React from 'react';
import Table from 'components/table';
import { useHistory } from 'react-router';

import InfinitePagination from 'components/infinite-pagination';

import './profiles-table.scss';

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
  },
  {
    title: '',
    render: () => <div className='danger-text'>No Link</div>
  }
];

export default function ProfilesTable({
  loading,
  data,
  current,
  hasNext,
  hasPrev,
  handleNextClick,
  handlePrevClick
}) {
  const history = useHistory();
  const onRow = (record, rowIndex) => {
    return {
      onClick: event => {
        history.push(`/facility/${record.facilityId}/edit/link`);
      }
    };
  };

  return (
    <div>
      <Table
        stripped
        loading={loading}
        onRow={onRow}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <div className='d--f fd--rr mt2'>
        <InfinitePagination
          disabled={loading}
          current={current}
          hasNext={hasNext}
          hasPrev={hasPrev}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </div>
    </div>
  );
}
