<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';

import { Login } from "./components/Login"
import { Registration } from "./components/Registration"
import { NewsApp } from './components/NewsApp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Loader from './components/Loader';
import React, { useState, useEffect } from 'react';

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a page load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Change this duration to your needs

    return () => clearTimeout(timer);
  }, []);

  return (

    <div>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/newapp" element={<NewsApp />}></Route>
        </Routes>

      )}
=======
import React from 'react';
import NewsApp from './NewsApp';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <div className="App">
      <NewsApp />
>>>>>>> d3709e6cbfd2e0dade53c4ddb2f09b39f48af687
    </div>
  );
};

export default App;
