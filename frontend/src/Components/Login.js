import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    //API call
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      sessionStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
    // console.log(json);
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-4 mx-auto shadow border rounded w-50 p-3 ">
      <h3 className="mb-3">Login</h3>
      <form onSubmit={onSubmit}>
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              name="email"
              id="email"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              name="password"
              id="password"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
