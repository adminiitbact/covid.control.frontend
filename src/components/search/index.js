import React, { useState, useCallback } from 'react';

import _debounce from 'lodash/debounce';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function Search({ onChange, value, ...rest }) {
  const [valueLocal, setValueLocal] = useState(value);

  const debouncedOnChange = useCallback(_debounce(onChange, 200), []);

  const onChangeFn = e => {
    const { value } = e.target;
    setValueLocal(value);
    debouncedOnChange(value);
  };

  return (
    <Input
      prefix={<SearchOutlined />}
      {...rest}
      onChange={onChangeFn}
      value={valueLocal}
      placeholder='Search'
    />
  );
}
