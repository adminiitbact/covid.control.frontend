import React from 'react';
import Table from 'components/table';
import { useHistory } from 'react-router';

import AvailabilityStatus from 'components/avaibility-status';
import InfinitePagination from 'components/infinite-pagination';

import './facility-table.scss';

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
    dataIndex: 'covidFacilityType',
    title: 'Type',
    render: text => (
      <div>
        {text}
        <div className='mt2 placeholder' />
      </div>
    )
  },
  {
    dataIndex: 'facilityStatus',
    title: 'Status',
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
    dataIndex: 'jurisdiction',
    title: 'Jurisdiction',
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
    dataIndex: 'area',
    title: 'Area',
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

export default function FacilityTable({
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
        history.push(`/facility/${record.facilityId}/edit`);
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
