import { useState, useEffect, useRef } from 'react';
import usePagination from 'hooks/use-pagination';
import FacilityAPI from 'api/facility';
import { notification } from 'antd';
import _get from 'lodash/get';

export default function useFacilityApiData({ filterConfig, fetch = true }) {
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [data, setData] = useState([]);
  const reqRef = useRef();

  const [offset, limit, total, setOffset, setLimit, setTotal] = usePagination(
    0,
    30,
    [JSON.stringify(filterConfig)]
  );

  useEffect(() => {
    if (fetch) {
      loadData(offset, limit, filterConfig);
    }
    return () => {
      reqRef.current && reqRef.current.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, limit, JSON.stringify(filterConfig), fetch]);

  const loadData = (offset, limit, filterConfig) => {
    setLoading(true);
    reqRef.current && reqRef.current.abort();
    const req = FacilityAPI.getFacilityList(offset, limit, filterConfig);
    reqRef.current = req;
    req
      .then(
        res => {
          const data = _get(res, 'body.data.page.elements', []);
          const meta = _get(res, 'body.data.page.meta', {});
          const totalResp = meta.totalelements;
          const hasNext = (offset + 1) * limit <= totalResp;
          setTotal(totalResp);
          setData(data);
          setHasNext(hasNext);
          setLoading(false);
        },
        err => {
          setData([]);
          setLoading(false);
        }
      )
      .catch(err => {
        notification.error({
          message: 'Facility list',
          description: 'Something went wrong, please try again later'
        });
        setData([]);
        setLoading(false);
      });
  };

  const handleNextClick = () => {
    setOffset(offset + 1);
  };

  const handlePrevClick = () => {
    setOffset(offset - 1);
  };

  const handleReset = () => {
    setHasNext(true);
    setLoading(false);
    setData([]);
    setOffset(0);
    loadData(0, limit, filterConfig);
  };

  return [
    data,
    loading,
    {
      offset,
      limit,
      total,
      hasNext,
      handleNextClick,
      handlePrevClick,
      setLimit,
      setTotal
    },
    handleReset
  ];
}
