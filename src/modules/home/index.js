import React from 'react';
import { Header, Content } from 'components/layout';

import './home.scss';

export default function Home() {
  return (
    <>
      <Header>Dashboard</Header>
      <Content>
        <div className='iframe-container'>
          <iframe
            title='bi'
            src='https://datastudio.google.com/embed/reporting/b14ec87e-51df-4d9f-9290-4facc967cae8/page/s4TNB'
            frameborder='0'
            style={{
              border: 0
            }}
            allowfullscreen
          ></iframe>
        </div>
      </Content>
    </>
  );
}
