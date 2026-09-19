import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

export default function AdminLogin() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Default passkey: admin123
    if (passcode.trim() === "admin123" || passcode.trim() === "admin") {
      sessionStorage.setItem("esha_admin_authed", "true");
      navigate("/admin");
    } else {
      setError(true);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h2>Portfolio Admin Portal</h2>
          <p>Enter passkey to manage projects, blogs, and profile settings.</p>
        </div>

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="admin-passcode">Passkey</label>
            <input
              id="admin-passcode"
              type="password"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError(false);
              }}
              placeholder="Enter admin passkey (default: admin123)"
              required
            />
          </div>

          {error && (
            <p className="admin-error-text">
              Invalid passkey. Please check and try again.
            </p>
          )}

          <button type="submit" className="admin-btn admin-btn--primary">
            Sign In to Dashboard
          </button>
        </form>

        <div className="admin-login-footer">
          <button
            type="button"
            className="admin-link-btn"
            onClick={() => navigate("/")}
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
