import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectsTab from "./tabs/ProjectsTab";
import ArticlesTab from "./tabs/ArticlesTab";
import ExplorationsTab from "./tabs/ExplorationsTab";
import ProfileTab from "./tabs/ProfileTab";
import "./Admin.css";

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState("projects");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthed = sessionStorage.getItem("esha_admin_authed");
    if (isAuthed !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("esha_admin_authed");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      {/* Top Navbar */}
      <header className="admin-header">
        <div className="admin-header-brand">
          <span className="admin-brand-title">Portfolio CMS Dashboard</span>
          <span className="admin-brand-badge">Session Active</span>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            className="admin-link-btn"
            onClick={() => navigate("/")}
          >
            Recruiter View ↗
          </button>
          <button
            type="button"
            className="admin-link-btn"
            onClick={() => navigate("/writer")}
          >
            Writer View ↗
          </button>
          <button
            type="button"
            className="admin-link-btn"
            onClick={() => navigate("/explorer")}
          >
            Explorer View ↗
          </button>
          <button
            type="button"
            className="admin-btn admin-btn--small admin-btn--secondary"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="admin-body">
        {/* Sidebar Nav */}
        <aside className="admin-sidebar">
          <nav className="admin-nav-list">
            <button
              type="button"
              className={`admin-nav-item ${activeTab === "projects" ? "is-active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              Recruiter Projects
            </button>
            <button
              type="button"
              className={`admin-nav-item ${activeTab === "articles" ? "is-active" : ""}`}
              onClick={() => setActiveTab("articles")}
            >
              Blogs & Commercials
            </button>
            <button
              type="button"
              className={`admin-nav-item ${activeTab === "explorations" ? "is-active" : ""}`}
              onClick={() => setActiveTab("explorations")}
            >
              Explorer (PRDs & Notes)
            </button>
            <button
              type="button"
              className={`admin-nav-item ${activeTab === "profile" ? "is-active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile & Education
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="admin-content">
          {activeTab === "projects" && <ProjectsTab />}
          {activeTab === "articles" && <ArticlesTab />}
          {activeTab === "explorations" && <ExplorationsTab />}
          {activeTab === "profile" && <ProfileTab />}
        </main>
      </div>
    </div>
  );
}
