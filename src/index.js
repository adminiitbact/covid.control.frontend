import React from 'react';
import { render } from 'react-dom';
import Root from 'base/root';
// import * as Sentry from '@sentry/browser';

import 'sanitize.css/sanitize.css';
import './index.scss';
// import 'antd/dist/antd.less';

if (process.env.NODE_ENV === 'production') {
  // Sentry.init({
  //   dsn: 'https://fd3a2752668b431b9a66c582c4e9a741@sentry.io/1773199'
  // });
}

render(<Root />, document.querySelector('#root'));
