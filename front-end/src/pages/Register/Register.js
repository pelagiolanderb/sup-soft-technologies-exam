import React, { useState } from "react";
import "./Register.css";
import { register } from "../../api/auth";
import { Link } from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registration, setRegistration] = useState(false);

  const handleCredentials = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await register(credentials);
      localStorage.setItem("authToken", response.token);
      setRegistration(true);
      setCredentials({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Website Application Rentals - Register</h2>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleCredentials}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <small style={{ color: "red" }}>
            {error?.errors?.email ? error.errors.email[0] : ""}
          </small>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleCredentials}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <small style={{ color: "red" }}>
            {error?.errors?.password ? error.errors.password[0] : ""}
          </small>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleCredentials}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="password_confirmation"
            value={credentials.password_confirmation}
            onChange={handleCredentials}
            required
          />
        </div>
        <button type="submit">{loading ? "Loading..." : "Register"}</button>
      </form>
      {registration && (
        <div className="successful-register">
          <p>
            Successfully Registered. Please click <Link to="/login">here</Link>{" "}
            to login.
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;
