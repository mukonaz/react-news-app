import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { email, password });
      alert('Registration successful');
    } catch (error) {
      console.error('Registration error:', error.response.data);
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="px-5 ms-xl-4">
              <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: '#709085' }}></i>
              <span className="h1 fw-bold mb-0">News App</span>
            </div>
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: '23rem' }} onSubmit={handleRegister}>
                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Registration</h3>
                <div data-mdb-input-init className="form-outline mb-4">
                  <input type="email" onChange={e => setEmail(e.target.value)} id="form2Example18" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form2Example18">Email address</label>
                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                  <input type="password" onChange={e => setPassword(e.target.value)} id="form2Example28" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form2Example28">Password</label>
                </div>
                <div className="pt-1 mb-4">
                  <button className="btn btn-info btn-lg btn-block" type="submit">Register</button>
                </div>
                <p>Have an account? <Link to='/login' className="link-info">Login here</Link></p>
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
              alt="Registration image" className="w-100 vh-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
          </div>
        </div>
      </div>
    </section>
  );
};
