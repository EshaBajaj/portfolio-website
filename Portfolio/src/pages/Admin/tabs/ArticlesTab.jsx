import { useState } from "react";
import { usePortfolioData } from "../../../context/PortfolioDataContext";

export default function ArticlesTab() {
  const { articles, addArticle, updateArticle, deleteArticle } = usePortfolioData();
  const [editingArticle, setEditingArticle] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    type: "Blogs",
    date: "",
    readTime: "",
    coverImage: "",
    excerpt: "",
    content: "",
  });

  const openCreateModal = () => {
    setFormData({
      title: "",
      subtitle: "",
      type: "Blogs",
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      readTime: "5 min read",
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      excerpt: "",
      content: "",
    });
    setIsCreating(true);
    setEditingArticle(null);
  };

  const openEditModal = (art) => {
    setFormData({
      title: art.title || "",
      subtitle: art.subtitle || "",
      type: art.type || "Blogs",
      date: art.date || "",
      readTime: art.readTime || "",
      coverImage: art.coverImage || "",
      excerpt: art.excerpt || "",
      content: art.content || "",
    });
    setEditingArticle(art);
    setIsCreating(false);
  };

  // Handle local image file upload converting to data URL (or Supabase public link)
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, coverImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      subtitle: formData.subtitle,
      type: formData.type,
      categoryLabel: formData.type,
      date: formData.date,
      readTime: formData.readTime,
      coverImage: formData.coverImage,
      excerpt: formData.excerpt,
      content: formData.content,
    };

    if (isCreating) {
      addArticle(payload);
    } else if (editingArticle) {
      updateArticle(editingArticle.id, payload);
    }

    setIsCreating(false);
    setEditingArticle(null);
  };

  return (
    <div className="admin-tab">
      <div className="admin-tab-header">
        <div>
          <h3>Writings & Commercial Work</h3>
          <p>Manage technical essays, blogs, and commercial client case studies.</p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={openCreateModal}
        >
          + Add New Article / Client Work
        </button>
      </div>

      {/* Table List */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title & Details</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((art) => (
              <tr key={art.id}>
                <td style={{ width: "70px" }}>
                  {art.coverImage ? (
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      style={{ width: "56px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
                    />
                  ) : (
                    <span className="admin-subtext">No pic</span>
                  )}
                </td>
                <td>
                  <strong>{art.title}</strong>
                  <br />
                  <span className="admin-subtext">{art.excerpt?.slice(0, 65)}...</span>
                </td>
                <td>
                  <span
                    className={`admin-badge ${
                      art.type === "Commercials" ? "admin-badge--commercial" : ""
                    }`}
                  >
                    {art.type === "Commercials" ? "Commercials" : "Blogs"}
                  </span>
                </td>
                <td>{art.date}</td>
                <td>
                  <div className="admin-action-btns">
                    <button
                      type="button"
                      className="admin-btn admin-btn--small"
                      onClick={() => openEditModal(art)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn--small admin-btn--danger"
                      onClick={() => {
                        if (confirm(`Delete article "${art.title}"?`)) {
                          deleteArticle(art.id);
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

      {/* Form Modal */}
      {(isCreating || editingArticle) && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h4>{isCreating ? "Add New Content" : "Edit Article / Case Study"}</h4>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => {
                  setIsCreating(false);
                  setEditingArticle(null);
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Category *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                  >
                    <option value="Blogs">Blogs</option>
                    <option value="Commercials">Commercials</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Date *</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="Sep 2025"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Read Time / Metadata</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="5 min read"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Cover Image (Upload File or Enter URL)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    style={{ marginBottom: "0.4rem" }}
                  />
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="Or paste image URL (e.g. Supabase storage URL)"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Subtitle / Headline</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label>Excerpt / Summary *</label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Full Content (Markdown or Text) *</label>
                <textarea
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                />
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn--secondary"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingArticle(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn--primary">
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
