import React, { useState } from 'react';
import { API_URL } from '../../data/ApiPath';

const Login = ({showWelcomeHandler}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        localStorage.setItem('loginToken', data.token);
        alert('Vendor login successfully');
        setEmail("")
        setPassword("")
        showWelcomeHandler()
      } else {
        console.error('Error Response:', data);
        alert(data.message || 'Login failed');
      }
      const vendor=data.vendorId
      console.log(vendor)
      const getFirm= await fetch(`${API_URL}/vendor/single-vendor/${vendor}`)
      const firmData=await getFirm.json()
      console.log(firmData)
      if(getFirm.ok){
          const firmId=firmData.vendorFirmId
          const firm_name=firmData.firm_name
          localStorage.setItem('firmId', firmId);
          localStorage.setItem('firm_name',firm_name)
          console.log(firmId)
          window.location.reload()
      }
      else{
        window.location.reload()
        console.log("vendor not registered any firm")

      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Login failed');
    }
  };
  return (
    <div className="loginSection">
      <form onSubmit={loginHandler} className="authForm">
        <h3>Vendor Login</h3>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your Email"
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
