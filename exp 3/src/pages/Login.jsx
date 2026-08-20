import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Viewer");

  const navigate = useNavigate();

  const { loginWithRole } = useContext(AuthContext);

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter Username and Password");
      return;
    }

    const success = loginWithRole(
      username,
      password,
      role
    );

    if (success) {
      navigate("/dashboard");
    } else {
      alert("Login Failed");
    }
  };

  const forgotPassword = () => {
    const email = prompt(
      "Enter your registered email"
    );

    if (email) {
      alert(
        "Password reset link sent to: " + email
      );
    }
  };

  const createAccount = () => {
    navigate("/register");
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="left-panel">
          <h1>JWT RBAC System</h1>

          <p>
            Secure Role Based Access Control
          </p>

          <h3>
            Admin • Editor • Viewer
          </h3>
        </div>

        <div className="right-panel">

          <h2>Welcome Back</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option value="Admin">
              Admin
            </option>

            <option value="Editor">
              Editor
            </option>

            <option value="Viewer">
              Viewer
            </option>
          </select>

          <button
            className="login-btn"
            onClick={handleLogin}
          >
            Login
          </button>

          <div className="links">

            <span
              onClick={forgotPassword}
            >
              Forgot Password?
            </span>

            <span
              onClick={createAccount}
            >
              Create Account
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;