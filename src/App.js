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
    </div>
  );
};

export default App;
