import React, { useRef, useEffect, useState } from 'react';
import { Header, Content } from 'components/layout';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './home.scss';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 52, fontWeight: 500 }} spin />
);

export default function Home() {
  const iframeRef = useRef();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    iframeRef &&
      iframeRef.current &&
      iframeRef.current.addEventListener('load', function (e) {
        setloading(false);
      });
  });

  return (
    <>
      <Header>Dashboard</Header>
      <Content
        style={{
          padding: 0
        }}
      >
        <div className='iframe-container d--f ai--c jc--c'>
          {loading && (
            <div className='spin-container'>
              <Spin indicator={antIcon} />
            </div>
          )}
          <iframe
            title='bi'
            src='https://datastudio.google.com/embed/reporting/b14ec87e-51df-4d9f-9290-4facc967cae8/page/s4TNB'
            frameborder='0'
            style={{
              border: 0
            }}
            allowfullscreen
            ref={iframeRef}
          ></iframe>
        </div>
      </Content>
    </>
  );
}
