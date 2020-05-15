import React, { useEffect, useState, useRef } from 'react';

import qs from 'qs';
import { notification, Select } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';

import _get from 'lodash/get';
import _differenceBy from 'lodash/differenceBy';
import FacilityAPI from 'api/facility';
import Search from 'components/search';
import LinkingTable from './linking-table';
import { covidFacilityTypes } from 'app-constants';

import './facility-linking.scss';

function filterSelf(list, id) {
  return list.filter(el => String(_get(el, 'facilityId')) !== String(id));
}

function getAllowedFacilityTypeFilters(facility) {
  console.log(facility);
  if (facility.facilityProfile.covidFacilityType === 'CCC') {
    return ['DCH', 'DCHC'];
  }
  if (facility.facilityProfile.covidFacilityType === 'DCHC') {
    return ['DCH'];
  }
  return [];
}

function FacilityTypeTableComponent({ heading, data, loading, handleClick }) {
  return (
    <div className='table mb3 full-width'>
      <div className='heading'>{heading}</div>
      {data.length !== 0 && (
        <LinkingTable
          data={data}
          actionCol={{
            key: 'action',
            render: (text, record, index) => (
              <div
                className='add-action remove'
                onClick={handleClick(record, index)}
              >
                <DeleteFilled />
                <span className='text'>Remove</span>
              </div>
            )
          }}
          loading={loading}
          pagination={false}
        />
      )}
      {data.length === 0 && (
        <div className='empty-message'>No facilities linked</div>
      )}
    </div>
  );
}

export default function FacilityLinking({
  facility,
  facilityId,
  facilityLoading,
  links,
  linksLoading,
  onLinkListChange
}) {
  const history = useHistory();
  const [facilityList, setFacilityList] = useState([]);
  const [facilityListLoading, setFacilityListLoading] = useState(true);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(1);
  const location = useLocation();

  const filterConfig = qs.parse(location.search, { ignoreQueryPrefix: true });
  const reqRef = useRef();
  const addReqRef = useRef();

  const allowedFacilityTypeFilters =
    facility && facility.facilityProfile
      ? getAllowedFacilityTypeFilters(facility)
      : [];

  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilityId, JSON.stringify(filterConfig)]);

  useEffect(() => {
    if (facility && facility.facilityProfile) {
      fetchLinkOptions(page, filterConfig, facilityId, facility);
    }
    return () => {
      reqRef.current && reqRef.current.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    facilityId,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(filterConfig),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(facility)
  ]);

  const fetchLinkOptions = (page, filterConfig, facilityId, facility) => {
    setFacilityListLoading(true);
    reqRef.current && reqRef.current.abort();
    let newFilterConfig = { ...filterConfig };
    if (!filterConfig.covidFacilityType) {
      newFilterConfig.covidFacilityType = allowedFacilityTypeFilters;
    }
    const req = FacilityAPI.getFacilityList(page, newFilterConfig);
    reqRef.current = req;
    req
      .then(
        res => {
          if (
            (res.body.data.list && res.body.data.list.length > 0) ||
            page === 1
          ) {
            setFacilityList(filterSelf(res.body.data.list, facilityId));
          } else {
            setHasNext(false);
            setPage(page - 1);
          }
          setFacilityListLoading(false);
        },
        err => {
          setFacilityList([]);
          setFacilityListLoading(false);
        }
      )
      .catch(err => {
        notification.error({
          message: 'Facility list',
          description: 'Something went wrong, please try again later'
        });
        setFacilityList([]);
        setFacilityListLoading(false);
      });
  };

  const saveLinks = (facilityId, links, item, changeType) => {
    setFacilityListLoading(true);
    addReqRef.current && addReqRef.current.abort();
    const addReq = FacilityAPI.saveLink(facilityId, {
      facilityLinks: links
    });

    addReqRef.current = addReq;
    addReq
      .then(
        res => {
          // this use of filterconfig as this filterconfig might be stale if updated,
          // might be buggy
          setPage(1);
          fetchLinkOptions(1, filterConfig, facilityId);
          onLinkListChange(item, changeType);
        },
        e => {
          notification.error({
            message: 'Facility Links',
            description: 'Something went wrong, please try again later'
          });
          setPage(1);
          fetchLinkOptions(1, filterConfig, facilityId);
          onLinkListChange(item, changeType);
        }
      )
      .catch(err => {
        notification.error({
          message: 'Facility Links',
          description: 'Something went wrong, please try again later'
        });
      });
  };

  const handleRemoveLink = (item, index) => {
    return e => {
      const newLinks = [
        {
          facilityId: item.facilityId,
          linkingStatus: 'UNLINK'
        }
      ];
      // newLinks.splice(linkIndex, 1);
      saveLinks(facilityId, newLinks, item, 'remove');
    };
  };

  const handleAddLink = (record, index) => {
    return e => {
      const newLinks = [
        {
          facilityId: record.facilityId,
          linkingStatus: 'LINK'
        }
      ];
      saveLinks(facilityId, newLinks, record, 'add');
    };
  };

  const handleNextClick = () => {
    setPage(page + 1);
  };

  const handlePrevClick = () => {
    setPage(page - 1);
  };

  const handleSearch = value => {
    history.push({
      pathname: location.pathname,
      search: qs.stringify(
        Object.assign({}, filterConfig, {
          name: value
        })
      )
    });
  };

  const handleTypeFilter = value => {
    history.push({
      pathname: location.pathname,
      search: qs.stringify(
        Object.assign({}, filterConfig, {
          covidFacilityType: [value]
        })
      )
    });
  };

  const dchfacilities = links.dchfacilities || [];
  const dchcfacilities = links.dchcfacilities || [];
  const cccfacilities = links.cccfacilities || [];

  let facilityListFiltered = [];
  facilityListFiltered = _differenceBy(
    facilityList,
    dchfacilities,
    el => el.facilityId
  );
  facilityListFiltered = _differenceBy(
    facilityListFiltered,
    dchcfacilities,
    el => el.facilityId
  );
  facilityListFiltered = _differenceBy(
    facilityListFiltered,
    cccfacilities,
    el => el.facilityId
  );

  facilityListFiltered = filterSelf(facilityListFiltered, facilityId);

  console.log(allowedFacilityTypeFilters);

  return (
    <div className='facility-linking-wrapper'>
      <div className='title'>{_get(facility, 'facilityProfile.name')}</div>
      {/* <div className='d--f mb1'>Search/filters</div> */}
      {_get(facility, 'facilityProfile.covidFacilityType') !== 'DCH' && (
        <>
          <div className='subtitle mb1'>Link facilities</div>
          <div className='mb2'>
            <div className='mr2 d--if mb1'>
              <Search
                style={{
                  width: '300px'
                }}
                value={filterConfig.name}
                onChange={handleSearch}
              />
            </div>
            <Select
              style={{ width: '150px' }}
              allowClear
              placeholder='Type'
              value={filterConfig.covidFacilityType}
              onChange={handleTypeFilter}
            >
              {covidFacilityTypes.map(el => (
                <Select.Option
                  value={el.key}
                  disabled={allowedFacilityTypeFilters.indexOf(el.key) === -1}
                >
                  {el.label}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className='table mb3 full-width'>
            <LinkingTable
              data={facilityListFiltered}
              actionCol={{
                key: 'action',
                render: (text, record, index) => (
                  <div
                    className='add-action add'
                    onClick={handleAddLink(record, index)}
                  >
                    <PlusCircleFilled />
                    <span className='text'>Link</span>
                  </div>
                )
              }}
              pagination
              loading={facilityListLoading}
              current={page}
              hasNext={hasNext}
              hasPrev={page > 1}
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
            />
          </div>
        </>
      )}
      <FacilityTypeTableComponent
        loading={linksLoading}
        data={dchfacilities}
        heading='DCH Linked Facilities'
        handleClick={handleRemoveLink}
      />
      <FacilityTypeTableComponent
        loading={linksLoading}
        data={dchcfacilities}
        heading='DCHC Linked Facilities'
        handleClick={handleRemoveLink}
      />
      <FacilityTypeTableComponent
        loading={linksLoading}
        data={cccfacilities}
        heading='CCC Linked Facilities'
        handleClick={handleRemoveLink}
      />
    </div>
  );
}
