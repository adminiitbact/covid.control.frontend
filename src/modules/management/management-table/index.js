import React from 'react';
import Table from 'components/table';

const columns = [
  {
    dataIndex: 'facilityName',
    title: 'Facility Name Area(Jurisdiction)',
    responsive: ['sm'],
    sorter: (a, b) => a.facilityName.localeCompare(b.facilityName),
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
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
    const address = rec.address ? rec.address : ""; 
    const area = rec.area ? rec.area : ""; 
    const jurisdiction = rec.jurisdiction ? rec.jurisdiction : ""; 
    const facilityName =  rec.name +" "+area+" "+jurisdiction;

    const covidFacilityType = rec.covidFacilityType  ? rec.covidFacilityType : ""; 
    const facilityStatus = rec.facilityStatus  ? rec.facilityStatus  : ""; 
    const typeStatus = covidFacilityType+" "+facilityStatus;

    const ownerType = rec.institutionType  ? rec.institutionType : ""; 

    const totalBeds = rec.facilityAssets ? (rec.facilityAssets.data ? (rec.facilityAssets.data.total_beds  ? rec.facilityAssets.data.total_beds : "") : "") : ""; 

    const covidBeds = rec.facilityAssets ? (rec.facilityAssets.data ? (rec.facilityAssets.data.total_covid_beds  ? rec.facilityAssets.data.total_covid_beds : "") : "") : ""; 

    let availabilityStatusList = rec.availabilityStatusList && rec.availabilityStatusList.length ? rec.availabilityStatusList : null;
    
    let severeBeds = availabilityStatusList ? checkBySeverity(availabilityStatusList.filter(listRec => listRec.severity === "SEVERE")) : "";
    let moderateBeds = availabilityStatusList ? checkBySeverity(availabilityStatusList.filter(listRec => listRec.severity === "MODERATE")) : "";
    let mildBeds = availabilityStatusList ? checkBySeverity(availabilityStatusList.filter(listRec => listRec.severity === "MILD")) : "";
    
    const icuBeds = rec.facilityAssets ? (rec.facilityAssets.data ? (rec.facilityAssets.data.total_icu_beds  ? rec.facilityAssets.data.total_icu_beds : "") : "") : ""; 

    const totalVenti = rec.facilityAssets ? (rec.facilityAssets.data ? (rec.facilityAssets.data.total_ventilators  ? rec.facilityAssets.data.total_ventilators : "") : "") : ""; 

    const covidVenti = rec.facilityAssets ? (rec.facilityAssets.data ? (rec.facilityAssets.data.ventilators_allocated_covid  ? rec.facilityAssets.data.ventilators_allocated_covid : "") : "") : ""; 

    const doctors = rec.facilityMedstaff ? (rec.facilityMedstaff.data ? (rec.facilityMedstaff.data.ayush_doctors && rec.facilityMedstaff.data.tota_doctors ? (parseInt(rec.facilityMedstaff.data.ayush_doctors) + parseInt(rec.facilityMedstaff.data.tota_doctors)) : "") : "") : ""; 

    const nurse = rec.facilityMedstaff ? (rec.facilityMedstaff.data ? (rec.facilityMedstaff.data.nurses  ? rec.facilityMedstaff.data.nurses : "") : "") : ""; 

  return {
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

function filterTable(searchVal, list) {
var results = [];
var pushRec = false;

if(!searchVal) return list;

for (var i=0 ; i < list.length ; i++)
{
    for (let key in list[i]) {
      if(list[i][key])
      if(list[i][key].toString().includes(searchVal)) pushRec = true;
    }
    
    if(pushRec) results.push(list[i]);
    pushRec = false;
}
return results;
}

function managementTable({
  loading,
  data,
  pagination,
  searchVal
}) {

  return (
    <div>
      <Table
        stripped
        loading={loading}
        // onRow={onRow}
        columns={columns}
        dataSource={filterTable(searchVal,data.map(managementOrgArr))}
        pagination={pagination}
      />
      
    </div>
  );
}

export default managementTable;
