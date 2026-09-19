import { useState } from "react";
import { usePortfolioData } from "../../../context/PortfolioDataContext";

export default function ExplorationsTab() {
  const { explorations = [], addExploration, updateExploration, deleteExploration } =
    usePortfolioData();

  const [editingItem, setEditingItem] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "PRDs & Case Studies",
    badgeLabel: "PRD & User Flow",
    image: "",
    summary: "",
    link: "",
    linkText: "View Document ↗",
    tagsStr: "Product Thinking, PRD",
    accentColor: "butter",
    whyBuilt: "",
    whatLearned: "",
  });

  const openCreateModal = () => {
    setFormData({
      title: "",
      category: "PRDs & Case Studies",
      badgeLabel: "PRD & User Flow",
      image: "",
      summary: "",
      link: "",
      linkText: "View Document ↗",
      tagsStr: "Product Thinking, PRD",
      accentColor: "butter",
      whyBuilt: "",
      whatLearned: "",
    });
    setIsCreating(true);
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    setFormData({
      title: item.title || "",
      category: item.category || "PRDs & Case Studies",
      badgeLabel: item.badgeLabel || "",
      image: item.image || "",
      summary: item.summary || "",
      link: item.link || "",
      linkText: item.linkText || "View Document ↗",
      tagsStr: (item.tags || []).join(", "),
      accentColor: item.accentColor || "butter",
      whyBuilt: item.whyBuilt || "",
      whatLearned: item.whatLearned || "",
    });
    setEditingItem(item);
    setIsCreating(false);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = formData.tagsStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      category: formData.category,
      badgeLabel: formData.badgeLabel || formData.category,
      image: formData.image,
      summary: formData.summary,
      link: formData.link,
      linkText: formData.linkText,
      tags,
      accentColor: formData.accentColor,
      whyBuilt: formData.whyBuilt,
      whatLearned: formData.whatLearned,
    };

    if (isCreating) {
      addExploration(payload);
    } else if (editingItem) {
      updateExploration(editingItem.id, payload);
    }

    setIsCreating(false);
    setEditingItem(null);
  };

  return (
    <div className="admin-tab">
      <div className="admin-tab-header">
        <div>
          <h3>Explorer Items (PRDs, Experiments, Rabbit Holes)</h3>
          <p>Manage PRDs, BRDs, case studies, experiments, and 2:17 AM thoughts.</p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={openCreateModal}
        >
          + Add New Exploration / PRD
        </button>
      </div>

      {/* Table / List */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title & Details</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {explorations.map((item) => (
              <tr key={item.id}>
                <td style={{ width: "70px" }}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "56px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    <span className="admin-subtext">Text/Note</span>
                  )}
                </td>
                <td>
                  <strong>{item.title}</strong>
                  <br />
                  <span className="admin-subtext">{item.summary?.slice(0, 65)}...</span>
                </td>
                <td>
                  <span className="admin-badge">{item.category}</span>
                </td>
                <td>
                  <div className="admin-action-btns">
                    <button
                      type="button"
                      className="admin-btn admin-btn--small"
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn--small admin-btn--danger"
                      onClick={() => {
                        if (confirm(`Delete exploration item "${item.title}"?`)) {
                          deleteExploration(item.id);
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
      {(isCreating || editingItem) && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h4>{isCreating ? "Add Exploration / PRD" : "Edit Exploration Item"}</h4>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => {
                  setIsCreating(false);
                  setEditingItem(null);
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Section Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  >
                    <option value="PRDs & Case Studies">PRDs & Case Studies</option>
                    <option value="Experiments">Experiments</option>
                    <option value="Rabbit Hole">Rabbit Hole</option>
                    <option value="Desk Notes">Desk Notes / 2:17 AM Thoughts</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Badge / Sticker Label</label>
                  <input
                    type="text"
                    value={formData.badgeLabel}
                    onChange={(e) =>
                      setFormData({ ...formData, badgeLabel: e.target.value })
                    }
                    placeholder="PRD & User Flow"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Pastel Card Accent Color</label>
                  <select
                    value={formData.accentColor}
                    onChange={(e) =>
                      setFormData({ ...formData, accentColor: e.target.value })
                    }
                  >
                    <option value="butter">Butter Yellow</option>
                    <option value="lavender">Lavender</option>
                    <option value="mint">Mint Green</option>
                    <option value="sky">Sky Blue</option>
                    <option value="coral">Peach Coral</option>
                    <option value="cream">Clean White</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Cover Photo (Upload File or Enter URL)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    style={{ marginBottom: "0.4rem" }}
                  />
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="Or paste image URL"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Summary / Overview *</label>
                <textarea
                  rows={3}
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                  required
                />
              </div>

              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Document / PRD / Demo Link</label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    placeholder="https://drive.google.com/... or Figma link"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Link Button Label</label>
                  <input
                    type="text"
                    value={formData.linkText}
                    onChange={(e) =>
                      setFormData({ ...formData, linkText: e.target.value })
                    }
                    placeholder="View PRD Document ↗"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Tags (Comma Separated)</label>
                <input
                  type="text"
                  value={formData.tagsStr}
                  onChange={(e) =>
                    setFormData({ ...formData, tagsStr: e.target.value })
                  }
                  placeholder="PRD, User Flow, AI"
                />
              </div>

              <div className="admin-form-group">
                <label>Why I Built / Dived Into This (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.whyBuilt}
                  onChange={(e) =>
                    setFormData({ ...formData, whyBuilt: e.target.value })
                  }
                />
              </div>

              <div className="admin-form-group">
                <label>What I Learned / Key Takeaways (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.whatLearned}
                  onChange={(e) =>
                    setFormData({ ...formData, whatLearned: e.target.value })
                  }
                />
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn--secondary"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingItem(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn--primary">
                  Save Exploration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
