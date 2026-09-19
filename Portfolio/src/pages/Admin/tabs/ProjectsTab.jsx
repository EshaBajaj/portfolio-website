import { useState } from "react";
import { usePortfolioData } from "../../../context/PortfolioDataContext";

export default function ProjectsTab() {
  const { projects, addProject, updateProject, deleteProject } = usePortfolioData();
  const [editingProject, setEditingProject] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    domain: "",
    description: "",
    tagsStr: "",
    highlightsStr: "",
    href: "",
    github: "",
    image: "",
    archOverview: "",
  });

  const openCreateModal = () => {
    setFormData({
      title: "",
      category: "Full-Stack Platform",
      domain: "app.internal",
      description: "",
      tagsStr: "React, Node.js, Vite",
      highlightsStr: "Role-based authentication\nReal-time status tracking",
      href: "",
      github: "",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      archOverview: "Modern decoupled architecture with PostgreSQL database.",
    });
    setIsCreating(true);
    setEditingProject(null);
  };

  const openEditModal = (proj) => {
    setFormData({
      title: proj.title || "",
      category: proj.category || "",
      domain: proj.domain || "",
      description: proj.description || "",
      tagsStr: (proj.tags || []).join(", "),
      highlightsStr: (proj.highlights || []).join("\n"),
      href: proj.href || "",
      github: proj.github || "",
      image: proj.image || "",
      archOverview: proj.architecture?.overview || "",
    });
    setEditingProject(proj);
    setIsCreating(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = formData.tagsStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const highlights = formData.highlightsStr
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      category: formData.category,
      domain: formData.domain,
      description: formData.description,
      tags,
      highlights,
      href: formData.href,
      github: formData.github,
      image: formData.image,
      architecture: {
        overview: formData.archOverview,
      },
    };

    if (isCreating) {
      addProject(payload);
    } else if (editingProject) {
      updateProject(editingProject.id, payload);
    }

    setIsCreating(false);
    setEditingProject(null);
  };

  return (
    <div className="admin-tab">
      <div className="admin-tab-header">
        <div>
          <h3>Project Management</h3>
          <p>Add, edit, or remove projects shown on the Recruiter Portfolio.</p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={openCreateModal}
        >
          + Add New Project
        </button>
      </div>

      {/* Table List */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Links</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => (
              <tr key={proj.id}>
                <td>
                  <strong>{proj.title}</strong>
                  <br />
                  <span className="admin-subtext">{proj.description.slice(0, 70)}...</span>
                </td>
                <td>
                  <span className="admin-badge">{proj.category}</span>
                </td>
                <td>
                  <div className="admin-links-stack">
                    {proj.href && (
                      <a href={proj.href} target="_blank" rel="noreferrer">
                        Demo ↗
                      </a>
                    )}
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer">
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </td>
                <td>
                  <div className="admin-action-btns">
                    <button
                      type="button"
                      className="admin-btn admin-btn--small"
                      onClick={() => openEditModal(proj)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn--small admin-btn--danger"
                      onClick={() => {
                        if (confirm(`Delete project "${proj.title}"?`)) {
                          deleteProject(proj.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {(isCreating || editingProject) && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h4>{isCreating ? "Create New Project" : "Edit Project"}</h4>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => {
                  setIsCreating(false);
                  setEditingProject(null);
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Project Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Category *</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Full-Stack Platform"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Domain Identifier</label>
                  <input
                    type="text"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    placeholder="e.g. portal.app.dev"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Image Cover URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Image URL or path"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Live Demo Link</label>
                  <input
                    type="url"
                    value={formData.href}
                    onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>GitHub Repository Link</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Description *</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Tech Stack Tags (Comma separated)</label>
                <input
                  type="text"
                  value={formData.tagsStr}
                  onChange={(e) => setFormData({ ...formData, tagsStr: e.target.value })}
                  placeholder="React, Node.js, Supabase, Python"
                />
              </div>

              <div className="admin-form-group">
                <label>Key Technical Highlights (One per line)</label>
                <textarea
                  rows={3}
                  value={formData.highlightsStr}
                  onChange={(e) => setFormData({ ...formData, highlightsStr: e.target.value })}
                  placeholder="Role-based authentication & status tracking&#10;Real-time database triggers"
                />
              </div>

              <div className="admin-form-group">
                <label>Technical Architecture Overview</label>
                <textarea
                  rows={2}
                  value={formData.archOverview}
                  onChange={(e) => setFormData({ ...formData, archOverview: e.target.value })}
                />
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn--secondary"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingProject(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn--primary">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
