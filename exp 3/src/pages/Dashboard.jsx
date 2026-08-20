import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PostComposer from "./PostComposer";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>JWT RBAC</h2>

        <ul>
          <li>Dashboard</li>
          <li>Posts</li>

          {user?.role === "Admin" && <li>Admin Panel</li>}

          {user?.role === "Editor" && <li>Editor Tools</li>}

          <li>Profile</li>
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="main-content">
        <div className="welcome-card">
          <h1>Welcome {user?.username}</h1>
          <p>Role : {user?.role}</p>
        </div>

        <div className="cards">
          <div className="card">
            <h3>Total Posts</h3>
            <h2>150</h2>
          </div>

          <div className="card">
            <h3>Active Users</h3>
            <h2>45</h2>
          </div>

          <div className="card">
            <h3>Comments</h3>
            <h2>320</h2>
          </div>
        </div>

        {/* Real, fully-functional Post Composer (create / edit / delete) */}
        <PostComposer user={user} />

        {user?.role === "Admin" && (
          <div className="admin-panel">
            <h2>Admin Controls</h2>

            <button>Manage Users</button>
            <button>Analytics</button>
            <button>System Settings</button>
            <button>Audit Logs</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
