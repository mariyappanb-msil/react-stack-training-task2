import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedData = JSON.parse(localStorage.getItem("Users")) || [];
    console.log(storedData, "existingData");

    const user = storedData.find((data) => {
      return data.username === name && data.password === password;
    });

    if (user) {
      alert("Welcome" + " " + name);

      const updatedData = storedData.map((data) => {
        if (data.username === name && data.password === password) {
          return { ...data, login_status: "login" };
        }
        return data;
      });

      localStorage.setItem("Users", JSON.stringify(updatedData));
     
     

      navigate("/watchlist");
    } else {
      alert("Enter valid details to login");
    }
  };

  return (
    <div className="login-form-container">
      <h3>Welcome to Tradding</h3>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Username:</label>
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
        <a className="accountmessage">Don't have an account?</a>{" "}
        <p
          className="regester-button"
          onClick={() => navigate("/regestration")}
        >
          Regester
        </p>
      </form>
    </div>
  );
};

export default Login;
