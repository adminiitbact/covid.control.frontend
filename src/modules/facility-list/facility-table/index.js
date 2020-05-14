import React from 'react';
import Table from 'components/table';
import { useHistory } from 'react-router';
import _get from 'lodash/get';
// import AvailabilityStatus from 'components/table-components/avaibility-status';
import FacilityName from 'components/table-components/facility-name';
import OperationalStatus from 'components/table-components/operational-status';
import InfinitePagination from 'components/infinite-pagination';

import './facility-table.scss';

const columns = [
  {
    dataIndex: 'isOperational',
    title: 'Op. Stat.',
    className: 'td-center-align',
    render: (text, record) => <OperationalStatus operational={text} />
  },
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
    key: 'beds',
    title: 'Beds Capacity',
    render: (text, record, index) => {
      // return null;
      const totalBeds = record.availabilityStatusList.reduce((prev, el) => {
        return prev + el.totalBeds;
      }, 0);
      return totalBeds;
    }
  },
  {
    key: 'icu',
    title: 'ICU Capacity',
    render: (text, record, index) => {
      // return null;
      const severeObj = record.availabilityStatusList.find(
        el => el.severity === 'SEVERE'
      );
      return _get(severeObj, 'totalBeds', '-');
    }
  },
  {
    key: 'vent',
    title: 'Vent. Capacity',
    render: (text, record, index) => {
      // return null;
      const moderateObj = record.availabilityStatusList.find(
        el => el.severity === 'MODERATE'
      );
      return _get(moderateObj, 'totalBeds', '-');
    }
  },
  {
    dataIndex: 'doctors',
    title: 'Doctors'
  },
  {
    dataIndex: 'checklist_score',
    title: 'Checklist Score'
  },
  {
    key: 'owner',
    title: 'Owner',
    render: (text, record) => (record.governmentHospital ? 'Gov.' : 'Pvt.')
  }
  // {
  //   dataIndex: 'credentials',
  //   title: 'Cred.'
  // }
  // {
  //   dataIndex: 'facilityStatus',
  //   title: 'Status',
  //   render: (text, record, index) => {
  //     // return null;
  //     const mildObj = record.availabilityStatusList.find(
  //       el => el.severity === 'MILD'
  //     );
  //     let statusCom = <div className='mt2 placeholder' />;
  //     if (mildObj) {
  //       statusCom = (
  //         <AvailabilityStatus
  //           label='Mild'
  //           occupied={mildObj.totalBeds - mildObj.availableBeds}
  //           total={mildObj.totalBeds}
  //           available={mildObj.availableBeds}
  //         />
  //       );
  //     }
  //     return (
  //       <div className='d--f fd--c jc--sb'>
  //         <div>{text}</div>
  //         {statusCom}
  //       </div>
  //     );
  //   }
  // },
  // {
  //   dataIndex: 'jurisdiction',
  //   title: 'Jurisdiction',
  //   render: (text, record, index) => {
  //     // return null;
  //     const mildObj = record.availabilityStatusList.find(
  //       el => el.severity === 'MODERATE'
  //     );
  //     let statusCom = <div className='mt2 placeholder' />;
  //     if (mildObj) {
  //       statusCom = (
  //         <AvailabilityStatus
  //           label='Moderate'
  //           occupied={mildObj.totalBeds - mildObj.availableBeds}
  //           total={mildObj.totalBeds}
  //           available={mildObj.availableBeds}
  //         />
  //       );
  //     }
  //     return (
  //       <div className='d--f fd--c jc--sb'>
  //         <div>{text}</div>
  //         {statusCom}
  //       </div>
  //     );
  //   }
  // },
  // {
  //   dataIndex: 'area',
  //   title: 'Area',
  //   render: (text, record, index) => {
  //     // return null;
  //     const mildObj = record.availabilityStatusList.find(
  //       el => el.severity === 'SEVERE'
  //     );
  //     let statusCom = <div className='mt2 placeholder' />;
  //     if (mildObj) {
  //       statusCom = (
  //         <AvailabilityStatus
  //           label='Severe'
  //           occupied={mildObj.totalBeds - mildObj.availableBeds}
  //           total={mildObj.totalBeds}
  //           available={mildObj.availableBeds}
  //         />
  //       );
  //     }
  //     return (
  //       <div className='d--f fd--c jc--sb'>
  //         <div>{text}</div>
  //         {statusCom}
  //       </div>
  //     );
  //   }
  // }
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
        bordered
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
