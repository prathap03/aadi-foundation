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
    <div className='flex items-center justify-center min-h-screen'>
      <div className='flex flex-col items-center justify-center'>
      <h2>Login with Facebook</h2>
      <FacebookLogin
        appId={import.meta.env.VITE_REACT_APP_FACEBOOK_APP_ID}
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
        icon="fa-facebook"
      />
      </div>
    </div>
  );
};

export default Login;
