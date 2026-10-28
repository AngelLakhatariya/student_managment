import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="page-bg">
      <div className="container" style={{ maxWidth: 600 }}>
        <div className="card-surface p-4 text-center">
          <img src={user?.image} alt={user?.name} className="rounded-circle mb-3" width="110" height="110" />
          <h4 className="fw-bold">{user?.name}</h4>
          <p className="text-muted mb-1">{user?.school}</p>
          <p className="text-muted">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}
