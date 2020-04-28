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
  function iframeLoadListener(e) {
    setloading(false);
  }

  useEffect(() => {
    iframeRef &&
      iframeRef.current &&
      iframeRef.current.addEventListener('load', iframeLoadListener);
    return () => {
      iframeRef &&
        iframeRef.current &&
        // eslint-disable-next-line react-hooks/exhaustive-deps
        iframeRef.current.removeEventListener('load', iframeLoadListener);
    };
  }, []);

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
            src='https://datastudio.google.com/embed/reporting/b14ec87e-51df-4d9f-9290-4facc967cae8/page/HusNB'
            frameBorder='0'
            style={{
              border: 0
            }}
            allowFullScreen
            ref={iframeRef}
          ></iframe>
        </div>
      </Content>
    </>
  );
}
