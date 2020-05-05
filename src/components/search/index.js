import React, { useState } from 'react';

import _debounce from 'lodash/debounce';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function Search({ onChange, value, ...rest }) {
  const [valueLocal, setValueLocal] = useState(value);

  const debouncedOnChange = _debounce(onChange, 50);

  const onChangeFn = e => {
    const { value } = e.target;
    setValueLocal(value);
    debouncedOnChange(value);
  };

  return (
    <Input
      suffix={<SearchOutlined />}
      {...rest}
      onChange={onChangeFn}
      value={valueLocal}
    />
  );
}
