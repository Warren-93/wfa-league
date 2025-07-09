
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';


import Header from './components/header/Header';
import Home from './components/home/Home';
import Layout from './components/Layout';
import Teams from './components/teams/Teams';
import Team from './components/teams/team/Team';
import Player from './components/player/Player';
import Register from './components/register/Register';
import Login from './components/login/Login';
import AddPlayer from './components/player/AddPlayer';


function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const userInfo = Cookies.get('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  return (
    <>
      <Header 
        user={user} 
        setUser={setUser} 
        showLogin={showLogin} 
        setShowLogin={setShowLogin} 
        showRegister={showRegister} 
        setShowRegister={setShowRegister} 
      />

      <Login 
        show={showLogin} 
        handleClose={handleCloseLogin} 
        setUser={setUser} 
      />
      <Register 
        show={showRegister} 
        handleClose={handleCloseRegister} 
      />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/:teamName" element={<Team />} />
          <Route path="players/:playerName" element={<Player />} />
          <Route path="player/addPlayer" element={
            user && user.role === 'admin' ? <AddPlayer /> : <Navigate to="/login" replace />
          } />
        </Route>
      </Routes>
  
     
    </>
  );
}

export default App;
