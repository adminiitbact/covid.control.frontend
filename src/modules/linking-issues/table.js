import React from 'react';
import Table from 'components/table';
import _get from 'lodash/get';
import { useHistory } from 'react-router';
import FacilityName from 'components/table-components/facility-name';

import InfinitePagination from 'components/infinite-pagination';

import './table.scss';

const columns = [
  {
    dataIndex: 'name',
    title: (
      <div>
        <div>Facility Name</div>
        <div>Area (Jurisdiction)</div>
      </div>
    ),
    width: '30%',
    render: (text, record) => (
      <FacilityName
        name={text}
        area={record.area}
        jurisdiction={record.jurisdiction}
      />
    )
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
    title: 'Linking Status',
    render: (text, record) =>
      record.hasLinks ? 'Complete' : <div className='danger-text'>No Link</div>
  },
  {
    title: 'Linked DCH',
    render: (text, record) => _get(record, 'linkCount.dchLinkCount', '-')
  },
  {
    title: 'Linked DCHC',
    render: (text, record) => _get(record, 'linkCount.dchcLinkCount', '-')
  }
];

export default function LinkingIssuesTable({
  loading,
  data,
  current,
  limit,
  total,
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
        bordered
      />
      <div className='d--f fd--rr mt2'>
        <InfinitePagination
          disabled={loading}
          current={current}
          limit={limit}
          total={total}
          hasNext={hasNext}
          hasPrev={hasPrev}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </div>
    </div>
  );
}
