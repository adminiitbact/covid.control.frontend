import React from 'react';
import { Layout } from 'antd';

const { Header: HeaderAntd, Content: ContentAntd } = Layout;


export function Header({ children, ...rest }) {
  return (
    <HeaderAntd className='layout-header' {...rest}>
      {children}
    </HeaderAntd>
  );
}

export function Content({ children, ...rest }) {
  return (
    <ContentAntd className='layout-content' {...rest}>
      {children}
    </ContentAntd>
  );
}
