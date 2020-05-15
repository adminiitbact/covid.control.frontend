import React from 'react';
import Table from 'components/table';
import AvailabilityStatus from 'components/table-components/avaibility-status';

import './linking-table.scss';

import InfinitePagination from 'components/infinite-pagination';

const columns = [
  {
    dataIndex: 'name',
    title: 'Name of the Facility',
    width: '30%',
    render: text => (
      <div>
        {text}
        <div className='mt2 placeholder' />
      </div>
    )
  },
  {
    key: 'covidFacilityType',
    title: 'covidFacilityType',
    dataIndex: 'covidFacilityType',
    render: (text, record, index) => {
      // return null;
      const mildObj = record.availabilityStatusList.find(
        el => el.severity === 'MILD'
      );
      let statusCom = <div className='mt2 placeholder' />;
      if (mildObj) {
        statusCom = (
          <AvailabilityStatus
            label='Mild'
            occupied={mildObj.totalBeds - mildObj.availableBeds}
            total={mildObj.totalBeds}
            available={mildObj.availableBeds}
          />
        );
      }
      return (
        <div className='d--f fd--c jc--sb'>
          <div>{text}</div>
          {statusCom}
        </div>
      );
    }
  },
  {
    key: 'facilityStatus',
    title: 'Jurisdiction',
    dataIndex: 'facilityStatus',
    render: (text, record, index) => {
      // return null;
      const mildObj = record.availabilityStatusList.find(
        el => el.severity === 'MODERATE'
      );
      let statusCom = <div className='mt2 placeholder' />;
      if (mildObj) {
        statusCom = (
          <AvailabilityStatus
            label='Moderate'
            occupied={mildObj.totalBeds - mildObj.availableBeds}
            total={mildObj.totalBeds}
            available={mildObj.availableBeds}
          />
        );
      }
      return (
        <div className='d--f fd--c jc--sb'>
          <div>{text}</div>
          {statusCom}
        </div>
      );
    }
  },
  {
    key: 'area',
    title: 'Area',
    dataIndex: 'area',
    render: (text, record, index) => {
      // return null;
      const mildObj = record.availabilityStatusList.find(
        el => el.severity === 'SEVERE'
      );
      let statusCom = <div className='mt2 placeholder' />;
      if (mildObj) {
        statusCom = (
          <AvailabilityStatus
            label='Severe'
            occupied={mildObj.totalBeds - mildObj.availableBeds}
            total={mildObj.totalBeds}
            available={mildObj.availableBeds}
          />
        );
      }
      return (
        <div className='d--f fd--c jc--sb'>
          <div>{text}, {record.jurisdiction}</div>
          {statusCom}
        </div>
      );
    }
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
