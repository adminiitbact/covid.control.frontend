import React from 'react';
import Table from 'components/table';
// import { useHistory } from 'react-router';

import InfinitePagination from 'components/infinite-pagination';

const columns = [
  {
    dataIndex: 'patientId',
    title: 'ID'
  },
  {
    dataIndex: 'goiCovidId',
    title: 'GOI ID'
  },
  {
    dataIndex: 'name',
    title: 'Name'
  },
  {
    dataIndex: 'age',
    title: 'Age'
  },
  {
    dataIndex: 'gender',
    title: 'Gender'
  },
  {
    dataIndex: 'severtiy',
    title: 'Severity'
  },
  {
    dataIndex: 'oxy',
    title: 'Oxy'
  },
  {
    dataIndex: 'vent',
    title: 'Vent.'
  },
  {
    dataIndex: 'facilityName',
    title: 'Facility Name'
  },
  {
    dataIndex: 'covidFaciltyType',
    title: 'Type'
  },
  {
    dataIndex: 'area',
    title: 'Area'
    // width: '20%'
  }
];

function PatientTable({
  loading,
  data,
  current,
  hasNext,
  hasPrev,
  handleNextClick,
  handlePrevClick
}) {
  // const onRow = (record, rowIndex) => {
  //   return {
  //     onClick: event => {
  //       history.push(`/facility/edit/${record.facilityId}`);
  //     }
  //   };
  // };

  return (
    <div>
      <Table
        stripped
        loading={loading}
        // onRow={onRow}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <div className='d--f fd--rr mt2'>
        <InfinitePagination
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

export default PatientTable;
