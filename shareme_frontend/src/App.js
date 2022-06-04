import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import { gapi } from 'gapi-script';
import { useEffect } from 'react'
import { fetchUser } from './utils/fetchUser';

const App = () => {
  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
        scope: ""
      })
    };

    gapi.load('client:auth2', start);
  })

  const navigate = useNavigate()

  useEffect(() => {
    const user = fetchUser()

    if(!user) navigate('/login');
  }, [])

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  )
}

export default App;