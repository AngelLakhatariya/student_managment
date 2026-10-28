import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authActions";

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg app-navbar navbar-dark">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">🎓 EduTrack</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          {isAuthenticated ? (
            <>
              <ul className="navbar-nav me-auto">
                <li className="nav-item"><NavLink className="nav-link" to="/" end>Student List</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/add">Add Student</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/profile">Profile</NavLink></li>
              </ul>
              <span className="text-white me-3 small">Hi, {user?.name}</span>
              <button className="btn btn-light btn-sm rounded-pill px-3" onClick={handleLogout}>Sign Out</button>
            </>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><NavLink className="nav-link" to="/login">Sign In</NavLink></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
