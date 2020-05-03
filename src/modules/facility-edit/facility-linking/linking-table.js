import React from 'react';
import Table from 'components/table';

import InfinitePagination from 'components/infinite-pagination';

const columns = [
  {
    dataIndex: 'name',
    title: 'Name of the Facility',
    width: '30%'
  },
  {
    key: 'covidFacilityType',
    render: (text, record, index) => (
      <div>
        <div>{record.covidFacilityType}</div>
        <div>{record.availabilityStatusList}</div>
      </div>
    )
  },
  {
    key: 'facilityStatus',
    title: 'Status',
    render: (text, record, index) => (
      <div>
        <div>{record.Status}</div>
        <div>{record.availabilityStatusList}</div>
      </div>
    )
  },
  {
    key: 'jurisdiction',
    title: 'Jurisdiction',
    render: (text, record, index) => (
      <div>
        <div>{record.jurisdiction}</div>
        <div>{record.jurisdiction}</div>
      </div>
    )
  },
  {
    key: 'area',
    title: 'Area',
    render: (text, record, index) => (
      <div>
        <div>{record.Status}</div>
        <div>{record.area}</div>
      </div>
    )
  }
];

export default function LinkingTable({
  loading,
  actionCol,
  data,
  current,
  hasNext,
  hasPrev,
  pagination,
  handleNextClick,
  handlePrevClick
}) {
  return (
    <div>
      <Table
        stripped
        loading={loading}
        columns={columns.concat(actionCol)}
        dataSource={data}
        pagination={false}
        showHeader={false}
      />
      {pagination && (
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
      )}
    </div>
  );
}
