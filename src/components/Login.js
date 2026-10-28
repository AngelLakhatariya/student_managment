import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../redux/authActions";

export default function Login() {
  const [email, setEmail] = useState("teacher@school.com");
  const [password, setPassword] = useState("123456");
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await dispatch(login(email, password));
    if (ok) navigate("/");
  };

  return (
    <div className="page-bg">
      <div className="container d-flex justify-content-center">
        <form className="card-surface p-4 mt-5" style={{ maxWidth: 400, width: "100%" }} onSubmit={handleSubmit}>
          <h4 className="fw-bold mb-1">Welcome back</h4>
          <p className="text-muted small mb-4">Sign in to manage student information</p>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <label className="form-label small fw-semibold">Email</label>
          <input type="email" className="form-control mb-3" value={email}
                 onChange={(e) => setEmail(e.target.value)} required />

          <label className="form-label small fw-semibold">Password</label>
          <input type="password" className="form-control mb-4" value={password}
                 onChange={(e) => setPassword(e.target.value)} required />

          <button className="btn btn-primary-pill w-100" type="submit">SIGN IN</button>
          <p className="text-muted small mt-3 mb-0">Demo: teacher@school.com / 123456</p>
        </form>
      </div>
    </div>
  );
}
