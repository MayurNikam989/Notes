import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      navigate("/login");

      alert("signup succesfull Please Login with credential.");
    } else {
      alert(json.error);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-4 mx-auto shadow border rounded w-50 p-3">
      <h3 className="mb-3">SignUp</h3>
      <form className="row g-3" onSubmit={onSubmit}>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            className="form-control"
            id="name"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="form-control"
            id="email"
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="form-control"
            id="Password"
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
