import React, { useRef, useState, useEffect } from 'react';
import { Header, Content } from 'components/layout';
import {
  useParams,
  useRouteMatch,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';
import FacilityAPI from 'api/facility';
import Tabs from 'components/tabs';
import { Button, notification } from 'antd';
import FacilityLinking from './facility-linking';
import FacilityAddForm from '../facility-add/facility-add-form';

export default function FacilityEdit(props) {
  const history = useHistory();
  const params = useParams();
  const formRef = useRef();
  const reqRef = useRef();
  const linkReqRef = useRef();
  const { path, url } = useRouteMatch();

  const [loading, setLoading] = useState(false);
  const [facilityObj, setFacilityObj] = useState({});
  const [facilityLinks, setFacilityLinks] = useState([]);
  const [facilityLoading, setFacilityLoading] = useState(true);
  const [linkingLoading, setLinkingLoading] = useState(false);

  const tabOpts = [
    {
      key: 'edit-form',
      label: 'Profile',
      path: ''
    },
    {
      key: 'linking',
      label: 'Link',
      path: '/link'
    }
  ];

  useEffect(() => {
    return () => {
      reqRef.current && reqRef.current.abort();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      linkReqRef.current && linkReqRef.current.abort();
    };
  }, []);

  useEffect(() => {
    fetchFacility(params.facilityId);
    fetchFacilityLinks(params.facilityId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.facilityId]);

  const fetchFacility = facilityId => {
    setFacilityLoading(true);
    reqRef.current && reqRef.current.abort();
    const req = FacilityAPI.get(facilityId);
    reqRef.current = req;
    req
      .then(res => {
        setFacilityObj(res.body.data);
        setFacilityLoading(false);
      })
      .catch(err => {
        notification.error({
          message: 'Facility',
          description: 'Something went wrong, please try again later'
        });
        setFacilityLoading(false);
      });
  };

  const fetchFacilityLinks = facilityId => {
    setLinkingLoading(true);
    linkReqRef.current && linkReqRef.current.abort();
    const linkReq = FacilityAPI.getLinks(params.facilityId);
    linkReqRef.current = linkReq;
    linkReq
      .then(res => {
        setFacilityLinks(res.body.data.list);
        setLinkingLoading(false);
      })
      .catch(err => {
        notification.error({
          message: 'Facility Links',
          description: 'Something went wrong, please try again later'
        });
        setLinkingLoading(false);
      });
  };

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const onSubmit = (values, actions) => {
    setLoading(true);
    reqRef.current && reqRef.current.abort();
    const req = FacilityAPI.patch(params.facilityId, values);
    reqRef.current = req;
    req
      .then(res => {
        notification.success({
          message: 'Facility',
          description: 'Facility has been saved'
        });
        actions.setSubmitting(false);
        setLoading(false);
      })
      .catch(err => {
        notification.error({
          message: 'Facility',
          description: 'Something went wrong, please try again later'
        });
        actions.setSubmitting(false);
        setLoading(false);
      });
  };

  const handleTabClick = (key, option) => {
    history.push(`${url}${option.path}`);
  };

  const handleAddLink = item => {
    fetchFacilityLinks(params.facilityId);
  };

  const selectedTab = 'edit-form';

  return (
    <>
      <Header fixed>
        <div className='full-height d--f ai--c jc--c'>
          <div className='full-height d--f ai--s jc--c full-width'>
            <Tabs
              options={tabOpts}
              selected={selectedTab}
              handleClick={handleTabClick}
            />
          </div>
          <div className='ml-auto'>
            <Button
              loading={loading}
              size='large'
              onClick={submitForm}
              type='primary'
            >
              SAVE
            </Button>
          </div>
        </div>
      </Header>
      <Content>
        <Switch>
          <Route exact path={path}>
            <FacilityAddForm
              innerRef={formRef}
              onSubmit={onSubmit}
              facility={facilityObj}
              loading={facilityLoading}
            />
          </Route>
          <Route exact path={`${path}/link`}>
            <FacilityLinking
              facility={facilityObj}
              facilityId={params.facilityId}
              facilityLoading={facilityLoading}
              links={facilityLinks}
              linksLoading={linkingLoading}
              onLinkListChange={handleAddLink}
            />
          </Route>
        </Switch>
      </Content>
    </>
  );
}
