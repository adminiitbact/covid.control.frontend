import React from 'react';
import Table from 'components/table';

import './linking-table.scss';

import InfinitePagination from 'components/infinite-pagination';

function AvailabilityStatus({ label, occupied, total, available }) {
  return (
    <div className='d--f availibility-status mt2'>
      <span className='mr1'>{label}</span>
      <div className='d--f fw--n mr1 bold'>
        <span>{occupied}</span>/<span>{total}</span>
      </div>
      <div className='green'>({available})</div>
    </div>
  );
}

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
    dataIndex: 'covidFacilityType',
    render: text => (
      <div>
        {text}
        <div className='mt2 placeholder' />
      </div>
    )
  },
  {
    key: 'facilityStatus',
    title: 'Status',
    dataIndex: 'facilityStatus',
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
    key: 'jurisdiction',
    title: 'Jurisdiction',
    dataIndex: 'jurisdiction',
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
          <div>{text}</div>
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
