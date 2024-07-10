import React from 'react';
import { useNavigate } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

const Login = ({ setUserData }) => {
  const navigate = useNavigate();

  const responseFacebook = (response) => {
    setUserData(response);
    console.log(response);
    navigate('/profile');
  };

  return (
    <div className='flex items-center justify-center min-h-screen overflow-hidden bg-blue-400'>

      <div className='flex flex-col items-center justify-center'>
      <h2 className='mb-5 font-semibold text-white text-[1.5rem]'>Welcome to Facebook Analyzer</h2>
      <FacebookLogin
        appId={import.meta.env.VITE_REACT_APP_FACEBOOK_APP_ID}
        autoLoad={true}
        fields="name,email,picture"
        scope="pages_show_list,pages_read_engagement,pages_read_user_content,read_insights"
        callback={responseFacebook}
        icon="fa-facebook"
      />
      </div>
    </div>
  );
};

export default Login;
