import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    console.log(storedData, "existingData");

    const user = storedData.find((data) => {
      if (data.username === name && data.password === password) {
        alert("Welcome"+ " "+name);
        navigate('/watchlist');
        
      }
      else{
        alert("enter valid details to login")
      }
    });
  };

  return (
    <div className="login-form-container">
      <h3>Welcome to Tradding</h3>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Name:</label>
          <input
            type="name"
            id="name"
            placeholder="Enter your usename"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <a className="accountmessage">Don't have an account?</a>  <p  className="regester-button" onClick={() => navigate("/regestration")}>Regester</p>
      </form>
       

    </div>
  );
};

export default Login;
