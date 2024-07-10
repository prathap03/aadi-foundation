import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const PageInsights = () => {
  const { pageId } = useParams();
  const location = useLocation();
  const { pageAccessToken } = location.state;
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch(
          `https://graph.facebook.com/${pageId}/insights?metric=page_impressions_unique,page_impressions_paid,page_daily_video_ad_break_ad_impressions_by_crosspost_status&period=day&access_token=${pageAccessToken}`
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

  return (
    <div>
      <h2>Page Insights</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : insights ? (
        insights.map(insight => (
          <div key={insight.id}>
            <h4>{insight.title}</h4>
            <p>{insight.values[0].value}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PageInsights;
