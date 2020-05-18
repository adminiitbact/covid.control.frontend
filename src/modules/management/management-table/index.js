import React from 'react';
import Table from 'components/table';
import FacilityName from 'components/table-components/facility-name'
import _ from 'lodash';
import InfinitePagination from 'components/infinite-pagination';

const columns = [
  {
    dataIndex: 'facilityName',
    title: 'Facility Name Area(Jurisdiction)',
    responsive: ['sm'],
    sorter: (a, b) => a.facilityName.localeCompare(b.facilityName),
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
    render: (text, record) => <FacilityName name={record.name} area={record.area} jurisdiction={record.jurisdiction}></FacilityName>
  },
  {
    dataIndex: 'typeStatus',
    title: 'Type Status',
    responsive: ['sm'],
    sorter: (a, b) => a.typeStatus.localeCompare(b.typeStatus),
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
  },
  {
    dataIndex: 'ownerType',
    title: 'Owner(Agree) Inst. Type',
    responsive: ['sm'],
    sorter: (a, b) => a.ownerType.localeCompare(b.ownerType),
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
  },
  {
    dataIndex: 'totalBeds',
    title: 'Total Beds',
    responsive: ['sm'],
    sorter: (a, b) => a.totalBeds - b.totalBeds,
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
  },
  {
    dataIndex: 'covidBeds',
    title: 'Covid Beds',
    responsive: ['sm'],
    sorter: (a, b) => a.covidBeds - b.covidBeds,
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
  },
  {
    dataIndex: 'severeBeds',
    title: 'Severe Beds',
    responsive: ['sm'],
    sorter: (a, b) => a.severeBeds - b.severeBeds,
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
  },
  {
    dataIndex: 'moderateBeds',
    title: 'Moderate Beds',
    responsive: ['sm'],
    sorter: (a, b) => a.moderateBeds - b.moderateBeds,
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
  },
  {
    dataIndex: 'mildBeds',
    title: 'Mild Beds.',
    responsive: ['sm'],
    sorter: (a, b) => a.mildBeds - b.mildBeds,
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
  },
  {
    dataIndex: 'icuBeds',
    title: 'ICU Beds',
    responsive: ['sm'],
    sorter: (a, b) => a.icuBeds - b.icuBeds,
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
  },
  {
    dataIndex: 'totalVenti',
    title: 'Total Venti.',
    responsive: ['sm'],
    sorter: (a, b) => a.totalVenti - b.totalVenti,
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
  },
  {
    dataIndex: 'covidVenti',
    title: 'Covid Venti.',
    responsive: ['sm'],
    sorter: (a, b) => a.covidVenti - b.covidVenti,
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
  },
  {
    dataIndex: 'doctors',
    title: 'Doctors',
    responsive: ['sm'],
    sorter: (a, b) => a.doctors - b.doctors,
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
  },
  {
    dataIndex: 'nurses',
    title: 'Nurse',
    sorter: (a, b) => a.nurse - b.nurse,
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
    responsive: ['sm']
  }

];

function managementOrgArr(rec) {     
    //const address = rec.address ? rec.address : ""; 
    const name = rec.name ? rec.name : "";
    const area = rec.area ? rec.area : ""; 
    const jurisdiction = rec.jurisdiction ? rec.jurisdiction : ""; 
    const facilityName =  name +" "+area+" "+jurisdiction;

    const covidFacilityType = rec.covidFacilityType  ? rec.covidFacilityType : ""; 
    const facilityStatus = rec.facilityStatus  ? rec.facilityStatus  : ""; 
    const typeStatus = covidFacilityType+" "+facilityStatus;

    const ownerType = rec.institutionType  ? rec.institutionType : ""; 
  
    const totalBeds = _.get(rec, 'rec.facilityAssets.data.total_beds', '');

    const covidBeds = _.get(rec, 'rec.facilityAssets.data.total_covid_beds', '');
    let availabilityStatusList = rec.availabilityStatusList && rec.availabilityStatusList.length ? rec.availabilityStatusList : null;
    
    let severeBeds = availabilityStatusList ? checkBySeverity(availabilityStatusList.filter(listRec => listRec.severity === "SEVERE")) : "";
    let moderateBeds = availabilityStatusList ? checkBySeverity(availabilityStatusList.filter(listRec => listRec.severity === "MODERATE")) : "";
    let mildBeds = availabilityStatusList ? checkBySeverity(availabilityStatusList.filter(listRec => listRec.severity === "MILD")) : "";
    
    const icuBeds = _.get(rec, 'rec.facilityAssets.data.total_icu_beds', '');

    const totalVenti = _.get(rec, 'rec.facilityAssets.data.total_ventilators', '');

    const covidVenti = _.get(rec, 'rec.facilityAssets.data.ventilators_allocated_covid');

    const doctors = rec.facilityMedstaff ? (rec.facilityMedstaff.data ? (rec.facilityMedstaff.data.ayush_doctors && rec.facilityMedstaff.data.tota_doctors ? (parseInt(rec.facilityMedstaff.data.ayush_doctors) + parseInt(rec.facilityMedstaff.data.total_doctors)) : "") : "") : ""; 
    
    const nurse = _.get(rec, 'rec.facilityMedstaff.data.nurses'); 

  return {
    "name": name,
    "area": area,
    "jurisdiction": jurisdiction,
    "facilityName": facilityName,
    "typeStatus": typeStatus,
    "ownerType": ownerType,
    "totalBeds": totalBeds,
    "covidBeds": covidBeds,
    "severeBeds": severeBeds,
    "moderateBeds": moderateBeds,
    "mildBeds": mildBeds,
    "icuBeds": icuBeds,
    "totalVenti": totalVenti,
    "covidVenti": covidVenti,
    "doctors": doctors,
    "nurses": nurse
  };
}

function checkBySeverity(listRec) {
  if(listRec.length)
  {
    listRec=listRec[0];
    if(listRec.availableBeds && listRec.totalBeds) 
  return listRec.availableBeds+"avail.\n"+ listRec.availableBeds+"/"+listRec.totalBeds;
  else return "";}
}

function managementTable({
  loading,
  data,
  current,
  hasNext,
  hasPrev,
  limit,
  total,
  handleNextClick,
  handlePrevClick
}) {

  return (
    <div>
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
      <Table
        stripped
        loading={loading}
        columns={columns}
        dataSource={data.map(managementOrgArr)}
        pagination={false}
      />
      
    </div>
  );
}

export default managementTable;
