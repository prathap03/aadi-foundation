import React from 'react';
import { Link } from 'react-router-dom';

const UserProfile = ({ userData }) => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-400'>
      <div className='flex backdrop-blur-md flex-col items-center min-h-[25vh] min-w-[30vw] gap-2 p-10 bg-white/[50%] rounded-md shadow-md justify-evenly'>
      <div className='flex items-center justify-center gap-10'>
      <div className='overflow-hidden scale-[120%] rounded-full'>
      <img src={userData.picture.data.url} className='rounded-full' alt={userData.name} />
      </div>
      <h2 className='font-sans font-semibold text-[2rem]'>Welcome, {userData.name}</h2>
      
      </div>
      <Link className='p-2 mt-2 hover:bg-blue-700 transition-all ease-linear text-white bg-blue-400 rounded-md shadow-md text-center w-[80%]' to="/pages">View Pages</Link>
      </div>
    </div>
  );
};

export default UserProfile;
