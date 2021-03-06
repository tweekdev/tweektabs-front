import Skeleton from '@material-ui/lab/Skeleton';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import TabDetail from '../components/TabDetail';
import './Tab.css';

const Tab = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const tib = useParams().tabsId;
  const [loadedTab, setLoadTab] = useState();

  useEffect(() => {
    const fetchTab = async () => {
      try {
        const responseData = await sendRequest(`/api/tweektabs/tabs/${tib}`);
        setLoadTab(responseData.tabs);
      } catch (err) {}
    };
    fetchTab();
  }, [sendRequest, tib]);

  return (
    <div className="main-tabs-single">
      <ErrorModal error={error} onClear={clearError} />

      <div className="tab">
        {isLoading && (
          <div className="center">
            <div>
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />

              <Skeleton variant="rect" width={500} height={500} />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton width="60%" />
            </div>
          </div>
        )}
        {!isLoading && loadedTab && <TabDetail items={loadedTab} />}
      </div>
    </div>
  );
};

export default Tab;
