import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PagesList = ({ userData }) => {
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);
  const [Loading,setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch(`https://graph.facebook.com/me/accounts?access_token=${userData.accessToken}`);
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error details:", errorData);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPages(data.data);
      } catch (err) {
        console.error("Failed to fetch pages:", err);
        setError(err.message);
      }
      // if(pages.length>0){
        setLoading(false);
      // }
    };

    fetchPages();
  }, [userData.accessToken]);

  const handlePageSelect = (pageId, pageAccessToken) => {
    navigate(`/insights/${pageId}`, { state: { pageAccessToken } });
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-400'>
      <div className='flex backdrop-blur-md flex-col items-center min-h-[12rem] min-w-[40rem] gap-2 p-10 bg-white/[50%] rounded-md shadow-md justify-evenly'>
      <h2 className='font-semibold font-sans text-[2rem]'>Select a Page</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : Loading ? (
        <p>Loading...</p>
      ) : (
        <select className='w-[50%] p-2 bg-blue-400 text-white text-center' onChange={(e) => {
          const selectedPage = pages.find(page => page.id === e.target.value);
          handlePageSelect(selectedPage.id, selectedPage.access_token);
        }}>
          <option>Select a page</option>
          {pages.map(page => (
            <option key={page.id} value={page.id}>{page.name}</option>
          ))}
        </select>
      )}
    </div>
    </div>
  );
};

export default PagesList;
