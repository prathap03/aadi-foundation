import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const PageInsights = () => {
  const { pageId } = useParams();
  const location = useLocation();
  const { pageAccessToken,name } = location.state;
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch(
          `https://graph.facebook.com/${pageId}/insights?metric=page_fans,page_tab_views_login_top,page_impressions,page_post_engagements,page_actions_post_reactions_like_total&period=day&access_token=${pageAccessToken}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error details:", errorData);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInsights(data.data);
      } catch (err) {
        console.error("Failed to fetch insights:", err);
        setError(err.message);
      }
    };

    fetchInsights();
  }, [pageId, pageAccessToken]);

  const getMetricValue = (metricName) => {
    const metric = insights && insights.find(insight => insight.name === metricName);
    return metric ? metric.values[0].value : <h1 className='font-semibold text-red-500'>Not Available</h1>;
  };

  return (
    <div className='flex items-center justify-center min-h-screen overflow-hidden bg-blue-400'>
      <div className='flex backdrop-blur-md flex-col items-center min-h-[12rem] min-w-[20%] gap-2 p-10 bg-white/[50%] rounded-md shadow-md justify-evenly'>
      <h2>{name}</h2>
      <h2>Page Insights</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : insights ? (
        <div className='flex flex-col mt-5 gap-2 w-[100%] '>
          <div className='flex justify-between gap-2'>
            <h4>Total Followers / Fans</h4>
            <p>{getMetricValue('page_fans')}</p>
          </div>
          <div className='flex justify-between gap-2'>
            <h4>Total Engagement</h4>
            <p>{getMetricValue('page_post_engagements')}</p>
          </div>
          <div className='flex justify-between gap-2'>
            <h4>Total Impressions</h4>
            <p>{getMetricValue('page_impressions')}</p>
          </div>
          <div className='flex justify-between gap-2'>
            <h4>Total Reactions</h4>
            <p>{getMetricValue('page_actions_post_reactions_like_total')}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

export default PageInsights;
