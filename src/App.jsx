import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import PagesList from './components/PageList';
import PageInsights from './components/PageInsights';


const App = () => {
  const [userData, setUserData] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login setUserData={setUserData} />} />
          <Route path="/profile" element={userData ? <UserProfile userData={userData} /> : <p>Please log in first.</p>} />
          <Route path="/pages" element={userData ? <PagesList userData={userData} /> : <p>Please log in first.</p>} />
          <Route path="/insights/:pageId" element={userData ? <PageInsights userData={userData} /> : <p>Please log in first.</p>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
