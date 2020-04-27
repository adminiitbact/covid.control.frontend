/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';
import { Header, Content } from 'components/layout';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useResizeAware from 'react-resize-aware';

import './home.scss';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 52, fontWeight: 500 }} spin />
);

const BIscreenRatio = 16 / 9;

function getFrameHeightWidth(divHeight, divWidth) {
  if (divWidth / divHeight > BIscreenRatio) {
    return {
      height: divHeight,
      width: (4 / 3) * divHeight
    };
  } else {
    return {
      height: divHeight,
      width: divWidth
    };
  }
}

export default function Home() {
  const iframeRef = useRef();
  const [loading, setloading] = useState(true);
  const [iframeSize, setIframeSize] = useState();
  const [resizeListener, sizes] = useResizeAware();

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
        iframeRef.current.removeEventListener('load', iframeLoadListener);
    };
  }, []);

  useEffect(() => {
    setIframeSize(getFrameHeightWidth(sizes.height - 116, sizes.width));
  }, [sizes.width, sizes.height]);

  console.log(sizes, iframeSize);
  return (
    <>
      <Header>Dashboard</Header>
      <Content
        style={{
          padding: 0
        }}
      >
        {resizeListener}
        <div className='iframe-container d--f ai--c jc--c'>
          {loading && (
            <div className='spin-container'>
              <Spin indicator={antIcon} />
            </div>
          )}
          <iframe
            title='bi'
            src='https://datastudio.google.com/embed/reporting/b14ec87e-51df-4d9f-9290-4facc967cae8/page/HusNB'
            frameborder='0'
            style={Object.assign(
              {
                border: 0
              },
              iframeSize
            )}
            allowfullscreen
            ref={iframeRef}
          ></iframe>
        </div>
      </Content>
    </>
  );
}
