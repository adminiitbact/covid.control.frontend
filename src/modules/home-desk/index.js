import React, { useRef, useEffect, useState } from 'react';
import { Header, Content } from 'components/layout';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// import { Report } from 'react-powerbi';

import './home.scss';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 52, fontWeight: 500 }} spin />
);

export default function HomeDesk() {
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
            title='google-data-studio-bi'
            src='https://datastudio.google.com/embed/reporting/b14ec87e-51df-4d9f-9290-4facc967cae8/page/HusNB'
            frameBorder='0'
            style={{
              border: 0
            }}
            allowFullScreen
            ref={iframeRef}
          ></iframe>
          {/* <iframe
            title='power-bi'
            src='https://app.powerbi.com/reportEmbed?reportId=e1a5692b-b188-4329-ab8f-828b3cde6dfe&autoAuth=true&ctid=cb1627f7-fe0a-4843-af89-c51f3a99d8a9&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWluZGlhLWNlbnRyYWwtYS1wcmltYXJ5LXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9'
            frameborder='0'
            style={{
              border: 0
            }}
            allowFullScreen='true'
            ref={iframeRef}
          ></iframe> */}
        </div>
      </Content>
    </>
  );
}
