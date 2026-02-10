import { Link, Navigate } from "react-router-dom";

export default function Landing() {
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/dashboard" />;

  return (
    <div className="landing">
      <div className="landing-card">
        <div className="brand">
          <div className="logo">✓</div>
          <div>
            <h1>TaskFlow</h1>
            <p className="muted">
              Plan. Prioritize. Finish faster — like a professional workflow.
            </p>
          </div>
        </div>

        <div className="landing-actions">
          <Link className="btn primary" to="/login">
            Login
          </Link>
          <Link className="btn ghost" to="/register">
            Create Account
          </Link>
        </div>

        <div className="landing-features">
          <div className="feature">
            <h3>✅ Smart Dashboard</h3>
            <p className="muted">All tasks, filters, priorities, and progress.</p>
          </div>
          <div className="feature">
            <h3>🔒 Secure Login</h3>
            <p className="muted">JWT auth with auto session protection.</p>
          </div>
          <div className="feature">
            <h3>⚡ Fast & Clean UI</h3>
            <p className="muted">Modern design like an “official app”.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
