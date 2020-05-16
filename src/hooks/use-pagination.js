import { useState, useEffect } from 'react';

export default function usePagination(offsetRaw, limitRaw, offsetResetDependency) {
  const [offset, setOffset] = useState(offsetRaw);
  const [limit, setLimit] = useState(limitRaw);
  const [total, setTotal]= useState(0);

  useEffect(() => {
    setOffset(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, ...offsetResetDependency]);

  return [offset, limit, total, setOffset, setLimit, setTotal];
}
