import React, { useRef, useEffect, useState } from 'react';
import { Header, Content } from 'components/layout';
import FacilityDashbord from './facility-dashboard';
import BedDetails from './bed-details';
import PatientDetails from './patient-details';

import './home.scss';

// const antIcon = (
//   <LoadingOutlined style={{ fontSize: 52, fontWeight: 500 }} spin />
// );
export default function Home() {
  // const [loading, setloading] = useState(false);
  const [isDisplayBeds,setIsDisplayBeds] = useState(false);
  const [isDisplayPatients,setIsDisplayPatients] = useState(false);
  const [facility, setFacility] = useState({});
  
  const toggleBeds = () => {
    setIsDisplayPatients(false);
    setIsDisplayBeds(true);
  };
  const togglePatients = () => {
    setIsDisplayBeds(false);
    setIsDisplayPatients(true);
  };

  const BackToFacility = () => {
    setIsDisplayBeds(false);
    setIsDisplayPatients(false);
  };

  return (
    <>
      <Header>Dashboard</Header>
      <Content
        style={{
          padding: 0
        }}
      > 
      {
        isDisplayBeds || isDisplayPatients ? 
        <>
        {
            isDisplayBeds 
              ? <BedDetails BackToFacility = {BackToFacility}></BedDetails>
              : <PatientDetails BackToFacility = {BackToFacility}></PatientDetails>
        }         
        </>       
        :
        <FacilityDashbord onBedClick = {toggleBeds} onPatientClick = {togglePatients}></FacilityDashbord>
      }        
      </Content>
    </>
  );
}